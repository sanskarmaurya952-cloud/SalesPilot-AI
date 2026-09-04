import {
  buildCustomerState,
} from './state-engine';

import {
  chooseSalesGoal,
} from './goal-engine';

import {
  enrichDecisionWithTool,
} from './tool-selector';

import {
  executeSalesAction,
} from './action-engine';

import {
  verifySalesAction,
} from './verification-engine';

import {
  replanSalesConversation,
} from './replanner';

import type {
  AgentAction,
  CustomerState,
  AgenticDecision,
  ReplanDecision,
} from './types';

type AgenticLoopInput = {
  customerId: string;

  memory?: {
    customerId: string;
    name?: string;
    role?: string;
    company?: string;
    budget?: string;
    needs: string[];
    preferences: string[];
    objections: string[];
    buyingStage?: string;
    lastIntent?: string;
    lastSentiment?: string;
    notes: string[];
    updatedAt: string;
  } | null;

  intelligence?: {
    intent?: string;
    sentiment?: string;
    objection?: string | null;
    buyingStage?: string;
    leadScore?: number;
    nextBestAction?: string;

    customerProfile?: {
      name?: string;
      role?: string;
      company?: string;
      budget?: string;
      needs?: string[];
      preferences?: string[];
    };
  } | null;

  lastCustomerMessage?: string;
  lastAgentAction?: string;
  lastActionResult?: string;
};

export type AgenticLoopResult = {
  state: CustomerState;

  decision: AgenticDecision;

  action: AgentAction;

  replan: ReplanDecision;
};

export async function runAgenticLoop(
  input: AgenticLoopInput,
): Promise<AgenticLoopResult> {
  // STEP 1 — OBSERVE + BUILD STATE
  const state = buildCustomerState({
    customerId: input.customerId,
    memory: input.memory,
    intelligence: input.intelligence,
    lastCustomerMessage:
      input.lastCustomerMessage,
    lastAgentAction:
      input.lastAgentAction,
    lastActionResult:
      input.lastActionResult,
  });

  // STEP 2 — CHOOSE GOAL
  const initialDecision =
    chooseSalesGoal(state);

  // STEP 3 — SELECT TOOL
  const decision =
    enrichDecisionWithTool(
      state,
      initialDecision,
    );

  // STEP 4 — EXECUTE ACTION
  const executedAction =
    await executeSalesAction({
      state,
      decision,
    });

  // STEP 5 — VERIFY RESULT
  const verifiedAction =
    verifySalesAction(
      executedAction,
    );

  // STEP 6 — RE-PLAN
  const replan =
    replanSalesConversation({
      state,
      action: verifiedAction,
    });

  return {
    state,
    decision,
    action: verifiedAction,
    replan,
  };
}