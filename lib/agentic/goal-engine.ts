import type {
  AgenticGoal,
  AgenticDecision,
  CustomerState,
  SalesStrategy,
} from './types';

function hasPriceObjection(state: CustomerState): boolean {
  const objection =
    state.activeObjection?.toLowerCase() ?? '';

  return (
    objection.includes('price') ||
    objection.includes('budget') ||
    objection.includes('cost')
  );
}

function hasCompetitionObjection(
  state: CustomerState,
): boolean {
  const objection =
    state.activeObjection?.toLowerCase() ?? '';

  return (
    objection.includes('competition') ||
    objection.includes('competitor') ||
    objection.includes('existing solution') ||
    objection.includes('crm')
  );
}

function hasTrustConcern(state: CustomerState): boolean {
  const objection =
    state.activeObjection?.toLowerCase() ?? '';

  return (
    objection.includes('security') ||
    objection.includes('privacy') ||
    objection.includes('trust')
  );
}

function hasStrongBuyingIntent(
  state: CustomerState,
): boolean {
  const intent = state.intent.toLowerCase();
  const stage = state.buyingStage.toLowerCase();

  return (
    intent.includes('ready') ||
    intent.includes('purchase') ||
    intent.includes('buy') ||
    intent.includes('high intent') ||
    intent.includes('high purchase') ||
    stage.includes('decision')
  );
}

function customerRequestedDemo(
  state: CustomerState,
): boolean {
  const message =
    state.lastCustomerMessage?.toLowerCase() ?? '';

  return (
    message.includes('demo') ||
    message.includes('see a demo') ||
    message.includes('want a demo') ||
    message.includes('like to see') ||
    message.includes('show me') ||
    message.includes('schedule a demo') ||
    message.includes('book a demo') ||
    message.includes('arrange a demo') ||
    message.includes('try it') ||
    message.includes('trial')
  );
}

function customerRequestedProductEducation(
  state: CustomerState,
): boolean {
  const message =
    state.lastCustomerMessage?.toLowerCase() ?? '';

  return (
    message.includes('how does it work') ||
    message.includes('how it works') ||
    message.includes('explain the product') ||
    message.includes('explain how') ||
    message.includes('tell me how it works')
  );
}

function needsDiscovery(state: CustomerState): boolean {
  return (
    state.needs.length === 0 ||
    state.intent.toLowerCase() === 'unknown'
  );
}

function selectGoal(
  state: CustomerState,
): {
  goal: AgenticGoal;
  strategy: SalesStrategy;
  reason: string;
  action: string;
  expectedOutcome: string;
} {
  /*
   * SALES DECISION PRIORITY
   *
   * 1. Explicit conversion request
   * 2. Trust blocker
   * 3. Price blocker
   * 4. Competition blocker
   * 5. Product education
   * 6. Discovery
   * 7. Strong buying intent
   * 8. Build value
   *
   * The latest customer message has priority over
   * historical conversation context.
   */

  // 1. Explicit demo / trial / conversion request.
  //
  // This MUST come before historical objections.
  // Example:
  // Customer previously mentioned another CRM,
  // but now says "I want to see a demo".
  //
  // The agent should move forward instead of
  // reopening the old competition objection.
  if (customerRequestedDemo(state)) {
    return {
      goal: 'BOOK_DEMO',
      strategy: 'DECISION',
      reason:
        'The customer has explicitly requested a demo or concrete product trial action.',
      action:
        'Initiate the demo booking flow and confirm the customer’s preferred next step.',
      expectedOutcome:
        'A concrete demo or trial next step is initiated.',
    };
  }

  // 2. Active trust concern.
  if (hasTrustConcern(state)) {
    return {
      goal: 'BUILD_TRUST',
      strategy: 'TRUST',
      reason:
        'The customer has raised an active security, privacy, or trust concern.',
      action:
        'Address the active concern using verified product information.',
      expectedOutcome:
        'Customer becomes sufficiently confident to continue the conversation.',
    };
  }

  // 3. Active price/budget concern.
  if (hasPriceObjection(state)) {
    return {
      goal: 'RESOLVE_PRICE_OBJECTION',
      strategy: 'PRICE_OBJECTION',
      reason:
        'The customer has an active price or budget objection.',
      action:
        'Understand the budget constraint and demonstrate relevant ROI or value.',
      expectedOutcome:
        'The active price concern is reduced and the customer remains engaged.',
    };
  }

  // 4. Active competition concern.
  if (hasCompetitionObjection(state)) {
    return {
      goal: 'UNDERSTAND_COMPETITION',
      strategy: 'COMPETITION',
      reason:
        'The customer is actively comparing SalesPilot with an existing CRM or alternative solution.',
      action:
        'Understand what the customer values in the current solution and identify the remaining gap.',
      expectedOutcome:
        'A concrete business gap is identified for SalesPilot to address.',
    };
  }

  // 5. Explicit product education request.
  if (customerRequestedProductEducation(state)) {
    return {
      goal: 'EDUCATE_PRODUCT',
      strategy: 'PRODUCT_EDUCATION',
      reason:
        'The customer is asking how the product works or wants to understand its capabilities.',
      action:
        'Explain the product capability most relevant to the customer’s stated need.',
      expectedOutcome:
        'Customer understands how SalesPilot addresses their specific need.',
    };
  }

  // 6. Discovery before pitching when customer context
  // is insufficient.
  if (needsDiscovery(state)) {
    return {
      goal: 'DISCOVER_NEED',
      strategy: 'DISCOVERY',
      reason:
        'The customer state does not contain enough information about their needs.',
      action:
        'Ask one focused discovery question about the customer problem.',
      expectedOutcome:
        'Customer need and business context become clearer.',
    };
  }

  // 7. Strong buying intent moves toward conversion.
  if (hasStrongBuyingIntent(state)) {
    return {
      goal: 'MOVE_TO_DECISION',
      strategy: 'DECISION',
      reason:
        'The customer is showing strong purchase intent or has reached the decision stage.',
      action:
        'Confirm readiness and move toward the appropriate conversion action.',
      expectedOutcome:
        'Customer agrees to a concrete next step such as a demo or purchase.',
    };
  }

  // 8. Default: build value around known needs.
  return {
    goal: 'BUILD_VALUE',
    strategy: 'VALUE',
    reason:
      'The customer need is understood but the conversation has not reached a blocking objection or decision point.',
    action:
      'Connect SalesPilot capabilities to the customer’s stated needs and business outcomes.',
    expectedOutcome:
      'Customer perceives clear value and moves closer to a buying decision.',
  };
}

export function chooseSalesGoal(
  state: CustomerState,
): AgenticDecision {
  const decision = selectGoal(state);

  return {
    goal: decision.goal,
    strategy: decision.strategy,
    reason: decision.reason,
    action: decision.action,
    expectedOutcome: decision.expectedOutcome,
    confidence: calculateDecisionConfidence(
      state,
      decision.goal,
    ),
  };
}

function calculateDecisionConfidence(
  state: CustomerState,
  goal: AgenticGoal,
): number {
  let confidence = 60;

  if (state.lastCustomerMessage) {
    confidence += 10;
  }

  if (state.needs.length > 0) {
    confidence += 10;
  }

  if (state.intent !== 'Unknown') {
    confidence += 5;
  }

  if (state.buyingStage !== 'Unknown') {
    confidence += 5;
  }

  if (goal === 'BOOK_DEMO') {
    confidence += 10;
  }

  if (
    goal === 'RESOLVE_PRICE_OBJECTION' &&
    hasPriceObjection(state)
  ) {
    confidence += 10;
  }

  if (
    goal === 'UNDERSTAND_COMPETITION' &&
    hasCompetitionObjection(state)
  ) {
    confidence += 10;
  }

  if (
    goal === 'BUILD_TRUST' &&
    hasTrustConcern(state)
  ) {
    confidence += 10;
  }

  return Math.min(100, confidence);
}