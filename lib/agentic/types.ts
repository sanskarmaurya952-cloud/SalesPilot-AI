export type SalesStrategy =
  | 'DISCOVERY'
  | 'VALUE'
  | 'PRICE_OBJECTION'
  | 'COMPETITION'
  | 'PRODUCT_EDUCATION'
  | 'TRUST'
  | 'DECISION';

export type AgenticGoal =
  | 'DISCOVER_NEED'
  | 'UNDERSTAND_CUSTOMER'
  | 'BUILD_VALUE'
  | 'RESOLVE_PRICE_OBJECTION'
  | 'UNDERSTAND_COMPETITION'
  | 'EDUCATE_PRODUCT'
  | 'BUILD_TRUST'
  | 'QUALIFY_LEAD'
  | 'MOVE_TO_DECISION'
  | 'BOOK_DEMO'
  | 'FOLLOW_UP';

export type SalesTool =
  | 'PRODUCT_KNOWLEDGE'
  | 'ROI_CALCULATOR'
  | 'CRM'
  | 'CALENDAR'
  | 'FOLLOW_UP';

export type ActionStatus =
  | 'PENDING'
  | 'EXECUTING'
  | 'SUCCESS'
  | 'FAILED'
  | 'VERIFIED';

export type CustomerState = {
  customerId: string;

  name?: string;
  role?: string;
  company?: string;
  budget?: string;

  needs: string[];
  preferences: string[];

  // Historical objections raised by the customer.
  objections: string[];

  // Objection currently blocking the conversation.
  activeObjection?: string;

  // Objections that have already been resolved.
  resolvedObjections: string[];

  intent: string;
  sentiment: string;
  buyingStage: string;

  leadScore: number;

  currentStrategy: SalesStrategy;
  currentGoal: AgenticGoal;

  lastCustomerMessage?: string;
  lastAgentAction?: string;
  lastActionResult?: string;

  updatedAt: string;
};

export type AgenticDecision = {
  goal: AgenticGoal;
  strategy: SalesStrategy;

  reason: string;

  selectedTool?: SalesTool;

  action: string;

  expectedOutcome: string;

  confidence: number;
};

export type AgentAction = {
  id: string;

  customerId: string;

  goal: AgenticGoal;
  strategy: SalesStrategy;

  tool: SalesTool;

  action: string;

  status: ActionStatus;

  input?: Record<string, unknown>;

  result?: Record<string, unknown>;

  verification?: {
    verified: boolean;
    outcome: string;
    reason?: string;
  };

  createdAt: string;
  completedAt?: string;
};

export type ReplanDecision = {
  shouldReplan: boolean;

  reason: string;

  newGoal?: AgenticGoal;

  newStrategy?: SalesStrategy;

  nextAction?: string;
};