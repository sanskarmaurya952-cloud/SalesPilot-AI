'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type QuickstartConversationLayoutProps = {
  statusPanel: ReactNode;
  pipelineMetrics: ReactNode;
  salesIntelligence: ReactNode;
  transcriptPanel: ReactNode;
  visualizer: ReactNode;
  controls: ReactNode;
  onEndConversation: () => void;
};

export function QuickstartConversationLayout({
  statusPanel,
  pipelineMetrics,
  salesIntelligence,
  transcriptPanel,
  visualizer,
  controls,
  onEndConversation,
}: QuickstartConversationLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background text-left text-foreground">
      {/* ================= HEADER ================= */}
      <header className="relative z-20 flex shrink-0 flex-col gap-3 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur-md md:h-[78px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* ================= BRANDING ================= */}
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card shadow-sm">
            <Image
              src="/agora-logo-mark.svg"
              alt="Agora"
              width={30}
              height={30}
              className="h-7 w-7 object-contain"
            />

            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-background">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </span>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-1.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="truncate text-[19px] font-bold leading-none tracking-[-0.035em] text-foreground md:text-xl">
                SalesPilot AI
              </span>

              <span className="hidden rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-cyan-700 dark:text-cyan-400 sm:inline-flex">
                Adaptive Sales Agent
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2.5">
              <span className="hidden text-[10px] font-medium tracking-wide text-muted-foreground sm:inline">
                Listen • Understand • Adapt • Act
              </span>

              <span className="hidden text-muted-foreground/50 sm:inline">
                /
              </span>

              <div className="min-w-0">
                {pipelineMetrics}
              </div>
            </div>
          </div>
        </div>

        {/* ================= HEADER ACTIONS ================= */}
        <div className="flex items-center justify-between gap-3 md:justify-end">
          <div className="flex items-center gap-2.5">
            {statusPanel}

            {/* Agora Status */}
            <div className="hidden items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-muted-foreground shadow-sm lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>

              Powered by Agora
            </div>
          </div>

          {/* End Conversation */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-lg border-red-500/40 bg-transparent px-3.5 text-xs font-semibold text-red-600 shadow-sm transition-all hover:border-red-500/60 hover:bg-red-500/5 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
            onClick={onEndConversation}
            aria-label="End conversation with AI agent"
            title="End conversation"
          >
            End Conversation
          </Button>
        </div>
      </header>

      {/* ================= MAIN APP ================= */}
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden lg:flex-row">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="order-2 flex h-auto min-h-0 w-full shrink-0 flex-col overflow-y-auto border-t border-border/70 bg-muted/[0.08] px-4 py-4 lg:order-1 lg:h-full lg:w-[29rem] lg:border-r lg:border-t-0 lg:px-4 lg:py-4">
          <div className="flex min-h-0 flex-col gap-4 pr-0.5">

            {/* Sales Intelligence */}
            <section className="shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              {salesIntelligence}
            </section>

            {/* Transcript */}
            <section className="min-h-[360px] shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              {transcriptPanel}
            </section>

          </div>
        </aside>

        {/* ================= AI VOICE AREA ================= */}
        <main className="order-1 flex min-h-0 min-w-0 flex-1 bg-background lg:order-2">
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">

            {/* Ambient Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-[38%] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-3xl" />

              <div className="absolute left-[68%] top-[22%] h-[300px] w-[300px] rounded-full bg-violet-500/[0.025] blur-3xl" />

              <div className="absolute bottom-[8%] left-[18%] h-[220px] w-[220px] rounded-full bg-cyan-500/[0.015] blur-3xl" />
            </div>

            {/* ================= SESSION BADGE ================= */}
            <div className="relative flex shrink-0 items-center justify-center pt-5 md:pt-6">
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/85 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />

                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Live AI Sales Session
                </span>
              </div>
            </div>

            {/* ================= VISUALIZER ================= */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
              <div className="flex h-full w-full max-w-4xl items-center justify-center">
                <div className="flex w-full items-center justify-center">
                  {visualizer}
                </div>
              </div>
            </div>

            {/* ================= CONTROLS ================= */}
            <div className="relative shrink-0 pb-5 pt-2 md:pb-6 md:pt-3">
              <div className="flex justify-center">
                {controls}
              </div>
            </div>

            {/* ================= BOTTOM STATUS ================= */}
            <div className="relative flex shrink-0 justify-center px-5 pb-4 pt-1 md:pb-5">
              <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />

                <span>
                  Secure real-time AI conversation
                </span>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}