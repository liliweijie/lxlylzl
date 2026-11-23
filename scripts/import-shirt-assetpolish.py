"""Import CC0 vector files from an official AssetPolish selection ZIP."""

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
import zipfile


CC0 = "https://creativecommons.org/publicdomain/zero/1.0/"
CATALOG = "https://www.assetpolish.com/assets/"
SVG_LIMIT = 350_000
MANIFEST_LIMIT = 2_000_000
DEFAULT_OUTPUT = Path(__file__).resolve().parents[1] / "lib/shirt-assetpolish-vectors.json"
VECTOR_TAGS = {"path", "rect", "circle", "ellipse", "polygon", "polyline", "line"}
EXCLUDED_TAGS = {"image", "feimage", "img", "foreignobject", "script"}


def read_manifest(archive):
    manifest = next(
        (entry for entry in archive.infolist() if PurePosixPath(entry.filename).name.lower() == "sources.json"),
        None,
    )
    if manifest is None or manifest.file_size > MANIFEST_LIMIT:
        raise ValueError("The official ZIP must include a readable SOURCES.json")
    data = json.loads(archive.read(manifest))
    if isinstance(data, dict):
        data = data.get("assets", data.get("sources", data.get("files", data)))
    if isinstance(data, dict):
        data = [{"file": filename, **item} for filename, item in data.items() if isinstance(item, dict)]
    result = {}
    if not isinstance(data, list):
        return result
    for item in data:
        if not isinstance(item, dict):
            continue
        file = next((item.get(field) for field in ("file", "filename", "fileName", "path", "svg") if item.get(field)), None)
        if isinstance(file, str) and file.lower().endswith(".svg"):
            result[file] = item
    return result


def is_cc0(item):
    for field in ("license", "licenseUrl", "license_url", "licenseCode"):
        value = item.get(field, "")
        if isinstance(value, dict):
            if is_cc0(value):
                return True
            value = value.get("id") or value.get("code") or value.get("url") or value.get("name", "")
        if isinstance(value, str) and re.fullmatch(r"CC0([ -]1\.0)?( Universal)?|https://creativecommons\.org/publicdomain/zero/1\.0/?", value.strip(), re.I):
            return True
    return False


def read_artwork(archive, entry, metadata):
    svg = archive.read(entry).decode("utf-8-sig")
    if re.search(r"<!ENTITY|data\s*:\s*image/", svg, re.I):
        return None
    root = ET.fromstring(svg)
    names = {node.tag.rsplit("}", 1)[-1].lower() for node in root.iter()}
    if root.tag != "{http://www.w3.org/2000/svg}svg" or not names & VECTOR_TAGS or names & EXCLUDED_TAGS:
        return None
    name = PurePosixPath(entry.filename)
    words = re.findall(r"[a-zA-Z0-9]+", name.stem.replace("_", " "))
    title = metadata.get("title") or metadata.get("name")
    tags = metadata.get("tags") or metadata.get("keywords") or []
    if isinstance(tags, str):
        tags = tags.split(",")
    tags = [value.strip() for value in tags if isinstance(value, str) and value.strip()] if isinstance(tags, list) else []
    category = metadata.get("collection") or metadata.get("category")
    if isinstance(category, str):
        tags.append(category)
    source_url = metadata.get("sourceUrl") or metadata.get("source_url") or ""
    source = urlsplit(source_url) if isinstance(source_url, str) else None
    if not source or source.scheme != "https" or source.netloc != "www.assetpolish.com":
        source_url = CATALOG
    row = {
        "id": "assetpolish:" + hashlib.sha256(svg.encode("utf-8")).hexdigest()[:20],
        "title": title[:120] if isinstance(title, str) else " ".join(words).title(),
        "tags": list(dict.fromkeys(tags + words))[:16],
        "source": "AssetPolish", "sourceUrl": source_url, "license": "CC0 1.0", "licenseUrl": CC0,
        "svg": svg,
    }
    creator = metadata.get("author") or metadata.get("creator")
    if isinstance(creator, str):
        row["creator"] = creator[:120]
    return row


def import_archive(path):
    with zipfile.ZipFile(path) as archive:
        manifest = read_manifest(archive)
        files = [entry for entry in archive.infolist() if entry.filename.lower().endswith(".svg")]
        if len(files) > 4_000 or sum(entry.file_size for entry in files) > 60_000_000:
            raise ValueError("Select a smaller group of SVGs from the official catalog")
        result = {}
        for entry in files:
            metadata = manifest.get(entry.filename) or manifest.get(PurePosixPath(entry.filename).name)
            if metadata is None or not is_cc0(metadata) or entry.file_size > SVG_LIMIT:
                continue
            try:
                row = read_artwork(archive, entry, metadata)
            except (ET.ParseError, UnicodeDecodeError, ValueError):
                continue
            if row is not None:
                result[row["id"]] = row
        if not result:
            raise ValueError("No SVGs with a matching CC0 entry in SOURCES.json were found")
        return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("zip", type=Path, nargs="+")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    vectors = {}
    for path in args.zip:
        vectors.update(import_archive(path))
    args.output.write_text(json.dumps(list(vectors.values()), ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Indexed {len(vectors)} AssetPolish CC0 SVGs")


if __name__ == "__main__":
    main()
