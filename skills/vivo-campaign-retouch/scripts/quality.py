#!/usr/bin/env python3
"""Local scope audit and masked spectral texture candidate. No network or generation."""
import argparse
import hashlib
import io
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageCms


def digest(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def read_png(path):
    with Image.open(path) as im:
        if im.format != 'PNG' or im.mode not in ('RGB', 'RGBA'):
            raise ValueError('Use RGB/RGBA PNG in a shared sRGB working space.')
        if im.getexif().get(274, 1) != 1:
            raise ValueError('Normalize EXIF orientation before scope/texture operations.')
        icc = im.info.get('icc_profile')
        if icc and 'srgb' not in ImageCms.getProfileDescription(
                ImageCms.ImageCmsProfile(io.BytesIO(icc))).lower():
            raise ValueError('Convert both inputs to sRGB before pixel comparisons.')
        return np.array(im.convert('RGBA')), im.mode, icc


def mask(path, shape):
    with Image.open(path) as im:
        if im.mode != 'L' or im.size != (shape[1], shape[0]):
            raise ValueError('Mask must be L mode, same canvas, binary 0/255.')
        a = np.array(im)
    if not np.isin(a, (0, 255)).all():
        raise ValueError('Use a binary allowed-support mask including feather margins.')
    return a == 255


def bbox(m):
    y, x = np.where(m)
    return None if len(x) == 0 else [int(x.min()), int(y.min()), int(x.max()+1), int(y.max()+1)]


def scope(source, edited, allowed, protected=None):
    a, _, _ = read_png(source)
    b, _, _ = read_png(edited)
    if a.shape != b.shape:
        raise ValueError('Canvas sizes differ. Align to the final canvas first.')
    permitted = mask(allowed, a.shape)
    changed = np.any(a != b, axis=2)
    outside = changed & ~permitted
    locked = np.zeros_like(changed) if not protected else mask(protected, a.shape)
    violation = changed & locked
    return {
        'status': 'review' if outside.any() or violation.any() else 'pass',
        'meaning': 'Exact decoded RGBA scope only. Not an image-quality or color verdict.',
        'size': [a.shape[1], a.shape[0]],
        'changed_pixels': int(changed.sum()),
        'outside_changed_pixels': int(outside.sum()),
        'protected_changed_pixels': int(violation.sum()),
        'violation_bbox': bbox(outside | violation),
        'source_sha256': digest(source), 'edit_sha256': digest(edited),
        'allowed_mask_sha256': digest(allowed),
        'protected_mask_sha256': digest(protected) if protected else None,
    }


def fresh(paths, inputs):
    outputs = [Path(p).resolve() for p in paths if p]
    if len(set(outputs)) != len(outputs):
        raise ValueError('Output paths must be distinct.')
    for p in outputs:
        if p.exists() or p in {Path(i).resolve() for i in inputs if i}:
            raise ValueError('Use new output files; overwriting inputs/results is disabled.')
        p.parent.mkdir(parents=True, exist_ok=True)


def texture(args):
    sys.path.insert(0, str(Path(__file__).resolve().parent / 'vendor'))
    import gpt_demaze as maze
    from common import comparison_board
    original, mode, icc = read_png(args.source)
    allowed = mask(args.allow_mask, original.shape)
    if not allowed.any():
        raise ValueError('Texture allowed mask is empty.')
    if not 0 <= args.strength <= 60:
        raise ValueError('Strength must be between 0 and 60.')
    if Path(args.output).suffix.lower() != '.png':
        raise ValueError('Texture output must be PNG to preserve alpha and exact protected pixels.')
    fresh([args.output, args.report, args.comparison], [args.source, args.allow_mask])
    rgb = original[..., :3].astype(np.float32) / 255
    # No downloaded model weights; vendor automatically selects its spectral fallback.
    corrected, detection, _ = maze.process(
        rgb, {'camera': None}, args.source, args.strength, False,
        (~allowed).astype(np.float32), args.model)
    result = original.copy()
    result[..., :3][allowed] = np.clip(np.rint(corrected[allowed] * 255), 0, 255).astype(np.uint8)
    output = Image.fromarray(result).convert(mode)
    output.save(args.output, **({'icc_profile': icc} if icc else {}))
    report = {'status': 'review' if detection['action'] != 'no-op' else 'no-op',
              'meaning': 'Texture candidate requires visual review. Detection is not universal.',
              'implementation': 'bundled spectral fallback, no neural weights',
              'detection': detection,
              'scope': scope(args.source, args.output, args.allow_mask),
              'output_sha256': digest(args.output)}
    if args.comparison:
        comparison_board(args.comparison, 'Texture candidate / inspect original and edited',
                         'Review material, labels and boundaries at 100%',
                         [('Original', Image.fromarray(original).convert('RGB')),
                          ('Candidate', output.convert('RGB'))])
    return report


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest='command', required=True)
    p = sub.add_parser('scope')
    p.add_argument('--source', required=True)
    p.add_argument('--edit', required=True)
    p.add_argument('--allow-mask', required=True)
    p.add_argument('--protect-mask')
    p.add_argument('--report', required=True)
    p = sub.add_parser('texture')
    p.add_argument('--source', required=True)
    p.add_argument('--output', required=True)
    p.add_argument('--allow-mask', required=True)
    p.add_argument('--strength', type=float, default=35)
    p.add_argument('--model', help='Only pass known image model provenance, e.g. gpt-image-2')
    p.add_argument('--report', required=True)
    p.add_argument('--comparison')
    a = ap.parse_args()
    if a.command == 'scope':
        fresh([a.report], [a.source, a.edit, a.allow_mask, a.protect_mask])
        r = scope(a.source, a.edit, a.allow_mask, a.protect_mask)
    else:
        r = texture(a)
    Path(a.report).write_text(json.dumps(r, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps(r, ensure_ascii=False, indent=2))
    return 2 if r['status'] == 'review' else 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
