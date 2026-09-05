'use client';

import type { AgenticLoopResult } from '@/lib/agentic/agentic-loop';

type AgenticDecisionPanelProps = {
  result: AgenticLoopResult | null;
};

const steps = [
  { key: 'observe', label: 'Observe' },
  { key: 'decide', label: 'Decide' },
  { key: 'act', label: 'Act' },
  { key: 'verify', label: 'Verify' },
  { key: 'replan', label: 'Re-plan' },
];

function getActionState(status?: string) {
  switch (status) {
    case 'VERIFIED':
    case 'SUCCESS':
      return {
        label: 'Verified',
        className:
          'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
      };

    case 'FAILED':
      return {
        label: 'Failed',
        className:
          'border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400',
        dot: 'bg-red-500',
      };

    case 'EXECUTING':
      return {
        label: 'Executing',
        className:
          'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500',
      };

    default:
      return {
        label: status || 'Pending',
        className:
          'border-border bg-muted/40 text-muted-foreground',
        dot: 'bg-muted-foreground',
      };
  }
}

export function AgenticDecisionPanel({
  result,
}: AgenticDecisionPanelProps) {
  if (!result) {
    return (
      <section className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur-xl">
        <div className="border-b border-border/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em]">
                Agentic Decision Engine
              </p>
              <p className="mt-1 text-[9px] text-muted-foreground">
                Adaptive sales reasoning loop
              </p>
            </div>

            <span className="rounded-full border border-border bg-muted/30 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-muted-foreground">
              Standby
            </span>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <span className="text-[10px] text-muted-foreground/30">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const actionState = getActionState(result.action?.status);

  return (
    <section className="rounded-2xl border border-border/70 bg-card/85 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <span className="text-[13px]">✦</span>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]">
              Agentic Decision Engine
            </p>
            <p className="mt-0.5 text-[9px] text-muted-foreground">
              Real-time strategy adaptation
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Adaptive
        </span>
      </div>

      {/* Agentic Loop */}
      <div className="border-b border-border/50 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                  step.key === 'decide'
                    ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-700 dark:text-cyan-400'
                    : step.key === 'act'
                      ? 'border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400'
                      : 'border-border/60 bg-muted/20 text-muted-foreground'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    step.key === 'decide'
                      ? 'bg-cyan-500'
                      : step.key === 'act'
                        ? 'bg-violet-500'
                        : 'bg-muted-foreground/40'
                  }`}
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.08em]">
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <span className="text-[9px] text-muted-foreground/30">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decision Grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-border/50 md:grid-cols-4 md:divide-y-0">
        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Current Goal
          </p>
          <p className="mt-1.5 text-[11px] font-bold">
            {result.decision.goal.replaceAll('_', ' ')}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Strategy
          </p>
          <p className="mt-1.5 text-[11px] font-bold">
            {result.decision.strategy.replaceAll('_', ' ')}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Selected Tool
          </p>
          <p className="mt-1.5 text-[11px] font-bold">
            {result.decision.selectedTool?.replaceAll('_', ' ') || '—'}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Action
          </p>

          <div
            className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 ${actionState.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${actionState.dot}`} />
            <span className="text-[8px] font-bold uppercase tracking-wide">
              {actionState.label}
            </span>
          </div>
        </div>
      </div>

      {/* Reason + Re-plan */}
      <div className="grid border-t border-border/50 md:grid-cols-2">
        <div className="border-b border-border/50 p-3 md:border-b-0 md:border-r">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Decision Reason
          </p>

          <p className="mt-1.5 text-[10px] leading-relaxed text-foreground/80">
            {result.decision.reason || 'Evaluating customer context...'}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Re-plan
          </p>

          <p className="mt-1.5 text-[10px] leading-relaxed text-foreground/80">
            {result.replan.nextAction ||
              result.replan.reason ||
              'Continuously monitoring customer state.'}
          </p>
        </div>
      </div>
    </section>
  );
}