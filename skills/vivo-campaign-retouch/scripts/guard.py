#!/usr/bin/env python3
"""Fixed-anchor color checks; deterministic local correction, no generation or network."""
import argparse
import hashlib
import io
import json
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageCms, ImageOps
sys.path.insert(0, str(Path(__file__).resolve().parent / 'vendor'))
import color_match as cm
from common import load_image, rgb_to_lab, delta_e2000, comparison_board, to_pil


def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def write(path, obj):
    Path(path).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def normalize(src, dst):
    with Image.open(src) as raw:
        img = ImageOps.exif_transpose(raw)
        alpha = img.convert('RGBA').getchannel('A')
        icc = raw.info.get('icc_profile')
        if icc:
            base = img if img.mode in ('RGB', 'CMYK') else img.convert('RGB')
            img = ImageCms.profileToProfile(base, ImageCms.ImageCmsProfile(io.BytesIO(icc)),
                                           ImageCms.createProfile('sRGB'), outputMode='RGB')
        else:
            if img.mode == 'CMYK':
                raise ValueError('CMYK 无 ICC 配置，无法可靠判断颜色')
            img = img.convert('RGB')
        img.putalpha(alpha)
        img.save(dst, icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes())


def audit(source, edit, corrected, ignore=None):
    """Measure before/after on the SAME aligned, unchanged foreground sample."""
    s, si = load_image(source)
    e, ei = load_image(edit)
    o, _ = load_image(corrected)
    size = cm._analysis_size(e.shape)
    S, E, O = (cm._resize(x, size) for x in (s, e, o))
    warp, score, kind = cm.register(S, E)
    S, valid = cm.warp_to_edit(S, warp, size)
    if si.get('alpha') is not None:
        sa = cv2.resize(si['alpha'], size, interpolation=cv2.INTER_NEAREST)
        sa = cv2.warpAffine(sa, warp, size, flags=cv2.INTER_NEAREST | cv2.WARP_INVERSE_MAP)
        valid &= sa > 250
    if ei.get('alpha') is not None:
        valid &= cv2.resize(ei['alpha'], size, interpolation=cv2.INTER_NEAREST) > 250
    keep = None
    if ignore:
        with Image.open(ignore) as im:
            keep = np.asarray(im.convert('L').resize(size, Image.Resampling.NEAREST)) < 128
    fp = cm.fit_pairs(S, E, valid, keep)
    # White studio background must not hide drift in skin and clothes.
    mask = fp['inl'] & valid & (rgb_to_lab(S)[..., 0] < 92)
    n = int(mask.sum())
    result = {'registration_score': round(score, 4), 'registration_kind': kind,
              'sample_pixels': n, 'foreground_fraction': round(float(mask.mean()), 4)}
    if score < .6 or n < 500 or mask.mean() < .01:
        result.update(status='review', reason='对齐或未改动主体样本不足；不能以背景相似宣告通过')
        return result
    # Coarse sampling removes invented pore/yarn noise from tone estimation.
    labs = [rgb_to_lab(cv2.GaussianBlur(x, (0, 0), 1.2)) for x in (S, E, O)]
    lref = labs[0][..., 0][mask]
    cref = np.hypot(labs[0][..., 1], labs[0][..., 2])
    chromatic = mask & (cref > 8)
    def stats(lab):
        dl = float(np.median(lab[..., 0][mask] - lref))
        de = float(delta_e2000(labs[0], lab)[mask].mean())
        span0 = float(np.percentile(lref, 90) - np.percentile(lref, 10))
        span = float(np.percentile(lab[..., 0][mask], 90) - np.percentile(lab[..., 0][mask], 10))
        ratio = float(np.median(np.hypot(lab[..., 1], lab[..., 2])[chromatic] / cref[chromatic])) if chromatic.sum() >= 200 else None
        return {'delta_L_median': round(dl, 3), 'chroma_ratio': round(ratio, 4) if ratio is not None else None,
                'contrast_ratio': round(span / span0, 4) if span0 > 5 else None, 'deltaE00_mean': round(de, 3)}
    result['before'], result['after'] = stats(labs[1]), stats(labs[2])
    a, b = result['after'], result['before']
    issues = []
    if abs(a['delta_L_median']) > 1.5:
        issues.append('主体明度仍有偏移')
    if a['chroma_ratio'] is not None and not .95 <= a['chroma_ratio'] <= 1.05:
        issues.append('主体色彩浓度仍有偏移')
    if a['contrast_ratio'] is not None and not .92 <= a['contrast_ratio'] <= 1.08:
        issues.append('主体明暗层次仍有偏移')
    if a['deltaE00_mean'] > 2.5 or a['deltaE00_mean'] > b['deltaE00_mean'] + .2:
        issues.append('主体色差偏大或校正后变差')
    result.update(status='review' if issues else 'pass', issues=issues,
                  meaning='pass 仅表示可对照区域色调达标，不代表身份、纹理、清晰度验收通过')
    return result


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest='command', required=True)
    p = sub.add_parser('init')
    p.add_argument('--source', required=True)
    p.add_argument('--manifest', required=True)
    p = sub.add_parser('check')
    p.add_argument('--manifest', required=True)
    p.add_argument('--image', required=True)
    p.add_argument('--out-dir', required=True)
    p.add_argument('--ignore-mask', help='白色=有意修改的区域；与本轮输入同尺寸')
    p.add_argument('--mode', choices=['preserve', 'intentional-grade'], default='preserve')
    args = ap.parse_args()
    if args.command == 'init':
        path = Path(args.manifest).resolve()
        if path.exists():
            raise ValueError('基准清单已存在；不可覆盖或自动升级最新候选为基准')
        source = Path(args.source).resolve(strict=True)
        path.parent.mkdir(parents=True, exist_ok=True)
        write(path, {'version': 1, 'source': str(source), 'sha256': sha(source), 'policy': 'fixed-original'})
        print(f'已固定原色基准：{path}')
        return 0
    manifest = json.loads(Path(args.manifest).read_text(encoding='utf-8'))
    source = Path(manifest['source']).resolve(strict=True)
    if sha(source) != manifest['sha256']:
        raise ValueError('基准原文件已改变，停止校正；请恢复原文件或由用户明确重设基准')
    edit = Path(args.image).resolve(strict=True)
    if args.ignore_mask:
        with Image.open(args.ignore_mask) as m, Image.open(edit) as e:
            if m.size != ImageOps.exif_transpose(e).size:
                raise ValueError('排除蒙版必须与本轮图片尺寸一致')
    outdir = Path(args.out_dir).resolve()
    outdir.mkdir(parents=True, exist_ok=True)
    out = outdir / (edit.stem + '_color-guard.png')
    report = out.with_suffix('.json')
    board = out.with_name(out.stem + '_compare.png')
    if any(p.exists() for p in (out, report, board)) or out in (source, edit):
        raise ValueError('输出已存在或与输入重合；请使用新的版本目录')
    r = {'anchor_sha256': manifest['sha256'], 'input_sha256': sha(edit), 'source': str(source),
         'input': str(edit), 'mode': args.mode}
    if args.mode == 'intentional-grade':
        r.update(status='intentional-skip', reason='本轮有意整体调色，未执行回色；本轮输入即交付候选', output=str(edit))
        write(report, r)
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    with tempfile.TemporaryDirectory(prefix='image-color-guard-') as tmp:
        sn, en = Path(tmp) / 'source.png', Path(tmp) / 'edit.png'
        normalize(source, sn)
        normalize(edit, en)
        # Color transform only; never synthesize identity or texture. No --force-color.
        match = cm.match(sn, en, out, ignore_mask=args.ignore_mask)
        r['correction'] = match
        r['audit'] = audit(sn, en, out, args.ignore_mask)
        r['status'] = r['audit']['status']
        if match.get('action') == 'no-op' and match.get('after') is None:
            r['status'] = 'review'
            r['reason'] = match.get('reason')
        s, _ = load_image(sn)
        e, _ = load_image(en)
        o, _ = load_image(out)
        comparison_board(board, '原色守护 / Fixed-original color guard',
                         '原图 / 本轮输入 / 校正候选；色调检查不替代人脸及纹理验收',
                         [('原色基准', to_pil(s)), ('本轮修改', to_pil(e)), ('校正候选', to_pil(o))])
    # Do not keep dead temporary file paths as purported provenance.
    match['source'], match['edit'], match['route'] = str(source), str(edit), 'fixed-anchor-color'
    r.update(output=str(out), output_sha256=sha(out), comparison=str(board))
    write(report, r)
    print(json.dumps({'status': r['status'], 'audit': r.get('audit'), 'output': str(out), 'report': str(report)}, ensure_ascii=False, indent=2))
    return 0 if r['status'] == 'pass' else 2

if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError, KeyError) as exc:
        print(f'停止：{exc}', file=sys.stderr)
        sys.exit(1)
