import type {
  AgenticDecision,
  CustomerState,
  SalesTool,
} from './types';

export function selectSalesTool(
  state: CustomerState,
  decision: AgenticDecision,
): SalesTool | undefined {
  switch (decision.goal) {
    case 'RESOLVE_PRICE_OBJECTION':
      return 'ROI_CALCULATOR';

    case 'UNDERSTAND_COMPETITION':
      return 'CRM';

    case 'EDUCATE_PRODUCT':
      return 'PRODUCT_KNOWLEDGE';

    case 'BUILD_TRUST':
      return 'PRODUCT_KNOWLEDGE';

    case 'BOOK_DEMO':
      return 'CALENDAR';

    case 'FOLLOW_UP':
      return 'FOLLOW_UP';

    case 'MOVE_TO_DECISION':
      if (state.leadScore >= 70) {
        return 'CALENDAR';
      }

      return undefined;

    case 'BUILD_VALUE':
      if (state.needs.length > 0) {
        return 'PRODUCT_KNOWLEDGE';
      }

      return undefined;

    case 'DISCOVER_NEED':
      return undefined;

    case 'UNDERSTAND_CUSTOMER':
      return undefined;

    case 'QUALIFY_LEAD':
      return undefined;

    default:
      return undefined;
  }
}

export function enrichDecisionWithTool(
  state: CustomerState,
  decision: AgenticDecision,
): AgenticDecision {
  const selectedTool = selectSalesTool(state, decision);

  return {
    ...decision,
    selectedTool,
  };
}