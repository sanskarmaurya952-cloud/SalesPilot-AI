'use client';

import {
  Loader2,
  BrainCircuit,
  Zap,
  Target,
  Mic,
  Sparkles,
  AudioLines,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type QuickstartPreCallCardProps = {
  isLoading: boolean;
  error: string | null;
  onStartConversation: () => void;
};

export function QuickstartPreCallCard({
  isLoading,
  error,
  onStartConversation,
}: QuickstartPreCallCardProps) {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center px-3 py-4 sm:px-5 sm:py-6">
      <div className="relative flex h-full max-h-[calc(100dvh-32px)] w-full max-w-[1260px] flex-col overflow-hidden rounded-[28px] border border-[#30363b] bg-[#080d11] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[100px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-[110px]" />

        <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
          {/* Hero content */}
          <div className="mx-auto w-full max-w-[1050px] px-5 pb-8 pt-8 text-center sm:px-8 sm:pt-10 md:px-12 md:pt-12">
            {/* Brand badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.04] px-4 py-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />

                <span className="text-[11px] font-bold tracking-[0.16em] text-cyan-400">
                  SALESPILOT AI
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <span className="text-[10px] font-medium tracking-wide text-[#89939d]">
                  ADAPTIVE SALES AGENT
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto mt-8 max-w-[850px]">
              <h1 className="text-[38px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px]">
                Your AI Sales Agent
                <span className="block text-cyan-400">
                  That Actually Adapts
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[720px] text-sm leading-6 text-[#a4adb5] sm:text-base sm:leading-7">
                SalesPilot listens to every conversation, understands customer
                intent and objections, adapts its sales strategy in real time,
                and recommends the next best action.
              </p>
            </div>

            {/* Core loop */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {['Listen', 'Understand', 'Adapt', 'Act'].map(
                (step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2"
                  >
                    <span className="rounded-full border border-[#30363b] bg-[#11171c] px-4 py-2 text-xs font-medium text-[#c4cbd1]">
                      {step}
                    </span>

                    {index < 3 && (
                      <span className="text-base font-semibold text-cyan-400">
                        →
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>

            {/* Feature cards */}
            <div className="mx-auto mt-8 grid max-w-[900px] gap-3 md:grid-cols-3">
              {/* Customer Intelligence */}
              <div className="rounded-2xl border border-[#30363b] bg-[#0d1318] p-5 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#10171c]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/[0.09]">
                  <BrainCircuit className="h-5 w-5 text-cyan-400" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Customer Intelligence
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#7f8992]">
                  Intent, sentiment, needs, objections and buying stage.
                </p>
              </div>

              {/* Adaptive Strategy */}
              <div className="rounded-2xl border border-[#30363b] bg-[#0d1318] p-5 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#10171c]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/[0.09]">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Adaptive Strategy
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#7f8992]">
                  Changes the pitch when customer signals change.
                </p>
              </div>

              {/* Next Best Action */}
              <div className="rounded-2xl border border-[#30363b] bg-[#0d1318] p-5 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#10171c]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/[0.09]">
                  <Target className="h-5 w-5 text-cyan-400" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Next Best Action
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#7f8992]">
                  Turns conversations into decisions and actions.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mx-auto mt-8 max-w-[900px]">
              <Button
                onClick={onStartConversation}
                disabled={isLoading}
                className="h-14 w-full rounded-xl border border-cyan-400 bg-cyan-400 text-sm font-semibold text-black shadow-[0_0_35px_rgba(34,211,238,0.16)] transition-all duration-200 hover:border-white hover:bg-white hover:text-black disabled:hover:border-cyan-400 disabled:hover:bg-cyan-400 disabled:hover:text-black sm:text-base"
                aria-label={
                  isLoading
                    ? 'Starting conversation with AI agent'
                    : 'Start conversation with AI agent'
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Starting SalesPilot...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Start AI Sales Conversation
                  </>
                )}
              </Button>

              <p className="mt-3 text-[10px] text-[#69737c] sm:text-xs">
                Real-time voice interaction powered by{' '}
                <span className="text-cyan-400">
                  Agora Conversational AI
                </span>
              </p>
            </div>

            {/* Capability line */}
            <div className="mx-auto mt-8 hidden max-w-[900px] border-t border-[#252c31] pt-5 sm:flex sm:items-center sm:justify-center sm:gap-7">
              <div className="flex items-center gap-2 text-[11px] text-[#89939d]">
                <AudioLines className="h-4 w-4 text-cyan-400" />
                Real-time understanding
              </div>

              <span className="text-[#465058]">•</span>

              <div className="flex items-center gap-2 text-[11px] text-[#89939d]">
                <Zap className="h-4 w-4 text-cyan-400" />
                Adaptive selling
              </div>

              <span className="text-[#465058]">•</span>

              <div className="flex items-center gap-2 text-[11px] text-[#89939d]">
                <UserRound className="h-4 w-4 text-cyan-400" />
                Customer memory
              </div>

              <span className="text-[#465058]">•</span>

              <div className="flex items-center gap-2 text-[11px] text-[#89939d]">
                <Target className="h-4 w-4 text-cyan-400" />
                Action intelligence
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="absolute bottom-4 left-1/2 z-20 w-[min(92vw,700px)] -translate-x-1/2 rounded-lg border border-red-500/30 bg-red-950/80 px-4 py-2 text-center text-xs text-red-300 backdrop-blur-md">
          {error}
        </div>
      )}
    </div>
  );
}