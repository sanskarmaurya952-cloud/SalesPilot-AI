'use client';

import { useState } from 'react';

type SalesIntelligence = {
  intent: string;
  sentiment: string;
  objection: string | null;
  buyingStage: string;
  leadScore: number;
  nextBestAction: string;

  customerProfile?: {
    name?: string;
    role?: string;
    company?: string;
    budget?: string;
    needs?: string[];
    preferences?: string[];
  };
};

type SalesIntelligencePanelProps = {
  intelligence: SalesIntelligence | null;
  customerId?: string;
};

function getActiveStrategy(
  intelligence: SalesIntelligence,
) {
  if (intelligence.objection === 'Price / Budget') {
    return {
      mode: 'PRICE OBJECTION MODE',
      description:
        'Focus on ROI → Understand budget → Recommend best-fit option',
    };
  }

  if (
    intelligence.objection ===
    'Existing Solution / Competition'
  ) {
    return {
      mode: 'COMPETITION MODE',
      description:
        'Understand priorities → Differentiate around customer needs',
    };
  }

  if (
    intelligence.objection ===
    'Product Understanding'
  ) {
    return {
      mode: 'PRODUCT EDUCATION MODE',
      description:
        'Simplify the product → Give relevant example → Offer demo',
    };
  }

  if (
    intelligence.objection ===
    'Timing / Decision Delay'
  ) {
    return {
      mode: 'TIMING MODE',
      description:
        'Understand timeline → Identify blocker → Plan follow-up',
    };
  }

  if (
    intelligence.objection ===
    'Trust / Security'
  ) {
    return {
      mode: 'TRUST MODE',
      description:
        'Address concerns → Build confidence → Stay transparent',
    };
  }

  if (
    intelligence.buyingStage === 'Decision' ||
    intelligence.intent === 'High Purchase Intent'
  ) {
    return {
      mode: 'DECISION MODE',
      description:
        'Reduce friction → Move toward the most relevant next action',
    };
  }

  if (intelligence.intent === 'Interested') {
    return {
      mode: 'VALUE MODE',
      description:
        'Connect product value to the customer’s specific needs',
    };
  }

  return {
    mode: 'DISCOVERY MODE',
    description:
      'Understand needs → Qualify the customer → Find product fit',
  };
}

export function SalesIntelligencePanel({
  intelligence,
  customerId,
}: SalesIntelligencePanelProps) {
  const [demoBooked, setDemoBooked] = useState(false);
  const [booking, setBooking] = useState(false);
  const [actionError, setActionError] =
    useState<string | null>(null);

  const activeStrategy = intelligence
    ? getActiveStrategy(intelligence)
    : null;

  const showBookDemo =
    intelligence &&
    (intelligence.buyingStage === 'Decision' ||
      intelligence.intent === 'High Purchase Intent');

  const score = intelligence
    ? Math.min(
        Math.max(intelligence.leadScore, 0),
        100,
      )
    : 0;

  const handleBookDemo = async () => {
    if (!customerId) {
      setActionError(
        'Customer session is not ready yet.',
      );
      return;
    }

    setBooking(true);
    setActionError(null);

    try {
      const response = await fetch(
        '/api/actions/book-demo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId,
            customerName:
              intelligence?.customerProfile?.name,
            company:
              intelligence?.customerProfile?.company,
            leadScore:
              intelligence?.leadScore,
            buyingStage:
              intelligence?.buyingStage,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            'Failed to initiate demo booking',
        );
      }

      console.log(
        '[SalesPilot Action] Book Demo:',
        data,
      );

      setDemoBooked(true);
    } catch (error) {
      console.error(
        '[SalesPilot Action] Book Demo failed:',
        error,
      );

      setActionError(
        error instanceof Error
          ? error.message
          : 'Failed to initiate demo booking',
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_2px_14px_rgba(0,0,0,0.045)]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="border-b border-border/70 px-4 pb-3.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm">
                🧠
              </div>

              <div>
                <h2 className="text-[15px] font-bold tracking-[-0.01em] text-foreground">
                  Sales Intelligence
                </h2>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Real-time customer understanding
                </p>
              </div>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            LIVE
          </span>
        </div>
      </div>

      {!intelligence ? (
        /* =====================================================
            EMPTY / ANALYZING STATE
        ===================================================== */
        <div className="p-4">
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border/80 bg-muted/[0.08] px-5 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-xl">
              🧠
            </div>

            <p className="text-sm font-semibold text-foreground">
              Analyzing conversation...
            </p>

            <p className="mt-1.5 max-w-[230px] text-[11px] leading-relaxed text-muted-foreground">
              Sales signals will appear here as the
              conversation develops.
            </p>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {/* ===================================================
              ACTIVE SALES STRATEGY
          =================================================== */}
          <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.045] p-3.5">
            {/* subtle accent */}
            <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-primary/70" />

            <div className="mb-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm">
                  🧠
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Active Sales Strategy
                  </p>

                  <p className="mt-0.5 text-[9px] text-muted-foreground/70">
                    AI adapting in real time
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-primary/25 bg-background/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
                ADAPTIVE
              </span>
            </div>

            <p className="text-[14px] font-bold tracking-[-0.01em] text-foreground">
              {activeStrategy?.mode}
            </p>

            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
              {activeStrategy?.description}
            </p>
          </div>

          {/* ===================================================
              SIGNAL GRID
          =================================================== */}
          <div className="grid grid-cols-2 gap-2.5">
            <IntelligenceItem
              label="Intent"
              value={intelligence.intent}
              icon="🎯"
            />

            <IntelligenceItem
              label="Sentiment"
              value={intelligence.sentiment}
              icon="😊"
            />

            <IntelligenceItem
              label="Objection"
              value={
                intelligence.objection ??
                'None detected'
              }
              icon="🚧"
            />

            <IntelligenceItem
              label="Buying Stage"
              value={intelligence.buyingStage}
              icon="🛒"
            />
          </div>

          {/* ===================================================
              LEAD SCORE
          =================================================== */}
          <div className="rounded-xl border border-border/80 bg-background/40 p-3.5">
            <div className="mb-2.5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Lead Score
                </p>

                <p className="mt-0.5 text-[9px] text-muted-foreground/60">
                  Purchase readiness
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold tracking-[-0.04em] text-foreground">
                  {score}
                </span>

                <span className="text-[10px] font-medium text-muted-foreground">
                  /100
                </span>
              </div>
            </div>

            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{
                  width: `${score}%`,
                }}
              />
            </div>

            <div className="mt-1.5 flex justify-between text-[8px] font-medium text-muted-foreground/60">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* ===================================================
              NEXT BEST ACTION
          =================================================== */}
          <div className="rounded-xl border border-border/80 bg-background/40 p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-sm">
                ⚡
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Next Best Action
                </p>

                <p className="mt-0.5 text-[9px] text-muted-foreground/60">
                  Recommended by SalesPilot
                </p>
              </div>
            </div>

            <p className="text-[12px] font-semibold leading-relaxed text-foreground">
              {intelligence.nextBestAction}
            </p>

            {/* =================================================
                REAL DEMO ACTION
            ================================================= */}
            {showBookDemo && !demoBooked && (
              <button
                type="button"
                onClick={handleBookDemo}
                disabled={booking}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-[11px] font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {booking ? '⏳' : '📅'}
                </span>

                <span>
                  {booking
                    ? 'Scheduling Demo...'
                    : 'Book Demo'}
                </span>
              </button>
            )}

            {/* =================================================
                ACTION ERROR
            ================================================= */}
            {actionError && (
              <div className="mt-3 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <span className="text-xs">⚠️</span>

                  <p className="text-[10px] leading-relaxed text-destructive">
                    {actionError}
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                SUCCESS STATE
            ================================================= */}
            {demoBooked && (
              <div className="mt-3 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs">
                    ✓
                  </div>

                  <span className="text-[11px] font-bold text-foreground">
                    Demo Booking Initiated
                  </span>
                </div>

                <p className="mt-1.5 pl-8 text-[10px] leading-relaxed text-muted-foreground">
                  SalesPilot created a real business
                  action for this qualified lead.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function IntelligenceItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="group min-w-0 rounded-xl border border-border/80 bg-background/40 p-3 transition-colors hover:border-border hover:bg-muted/[0.12]">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted/60 text-xs">
          {icon}
        </div>

        <span className="truncate text-[9px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
          {label}
        </span>
      </div>

      <p className="truncate text-[12px] font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}