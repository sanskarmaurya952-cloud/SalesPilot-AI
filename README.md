# 🚀 SalesPilot AI

### The AI Sales Rep That Changes Strategy Mid-Call.

> SalesPilot AI is a real-time, context-aware, agentic voice sales representative that doesn't follow a fixed script. It continuously understands the customer's state, adapts its sales strategy, selects the right tool, takes action, verifies the outcome, updates customer memory, and replans the conversation in real time.

---

## 🎯 The Problem

Traditional AI sales agents are mostly reactive conversational bots.

They can:

- Answer customer questions
- Follow predefined prompts
- Retrieve product information
- Generate conversational responses

But real sales conversations are not linear.

A customer can move from:

**Interest → Price Objection → Competitor Comparison → Trust → Demo Request**

within a single conversation.

A fixed script or simple chatbot struggles to recognize these transitions and change its strategy accordingly.

### The real challenge isn't:

> "Can AI talk to a customer?"

### It is:

> **"Can AI understand what changed in the customer's mind and decide what to do next?"**

---

# 💡 Our Solution

## Meet SalesPilot AI

SalesPilot is an **agentic AI sales representative** designed to dynamically adapt its strategy during a live conversation.

Instead of:

```text
Customer → AI → Response

SalesPilot operates as a continuous decision loop:
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

🧠 What Makes SalesPilot Different?

The core innovation is our Agentic Sales Decision Engine.

SalesPilot continuously maintains a structured representation of the customer

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

    🔄 Adaptive Sales Intelligence

SalesPilot detects important signals throughout the conversation.

Customer Signal	Example	Agent Response
💡 Need	"We need sales automation."	Discovery
💰 Price Objection	"₹50,000 is too expensive."	ROI / Value Strategy
🏢 Competition	"We already use another CRM."	Competitive Positioning
🤔 Trust Concern	"How do I know this will work?"	Trust Building
📚 Product Interest	"How does it work?"	Product Education
🚀 Buying Intent	"I want to see a demo."	Move Toward Conversion

The strategy changes during the call, not after it.

🤖 The Agentic Decision Engine

SalesPilot follows:

Observe → Decide → Act → Verify → Remember → Re-plan
1. 👁 Observe

The agent receives the customer's latest message and conversation context.

2. 🧠 Build State

The state engine updates:

Customer profile
Intent
Sentiment
Buying stage
Lead score
Objections
Needs
Preferences
3. 🎯 Choose Goal

SalesPilot decides what it should accomplish next.

Possible goals include:

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
4. 🧩 Select Strategy

The agent chooses an appropriate sales strategy:
DISCOVERY
VALUE
PRICE_OBJECTION
COMPETITION
PRODUCT_EDUCATION
TRUST
DECISION
5. 🛠 Select Tool

Depending on the goal, SalesPilot can select:
PRODUCT_KNOWLEDGE
ROI_CALCULATOR
CRM
CALENDAR
FOLLOW_UP
6. ⚡ Take Action

The selected action is executed.

For example:
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
7. ✅ Verify

SalesPilot does not blindly assume that an action succeeded.

It verifies the action result.

Action
  ↓
Result
  ↓
Verification
  ↓
SUCCESS / FAILED
8. 🔁 Re-plan

If an action fails or the customer's state changes, SalesPilot can choose a new path.
FAILED
  ↓
RECOVERY
  ↓
NEW GOAL
  ↓
NEW STRATEGY

🎙️ Why Agora?

Real-time conversation is the foundation of SalesPilot.

We use Agora Conversational AI as the real-time interaction layer connecting the customer with the AI sales agent.
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
Agora powers the real-time conversational experience, while SalesPilot's intelligence layer determines what the agent should actually do next.

Separation of responsibilities

Agora

Real-time voice communication
Conversational AI transport
Speech interaction

SalesPilot

Customer understanding
Sales intelligence
Decision making
Strategy selection
Tool selection
Action execution
Verification
Re-planning
Persistent customer memory

🏗️ System Architecture
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
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       Product Knowledge   ROI/CRM      Calendar
              │              │              │
              └──────────────┼──────────────┘
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

🧠 Persistent Customer Memory

SalesPilot does not have to start from zero every time.

Customer information is persisted using Supabase.

Example:
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

🎬 Example Conversation
Customer

"Hi, I'm Rahul, founder of a startup. We need sales automation, but our budget is around ₹40,000."

SalesPilot extracts:
🎬 Example Conversation
Customer

"Hi, I'm Rahul, founder of a startup. We need sales automation, but our budget is around ₹40,000."

SalesPilot extracts:
Name   → Rahul
Role   → Founder
Need   → Sales Automation
Budget → ₹40,000

Customer

"We already use another CRM. I'm not sure why we should switch."

SalesPilot updates:
Objection → Existing Solution
Strategy  → COMPETITION
Goal      → UNDERSTAND_COMPETITION
Tool      → CRM

Customer

"Actually, I really like to see a demo."

SalesPilot recognizes the buying signal:
Intent        → Interested
Buying Stage  → Decision
Goal          → BOOK_DEMO
Strategy      → DECISION
Tool          → CALENDAR

The important part:

The AI doesn't continue asking generic discovery questions. It recognizes the buying signal and changes its objective.

📊 Sales Intelligence Dashboard

SalesPilot provides a live view of what the AI currently understands.

┌─────────────────────────────────────┐
│        SALES INTELLIGENCE           │
├─────────────────────────────────────┤
│ Intent:           Interested        │
│ Sentiment:        Positive          │
│ Objection:        None              │
│ Buying Stage:     Decision           │
│ Lead Score:       85/100            │
│ Next Best Action: Book Demo         │
└─────────────────────────────────────┘

🔥 Core Innovation

Most conversational AI systems optimize for:

"What should I say next?"

SalesPilot optimizes for:

"What should I accomplish next?"

That distinction changes the architecture.

Instead of:
Input → LLM → Response

SalesPilot uses:

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

The result

An AI sales agent that can adapt its strategy instead of merely generating replies.

🧰 Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Real-Time AI
Agora Conversational AI
Real-time voice communication
Speech-to-Text
LLM reasoning
Text-to-Speech
Intelligence Layer
Sales Intelligence Engine
Customer State Engine
Goal Engine
Strategy Selector
Tool Selector
Action Engine
Verification Engine
Replanner
Memory
Supabase
PostgreSQL
APIs
Next.js API Routes
Agora APIs
Customer Memory API
Sales Intelligence API
Action APIs

📁 Project Structure

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


🚀 Roadmap
Phase 1 — MVP
 Real-time Agora conversation
 Sales intelligence
 Customer state tracking
 Persistent customer memory
 Agentic decision engine
 Goal selection
 Strategy selection
 Tool selection
 Action execution
 Action verification
 Re-planning
Phase 2 — Production Integrations
 Real CRM integrations
 Real calendar booking
 Automated follow-ups
 Proposal generation
 Email / WhatsApp handoff
 Advanced lead scoring
Phase 3 — Enterprise Intelligence
 Multi-agent sales teams
 Enterprise CRM synchronization
 Sales performance analytics
 Predictive conversion modeling
 Organization-wide customer intelligence
🏆 Why SalesPilot?

SalesPilot is built around a simple idea:

The future of AI sales isn't scripted automation. It's adaptive decision-making.

A customer can change their mind within seconds.

SalesPilot is designed to change with them.

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

🌟 Vision

We envision AI sales agents that behave less like chatbots and more like intelligent sales professionals.

Agents that can:

Understand customers
Remember previous interactions
Detect objections
Recognize buying signals
Change strategy in real time
Take meaningful actions
Verify outcomes
Continuously re-plan
SalesPilot AI

Listen. Understand. Decide. Act. Adapt.

👥 Team

ALPHA++

Built for the next generation of intelligent sales automation.

⭐ Support the Project

If you find SalesPilot AI interesting, consider giving the repository a ⭐.