🚀 SalesPilot AI
The AI Sales Rep That Changes Strategy Mid-Call.

SalesPilot AI is a real-time, context-aware, agentic voice sales representative that doesn't follow a fixed script. It continuously understands the customer's state, adapts its sales strategy, selects the right tool, takes action, verifies the outcome, updates customer memory, and replans the conversation in real time.

🎯 The Problem

Traditional AI sales agents are mostly reactive conversational bots.

They can:

Answer customer questions
Follow predefined prompts
Retrieve product information
Generate convincing responses

But real sales conversations are not linear.

A customer can move from:

Interest → Price Objection → Competitor Comparison → Trust → Demo Request

within a single conversation.

A fixed script or simple chatbot struggles to recognize these transitions and change its strategy accordingly.

The real challenge isn't:

"Can AI talk to a customer?"

It is:

"Can AI understand what changed in the customer's mind and decide what to do next?"

💡 Our Solution
Meet SalesPilot AI

SalesPilot is an agentic AI sales representative designed to dynamically adapt its strategy during a live conversation.

Instead of:

Customer → AI → Response

SalesPilot operates as a continuous decision loop:

┌─────────────────────────────────────────┐
│              LIVE CUSTOMER              │
└───────────────────┬─────────────────────┘
                    ↓
             REAL-TIME VOICE
                    ↓
              UNDERSTAND
                    ↓
          BUILD CUSTOMER STATE
                    ↓
          CHOOSE SALES GOAL
                    ↓
        SELECT BEST STRATEGY
                    ↓
           SELECT TOOL
                    ↓
              TAKE ACTION
                    ↓
             VERIFY RESULT
                    ↓
          UPDATE CUSTOMER
              MEMORY
                    ↓
                RE-PLAN
                    ↺
In one sentence:

SalesPilot doesn't just generate the next response — it decides the next best sales move.

🧠 What Makes SalesPilot Different?

The key innovation is our Agentic Sales Decision Engine.

The agent continuously maintains a structured representation of the customer:

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

This allows SalesPilot to understand where the customer is now, rather than treating every message independently.

🔄 Adaptive Sales Intelligence

SalesPilot recognizes important signals during the conversation:

Signal	Example	Agent Response
💡 Need	"We need sales automation"	Discovery
💰 Price Objection	"₹50,000 is too expensive"	ROI / Value strategy
🏢 Competition	"We already use another CRM"	Competitive positioning
🤔 Trust Concern	"How do I know this will work?"	Trust building
📚 Product Interest	"How does it work?"	Product education
🚀 Buying Intent	"I want to see a demo"	Move toward conversion

The strategy changes during the call, not after it.

🤖 The Agentic Decision Engine

SalesPilot follows:

Observe → Decide → Act → Verify → Remember → Re-plan
1. 👁 Observe

The agent receives the customer's latest message and conversation context.

2. 🧠 Build State

It updates:

Customer profile
Intent
Sentiment
Buying stage
Lead score
Objections
Needs
Preferences
3. 🎯 Choose Goal

The agent decides what it should accomplish next.

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

Depending on the goal, SalesPilot can choose:

PRODUCT_KNOWLEDGE
ROI_CALCULATOR
CRM
CALENDAR
FOLLOW_UP
6. ⚡ Act

The selected action is executed.

For example:

Customer: "₹50,000 is too expensive."

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

SalesPilot doesn't blindly assume that an action succeeded.

It verifies the action result.

Action
   ↓
Result
   ↓
Verification
   ↓
SUCCESS / FAILED
8. 🔁 Re-plan

If the action fails or the customer's state changes, SalesPilot can choose a new path.

FAILED
  ↓
RECOVERY
  ↓
NEW GOAL
  ↓
NEW STRATEGY

This is what makes the system agentic rather than simply conversational.

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
Decision Engine
      ↓
LLM Sales Brain
      ↓
Text-to-Speech
      ↓
Agora
      ↓
Customer

Agora enables the low-latency conversational experience required for a sales call, while SalesPilot's intelligence layer determines what the agent should actually do next.

Our architecture separates:

Real-time communication → Agora

from

Sales intelligence + decision making → SalesPilot

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
                 │  CONVERSATION          │
                 │  INTELLIGENCE          │
                 │                        │
                 │ Intent                 │
                 │ Sentiment              │
                 │ Objection              │
                 │ Buying Stage            │
                 │ Lead Score              │
                 └───────────┬────────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │   CUSTOMER MEMORY      │
                 │                        │
                 │ Profile                │
                 │ Needs                  │
                 │ Preferences            │
                 │ Objections             │
                 │ Previous Context       │
                 └───────────┬────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   AGENTIC DECISION ENGINE    │
              │                              │
              │ Observe                      │
              │ Build State                  │
              │ Choose Goal                  │
              │ Select Strategy              │
              │ Select Tool                  │
              │ Act                          │
              │ Verify                      │
              │ Re-plan                     │
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

SalesPilot doesn't have to start from zero every time.

Customer information is persisted in Supabase.

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

This allows the agent to build longitudinal customer context, rather than relying only on the current sentence.

🎬 Example Conversation
Customer

"Hi, I'm Rahul, founder of a startup. We need sales automation, but our budget is around ₹40,000."

SalesPilot extracts:

Name → Rahul
Role → Founder
Need → Sales Automation
Budget → ₹40,000
Customer

"We already use another CRM. I'm not sure why we should switch."

SalesPilot updates:

Objection → Existing Solution
Strategy → COMPETITION
Goal → UNDERSTAND_COMPETITION
Tool → CRM

The agent changes from discovery to competitive positioning.

Customer

"Actually, I really like to see a demo."

The state changes again:

Intent → Interested
Buying Stage → Decision
Goal → BOOK_DEMO
Strategy → DECISION
Tool → CALENDAR

The important part:

The AI doesn't continue asking generic discovery questions. It recognizes the buying signal and changes the objective.

📊 Sales Intelligence Dashboard

SalesPilot provides a live view of what the AI currently understands:

┌─────────────────────────────────────┐
│       SALES INTELLIGENCE            │
├─────────────────────────────────────┤
│ Intent:          Interested         │
│ Sentiment:       Positive           │
│ Objection:       None               │
│ Buying Stage:    Decision           │
│ Lead Score:      85/100             │
│ Next Best Action: Book Demo         │
└─────────────────────────────────────┘

Alongside:

CUSTOMER MEMORY
────────────────────────
Name       Rahul
Role       Founder
Budget     ₹40,000
Need       Sales Automation
Objection  Existing CRM

And:

AGENTIC DECISION ENGINE
────────────────────────
Goal       BOOK_DEMO
Strategy   DECISION
Tool       CALENDAR
Action     INITIATED
Verify     ✓

This gives judges visibility into why the AI is making a particular sales move.

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
Intelligence
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
Customer Memory APIs
Sales Intelligence APIs
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
🔥 Core Innovation

Most conversational AI systems optimize for:

"What should I say next?"

SalesPilot optimizes for:

"What should I accomplish next?"

That distinction changes the architecture.

Instead of a simple:

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
This creates an AI sales agent that can adapt its strategy instead of merely generating replies.
🏆 Why This Matters

Sales conversations contain constantly changing signals:

Budget changes
New objections appear
Competitors are mentioned
Customer sentiment changes
Buying intent increases
Customer asks for a demo
Customer changes language or communication style

A successful sales agent needs to respond to those changes in real time.

SalesPilot is designed around exactly that principle.

🚀 Future Roadmap
Phase 1 — Current MVP
Real-time Agora conversation
Sales intelligence
Customer state tracking
Persistent customer memory
Agentic decision engine
Tool selection
Action execution
Action verification
Re-planning
Phase 2
Real CRM integrations
Real calendar booking
Automated follow-ups
Proposal generation
Email/WhatsApp handoff
Advanced lead scoring
Phase 3
Multi-agent sales teams
Enterprise CRM synchronization
Sales performance analytics
Predictive churn / conversion modeling
Organization-wide customer intelligence
⚙️ Getting Started
1. Clone
git clone https://github.com/sanskarmaurya952-cloud/SalesPilot-AI.git
cd SalesPilot-AI
2. Install dependencies
pnpm install
3. Configure environment variables

Create:

.env.local

Add the required Agora and Supabase configuration.

NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
NEXT_AGORA_APP_CERTIFICATE=your_agora_app_certificate

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

Never commit credentials or .env.local to GitHub.

4. Start development server
pnpm dev

Open:

http://localhost:3000
🧪 Testing the Agent

Try a conversation such as:

"I'm Rahul, founder of a startup."

"We need sales automation."

"Our budget is around ₹40,000."

"We already use another CRM."

"I'm not sure why we should switch."

"Actually, I'd really like to see a demo."

Watch the SalesPilot state evolve:

DISCOVERY
    ↓
PRICE / VALUE
    ↓
COMPETITION
    ↓
DECISION
    ↓
BOOK DEMO

The key demonstration is not just that the AI answers.

The key demonstration is that:

the agent changes its goal and strategy as the customer's state changes.

🌟 Vision

SalesPilot AI is built around a simple idea:

The future of AI sales isn't scripted automation. It's adaptive decision-making.

We envision sales agents that can:

Listen → Understand → Decide → Act → Learn → Adapt

in real time.

🧑‍💻 Team

SalesPilot AI

Built with ❤️ for the next generation of intelligent sales automation.

⭐ If you like the project

Give the repository a ⭐ and follow the project as we continue building the next generation of adaptive AI sales agents.