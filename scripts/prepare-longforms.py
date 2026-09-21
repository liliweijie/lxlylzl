"""Prepare web-sized previews and lossless-order reading segments."""
from pathlib import Path
from PIL import Image, ImageOps
import json

source = Path('/Users/studio/Desktop/jl/sc')
target = Path('assets/longforms')
target.mkdir(parents=True, exist_ok=True)
items = []
for index, path in enumerate(sorted(p for p in source.iterdir() if p.suffix.lower() in ('.jpg', '.png')), 1):
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    width = min(1000, im.width)
    im = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
    prefix = f'{index:02d}'
    preview = im.crop((0, 0, width, min(im.height, width * 4)))
    preview.thumbnail((320, 1280), Image.Resampling.LANCZOS)
    preview.save(target / f'{prefix}-preview.webp', quality=82)
    segments = []
    for part, top in enumerate(range(0, im.height, 3000)):
        segment = im.crop((0, top, width, min(top + 3000, im.height)))
        name = f'{prefix}-{part:02d}.webp'
        segment.save(target / name, quality=86, method=4)
        segments.append({'src': f'assets/longforms/{name}', 'width': width, 'height': segment.height})
    items.append({'title': path.stem, 'preview': f'assets/longforms/{prefix}-preview.webp', 'segments': segments})
Path('js/longform-data.js').write_text('window.LONGFORM_WORKS = ' + json.dumps(items, ensure_ascii=False) + ';\n')
print(f'Prepared {len(items)} longforms')
