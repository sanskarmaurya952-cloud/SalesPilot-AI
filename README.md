# 🚀 SalesPilot AI

### **The AI Sales Rep That Changes Strategy Mid-Call.**

> **SalesPilot AI** is a real-time, context-aware, agentic voice sales representative that doesn't follow a fixed script. It continuously understands the customer's state, adapts its sales strategy, selects the right tool, takes action, verifies the outcome, updates customer memory, and replans the conversation in real time.

---

## 🎯 The Problem

Traditional AI sales agents are mostly **reactive conversational bots**.

They can:

* Answer customer questions
* Follow predefined prompts
* Retrieve product information
* Generate conversational responses

But **real sales conversations are not linear.**

A customer can move through:

**Interest → Price Objection → Competitor Comparison → Trust → Demo Request**

within a single conversation.

A fixed script or simple chatbot struggles to recognize these transitions and change its strategy accordingly.

### The Real Challenge Isn't:

> **"Can AI talk to a customer?"**

### It Is:

> **"Can AI understand what changed in the customer's mind and decide what to do next?"**

---

# 💡 Our Solution

## Meet SalesPilot AI

SalesPilot is an **agentic AI sales representative** designed to dynamically adapt its strategy during a live conversation.

Instead of a simple:

```text
Customer → AI → Response
```

SalesPilot operates as a continuous decision loop:

```text
Customer Voice
      ↓
   Observe
      ↓
Build Customer State
      ↓
 Choose Sales Goal
      ↓
 Select Strategy
      ↓
   Select Tool
      ↓
   Take Action
      ↓
  Verify Result
      ↓
Update Customer Memory
      ↓
    Re-plan
      ↺
```

---

# 🧠 What Makes SalesPilot Different?

The core innovation is the **Agentic Sales Decision Engine**.

SalesPilot continuously maintains a structured representation of the customer.

```text
Customer State
│
├── Identity
│   ├── Name
│   ├── Role
│   └── Company
│
├── Commercial Context
│   ├── Budget
│   ├── Needs
│   └── Preferences
│
├── Sales Signals
│   ├── Intent
│   ├── Sentiment
│   ├── Buying Stage
│   └── Lead Score
│
├── Objections
│   ├── Active Objection
│   ├── Historical Objections
│   └── Resolved Objections
│
└── Conversation Context
    ├── Last Customer Message
    ├── Last Action
    └── Action Result
```

---

# 🔄 Adaptive Sales Intelligence

SalesPilot detects important signals throughout the conversation and changes its strategy accordingly.

| Customer Signal     | Example                         | Agent Response          |
| ------------------- | ------------------------------- | ----------------------- |
| 💡 Need             | "We need sales automation."     | Discovery               |
| 💰 Price Objection  | "₹50,000 is too expensive."     | ROI / Value Strategy    |
| 🏢 Competition      | "We already use another CRM."   | Competitive Positioning |
| 🤔 Trust Concern    | "How do I know this will work?" | Trust Building          |
| 📚 Product Interest | "How does it work?"             | Product Education       |
| 🚀 Buying Intent    | "I want to see a demo."         | Move Toward Conversion  |

### The key difference:

> **The strategy changes during the call — not after it.**

---

# 🤖 The Agentic Decision Engine

SalesPilot follows a continuous loop:

```text
Observe → Decide → Act → Verify → Remember → Re-plan
```

### 1. 👁 Observe

The agent receives the customer's latest message and conversation context.

### 2. 🧠 Build State

The state engine updates:

* Customer profile
* Intent
* Sentiment
* Buying stage
* Lead score
* Objections
* Needs
* Preferences

### 3. 🎯 Choose Goal

SalesPilot decides what it should accomplish next.

Possible goals include:

```text
DISCOVER_NEED
UNDERSTAND_CUSTOMER
BUILD_VALUE
RESOLVE_PRICE_OBJECTION
UNDERSTAND_COMPETITION
EDUCATE_PRODUCT
BUILD_TRUST
QUALIFY_LEAD
MOVE_TO_DECISION
BOOK_DEMO
FOLLOW_UP
```

### 4. 🧩 Select Strategy

The agent chooses an appropriate sales strategy:

```text
DISCOVERY
VALUE
PRICE_OBJECTION
COMPETITION
PRODUCT_EDUCATION
TRUST
DECISION
```

### 5. 🛠 Select Tool

Depending on the goal, SalesPilot can select:

```text
PRODUCT_KNOWLEDGE
ROI_CALCULATOR
CRM
CALENDAR
FOLLOW_UP
```

### 6. ⚡ Take Action

The selected action is executed.

**Example:**

```text
Customer:
"₹50,000 is too expensive."

        ↓

Goal:
RESOLVE_PRICE_OBJECTION

        ↓

Strategy:
PRICE_OBJECTION

        ↓

Tool:
ROI_CALCULATOR

        ↓

Action:
Demonstrate potential ROI
```

### 7. ✅ Verify

SalesPilot does not blindly assume that an action succeeded.

It verifies the action result:

```text
Action
  ↓
Result
  ↓
Verification
  ↓
SUCCESS / FAILED
```

### 8. 🔁 Re-plan

If an action fails or the customer's state changes, SalesPilot can choose a new path.

```text
FAILED
  ↓
RECOVERY
  ↓
NEW GOAL
  ↓
NEW STRATEGY
```

---

# 🎙️ Why Agora?

Real-time conversation is the foundation of SalesPilot.

We use **Agora Conversational AI** as the real-time interaction layer connecting the customer with the AI sales agent.

```text
Customer Voice
      ↓
Agora Real-Time Layer
      ↓
Speech Recognition
      ↓
Sales Intelligence
      ↓
Agentic Decision Engine
      ↓
LLM Sales Brain
      ↓
Text-to-Speech
      ↓
Agora
      ↓
Customer
```

### Separation of Responsibilities

| Agora                         | SalesPilot                 |
| ----------------------------- | -------------------------- |
| Real-time voice communication | Customer understanding     |
| Conversational AI transport   | Sales intelligence         |
| Speech interaction            | Decision making            |
|                               | Strategy selection         |
|                               | Tool selection             |
|                               | Action execution           |
|                               | Verification               |
|                               | Re-planning                |
|                               | Persistent customer memory |

> **Agora powers the real-time conversational experience, while SalesPilot's intelligence layer determines what the agent should actually do next.**

---

# 🏗️ System Architecture

```text
                    ┌────────────────────┐
                    │     CUSTOMER       │
                    │   Voice / Speech   │
                    └─────────┬──────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │   AGORA CONVERSATIONAL │
                 │          AI            │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │  SALES INTELLIGENCE    │
                 │                        │
                 │  Intent                │
                 │  Sentiment             │
                 │  Objection             │
                 │  Buying Stage          │
                 │  Lead Score            │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │   CUSTOMER MEMORY      │
                 │                        │
                 │  Profile               │
                 │  Needs                 │
                 │  Preferences           │
                 │  Objections            │
                 │  Previous Context      │
                 └───────────┬────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   AGENTIC DECISION ENGINE    │
              │                              │
              │  Observe                     │
              │  Build State                 │
              │  Choose Goal                 │
              │  Select Strategy             │
              │  Select Tool                 │
              │  Act                         │
              │  Verify                      │
              │  Re-plan                     │
              └──────────────┬───────────────┘
                             │
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
          Product        ROI / CRM    Calendar
          Knowledge
                 │           │           │
                 └───────────┼───────────┘
                             ▼
                    ┌───────────────┐
                    │   LLM SALES   │
                    │     BRAIN     │
                    └───────┬───────┘
                            │
                            ▼
                           TTS
                            │
                            ▼
                          AGORA
                            │
                            ▼
                         CUSTOMER
```

---

# 🧠 Persistent Customer Memory

SalesPilot does not have to start from zero every time.

Customer information is persisted using **Supabase**.

Example:

```json
{
  "customer": "Rahul",
  "role": "Founder",
  "budget": "₹40,000",
  "needs": [
    "Sales automation"
  ],
  "objections": [
    "Existing CRM"
  ],
  "buying_stage": "Decision",
  "last_intent": "Interested"
}
```

This allows the agent to maintain context instead of treating every conversation as a completely new interaction.

---

# 🎬 Example Conversation

### 👤 Customer

> "Hi, I'm Rahul, founder of a startup. We need sales automation, but our budget is around ₹40,000."

### 🧠 SalesPilot Extracts

```text
Name   → Rahul
Role   → Founder
Need   → Sales Automation
Budget → ₹40,000
```

---

### 👤 Customer

> "We already use another CRM. I'm not sure why we should switch."

### 🧠 SalesPilot Updates

```text
Objection → Existing Solution
Strategy  → COMPETITION
Goal      → UNDERSTAND_COMPETITION
Tool      → CRM
```

---

### 👤 Customer

> "Actually, I'd really like to see a demo."

### 🧠 SalesPilot Recognizes the Buying Signal

```text
Intent        → Interested
Buying Stage  → Decision
Goal          → BOOK_DEMO
Strategy      → DECISION
Tool          → CALENDAR
```

### The important part:

> **The AI doesn't continue asking generic discovery questions. It recognizes the buying signal and changes its objective.**

---

# 📊 Sales Intelligence Dashboard

SalesPilot provides a live view of what the AI currently understands.

```text
┌─────────────────────────────────────┐
│        SALES INTELLIGENCE           │
├─────────────────────────────────────┤
│ Intent:           Interested        │
│ Sentiment:        Positive          │
│ Objection:        None              │
│ Buying Stage:     Decision          │
│ Lead Score:       85/100            │
│ Next Best Action: Book Demo         │
└─────────────────────────────────────┘
```

---

# 🔥 Core Innovation

Most conversational AI systems optimize for:

> **"What should I say next?"**

SalesPilot optimizes for:

> **"What should I accomplish next?"**

That distinction changes the architecture.

### Traditional Approach

```text
Input → LLM → Response
```

### SalesPilot Approach

```text
Input
  ↓
Customer State
  ↓
Sales Goal
  ↓
Strategy
  ↓
Tool
  ↓
Action
  ↓
Verification
  ↓
Memory
  ↓
Re-plan
```

### Result

> **An AI sales agent that can adapt its strategy instead of merely generating replies.**

---

# 🧰 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### 🎙️ Real-Time AI

* Agora Conversational AI
* Real-time voice communication
* Speech-to-Text
* LLM reasoning
* Text-to-Speech

### 🧠 Intelligence Layer

* Sales Intelligence Engine
* Customer State Engine
* Goal Engine
* Strategy Selector
* Tool Selector
* Action Engine
* Verification Engine
* Replanner

### 💾 Memory

* Supabase
* PostgreSQL

### 🔌 APIs

* Next.js API Routes
* Agora APIs
* Customer Memory API
* Sales Intelligence API
* Action APIs

---

# 📁 Project Structure

```text
SalesPilot-AI/
│
├── app/
│   ├── api/
│   │   ├── sales-intelligence/
│   │   ├── customer-memory/
│   │   ├── actions/
│   │   ├── invite-agent/
│   │   ├── generate-agora-token/
│   │   └── stop-conversation/
│   │
│   └── ...
│
├── components/
│   ├── ConversationComponent.tsx
│   ├── LandingPage.tsx
│   ├── QuickstartConversationLayout.tsx
│   ├── QuickstartTranscriptPanel.tsx
│   └── ...
│
├── lib/
│   ├── agentic/
│   │   ├── agentic-loop.ts
│   │   ├── state-engine.ts
│   │   ├── goal-engine.ts
│   │   ├── tool-selector.ts
│   │   ├── action-engine.ts
│   │   ├── verification-engine.ts
│   │   └── replanner.ts
│   │
│   ├── customer-memory.ts
│   └── agora.ts
│
└── README.md
```

---

# 🚀 Roadmap

## Phase 1 — MVP

* [x] Real-time Agora conversation
* [x] Sales intelligence
* [x] Customer state tracking
* [x] Persistent customer memory
* [x] Agentic decision engine
* [x] Goal selection
* [x] Strategy selection
* [x] Tool selection
* [x] Action execution
* [x] Action verification
* [x] Re-planning

## Phase 2 — Production Integrations

* [ ] Real CRM integrations
* [ ] Real calendar booking
* [ ] Automated follow-ups
* [ ] Proposal generation
* [ ] Email / WhatsApp handoff
* [ ] Advanced lead scoring

## Phase 3 — Enterprise Intelligence

* [ ] Multi-agent sales teams
* [ ] Enterprise CRM synchronization
* [ ] Sales performance analytics
* [ ] Predictive conversion modeling
* [ ] Organization-wide customer intelligence

---

# 🏆 Why SalesPilot?

SalesPilot is built around a simple idea:

> **The future of AI sales isn't scripted automation. It's adaptive decision-making.**

A customer can change their mind within seconds.

**SalesPilot is designed to change with them.**

```text
LISTEN
   ↓
UNDERSTAND
   ↓
DECIDE
   ↓
ACT
   ↓
VERIFY
   ↓
REMEMBER
   ↓
ADAPT
```

---

# 🌟 Vision

We envision AI sales agents that behave less like chatbots and more like **intelligent sales professionals**.

Agents that can:

* Understand customers
* Remember previous interactions
* Detect objections
* Recognize buying signals
* Change strategy in real time
* Take meaningful actions
* Verify outcomes
* Continuously re-plan

### **SalesPilot AI**

> **Listen. Understand. Decide. Act. Adapt.**

---

# 👥 Team

## ALPHA++

**Built for the next generation of intelligent sales automation.**

---

# ⭐ Support the Project

If you find **SalesPilot AI** interesting, consider giving the repository a ⭐.

Every star helps us build the next generation of adaptive AI sales agents.

---

<div align="center">

### 🚀 SalesPilot AI

**Not just an AI that talks.
An AI that understands, decides, acts, and adapts.**

</div>
