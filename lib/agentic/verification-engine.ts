import type {
  AgentAction,
  ActionStatus,
} from './types';

export type VerificationResult = {
  verified: boolean;
  outcome: string;
  reason?: string;
};

export function verifySalesAction(
  action: AgentAction,
): AgentAction {
  const verification =
    verifyActionResult(action);

  const status: ActionStatus =
    verification.verified
      ? 'VERIFIED'
      : 'FAILED';

  return {
    ...action,
    status,
    verification,
    completedAt:
      action.completedAt ??
      new Date().toISOString(),
  };
}

function verifyActionResult(
  action: AgentAction,
): VerificationResult {
  if (action.status === 'FAILED') {
    return {
      verified: false,
      outcome: 'Action failed.',
      reason:
        typeof action.result?.error === 'string'
          ? action.result.error
          : 'The action returned a failure state.',
    };
  }

  if (!action.result) {
    return {
      verified: false,
      outcome: 'No action result was returned.',
      reason:
        'The agent cannot confirm that the requested action completed.',
    };
  }

  switch (action.tool) {
    case 'PRODUCT_KNOWLEDGE':
      return verifyProductKnowledge(action);

    case 'ROI_CALCULATOR':
      return verifyRoiCalculation(action);

    case 'CRM':
      return verifyCrmAnalysis(action);

    case 'CALENDAR':
      return verifyCalendarAction(action);

    case 'FOLLOW_UP':
      return verifyFollowUpAction(action);

    default:
      return {
        verified: false,
        outcome: 'Unknown tool result.',
        reason:
          'The verification engine does not recognize this tool.',
      };
  }
}

function verifyProductKnowledge(
  action: AgentAction,
): VerificationResult {
  const status = action.result?.status;

  if (
    status === 'READY' ||
    status === 'SUCCESS' ||
    status === 'AVAILABLE'
  ) {
    return {
      verified: true,
      outcome:
        'Verified product knowledge is available for the current customer context.',
    };
  }

  return {
    verified: false,
    outcome:
      'Product knowledge could not be verified.',
    reason:
      'The product knowledge tool did not return a recognized success state.',
  };
}

function verifyRoiCalculation(
  action: AgentAction,
): VerificationResult {
  const status = action.result?.status;

  if (
    status === 'CALCULATED' ||
    status === 'SUCCESS'
  ) {
    return {
      verified: true,
      outcome:
        'ROI analysis was successfully calculated.',
    };
  }

  return {
    verified: false,
    outcome:
      'ROI calculation was not completed.',
    reason:
      'The ROI tool did not return a recognized success state.',
  };
}

function verifyCrmAnalysis(
  action: AgentAction,
): VerificationResult {
  const status = action.result?.status;

  if (
    status === 'READY' ||
    status === 'SUCCESS' ||
    status === 'AVAILABLE'
  ) {
    return {
      verified: true,
      outcome:
        'Existing CRM context has been identified for competitive analysis.',
    };
  }

  return {
    verified: false,
    outcome:
      'CRM analysis could not be verified.',
    reason:
      'The CRM tool did not return a recognized success state.',
  };
}

function verifyCalendarAction(
  action: AgentAction,
): VerificationResult {
  const status = action.result?.status;

  /*
   * Calendar actions can be successfully initiated without
   * being fully completed. INITIATED is therefore a valid
   * verification state for the current MVP flow.
   */
  if (
    status === 'READY' ||
    status === 'INITIATED' ||
    status === 'SUCCESS' ||
    status === 'BOOKED' ||
    status === 'SCHEDULED'
  ) {
    return {
      verified: true,
      outcome:
        status === 'INITIATED'
          ? 'Calendar booking action was successfully initiated.'
          : 'Calendar action was successfully verified.',
    };
  }

  return {
    verified: false,
    outcome:
      'Calendar action could not be verified.',
    reason:
      'The calendar tool did not return a recognized success state.',
  };
}

function verifyFollowUpAction(
  action: AgentAction,
): VerificationResult {
  const status = action.result?.status;

  if (
    status === 'READY' ||
    status === 'SUCCESS' ||
    status === 'SENT' ||
    status === 'SCHEDULED'
  ) {
    return {
      verified: true,
      outcome:
        'Follow-up action has been successfully prepared.',
    };
  }

  return {
    verified: false,
    outcome:
      'Follow-up action could not be verified.',
    reason:
      'The follow-up tool did not return a recognized success state.',
  };
}