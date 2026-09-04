import type {
  CustomerState,
  SalesStrategy,
} from './types';

type SalesIntelligenceInput = {
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
};

type CustomerMemoryInput = {
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
};

function normalizeText(value?: string | null): string {
  return value?.trim() ?? '';
}

function unique(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function isSameObjection(
  first: string,
  second: string,
): boolean {
  return first.toLowerCase() === second.toLowerCase();
}

function inferStrategy(
  intelligence: SalesIntelligenceInput,
): SalesStrategy {
  const objection =
    intelligence.objection?.toLowerCase() ?? '';

  const intent =
    intelligence.intent?.toLowerCase() ?? '';

  const buyingStage =
    intelligence.buyingStage?.toLowerCase() ?? '';

  if (
    objection.includes('price') ||
    objection.includes('budget') ||
    objection.includes('cost')
  ) {
    return 'PRICE_OBJECTION';
  }

  if (
    objection.includes('competition') ||
    objection.includes('competitor') ||
    objection.includes('existing solution') ||
    objection.includes('crm')
  ) {
    return 'COMPETITION';
  }

  if (
    objection.includes('security') ||
    objection.includes('privacy') ||
    objection.includes('trust')
  ) {
    return 'TRUST';
  }

  if (
    intent.includes('ready') ||
    intent.includes('purchase') ||
    intent.includes('buy') ||
    buyingStage.includes('decision')
  ) {
    return 'DECISION';
  }

  if (
    intent.includes('information') ||
    intent.includes('learn') ||
    buyingStage.includes('awareness')
  ) {
    return 'DISCOVERY';
  }

  return 'VALUE';
}

function isObjectionResolved(
  objection: string,
  lastCustomerMessage?: string,
): boolean {
  if (!lastCustomerMessage) {
    return false;
  }

  const message =
    lastCustomerMessage.toLowerCase();

  const normalizedObjection =
    objection.toLowerCase();

  if (
    normalizedObjection.includes('price') ||
    normalizedObjection.includes('budget') ||
    normalizedObjection.includes('cost')
  ) {
    return (
      message.includes('price is fine') ||
      message.includes('price works') ||
      message.includes('budget works') ||
      message.includes('within budget') ||
      message.includes('affordable') ||
      message.includes('that works') ||
      message.includes('okay with the price') ||
      message.includes('okay with price') ||
      message.includes('cost is fine')
    );
  }

  if (
    normalizedObjection.includes('competition') ||
    normalizedObjection.includes('competitor') ||
    normalizedObjection.includes('existing solution') ||
    normalizedObjection.includes('crm')
  ) {
    return (
      message.includes('i would switch') ||
      message.includes('we can switch') ||
      message.includes('makes sense to switch') ||
      message.includes('i am convinced') ||
      message.includes('that makes sense') ||
      message.includes('better than our crm')
    );
  }

  if (
    normalizedObjection.includes('security') ||
    normalizedObjection.includes('privacy') ||
    normalizedObjection.includes('trust')
  ) {
    return (
      message.includes('sounds secure') ||
      message.includes('i feel comfortable') ||
      message.includes('that answers my concern') ||
      message.includes('security is fine') ||
      message.includes('privacy is fine')
    );
  }

  return false;
}

export function buildCustomerState({
  customerId,
  memory,
  intelligence,
  lastCustomerMessage,
  lastAgentAction,
  lastActionResult,
}: {
  customerId: string;
  memory?: CustomerMemoryInput | null;
  intelligence?: SalesIntelligenceInput | null;
  lastCustomerMessage?: string;
  lastAgentAction?: string;
  lastActionResult?: string;
}): CustomerState {
  const profile =
    intelligence?.customerProfile ?? {};

  const needs = unique([
    ...(memory?.needs ?? []),
    ...(profile.needs ?? []),
  ]);

  const preferences = unique([
    ...(memory?.preferences ?? []),
    ...(profile.preferences ?? []),
  ]);

  const historicalObjections = unique([
    ...(memory?.objections ?? []),
    ...(intelligence?.objection
      ? [intelligence.objection]
      : []),
  ]);

  const currentObjection =
    normalizeText(intelligence?.objection);

  const resolvedObjections = unique(
    historicalObjections.filter((objection) =>
      isObjectionResolved(
        objection,
        lastCustomerMessage,
      ),
    ),
  );

  const activeObjection =
    currentObjection &&
    !resolvedObjections.some((resolved) =>
      isSameObjection(
        resolved,
        currentObjection,
      ),
    )
      ? currentObjection
      : undefined;

  const intent =
    normalizeText(
      intelligence?.intent ??
        memory?.lastIntent,
    ) || 'Unknown';

  const sentiment =
    normalizeText(
      intelligence?.sentiment ??
        memory?.lastSentiment,
    ) || 'Unknown';

  const buyingStage =
    normalizeText(
      intelligence?.buyingStage ??
        memory?.buyingStage,
    ) || 'Unknown';

  const leadScore =
    typeof intelligence?.leadScore === 'number'
      ? Math.max(
          0,
          Math.min(100, intelligence.leadScore),
        )
      : 0;

  const mergedProfile = {
    name:
      normalizeText(
        profile.name ?? memory?.name,
      ) || undefined,

    role:
      normalizeText(
        profile.role ?? memory?.role,
      ) || undefined,

    company:
      normalizeText(
        profile.company ?? memory?.company,
      ) || undefined,

    budget:
      normalizeText(
        profile.budget ?? memory?.budget,
      ) || undefined,
  };

  const strategy = inferStrategy({
    ...intelligence,
    objection: activeObjection,
  });

  return {
    customerId,

    name: mergedProfile.name,
    role: mergedProfile.role,
    company: mergedProfile.company,
    budget: mergedProfile.budget,

    needs,
    preferences,

    objections: historicalObjections,

    activeObjection,

    resolvedObjections,

    intent,
    sentiment,
    buyingStage,

    leadScore,

    currentStrategy: strategy,

    currentGoal: 'UNDERSTAND_CUSTOMER',

    lastCustomerMessage:
      normalizeText(lastCustomerMessage) ||
      undefined,

    lastAgentAction:
      normalizeText(lastAgentAction) ||
      undefined,

    lastActionResult:
      normalizeText(lastActionResult) ||
      undefined,

    updatedAt: new Date().toISOString(),
  };
}