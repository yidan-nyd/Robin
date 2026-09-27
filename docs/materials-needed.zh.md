# ROBIN 待补材料清单

> 目标不是把页面塞满，而是为每个关键判断补上证据。优先完成 P0；没有数据时明确写“待验证”，不要虚构指标。

## P0｜发布详情页前必须补齐

### 1. 项目事实与个人贡献

- [ ] 确认项目时间、7 人团队的专业构成和合作方式；
- [ ] 用 3–5 条动词句明确个人独立负责、共同完成和仅提出方向的内容；
- [ ] 保留能证明团队协作的计划、评审或版本记录；
- [ ] 确认所有工具、模型和硬件名称，删除未实际使用项。

### 2. 首屏与整体成果

- [ ] `assets/hero/01-hero-robin-in-context.webp`：真实环境中的机器人主视觉；
- [ ] `assets/prototype/01-hero-demo.mp4`：10–20 秒真实演示；
- [ ] `assets/prototype/02-project-evidence.webp`：实物、CV、语音与 App 四宫格；
- [ ] 一张可说明最终形态的总览图，但必须区分渲染与实物。

### 3. CV 专业证据

- [ ] 数据集规模、类别、来源、标注方式、版本和使用许可；
- [ ] train/validation/test 划分方法；
- [ ] 训练配置、模型版本、导出与部署路径；
- [ ] Precision、Recall、mAP、混淆矩阵等真实结果；
- [ ] 设备端延迟、模型大小、内存等测试条件和结果；
- [ ] 成功、低置信、多目标、误检、漏检、无检测案例；
- [ ] 至少一轮“失败发现 → 数据/模型修改 → 复测”的闭环。

### 4. LLM 与语音专业证据

- [ ] 实际模型或服务、上下文组成和提示词版本；
- [ ] 3–5 组真实对话录屏或日志；
- [ ] 没有传感数据、对象不明确、动作未支持时的拒答/恢复案例；
- [ ] 延迟、断网或服务失败时的体验处理；
- [ ] Persona 与事实边界如何分离的说明。

### 5. 系统集成真实性

- [ ] 一张架构图，用实线/虚线/浅灰分别标识 Demonstrated / Designed / Future；
- [ ] 两块开发板、App、云服务或桥接层的真实连接关系；
- [ ] CV 输出到 Agent 上下文的数据结构样例；
- [ ] 当前端到端链路中实际完成和仍待联调的节点；
- [ ] 失败、重试、过期与跨端同步的状态定义。

### 6. 产品与用户证据

- [ ] 用户研究对象、方法、样本量和原始记录；
- [ ] 2–3 条能支撑问题定义的匿名原话；
- [ ] 替代方案或竞品比较依据；
- [ ] 一条完整用户旅程：触发问题 → 观察 → 建议 → 行动 → 验证；
- [ ] 至少 3–5 位目标用户的任务测试及修改记录；
- [ ] 不使用虚构商业数字；若呈现商业模式，标注假设与待验证项。

## P1｜让案例从“项目”升级为“系统能力”

- [ ] 五到六个 AI 模式的 Figma 组件和完整状态；
- [ ] Evidence Card 与 AI Recommendation 的字段规范；
- [ ] 风险分级和自动化决策表；
- [ ] AI Experience Scorecard 的一次真实填写样例；
- [ ] 服务蓝图或跨触点状态图；
- [ ] Observe / Assist / Act / Learn 路线图与每阶段验证指标；
- [ ] 能体现跨团队推动作用的设计评审、接口协商或决策记录。

## P2｜视觉完成度与可信度

- [ ] 统一图片比例、背景、色彩和标题层级；
- [ ] 过程图只保留能解释决策变化的版本，避免“工具流水账”；
- [ ] 每张渲染图、照片、数据集与第三方代码补齐来源和许可；
- [ ] 视频增加字幕、状态说明和无声浏览能力；
- [ ] 中英文事实、时间、角色和成熟度保持一致。

## 推荐文件命名与位置

| 页面章节 | 推荐素材 |
| --- | --- |
| 01 Hero | `assets/hero/01-hero-robin-in-context.webp` |
| 02 Overview | `assets/prototype/02-project-evidence.webp` |
| 03 Problem | `assets/validation/03-user-context.webp`、`assets/diagrams/03-fragmented-tools.webp` |
| 05 Ecosystem | `assets/diagrams/05-product-ecosystem.webp` |
| 06 Architecture | `assets/diagrams/06-ai-system-architecture.webp` |
| 07 CV | `assets/validation/07-cv-workflow.webp`、`07-detection-results.webp` |
| 08 LLM | `assets/diagrams/08-agent-context.webp`、`assets/validation/08-grounded-dialogue.webp` |
| 09–10 Assets | `assets/prototype/09-interaction-principles.webp`、`10-ai-pattern-library.webp` |
| 11 Workflow | `assets/diagrams/11-ai-native-workflow.webp` |
| 12 Prototype | `assets/prototype/12-hardware-process.webp` |
| 13 Validation | `assets/validation/13-test-matrix.webp`、`13-failure-iteration.webp` |
| 14 Outcome | `assets/hero/14-outcome.webp` |

## 发布前证据审计

对页面中的每一句成果描述逐条回答：证据文件在哪里；它证明了什么；它不能证明什么；这是个人贡献、团队贡献还是第三方基础。不能回答的句子应改为设计目标、假设或下一步，而不是既成事实。
