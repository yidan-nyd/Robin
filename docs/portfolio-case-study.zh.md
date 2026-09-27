# ROBIN 个人网站详情页展示文档

> 页面定位：以最终成果和开发实践为主，以图片、视频和原型证据推动叙事。正文只保留结论；系统原理、技术复现和设计原则链接至 GitHub 专项文档。`【配图】`后的 PDF 页码为旧项目 PPT 的素材来源，仅供制作页面时参考，不建议显示在正式网站中。

---

## 01｜Hero

# ROBIN

## An AI-native growing companion

ROBIN 将计算机视觉、对话智能与移动机器人连接起来，帮助种植者观察现场、理解植物，并把建议转化为清晰的下一步。

`AI Agent · Computer Vision · Robotics · Product Strategy · Human-AI Interaction`

**我的角色**

团队负责人 / 产品策略 / AI 交互架构 / 机器人原型 / CV 部署 / 跨专业协作

【配图｜全屏主视觉】

- 优先：机器人实物与真实种植环境，参考 PDF 第 73 页。
- 备选：环境效果图，参考 PDF 第 74–75 页；页面上标注 `Concept visualisation`。
- 可叠加一段 10–15 秒原型视频：移动、识别、OLED 表情与语音反馈。

---

## 02｜Overview

### 从机器人概念到可验证的 AI 产品原型

| 项目 | 内容 |
| --- | --- |
| 时间 | 2025–2026（按实际时间确认） |
| 团队 | 7 人跨学科团队 |
| 场景 | 家庭种植与小型社区种植环境 |
| 技术 | ESP32-S3、Swift-YOLO、LLM 对话、嵌入式视觉 |
| 产出 | 机器人原型、设备端作物识别、语音硬件、App 体验与系统架构 |

【配图｜成果四宫格】

1. 机器人实物：PDF 第 62、73 页；
2. CV 识别过程：PDF 第 64–65 页；
3. 语音硬件：PDF 第 66 页；
4. App / Dashboard：PDF 第 79、101–103 页。

---

## 03｜Opportunity

### 用户缺少的不是更多知识，而是把现场变化转化为行动的能力

在社区花园和小型种植环境的调研中，我们发现：经验丰富的种植者依靠持续观察理解植物，而初学者往往不知道应该观察什么。ROBIN 因此不以“替人种植”为目标，而是让现场状态更容易被看见、解释和行动。

> **Observe → Understand → Decide → Act → Learn**

【配图 A｜实地研究照片】

- Robin Hood Community Garden：PDF 第 28 页；
- Warren Forest Garden：PDF 第 29 页；
- Mandala Garden：PDF 第 30 页。

【配图 B｜一句研究证据】

> “It’s just about observing and watching.”

来源：PDF 第 28 页。建议与现场照片组合，不再展示完整 Persona、PESTLE 或 SWOT。

---

## 04｜Product System

### 一个产品，三个相互连接的触点

**Robot** 在现场移动、观察并提供即时反馈。<br>
**App** 保存植物档案、观察记录、建议与任务状态。<br>
**AI Service** 连接视觉结果、用户问题与知识，并根据风险决定建议、确认或停止。

```text
Perceive → Interpret → Recommend → Confirm → Act → Verify
```

【配图 A｜产品生态】

- 可重画 PDF 第 77–78 页的 Platform Ecosystem Map；
- 删除旧图中尚未实现的 Disease Detection、Harvest Prediction、Carbon Estimation 等能力；
- 用实线、虚线和浅灰区分 Demonstrated / Designed / Future。

【配图 B｜三个触点】

- 机器人：PDF 第 73 页；
- App：PDF 第 102 页；
- Web Dashboard：PDF 第 101 或 103 页。

详细架构放在 GitHub README 与 Capability Map，网站正文不展开技术规则。

---

## 05｜Hardware Development

### 从形态探索到可工作的机器人

我将机器人的视觉形态、机械结构、电子硬件与互动方式并行推进，通过小步原型不断检查装配、移动和场景适应性。

【配图｜横向开发时间线】

1. Sketching：PDF 第 59 页；
2. 3D Modelling：PDF 第 60 页；
3. Rendering：PDF 第 61 页；
4. Assembly：PDF 第 62 页；
5. Servo Control & Motion Planning：PDF 第 63 页；
6. Field Prototype：PDF 第 73 页。

图片下只使用短标签，例如 `Sketch / CAD / Assembly / Motion Test / Field Prototype`。

【配图｜形态决策图，可选】

参考 PDF 第 56 页，将六足、轮式、固定传感器、无人机和 App 重画成简洁对比表。结论只保留一句：

> 六足结构被选中，是因为它能够在不规则种植环境中维持稳定，并为摄像头和未来模块提供移动载体。

---

## 06｜Computer Vision

### 将自有作物数据训练为设备端识别能力

我参与建立了从图像采集、标注、训练、导出到设备部署的 CV 工作流，并将作物识别结果定义为后续对话系统可以读取的结构化观察。

【配图 A｜CV 工作流】

参考 PDF 第 64–65 页，排列为：

```text
Collect → Label → Train → Export → Deploy → Detect
```

【配图 B｜真实输出】

- 设备识别截图；
- 成功、低置信、多目标和无检测案例；
- 有真实数据后再补模型指标与设备端延迟。

**发布前核实**：旧 PPT 标注 `YOLOv8`，当前仓库使用 `Swift-YOLO`。必须根据训练文件和实际部署记录统一名称；不要在页面中同时出现两个未经解释的模型名称。

---

## 07｜Conversational AI

### 让机器人能够交流，也能够承认自己不知道

语音原型完成了麦克风、扬声器、OLED、联网服务和 Robin Persona 的连接。对话被限制在真实可用的数据和设备能力之内：没有传感器信息时，系统不会生成虚假的实时状态。

【配图 A｜语音硬件】

参考 PDF 第 66 页：接线图、固件烧录、Agent 设置和实物对话。

【配图 B｜对话对比】

```text
用户：今天土壤湿度怎么样？
Robin：我还没有收到土壤湿度数据。你可以提供测量结果，或先检查土壤的干湿情况。
```

页面只展示一组正确示例；Prompt、数据边界和异常处理规则链接至 GitHub 技术文档。

---

## 08｜Interface

### 把识别结果变成用户能够理解和控制的任务

App 负责承接机器人无法在现场完整表达的信息：观察来自哪里、AI 为什么这样建议、下一步需要谁确认，以及行动完成后发生了什么。

【配图｜界面组图】

- 设计界面总览：PDF 第 79 页；
- Beneficiary Web Dashboard：PDF 第 101 页；
- App Dashboard：PDF 第 102 页；
- Customer Dashboard 可作为早期业务探索：PDF 第 103 页，不进入主用户流程；
- 社区与知识界面：PDF 第 105 页，可放在扩展体验中。

正式网站优先展示 4 个关键页面：

1. Current Observation；
2. Evidence & Recommendation；
3. Confirm Before Action；
4. History & Result。

---

## 09｜Prototype Strategy

### 分开验证高风险能力，再连接完整体验

ROBIN 没有用一段概念视频掩盖所有问题，而是把原型拆成四条可验证路径：

- **Robot**：形态、装配和运动；
- **Vision**：数据、训练和设备端识别；
- **Voice**：硬件连接、Persona 和数据边界；
- **Interface**：证据、建议、确认和历史记录。

【配图｜Prototype Matrix】

使用 PDF 第 62–66、73、79 页中的实物和截图组成 2×2 网格。每张图片只标注：`Question / Prototype / Evidence / Next`。

【状态标签】

- **Demonstrated**：语音硬件、OLED、设备端作物识别、机器人实体原型；
- **Designed**：CV-to-dialogue 桥接、风险确认、跨触点同步；
- **Future**：传感器、自动浇水、实体任务与长期学习。

旧 PPT 第 57、68 页只能作为早期产品设想参考，其中“全部已经实现”和自主执行相关表述不直接引用。

---

## 10｜Outcome & Role

### 我交付的不只是一个机器人外形，而是一套能够继续发展的产品基础

- 推进机器人从概念、建模到实体原型；
- 建立 CV 数据与设备部署工作流；
- 完成语音交互硬件与 Agent Persona 原型；
- 设计机器人、App 与 AI 服务之间的产品关系；
- 在 7 人跨学科团队中连接技术、设计和业务决策。

【配图 A｜最终成果】

以 PDF 第 73 页实物为核心，组合第 65 页 CV、第 66 页语音硬件和第 102 页 App。

【配图 B｜我的贡献，可选】

- 团队与分工来源：PDF 第 2 页；
- 跨专业协作和决策框架：PDF 第 125 页；
- 系统化产品思维反思：PDF 第 126 页。

页面结尾短句：

> ROBIN 让我从单一产品设计走向系统设计：理解硬件、模型、数据和服务如何共同形成一段可信的用户体验。

---

## 页面末尾

- View Technical Repository
- Read System Architecture
- Read AI Interaction Principles
- View Prototype Video
- Next Project

---

## PPT 素材引用索引（制作备注，不放入正式网站）

| 网站区块 | 推荐引用页 | 使用方式 |
| --- | --- | --- |
| Hero | 73–75 | 73 为实物证据；74–75 标注概念效果图 |
| Overview | 62、64–66、73、79、101–103 | 成果四宫格 |
| Research | 27–30 | 访谈结论与实地照片，优先 28–30 |
| Product System | 77–79 | 重画架构，不直接沿用未实现能力 |
| Hardware | 56、59–63、73 | 决策、建模、装配、运动与实物 |
| CV | 64–65 | 数据采集、标注、训练和设备识别 |
| Conversational AI | 66 | 接线、烧录、Agent 与对话实物 |
| Interface | 79、101–103、105 | App、Web 和扩展触点 |
| Prototype Strategy | 57、62–66、68、73、79 | 只取图片；按当前成熟度重新标注 |
| Role & Outcome | 2、73、125–126 | 个人贡献、团队协调与系统思维 |

## 详细内容保留位置

- AI 产品逻辑与成熟度：`README.zh.md`
- 技术实现与复现：`docs/technical/implementation-guide.zh.md`
- AI 能力地图：`docs/product/capability-map.zh.md`
- 交互原则与模式：`design-assets/ai-patterns/interaction-principles.zh.md`
- 体验评估方法：`design-assets/evaluation/ai-experience-scorecard.zh.md`
