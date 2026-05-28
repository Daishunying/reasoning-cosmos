# Reasoning Cosmos
https://github.com/user-attachments/assets/c5d0d1b0-3e70-4b96-a2dc-5731f543adc1


> 重新定义 AI 的等待体验。

一个将 AI 推理过程空间化、可视化、可交互化的认知宇宙系统，让等待不仅有趣可玩而且贴合AI的思考过程。
传统的loading UI的缺点：

- 等待漫长没有交互
- 不知道AI当前在做什么
- 不知道reasoning 是否稳定

因此，Reasoning Cosmos 尝试探索一种新的 AI UX：

# 可探索的认知空间（Cognitive Universe）

用户不再被动等待AI

而是：

进入 AI 的认知过程，以游戏的方式参与推理
同时满足
| 用户类型          | 感受                                    |
| ------------- | ------------------------------------- |
| AI researcher | 能看到 telemetry/cognition abstraction |
| engineer      | 能看到 system design                     |
| 普通用户          | 也觉得“有趣”“酷”“沉浸”                        |



# 在线体验

https://reasoning-cosmos-jflw.vercel.app/

# 项目架构

```text
reasoning-cosmos/
│
├── app/
│   └── page.tsx
│
├── components/
│   ├── cosmos/
│   │   ├── QueryCore.tsx
│   │   ├── ExploringField.tsx
│   │   ├── ConflictField.tsx
│   │   ├── VerificationField.tsx
│   │   ├── Starfield.tsx
│   │   └── CameraRig.tsx
│   │
│   └── reasoning/
│       ├── ReasoningOverlay.tsx
│       └── SignalFragments.tsx
│
├── store/
│   ├── reasoningStore.ts
│   └── navigationStore.ts
│
├── public/
│   └── demo.gif
│
└── README.md
```
| Module | Purpose |
|---|---|
| QueryCore | AI consciousness core |
| ExploringField | Information exploration runtime |
| ConflictField | Cognitive instability simulation |
| VerificationField | Logical verification corridor |
| ReasoningOverlay | Runtime reasoning observability |
| reasoningStore | Global cognition state management |

# 项目预览

## Reasoning Cosmos（推理宇宙）

当前系统实现了：

-无限程序化认知空间， 让整个场景持续流动
- 可交互意识核心导航，驾驶光球进行认知探索
- 动态置信度同步系统，confidence 会随着交互实时变化，该过程由游戏操作决定，不影响结果和时间，但能帮用户了解过程的逻辑
- 实时推理状态界面，世界会根据 reasoning phase 动态变化，不同阶段设计不同体验
---

# 玩法和认知阶段系统
使用 Arrow Keys  控制蓝色核心在不同阶段进行探索，理解AI的认知过程 
| Phase | Gameplay | Cognition Meaning |
|---|---|---|
| EXPLORING | 收集 insight fragments（金色碎块），收集后confidence增加 | 信息探索与认知发散|
| CONFLICT | 避开 turbulence（紫色碎块），碰到后confidence减少 | 推理冲突 |
| VERIFYING | 对齐 verifier beam，在光柱中confidence增加，在外减少 | 逻辑验证和稳定 |
| CONVERGING | 无，小球变白逐渐消失 | 最终收敛 |

## 未来改进计划
1. 当前版本仍使用，通过预设逻辑控制不同阶段时长和变化。未来将接入实际AI的实时流式输出，能够边生成边驱动。比如
2. 移动端 / 手机版。移动端也是用户经常使用的场景，开发后使用触屏进行左右上下调整。


### AI Runtime → Interaction Runtime的实现

```text id="ckwq1n"
LLM 输出 token
↓
Runtime Telemetry
↓
Reasoning Signals
↓
Phase Transition
↓
Universe Changes
```

让AI一边thinking，世界一边变化

例如：
####  EXPLORING 
```ts id="btjlwm"
const exploringKeywords = [
  "let's think",
  "consider",
  "possible",
  "explore",
  "another approach",
  "first",
  "searching",
];

```

#### CONFLICT

```ts id="9gjlwm"
const conflictKeywords = [
  "however",
  "but",
  "alternatively",
  "on the other hand",
  "not necessarily",
  "although",
  "uncertain",
  "maybe",
];
```

#### VERIFYING

```ts id="jjlwm4"
const verifyingKeywords = [
  "verify",
  "check",
  "confirm",
  "ensure",
  "validate",
  "consistency",
  "let's verify",
];
```
#### CONVERGING

```ts id="jlwm5"
const convergingKeywords = [
  "therefore",
  "in conclusion",
  "final answer",
  "overall",
  "thus",
  "to summarize",
];
```



---

最后然后直接驱动 Zustand

```ts id="sjlwm"
const phase = interpretPhase(currentText);

useReasoningStore
  .getState()
  .setPhase(phase);
```

# Trade-off
1. 为什么不直接显示 Chain-of-Thought？
   
   在设计中没有像deepseek直接暴露 reasoning text，是因为会有安全问题和信息过载两点问题，虽然能直观写出推理过程，但很多时候用户并不一定真的希望阅读大量 reasoning token。因此将推理抽象化4个阶段，并用游戏的方式帮助进行理解是更加新颖，被用户广泛喜爱的做法。
2. 为什么不设计更传统的游戏玩法？
   
   在设计中有考虑更多的趣味性，比如google网络断开时的恐龙小游戏，射击类游戏；但这些都会吸引玩家太多注意力到输赢和操作上，而无法关注AI 当前正在如何思考，到了什么阶段，而且这些游戏和AI推理的过程很难结合。

   最终选择弱 gameplay（但感觉也兼顾了操作感） + 强 cognition semantics，并通过4个阶段的操作来感受过程。并在最后的converging阶段不用操作，而光球慢慢熄灭来让用户的思绪也恢复平静。
3. 目前得分confidence和实际进度的关系

   - 因为真实 AI reasoning并不是线性进度，可能探索时间很长然后突然出答案，或者verification耗时，推翻之前的结果等，因此confidence并不意味着实际时间进度，也难以准确估计。
   - 这里confidence是游戏中表现的正反馈。虽然可以等同进度条，但还是希望增加等待游戏的趣味性，而且与项目表达的认知可视化相矛盾。最终confidence和实际不相关，不过也设置了规则在0-100%。

4. 在未来计划中，为什么只将 AI Runtime 映射到 Phase，而不直接映射到 Confidence？
   - LLM 并不存在真正可靠的 “Confidence”
   - 真实 AI reasoning 并不是线性稳定过程
   - 真实 telemetry 波动会破坏体验一致性



---
# 技术架构

```text
User Prompt
↓
AI Runtime Telemetry
↓
Reasoning Phase Interpreter
↓
Cognitive Phase Engine
↓
Procedural Cognition Universe
↓
Interactive User Experience
```

---

# 技术栈

| System | Technology |
|---|---|
| Framework | Next.js 16 |
| Rendering | React Three Fiber |
| 3D Engine | Three.js |
| State Management | Zustand |
| Styling | TailwindCSS |
| Language | TypeScript |

---

# 安装方式

## Clone Repository

```bash
git clone https://github.com/Daishunying/reasoning-cosmos.git
```

---

## 安装依赖

```bash
pnpm install
```

---

## 启动开发环境

```bash
pnpm dev
```

打开：

```text
http://localhost:3000
```

---

# 作者

Daishunying

---

# License

MIT
