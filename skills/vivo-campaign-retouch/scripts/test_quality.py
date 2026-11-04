"""Synthetic checks only. No user images, model calls or network."""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

TOOL = Path(__file__).with_name('quality.py')


def call(*args, code=0):
    p = subprocess.run([sys.executable, str(TOOL), *map(str, args)], capture_output=True, text=True)
    assert p.returncode == code, (p.returncode, p.stdout, p.stderr)
    return p


def test():
    with tempfile.TemporaryDirectory() as tmp:
        d = Path(tmp)
        a = np.full((96, 96, 4), 180, np.uint8)
        a[..., 3] = 255
        Image.fromarray(a).save(d/'base.png')
        m = np.zeros((96, 96), np.uint8)
        m[20:70, 20:70] = 255
        Image.fromarray(m).save(d/'allow.png')
        b = a.copy()
        b[40, 40, 0] = 190
        Image.fromarray(b).save(d/'inside.png')
        def audit(name, code=0, extra=()):
            call('scope', '--source', d/'base.png', '--edit', d/f'{name}.png',
                 '--allow-mask', d/'allow.png', '--report', d/f'{name}.json', *extra, code=code)
            return None if code == 1 else json.loads((d/f'{name}.json').read_text())
        assert audit('inside')['changed_pixels'] == 1
        b[2, 2, 3] = 120
        Image.fromarray(b).save(d/'outside-alpha.png')
        r = audit('outside-alpha', 2)
        assert r['outside_changed_pixels'] == 1 and r['violation_bbox'] == [2,2,3,3]
        Image.fromarray(a).save(d/'identical.png')
        assert audit('identical')['changed_pixels'] == 0
        Image.fromarray(b).save(d/'protected.png')
        r = audit('protected', 2, ('--protect-mask', d/'allow.png'))
        assert r['protected_changed_pixels'] == 1
        Image.fromarray(a[:50]).save(d/'size.png')
        audit('size', 1)
        bad = m.copy()
        bad[30, 30] = 128
        Image.fromarray(bad).save(d/'bad.png')
        call('scope','--source',d/'base.png','--edit',d/'inside.png',
             '--allow-mask',d/'bad.png','--report',d/'bad.json',code=1)
        # Existing reports/inputs cannot be overwritten.
        call('scope','--source',d/'base.png','--edit',d/'inside.png',
             '--allow-mask',d/'allow.png','--report',d/'inside.json',code=1)
        call('texture','--source',d/'base.png','--allow-mask',d/'allow.png',
             '--output',d/'flat-fixed.png','--report',d/'texture.json',
             '--comparison',d/'compare.png')
        t = json.loads((d/'texture.json').read_text())
        assert t['status'] == 'no-op' and t['scope']['changed_pixels'] == 0
        assert np.array_equal(np.array(Image.open(d/'flat-fixed.png')), a)
        # A nonflat candidate still preserves disallowed pixels and alpha exactly.
        y, x = np.mgrid[:96, :96]
        noisy = a.copy()
        noisy[..., :3] = (128 + 20*np.sin(x*1.3)*np.cos(y*1.1))[...,None].astype(np.uint8)
        Image.fromarray(noisy).save(d/'pattern.png')
        p = subprocess.run([sys.executable,str(TOOL),'texture','--source',str(d/'pattern.png'),
                            '--allow-mask',str(d/'allow.png'),'--output',str(d/'pattern-fixed.png'),
                            '--report',str(d/'pattern.json'),'--model','gpt-image-2'],
                           capture_output=True,text=True)
        assert p.returncode in (0,2), p.stderr
        fixed = np.array(Image.open(d/'pattern-fixed.png'))
        assert np.array_equal(fixed[m==0], noisy[m==0])
        assert np.array_equal(fixed[...,3], noisy[...,3])
        call('texture','--source',d/'base.png','--allow-mask',d/'allow.png',
             '--output',d/'base.png','--report',d/'no-overwrite.json',code=1)
        call('texture','--source',d/'base.png','--allow-mask',d/'allow.png',
             '--output',d/'lossy.jpg','--report',d/'lossy.json',code=1)
    print('quality behavioral checks passed')


if __name__ == '__main__':
    test()
