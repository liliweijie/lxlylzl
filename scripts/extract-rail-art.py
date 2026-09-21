"""Extract the supplied pixel wordmark and outline its font-based loading label."""
import sys
sys.path.insert(0, '/tmp/lx-fonttools')
import copy
import xml.etree.ElementTree as ET
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
source = ET.parse('/Users/studio/Desktop/jl/SVG/1.svg').getroot()
art = next(e for e in source.iter() if e.tag == f'{{{NS}}}g' and e.get('class') == 'cls-23')
root = ET.Element(f'{{{NS}}}svg', {'viewBox': '1880 515 40 270'})
root.append(copy.deepcopy(source.find(f'{{{NS}}}defs')))
root.append(copy.deepcopy(art))
ET.ElementTree(root).write('assets/rail-signature.svg', encoding='unicode')

font = TTFont('/Users/studio/Library/Fonts/BaDingShiWeiTi-16.ttf')
glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
units = font['head'].unitsPerEm
root = ET.Element(f'{{{NS}}}svg')
group = ET.SubElement(root, f'{{{NS}}}g', {'fill': '#f24c30', 'transform': f'translate(0 {units}) scale(1 -1)'})
x = 0
for char in '载入像素中...':
    name = cmap[ord(char)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    ET.SubElement(group, f'{{{NS}}}path', {'d': pen.getCommands(), 'transform': f'translate({x} 0)'})
    x += font['hmtx'][name][0]
root.set('viewBox', f'0 0 {x} {units * 1.25}')
ET.ElementTree(root).write('assets/rail-loading.svg', encoding='unicode')
