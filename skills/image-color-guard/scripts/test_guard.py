"""Offline behavioral tests with synthetic images; no credentials or personal media."""
import json
import subprocess
import sys
import tempfile
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent / 'vendor'))
from common import rgb_to_lab, lab_to_rgb

GUARD = Path(__file__).with_name('guard.py')

def call(*args, code=0):
    r = subprocess.run([sys.executable, str(GUARD), *map(str, args)], capture_output=True, text=True)
    assert r.returncode == code, (r.returncode, r.stdout, r.stderr)
    return r

def save(path, x):
    Image.fromarray(np.uint8(np.clip(x, 0, 1) * 255 + .5)).save(path)

def test():
    with tempfile.TemporaryDirectory() as tmp:
        d = Path(tmp)
        rng = np.random.default_rng(20261028)
        h, w = 384, 512
        x = np.ones((h, w, 3), np.float32) * .97
        # Many colors, strong structure, smooth gradients, texture, white studio margin.
        for row in range(3):
            for col in range(5):
                y, z = 30 + row * 105, 35 + col * 90
                color = rng.uniform(.18, .78, 3)
                block = np.ones((85, 72, 3)) * color
                block += np.linspace(-.08, .08, 85)[:, None, None]
                block += rng.normal(0, .012, block.shape)
                x[y:y+85, z:z+72] = block
        source, anchor = d/'source.png', d/'anchor.json'
        save(source, x)
        call('init', '--source', source, '--manifest', anchor)
        call('init', '--source', source, '--manifest', anchor, code=1)
        def check(img, name, code=0, extra=()):
            call('check', '--manifest', anchor, '--image', img, '--out-dir', d/name, *extra, code=code)
            return json.loads((d/name/(img.stem+'_color-guard.json')).read_text())
        r = check(source, 'same')
        assert r['status'] == 'pass'
        out = np.array(Image.open(r['output']).convert('RGB'))
        assert np.array_equal(out, np.array(Image.open(source).convert('RGB')))
        # Global drift: darkening plus chroma loss must improve, same anchor every round.
        lab = rgb_to_lab(x)
        for i in (1, 2):
            v = lab.copy()
            v[..., 0] -= 2 * i
            v[..., 1:] *= 1 - .04 * i
            image = d/f'drift-{i}.png'
            save(image, lab_to_rgb(v))
            r = check(image, f'fixed-{i}')
            b, a = r['audit']['before'], r['audit']['after']
            assert abs(a['delta_L_median']) < abs(b['delta_L_median']), r
            assert abs(a['chroma_ratio']-1) < abs(b['chroma_ratio']-1), r
            assert a['deltaE00_mean'] < b['deltaE00_mean'] * .7, r
        # A deliberate local garment recolor must not be driven back to its old hue.
        changed = x.copy()
        changed[135:220, 125:197] = [.8, .16, .12]
        p = d/'recolor.png'
        save(p, changed)
        mask = np.zeros((h, w), np.uint8)
        mask[130:225, 120:202] = 255
        Image.fromarray(mask).save(d/'mask.png')
        r = check(p, 'recolor', extra=('--ignore-mask', d/'mask.png'))
        out = np.array(Image.open(r['output']).convert('RGB')) / 255
        assert np.max(np.abs(out[155:200, 140:180] - changed[155:200, 140:180])) < .03
        r = check(p, 'intentional', extra=('--mode', 'intentional-grade'))
        assert r['status'] == 'intentional-skip' and r['output'] == str(p.resolve())
        unrelated = d/'unrelated.png'
        save(unrelated, rng.random(x.shape))
        assert check(unrelated, 'unrelated', code=2)['status'] == 'review'
        # Preserve alpha while correcting tone in opaque content.
        rgba = np.dstack([np.uint8(np.clip(x, 0, 1)*255+.5), np.full((h,w),255,np.uint8)])
        rgba[:20,:,3] = 0
        transparent = d/'alpha.png'
        Image.fromarray(rgba).save(transparent)
        r = check(transparent, 'alpha')
        assert np.array_equal(np.array(Image.open(r['output']))[...,3], rgba[...,3])
        # Anchor mutation is a hard stop rather than silent reference replacement.
        save(source, x * .9)
        call('check', '--manifest', anchor, '--image', p, '--out-dir', d/'tamper', code=1)
        print('PASS: identity, two drift rounds, intended recolor, intended grade, alignment rejection, immutable anchor')

if __name__ == '__main__':
    test()
