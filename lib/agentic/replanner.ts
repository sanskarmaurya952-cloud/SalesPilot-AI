import type {
  AgentAction,
  AgenticGoal,
  CustomerState,
  ReplanDecision,
  SalesStrategy,
} from './types';

export function replanSalesConversation({
  state,
  action,
}: {
  state: CustomerState;
  action: AgentAction;
}): ReplanDecision {
  // Action failed → immediately choose a recovery path.
  if (action.status === 'FAILED') {
    return {
      shouldReplan: true,
      reason:
        'The previous action failed, so the agent needs to choose an alternative path.',
      newGoal: getRecoveryGoal(state),
      newStrategy: getRecoveryStrategy(state),
      nextAction:
        'Recover from the failed action and continue the conversation without claiming success.',
    };
  }

  // Action was executed but could not be verified.
  if (
    action.status !== 'VERIFIED' ||
    !action.verification?.verified
  ) {
    return {
      shouldReplan: true,
      reason:
        'The previous action could not be verified, so the agent should avoid assuming success.',
      newGoal: 'UNDERSTAND_CUSTOMER',
      newStrategy: 'DISCOVERY',
      nextAction:
        'Clarify the customer situation and determine the next safe action.',
    };
  }

  // Verified action → decide what should happen next.
  switch (action.goal) {
    case 'RESOLVE_PRICE_OBJECTION':
      return replanAfterPriceResolution(state);

    case 'UNDERSTAND_COMPETITION':
      return replanAfterCompetitionAnalysis(state);

    case 'EDUCATE_PRODUCT':
      return replanAfterProductEducation(state);

    case 'BUILD_TRUST':
      return replanAfterTrustAction(state);

    case 'MOVE_TO_DECISION':
      return replanAfterDecision(state);

    case 'BOOK_DEMO':
      return {
        shouldReplan: false,
        reason:
          'The demo booking action has completed successfully.',
        nextAction:
          'Confirm the next step with the customer.',
      };

    case 'FOLLOW_UP':
      return {
        shouldReplan: false,
        reason:
          'The follow-up action has been prepared successfully.',
        nextAction:
          'Confirm the follow-up expectation with the customer.',
      };

    case 'BUILD_VALUE':
      return {
        shouldReplan: true,
        reason:
          'Value has been established and the agent should reassess customer readiness.',
        newGoal: determineNextGoal(state),
        newStrategy: determineNextStrategy(state),
        nextAction:
          'Reassess customer intent and continue with the highest-value next step.',
      };

    default:
      return {
        shouldReplan: true,
        reason:
          'The previous action completed and the agent should reassess the customer state.',
        newGoal: determineNextGoal(state),
        newStrategy: determineNextStrategy(state),
        nextAction:
          'Reassess the customer state and continue adaptively.',
      };
  }
}

function replanAfterPriceResolution(
  state: CustomerState,
): ReplanDecision {
  if (state.leadScore >= 75) {
    return {
      shouldReplan: true,
      reason:
        'The price concern has been handled and the customer shows strong buying potential.',
      newGoal: 'MOVE_TO_DECISION',
      newStrategy: 'DECISION',
      nextAction:
        'Confirm purchase readiness and propose the appropriate next step.',
    };
  }

  return {
    shouldReplan: true,
    reason:
      'The price concern has been addressed but the customer still needs more value.',
    newGoal: 'BUILD_VALUE',
    newStrategy: 'VALUE',
    nextAction:
      'Reconnect the product value to the customer’s stated needs.',
  };
}

function replanAfterCompetitionAnalysis(
  state: CustomerState,
): ReplanDecision {
  if (state.needs.length === 0) {
    return {
      shouldReplan: true,
      reason:
        'The existing solution is known but the remaining business problem is unclear.',
      newGoal: 'DISCOVER_NEED',
      newStrategy: 'DISCOVERY',
      nextAction:
        'Ask one focused question to identify the unresolved business gap.',
    };
  }

  return {
    shouldReplan: true,
    reason:
      'The competitive context is understood and the agent can now connect SalesPilot to the customer’s needs.',
    newGoal: 'BUILD_VALUE',
    newStrategy: 'VALUE',
    nextAction:
      'Differentiate SalesPilot using the customer’s specific needs and identified gap.',
  };
}

function replanAfterProductEducation(
  state: CustomerState,
): ReplanDecision {
  if (state.leadScore >= 75) {
    return {
      shouldReplan: true,
      reason:
        'The customer understands the product and shows strong buying potential.',
      newGoal: 'MOVE_TO_DECISION',
      newStrategy: 'DECISION',
      nextAction:
        'Ask for a concrete next step such as a demo or purchase.',
    };
  }

  return {
    shouldReplan: true,
    reason:
      'Product education is complete but the customer is not yet ready to decide.',
    newGoal: 'BUILD_VALUE',
    newStrategy: 'VALUE',
    nextAction:
      'Connect the demonstrated capability to the customer’s business outcome.',
  };
}

function replanAfterTrustAction(
  state: CustomerState,
): ReplanDecision {
  if (state.leadScore >= 75) {
    return {
      shouldReplan: true,
      reason:
        'The trust concern has been addressed and buying intent is strong.',
      newGoal: 'MOVE_TO_DECISION',
      newStrategy: 'DECISION',
      nextAction:
        'Move toward a concrete conversion step.',
    };
  }

  return {
    shouldReplan: true,
    reason:
      'The trust concern has been addressed but additional customer understanding is required.',
    newGoal: 'BUILD_VALUE',
    newStrategy: 'VALUE',
    nextAction:
      'Return to the customer’s business needs and reinforce relevant value.',
  };
}

function replanAfterDecision(
  state: CustomerState,
): ReplanDecision {
  if (state.leadScore >= 85) {
    return {
      shouldReplan: true,
      reason:
        'The customer has reached a high-confidence decision state.',
      newGoal: 'BOOK_DEMO',
      newStrategy: 'DECISION',
      nextAction:
        'Offer or initiate a demo booking.',
    };
  }

  return {
    shouldReplan: true,
    reason:
      'The customer is approaching a decision but additional qualification is required.',
    newGoal: 'QUALIFY_LEAD',
    newStrategy: 'DISCOVERY',
    nextAction:
      'Ask one focused qualification question before proposing the final next step.',
  };
}

function determineNextGoal(
  state: CustomerState,
): AgenticGoal {
  const intent = state.intent.toLowerCase();
  const stage = state.buyingStage.toLowerCase();

  if (
    intent.includes('ready') ||
    intent.includes('purchase') ||
    intent.includes('buy') ||
    stage.includes('decision')
  ) {
    return 'MOVE_TO_DECISION';
  }

  if (state.needs.length === 0) {
    return 'DISCOVER_NEED';
  }

  return 'BUILD_VALUE';
}

function determineNextStrategy(
  state: CustomerState,
): SalesStrategy {
  const goal = determineNextGoal(state);

  switch (goal) {
    case 'DISCOVER_NEED':
      return 'DISCOVERY';

    case 'MOVE_TO_DECISION':
      return 'DECISION';

    default:
      return 'VALUE';
  }
}

function getRecoveryGoal(
  state: CustomerState,
): AgenticGoal {
  if (state.needs.length === 0) {
    return 'DISCOVER_NEED';
  }

  return 'UNDERSTAND_CUSTOMER';
}

function getRecoveryStrategy(
  state: CustomerState,
): SalesStrategy {
  if (state.needs.length === 0) {
    return 'DISCOVERY';
  }

  return 'DISCOVERY';
}