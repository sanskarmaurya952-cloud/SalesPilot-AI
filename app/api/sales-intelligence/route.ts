import { NextRequest, NextResponse } from 'next/server';

type SalesIntelligence = {
  intent: string;
  sentiment: string;
  objection: string | null;
  buyingStage: string;
  leadScore: number;
  nextBestAction: string;

  customerProfile: {
    name?: string;
    role?: string;
    company?: string;
    budget?: string;
    needs: string[];
    preferences: string[];
  };
};

function cleanExtractedValue(value?: string): string | undefined {
  if (!value) return undefined;

  return value
    .trim()
    .replace(/^[\s,:;-]+/, '')
    .replace(/[.,!?]+$/, '')
    .replace(/\s+/g, ' ');
}

function cleanNeed(value?: string): string | undefined {
  const cleaned = cleanExtractedValue(value);

  if (!cleaned) return undefined;

  let result = cleaned;

  // Remove common conversational prefixes.
  result = result
    .replace(
      /^(?:and|because|so|actually|we are|we're|i am|i'm|we are looking for|we're looking for)\s+/i,
      '',
    )
    .trim();

  // Remove common trailing conversational phrases.
  result = result
    .replace(
      /\s+(?:because|as|since|so|but|and see if|and|that)\s+.*$/i,
      '',
    )
    .trim();

  // Normalize common sales-automation wording.
  if (
    /\bsales automation solution\b/i.test(result)
  ) {
    return 'Sales automation solution';
  }

  if (
    /\bsales automation\b/i.test(result)
  ) {
    return 'Sales automation';
  }

  if (
    /\bautomated?\s+follow[- ]?ups?\b/i.test(result)
  ) {
    return 'Automated sales follow-ups';
  }

  return result;
}

function isInvalidCompanyCandidate(
  candidate: string,
): boolean {
  const invalidCompanyPatterns = [
    /^(?:another|an|a|the)\s+crm$/i,
    /^current\s+crm$/i,
    /^existing\s+crm$/i,
    /^another\s+solution$/i,
    /^existing\s+solution$/i,
    /^current\s+solution$/i,
    /^crm$/i,
    /^solution$/i,
    /^product$/i,
    /^sales automation$/i,
    /^sales automation solution$/i,
    /^small sas startup$/i,
    /^small saas startup$/i,
  ];

  return invalidCompanyPatterns.some(
    (pattern) => pattern.test(candidate),
  );
}

function extractCustomerProfile(transcript: string) {
  const profile: SalesIntelligence['customerProfile'] = {
    needs: [],
    preferences: [],
  };

  // ---------------------------------------------------------
  // NAME DETECTION
  // ---------------------------------------------------------

  const namePatterns = [
    /\bmy name is\s+([A-Za-z][A-Za-z'-]{1,30})(?:\s|,|\.|$)/i,
    /\bthis is\s+([A-Za-z][A-Za-z'-]{1,30})(?:\s|,|\.|$)/i,
    /\bi'm\s+([A-Za-z][A-Za-z'-]{1,30})(?:\s*,|\s+and|\s+from|\s+the|\s+at|\.|$)/i,
    /\bi am\s+([A-Za-z][A-Za-z'-]{1,30})(?:\s*,|\s+and|\s+from|\s+the|\s+at|\.|$)/i,
    /\bname\s*:\s*([A-Za-z][A-Za-z'-]{1,30})/i,
  ];

  for (const pattern of namePatterns) {
    const match = transcript.match(pattern);

    if (match?.[1]) {
      const candidate = cleanExtractedValue(
        match[1],
      );

      if (
        candidate &&
        candidate.length >= 2 &&
        !/^(interested|looking|thinking|considering|calling|from|a|an|the|founder|manager|developer|engineer)$/i.test(
          candidate,
        )
      ) {
        profile.name = candidate;
        break;
      }
    }
  }

  // ---------------------------------------------------------
  // ROLE DETECTION
  // ---------------------------------------------------------

  const rolePatterns = [
    /\b(?:i am|i'm|my role is|i work as|i'm the|i am the)\s+(?:an?\s+)?(founder|co-founder|ceo|cto|cfo|coo|manager|director|developer|engineer|designer|student|consultant|business owner|owner|sales manager|marketing manager|product manager)\b/i,

    /\b(?:as a|as an)\s+(founder|co-founder|ceo|cto|cfo|coo|manager|director|developer|engineer|designer|student|consultant|business owner|owner|sales manager|marketing manager|product manager)\b/i,

    /\b(?:founder|co-founder|ceo|cto|cfo|coo|manager|director|developer|engineer|designer|student|consultant|business owner|owner|sales manager|marketing manager|product manager)\b/i,
  ];

  for (const pattern of rolePatterns) {
    const match = transcript.match(pattern);

    if (match) {
      const roleCandidate =
        match[1] || match[0];

      const cleanedRole =
        cleanExtractedValue(roleCandidate);

      if (cleanedRole) {
        profile.role = cleanedRole;
        break;
      }
    }
  }

  // ---------------------------------------------------------
  // COMPANY DETECTION
  // ---------------------------------------------------------

  /*
   * IMPORTANT:
   * We only accept a company when the customer explicitly
   * identifies an organization.
   *
   * "We already use another CRM"
   * must NOT become:
   *
   * Company = "your current CRM"
   */

  const companyPatterns = [
    /\b(?:i work at|i work for|i'm from|i am from)\s+([A-Za-z0-9][A-Za-z0-9 .&'-]{1,60}?)(?=\s+(?:and|but|we|our|i|my)\b|[.!?]|$)/i,

    /\b(?:company is|our company is|our startup is|the company is)\s+([A-Za-z0-9][A-Za-z0-9 .&'-]{1,60}?)(?=\s+(?:and|but|we|our|i|my)\b|[.!?]|$)/i,
  ];

  for (const pattern of companyPatterns) {
    const match = transcript.match(pattern);

    if (match?.[1]) {
      const candidate =
        cleanExtractedValue(match[1]);

      if (
        candidate &&
        candidate.length >= 2 &&
        !isInvalidCompanyCandidate(candidate)
      ) {
        profile.company = candidate;
        break;
      }
    }
  }

  // Only accept explicit "at <company>" / "from <company>"
  // when it looks like a real organization name.
  if (!profile.company) {
    const directCompanyMatch =
      transcript.match(
        /\b(?:at|from)\s+([A-Z][A-Za-z0-9 .&'-]{1,50})(?=\s+(?:and|but|we|our|i|my)\b|[.!?]|$)/,
      );

    if (directCompanyMatch?.[1]) {
      const candidate =
        cleanExtractedValue(
          directCompanyMatch[1],
        );

      if (
        candidate &&
        candidate.length >= 2 &&
        !isInvalidCompanyCandidate(candidate) &&
        !/^(?:a|an|the)\s+/i.test(candidate)
      ) {
        profile.company = candidate;
      }
    }
  }

  // ---------------------------------------------------------
  // BUDGET DETECTION
  // ---------------------------------------------------------

  const numericBudgetPatterns = [
    /\b(?:our\s+|my\s+|the\s+)?budget\s+(?:is|would be|of|around|about|roughly|approximately|under|below|up to|upto|near|near about)?\s*(?:₹|rs\.?|rupees)?\s*[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k|K)?\b/i,

    /\b(?:we can spend|i can spend|we could spend|we are willing to spend|we're willing to spend|we can afford|i can afford|we can go up to|i can go up to|up to|upto)\s+(?:₹|rs\.?|rupees)?\s*[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k|K)?\b/i,

    /(?:₹|rs\.?|rupees)\s*[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k|K)?\b/i,

    /\b[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k|K)\b/i,
  ];

  const wordBudgetPatterns = [
    /\b(?:our\s+|my\s+|the\s+)?budget\s+(?:is|would be|of|around|about|roughly|approximately|under|below|up to|upto|near|near about)?\s*(?:about\s+|around\s+|roughly\s+)?(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|twenty-five|thirty|thirty-five|forty|forty-five|fifty|fifty-five|sixty|sixty-five|seventy|seventy-five|eighty|eighty-five|ninety|ninety-five|one hundred)(?:\s+(?:and\s+)?(?:one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|twenty-five|thirty|thirty-five|forty|forty-five|fifty|fifty-five|sixty|sixty-five|seventy|seventy-five|eighty|eighty-five|ninety|ninety-five))?\s+(?:thousand|lakh|lakhs)(?:\s+rupees?)?/i,

    /\b(?:we can spend|i can spend|we could spend|we are willing to spend|we're willing to spend|we can afford|i can afford|we can go up to|i can go up to|up to|upto)\s+(?:about\s+|around\s+|roughly\s+)?(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|twenty-five|thirty|thirty-five|forty|forty-five|fifty|fifty-five|sixty|sixty-five|seventy|seventy-five|eighty|eighty-five|ninety|ninety-five|one hundred)(?:\s+(?:and\s+)?(?:one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|twenty-five|thirty|thirty-five|forty|forty-five|fifty|fifty-five|sixty|sixty-five|seventy|seventy-five|eighty|eighty-five|ninety|ninety-five))?\s+(?:thousand|lakh|lakhs)(?:\s+rupees?)?/i,
  ];

  let budgetMatch: RegExpMatchArray | null =
    null;

  for (const pattern of numericBudgetPatterns) {
    const match = transcript.match(pattern);

    if (match?.[0]) {
      budgetMatch = match;
      break;
    }
  }

  if (!budgetMatch) {
    for (const pattern of wordBudgetPatterns) {
      const match = transcript.match(pattern);

      if (match?.[0]) {
        budgetMatch = match;
        break;
      }
    }
  }

  if (budgetMatch?.[0]) {
    let budget = cleanExtractedValue(
      budgetMatch[0],
    );

    if (budget) {
      budget = budget
        .replace(
          /\b(?:our|my|the)\s+budget\s+(?:is|would be|of)\s*/i,
          '',
        )
        .replace(
          /\b(?:our|my|the)\s+budget\s*/i,
          '',
        )
        .replace(
          /^(?:budget\s+(?:is|around|about|of|under|below|up to|upto)\s*)/i,
          '',
        )
        .trim();

      profile.budget = budget;
    }
  }

  // ---------------------------------------------------------
  // NEED DETECTION
  // ---------------------------------------------------------

  const needPatterns = [
    /\b(?:we need|i need|we want|i want|looking for|need help with|want help with)\s+([^.!?\n]{3,120})/gi,

    /\b(?:our main need is|our requirement is|the requirement is)\s+([^.!?\n]{3,120})/gi,

    /\b(?:we are looking for|we're looking for)\s+([^.!?\n]{3,120})/gi,
  ];

  const detectedNeeds =
    new Set<string>();

  for (const pattern of needPatterns) {
    let match: RegExpExecArray | null;

    while (
      (match = pattern.exec(transcript)) !== null
    ) {
      const candidate = cleanNeed(
        match[1],
      );

      if (
        candidate &&
        candidate.length >= 3 &&
        candidate.length <= 120
      ) {
        detectedNeeds.add(candidate);
      }
    }
  }

  // Explicit high-value sales need.
  if (
    /\bsales automation\b/i.test(
      transcript,
    )
  ) {
    detectedNeeds.add(
      'Sales automation solution',
    );
  }

  profile.needs = Array.from(
    detectedNeeds,
  ).slice(0, 5);

  // ---------------------------------------------------------
  // PREFERENCE DETECTION
  // ---------------------------------------------------------

  const preferencePatterns = [
    /\b(?:i prefer|we prefer|i'd prefer|we'd prefer)\s+([^.!?\n]{3,100})/gi,

    /\b(?:i like|we like|i would like|we would like)\s+([^.!?\n]{3,100})/gi,

    /\b(?:prefer)\s+([^.!?\n]{3,100})/gi,
  ];

  const detectedPreferences =
    new Set<string>();

  for (const pattern of preferencePatterns) {
    let match: RegExpExecArray | null;

    while (
      (match = pattern.exec(transcript)) !== null
    ) {
      const candidate =
        cleanExtractedValue(match[1]);

      if (
        candidate &&
        candidate.length >= 3 &&
        candidate.length <= 100
      ) {
        // Don't store objections as preferences.
        if (
          /(?:expensive|too much|too costly|budget|price|₹|rs |rupees)/i.test(
            candidate,
          )
        ) {
          continue;
        }

        detectedPreferences.add(
          candidate,
        );
      }
    }
  }

  profile.preferences =
    Array.from(
      detectedPreferences,
    ).slice(0, 5);

  return profile;
}

function analyzeSalesConversation(
  transcript: string,
): SalesIntelligence {
  const text = transcript.toLowerCase();

  // ---------------------------------------------------------
  // INTENT
  // ---------------------------------------------------------

  const highIntentSignals = [
    'ready to buy',
    'ready to purchase',
    'want to buy',
    'want to purchase',
    'sign up',
    'signup',
    'subscribe',
    'purchase',
    'buy this',
    'let us start',
    "let's start",
    'move forward',
    'go ahead',
    'place the order',
    'how can i buy',
    'how do i buy',
    'ready to move forward',
    'ready to get started',
  ];

  const interestSignals = [
    'interested',
    'looks useful',
    'look useful',
    'sounds good',
    'looks good',
    'like the product',
    'i like',
    'useful',
    'helpful',
    'tell me more',
    'want to know',
    'would like to know',
    'show me',
    'show us',
    'how does it work',
    'can you explain',
    'what do you offer',
    'what are the plans',
    'what is the pricing',
    'pricing',
    'price',
    'budget',
    'consider',
    'considering',
    'evaluate',
    'evaluation',
    'compare',
    'competitor',
    'alternative',
    'demo',
    'trial',
  ];

  const lowInterestSignals = [
    'not interested',
    'no thanks',
    "don't need",
    'do not need',
    'not looking',
    'stop calling',
    'leave me alone',
    'not useful',
    'waste of time',
  ];

  const hasHighIntent =
    highIntentSignals.some(
      (signal) => text.includes(signal),
    );

  const hasInterest =
    interestSignals.some(
      (signal) => text.includes(signal),
    );

  const hasLowInterest =
    lowInterestSignals.some(
      (signal) => text.includes(signal),
    );

  let intent = 'Exploring';

  if (
    hasLowInterest &&
    !hasInterest &&
    !hasHighIntent
  ) {
    intent = 'Low Interest';
  } else if (hasHighIntent) {
    intent = 'High Purchase Intent';
  } else if (hasInterest) {
    intent = 'Interested';
  }

  // ---------------------------------------------------------
  // SENTIMENT
  // ---------------------------------------------------------

  const positiveSignals = [
    'great',
    'awesome',
    'excellent',
    'love',
    'amazing',
    'good',
    'helpful',
    'useful',
    'interested',
    'excited',
    'like',
    'looks good',
    'sounds good',
  ];

  const negativeSignals = [
    'bad',
    'terrible',
    'angry',
    'frustrated',
    'annoyed',
    'disappointed',
    'hate',
    'useless',
    'waste',
    'problem',
  ];

  const positiveCount =
    positiveSignals.filter(
      (signal) => text.includes(signal),
    ).length;

  const negativeCount =
    negativeSignals.filter(
      (signal) => text.includes(signal),
    ).length;

  let sentiment = 'Neutral';

  if (
    positiveCount > negativeCount &&
    positiveCount > 0
  ) {
    sentiment = 'Positive';
  }

  if (
    negativeCount > positiveCount &&
    negativeCount > 0
  ) {
    sentiment = 'Negative';
  }

  // ---------------------------------------------------------
  // OBJECTION
  // ---------------------------------------------------------

  /*
   * IMPORTANT:
   * Objection priority is based on the LATEST objection
   * mentioned in the transcript.
   *
   * This prevents:
   *
   * Price objection → Competition objection
   *
   * from staying stuck in PRICE OBJECTION MODE.
   */

  const objectionPatterns = [
    {
      type: 'Price / Budget',
      pattern:
        /expensive|too much|costly|price|pricing|budget|afford|₹|rs |rs\.|rupees|thousand|lakh/gi,
    },

    {
      type: 'Existing Solution / Competition',
      pattern:
        /competitor|competitors|alternative|already use|already using|existing solution|current solution|current crm|existing crm|another crm|using another crm|switch from|why should we switch/gi,
    },

    {
      type: 'Product Understanding',
      pattern:
        /don't understand|do not understand|how does it work|confused|explain|unclear/gi,
    },

    {
      type: 'Timing / Decision Delay',
      pattern:
        /not now|later|maybe later|think about it|need time|discuss internally|not ready/gi,
    },

    {
      type: 'Trust / Security',
      pattern:
        /trust|secure|security|privacy|safe|data protection|data/gi,
    },
  ];

  let objection: string | null = null;
  let latestObjectionIndex = -1;

  for (const item of objectionPatterns) {
    let match: RegExpExecArray | null;

    while (
      (match = item.pattern.exec(text)) !== null
    ) {
      if (match.index > latestObjectionIndex) {
        latestObjectionIndex = match.index;
        objection = item.type;
      }
    }
  }

  // ---------------------------------------------------------
  // BUYING STAGE
  // ---------------------------------------------------------

  const purchaseSignals = [
    'payment completed',
    'signed up successfully',
    'i purchased',
    'we purchased',
    'i bought',
    'we bought',
    'i subscribed',
    'we subscribed',
    'place the order',
    'placed the order',
  ];

  const decisionSignals = [
    'book a demo',
    'book demo',
    'schedule a demo',
    'schedule meeting',
    'schedule a meeting',
    'demo',
    'trial',
    'proposal',
    'ready to buy',
    'ready to purchase',
    'move forward',
    'go ahead',
  ];

  const considerationSignals = [
    'price',
    'pricing',
    'budget',
    'expensive',
    'costly',
    'compare',
    'competitor',
    'competitors',
    'alternative',
    'evaluate',
    'evaluation',
    'consider',
    'considering',
  ];

  const hasPurchaseSignal =
    purchaseSignals.some(
      (signal) => text.includes(signal),
    );

  const hasDecisionSignal =
    decisionSignals.some(
      (signal) => text.includes(signal),
    );

  const hasConsiderationSignal =
    considerationSignals.some(
      (signal) => text.includes(signal),
    );

  let buyingStage = 'Awareness';

  if (hasConsiderationSignal) {
    buyingStage = 'Consideration';
  }

  if (hasDecisionSignal) {
    buyingStage = 'Decision';
  }

  if (hasPurchaseSignal) {
    buyingStage = 'Purchase';
  }

  // ---------------------------------------------------------
  // BUDGET DETECTION FOR SCORING
  // ---------------------------------------------------------

  const budgetPatterns = [
    /\bbudget\b.*?(?:₹|rs\.?|rupees)?\s*[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k)?/i,

    /(?:₹|rs\.?|rupees)\s*[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k)?/i,

    /[\d,]+(?:\.\d+)?\s*(?:thousand|lakh|lakhs|k)\b/i,

    /\b(?:forty|fifty|sixty|seventy|eighty|ninety|twenty|thirty|one hundred)\s+(?:thousand|lakh|lakhs)\b/i,

    /\b(?:we can spend|i can spend|we can go up to|i can go up to)\b/i,
  ];

  const budgetDetected =
    budgetPatterns.some(
      (pattern) => pattern.test(transcript),
    );

  // ---------------------------------------------------------
  // LEAD SCORE
  // ---------------------------------------------------------

  let leadScore = 35;

  if (intent === 'Interested') {
    leadScore += 20;
  }

  if (intent === 'High Purchase Intent') {
    leadScore += 35;
  }

  if (intent === 'Low Interest') {
    leadScore -= 30;
  }

  if (sentiment === 'Positive') {
    leadScore += 10;
  }

  if (sentiment === 'Negative') {
    leadScore -= 15;
  }

  if (buyingStage === 'Consideration') {
    leadScore += 10;
  }

  if (buyingStage === 'Decision') {
    leadScore += 20;
  }

  if (buyingStage === 'Purchase') {
    leadScore += 30;
  }

  if (objection) {
    leadScore += 3;
  }

  if (budgetDetected) {
    leadScore += 5;
  }

  if (
    objection === 'Price / Budget' &&
    sentiment === 'Positive' &&
    (
      intent === 'Interested' ||
      intent === 'High Purchase Intent'
    )
  ) {
    leadScore += 7;
  }

  leadScore = Math.max(
    0,
    Math.min(100, leadScore),
  );

  // ---------------------------------------------------------
  // NEXT BEST ACTION
  // ---------------------------------------------------------

  let nextBestAction =
    'Ask a focused discovery question';

  if (objection === 'Price / Budget') {
    if (budgetDetected) {
      nextBestAction =
        'Address ROI and recommend a plan within the customer’s budget';
    } else {
      nextBestAction =
        'Understand budget and address ROI before recommending a plan';
    }
  } else if (
    objection ===
    'Existing Solution / Competition'
  ) {
    nextBestAction =
      'Understand current CRM limitations and differentiate based on the customer’s priorities';
  } else if (
    objection === 'Product Understanding'
  ) {
    nextBestAction =
      'Explain the product with a relevant example or demo';
  } else if (
    objection === 'Timing / Decision Delay'
  ) {
    nextBestAction =
      'Identify the decision timeline and schedule a follow-up';
  } else if (
    objection === 'Trust / Security'
  ) {
    nextBestAction =
      'Address security and trust concerns transparently';
  } else if (
    buyingStage === 'Decision' ||
    intent === 'High Purchase Intent'
  ) {
    nextBestAction =
      'Move toward demo, meeting, trial, or purchase';
  } else if (intent === 'Interested') {
    nextBestAction =
      'Qualify needs and recommend the best-fit solution';
  } else if (intent === 'Low Interest') {
    nextBestAction =
      'Understand the reason for low interest';
  }

  // ---------------------------------------------------------
  // CUSTOMER PROFILE
  // ---------------------------------------------------------

  const customerProfile =
    extractCustomerProfile(transcript);

  console.log(
    '[SalesPilot API] Extracted customer profile:',
    customerProfile,
  );

  console.log(
    '[SalesPilot API] Latest objection:',
    objection,
  );

  return {
    intent,
    sentiment,
    objection,
    buyingStage,
    leadScore,
    nextBestAction,
    customerProfile,
  };
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const { transcript } = body;

    if (
      !transcript ||
      typeof transcript !== 'string'
    ) {
      return NextResponse.json(
        {
          error: 'transcript is required',
        },
        { status: 400 },
      );
    }

    console.log(
      '[SalesPilot API] Transcript received:',
      transcript,
    );

    const intelligence =
      analyzeSalesConversation(transcript);

    return NextResponse.json({
      success: true,
      intelligence,
    });
  } catch (error) {
    console.error(
      'Sales intelligence error:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'Failed to process sales intelligence request',
      },
      { status: 500 },
    );
  }
}