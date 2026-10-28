---
name: image-color-guard
description: "Use for every image modification, retouch, image-to-image regeneration, clothing/background edit, restoration or upscale. Keep a fixed original color anchor; check and correct cumulative darkening, desaturation, gray cast and tone drift after each edit. 用户要求每次改图默认调用，防止越改越灰、越改越深。"
---

# 图片原色守护

每次修改图片都调用，包括内置生图、局部重绘、修复和放大。此 Skill 是编辑前后的色调关卡，不是生图模型或后台自动钩子。不承诺单凭提示词阻止模型漂移。

## 固定基准

- 首次读取项目/素材库已确认的原色主图；没有时用当前任务开始前的原图。多张候选无法判断时才询问。不得把最新图或上一次变灰的图自动当原色标准。
- 用 `init` 固定路径和 SHA-256；后续每轮复用清单。不要自动更换它。改图参考可用上一轮确认图，但色调参考始终是固定原图。
- 新场景/新构图可能无法对齐：仍检查并说明不可自动回色，不按整图直方图硬拉亮。用户明确确认新光线/色调后，另建版本基准。

## 每轮编辑

1. 将固定原色图作为“颜色/明暗参考”，本轮图作为“编辑对象”，明确两张图的职责。按图像工具要求先查看本地参考图。只传任务需要且用户授权的图片，不为校色上传私人库。
2. 保留用户请求的修改。提示词加入 [中文解析/说明.md](中文解析/说明.md) 的原色锁定段；用户指定“电影级画质”时保留其原文，但明确它不授权压暗、降饱和或加灰雾。
3. 生图后运行本包 `guard.py check`，本地校正并与固定原图比。绝不通过再次生成整张图来“回色”。本包自带校色实现，不依赖特定生图服务或 API 密钥。
4. 查看对比图，检查人物、肤色、衣物、背景；查看报告 `audit.before/after` 的明度、彩度、对比度及色差。不要用整图白底掩盖主体变灰。`pass` 只代表可对照区域色调通过，不表示脸、手或迷宫纹已修好。
5. `review` / 无法对齐 / 样本不足 / 变换过大时，不声称修复成功。检查原因，最多一次针对性的蒙版或基准输入修正后重跑；仍不可靠则保留候选并报告局限，不无限重生、不直接提升饱和度或强制校色。输出不覆盖原图，下一轮编辑使用验收后的校正图，原色基准仍不变。

## 本地运行

需要 Python、numpy、Pillow、OpenCV。优先复用已验证包含这些包的现有环境；缺包时明确说明。需要独立环境时运行 `python3 -m venv <venv>`，再用该环境的 `pip install -r scripts/requirements.txt`；不要无声安装到全局 Python。没有远程依赖。

```bash
python <skill>/scripts/guard.py init --source /absolute/original.png --manifest /absolute/color-anchor.json
python <skill>/scripts/guard.py check --manifest /absolute/color-anchor.json --image /absolute/edit.png --out-dir /absolute/round-02
```

也可用 `bash <skill>/scripts/run.sh init|check ...`，启动器优先复用已有 repair-ai-image-quality 的运行环境，不自动安装依赖。

输出校正 PNG、JSON 和三栏对比图。退出码 `0`=色调通过/有意调色跳过，`2`=需要复核，`1`=输入或执行错误。读取 JSON 的 status，不能只凭退出码判定已校色。

换衣颜色/换背景时，可用与本轮图同尺寸的 `--ignore-mask`（白=有意修改区域，黑=用于校色）防止新颜色被当漂移；蒙版排除拟合与验收样本，并不承诺修改区像素完全不变，仍须目视检查。有意整体调色、变为夜景等用 `--mode intentional-grade` 记录跳过回色，保留旧基准；不要因“电影感”“精修”自行选该模式。

完整规则、边界和示例见 [中文说明](中文解析/说明.md)；机器可读流程示例见 [workflow.json](examples/workflow.json)。第三方来源与许可见 [NOTICE](NOTICE)。
