import type {
  AgentAction,
  AgenticDecision,
  CustomerState,
  SalesTool,
} from './types';

type BookDemoResponse = {
  success?: boolean;
  action?: Record<string, unknown>;
  message?: string;
  error?: string;
};

/**
 * Prevents the same BOOK_DEMO action from being fired repeatedly
 * while the same customer request is being analyzed multiple times.
 */
const executedActionKeys = new Set<string>();

function createActionKey(
  state: CustomerState,
  decision: AgenticDecision,
): string {
  return [
    state.customerId,
    decision.goal,
    state.lastCustomerMessage?.trim().toLowerCase() ?? '',
  ].join('|');
}

function createBaseAction(
  state: CustomerState,
  decision: AgenticDecision,
): AgentAction {
  return {
    id: `action_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    customerId: state.customerId,
    goal: decision.goal,
    strategy: decision.strategy,
    tool: decision.selectedTool ?? 'PRODUCT_KNOWLEDGE',
    action: decision.action,
    status: 'EXECUTING',
    createdAt: new Date().toISOString(),
  };
}

export async function executeSalesAction({
  state,
  decision,
}: {
  state: CustomerState;
  decision: AgenticDecision;
}): Promise<AgentAction> {
  const action = createBaseAction(state, decision);

  try {
    /*
     * ============================================================
     * BOOK DEMO → REAL ACTION API
     * ============================================================
     */

    if (
      decision.goal === 'BOOK_DEMO' &&
      decision.selectedTool === 'CALENDAR'
    ) {
      const actionKey = createActionKey(state, decision);

      /*
       * If this exact customer request was already processed,
       * don't fire another booking request.
       */
      if (executedActionKeys.has(actionKey)) {
        return {
          ...action,
          status: 'VERIFIED',
          result: {
            type: 'BOOK_DEMO',
            deduplicated: true,
            message:
              'Demo booking was already initiated for this customer request.',
          },
          verification: {
            verified: true,
            outcome: 'Demo booking already initiated.',
            reason:
              'Duplicate action prevented for the same customer request.',
          },
          completedAt: new Date().toISOString(),
        };
      }

      executedActionKeys.add(actionKey);

      const response = await fetch('/api/actions/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: state.customerId,
          customerName: state.name,
          company: state.company,
          leadScore: state.leadScore,
          buyingStage: state.buyingStage,
        }),
      });

      let data: BookDemoResponse = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || data.success !== true) {
        executedActionKeys.delete(actionKey);

        return {
          ...action,
          status: 'FAILED',
          result: {
            type: 'BOOK_DEMO',
            error:
              data.error ??
              'Demo booking API returned an unsuccessful response.',
          },
          completedAt: new Date().toISOString(),
        };
      }

      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'BOOK_DEMO',
          ...(data.action ?? {}),
          message:
            data.message ??
            'Demo booking initiated successfully.',
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * PRODUCT KNOWLEDGE
     * ============================================================
     */

    if (decision.selectedTool === 'PRODUCT_KNOWLEDGE') {
      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'PRODUCT_KNOWLEDGE',
          action:
            'Retrieve relevant product information and explain it conversationally.',
          customerNeed: state.needs,
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * ROI CALCULATOR
     * ============================================================
     */

    if (decision.selectedTool === 'ROI_CALCULATOR') {
      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'ROI_CALCULATOR',
          action:
            'Estimate business value and ROI using the customer context.',
          budget: state.budget ?? null,
          needs: state.needs,
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * CRM
     * ============================================================
     */

    if (decision.selectedTool === 'CRM') {
      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'CRM',
          action:
            'Analyze the customer’s existing CRM situation and identify gaps.',
          company: state.company ?? null,
          currentSituation: state.lastCustomerMessage ?? null,
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * FOLLOW-UP
     * ============================================================
     */

    if (decision.selectedTool === 'FOLLOW_UP') {
      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'FOLLOW_UP',
          action:
            'Prepare a personalized follow-up based on the current customer state.',
          customerId: state.customerId,
          buyingStage: state.buyingStage,
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * CALENDAR — NON-DEMO
     * ============================================================
     */

    if (decision.selectedTool === 'CALENDAR') {
      return {
        ...action,
        status: 'SUCCESS',
        result: {
          type: 'CALENDAR',
          action:
            'Prepare the next calendar-based conversion step.',
          customerId: state.customerId,
          buyingStage: state.buyingStage,
        },
        completedAt: new Date().toISOString(),
      };
    }

    /*
     * ============================================================
     * CONVERSATIONAL / NO EXTERNAL TOOL
     * ============================================================
     */

    return {
      ...action,
      tool: (decision.selectedTool ?? 'PRODUCT_KNOWLEDGE') as SalesTool,
      status: 'SUCCESS',
      result: {
        type: 'CONVERSATIONAL',
        action:
          'Continue the conversation using the selected sales strategy.',
        goal: decision.goal,
        strategy: decision.strategy,
      },
      completedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(
      '[SalesPilot Action Engine] Action failed:',
      error,
    );

    return {
      ...action,
      status: 'FAILED',
      result: {
        error:
          error instanceof Error
            ? error.message
            : 'Unknown action execution error.',
      },
      completedAt: new Date().toISOString(),
    };
  }
}