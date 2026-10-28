#!/bin/sh
set -eu
TASK_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
TASK_PY=${COLOR_GUARD_PYTHON:-}
if [ -z "$TASK_PY" ]; then
  TASK_RT="${CODEX_HOME:-$HOME/.codex}/skills/repair-ai-image-quality/runtime/bin/python"
  if [ -x "$TASK_RT" ]; then TASK_PY="$TASK_RT"; else TASK_PY=python3; fi
fi
if ! "$TASK_PY" -c 'import numpy, PIL, cv2' >/dev/null 2>&1; then
  echo '缺少 numpy / Pillow / OpenCV；请使用带有依赖的 Python，或在独立环境安装 requirements.txt。未执行校色。' >&2
  exit 1
fi
exec "$TASK_PY" "$TASK_DIR/guard.py" "$@"
