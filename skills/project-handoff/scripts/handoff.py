#!/usr/bin/env python3
"""Cross-platform, explicitly reviewed work summaries; no chat scraping."""
import argparse, datetime as dt, hashlib, json, os, pathlib, re, shutil, subprocess, sys
ROOT = pathlib.Path.home() / '.codex' / 'project-handoff'
FIELDS = {'date','project','summary','decisions','completed','todos','next_step','threads','files','commits','coverage'}
def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd, text=True, stderr=subprocess.PIPE).strip()
def checked(data):
    if not isinstance(data, dict) or set(data) != FIELDS:
        raise ValueError('Record must contain exactly the documented fields')
    dt.date.fromisoformat(data['date'])
    for key in ('project','summary','next_step','coverage'):
        if not isinstance(data[key], str) or not data[key].strip(): raise ValueError('Missing text: '+key)
    for key in ('decisions','completed','todos','threads','files','commits'):
        if not isinstance(data[key], list) or any(not isinstance(v,str) for v in data[key]): raise ValueError('Expected string list: '+key)
    raw=json.dumps(data,ensure_ascii=False,sort_keys=True,indent=2)+'\n'
    patterns=[r'(?i)(api[_ -]?key|password|secret|access[_ -]?token)\s*[=:]\s*\S+',r'sk-[A-Za-z0-9_-]{16,}',r'gh[pousr]_[A-Za-z0-9]{20,}',r'-----BEGIN .*PRIVATE KEY',r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',r'(?<!\d)1[3-9]\d{9}(?!\d)',r'(?i)https?://[^/\s]+:[^/\s]+@']
    if any(re.search(p,raw) for p in patterns): raise ValueError('Sensitive-looking content blocked; redact and review locally')
    for value in data['files']:
        if value.startswith(('/', '\\')) or re.match(r'^[A-Za-z]:',value) or '..' in pathlib.PurePosixPath(value).parts or re.search(r'(?i)(\.env|credentials|id_rsa|\.pem|\.key)',value):
            raise ValueError('Only non-sensitive relative file references allowed')
    for value in data['threads']:
        if not re.match(r'^(https://chatgpt\.com/c/[a-zA-Z0-9-]+|codex://threads/[a-zA-Z0-9-]+)$',value): raise ValueError('Unsupported thread reference')
    for value in data['commits']:
        if not re.fullmatch(r'[0-9a-f]{7,40}',value): raise ValueError('Commit references must be hashes')
    return raw
def config():
    return json.loads((ROOT/'config.json').read_text())
def repository():
    c=config(); repo=c['repository']
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+',repo): raise ValueError('Invalid repository')
    meta=json.loads(run('gh','repo','view',repo,'--json','isPrivate,url'))
    if not meta['isPrivate']: raise ValueError('Private repository required')
    path=pathlib.Path(c['checkout']).expanduser().resolve()
    remote=run('git','remote','get-url','origin',cwd=path)
    if remote not in (meta['url'],meta['url']+'.git','git@github.com:'+repo+'.git'): raise ValueError('Remote mismatch')
    return path

def main():
    p=argparse.ArgumentParser(); s=p.add_subparsers(dest='action',required=True)
    i=s.add_parser('configure'); i.add_argument('--repository',required=True); i.add_argument('--checkout',required=True)
    i=s.add_parser('save'); i.add_argument('--input',required=True); i.add_argument('--reviewed',action='store_true')
    s.add_parser('sync'); i=s.add_parser('resume'); i.add_argument('--project')
    a=p.parse_args(); ROOT.mkdir(parents=True,exist_ok=True)
    if a.action=='configure':
        if (ROOT/'config.json').exists(): raise ValueError('Existing configuration: review before changing')
        (ROOT/'config.json').write_text(json.dumps({'repository':a.repository,'checkout':str(pathlib.Path(a.checkout).resolve())},indent=2))
        try: repository()
        except Exception: (ROOT/'config.json').unlink(); raise
        print('Configured private repository'); return
    if a.action=='save':
        if not a.reviewed: raise ValueError('Review privacy and company confidentiality before --reviewed')
        data=json.loads(pathlib.Path(a.input).read_text(encoding='utf-8')); raw=checked(data)
        # Content-derived names deduplicate retries and permit concurrent device records.
        name=data['date']+'-'+hashlib.sha256(raw.encode()).hexdigest()[:24]+'.json'
        q=ROOT/'queue'; q.mkdir(exist_ok=True); target=q/name
        target.write_text(raw,encoding='utf-8'); print('Queued reviewed record: '+name); return
    lock=ROOT/'operation.lock'
    try: fd=os.open(str(lock),os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    except FileExistsError: raise ValueError('Another operation is running; inspect stale lock before removing')
    os.close(fd)
    try:
        path=repository()
        if run('git','status','--porcelain',cwd=path): raise ValueError('Checkout has local changes; resolve before syncing')
        run('git','pull','--ff-only',cwd=path)
        ahead=run('git','diff','--name-only','@{upstream}..HEAD',cwd=path).splitlines()
        if any(not re.fullmatch(r'records/\d{4}-\d{2}-\d{2}/\d{4}-\d{2}-\d{2}-[0-9a-f]{24}\.json',name) for name in ahead):
            raise ValueError('Unrelated unpushed changes blocked')
        if a.action=='resume':
            records=[]
            for f in sorted((path/'records').glob('*/*.json')):
                data=json.loads(f.read_text(encoding='utf-8')); checked(data)
                if not a.project or data['project']==a.project: records.append(data)
            print(json.dumps(records[-20:],ensure_ascii=False,indent=2)); return
        pending=[]
        for f in sorted((ROOT/'queue').glob('*.json')):
            data=json.loads(f.read_text(encoding='utf-8')); raw=checked(data)
            rel=pathlib.Path('records')/data['date']/f.name; dest=path/rel
            if dest.is_symlink() or dest.parent.is_symlink(): raise ValueError('Symlink blocked')
            if dest.exists() and dest.read_text(encoding='utf-8')!=raw: raise ValueError('Record collision')
            dest.parent.mkdir(parents=True,exist_ok=True); dest.write_text(raw,encoding='utf-8'); pending.append((f,str(rel)))
        if pending:
            run('git','add','--',*[r for _,r in pending],cwd=path)
            if run('git','diff','--cached','--name-only',cwd=path): run('git','commit','-m','Save reviewed project handoff records',cwd=path)
        run('git','push','origin','HEAD',cwd=path)
        for f,_ in pending: f.unlink()
        print('Sync complete; unchanged records do not create commits')
    finally: lock.unlink()
if __name__=='__main__':
    try: main()
    except Exception as e:
        # Do not print subprocess output, which could contain credentials or private data.
        print('Handoff stopped: '+(str(e) if not isinstance(e,subprocess.CalledProcessError) else 'Git/GitHub operation failed; check authentication, network or conflicts locally'),file=sys.stderr); sys.exit(1)
