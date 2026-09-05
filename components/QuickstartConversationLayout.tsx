'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type QuickstartConversationLayoutProps = {
  statusPanel: ReactNode;
  pipelineMetrics: ReactNode;
  salesIntelligence: ReactNode;
  agenticEngine: ReactNode;
  transcriptPanel: ReactNode;
  visualizer: ReactNode;
  controls: ReactNode;
  onEndConversation: () => void;
};

export function QuickstartConversationLayout({
  statusPanel,
  pipelineMetrics,
  salesIntelligence,
  agenticEngine,
  transcriptPanel,
  visualizer,
  controls,
  onEndConversation,
}: QuickstartConversationLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background text-foreground">

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <header className="relative z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl md:px-6">

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* BRAND */}
        <div className="flex min-w-0 items-center gap-3">

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card shadow-sm">
            <Image
              src="/agora-logo-mark.svg"
              alt="Agora"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />

            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-background">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[18px] font-bold tracking-[-0.035em]">
                SalesPilot AI
              </h1>

              <span className="hidden rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-cyan-700 dark:text-cyan-400 sm:inline-flex">
                Adaptive Sales Agent
              </span>
            </div>

            <p className="hidden text-[9px] font-medium tracking-wide text-muted-foreground sm:block">
              Listen • Understand • Adapt • Act
            </p>
          </div>
        </div>

        {/* HEADER STATUS */}
        <div className="flex items-center gap-2">

          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live Session
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/[0.03] px-3 py-1.5 text-[9px] font-semibold tracking-wide text-muted-foreground lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Agora
          </div>

          <div className="hidden sm:block">
            {statusPanel}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg border-red-500/30 bg-transparent px-3 text-[11px] font-semibold text-red-600 transition-all hover:border-red-500/60 hover:bg-red-500/5 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
            onClick={onEndConversation}
            aria-label="End conversation with AI agent"
            title="End conversation"
          >
            End Call
          </Button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN COMMAND CENTER */}
      {/* ========================================================= */}

      <div className="relative min-h-0 flex-1 overflow-hidden">

        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[48%] top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-3xl" />

          <div className="absolute right-[8%] top-[12%] h-[320px] w-[320px] rounded-full bg-violet-500/[0.02] blur-3xl" />

          <div className="absolute bottom-[-10%] left-[18%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.015] blur-3xl" />
        </div>

        {/* ======================================================= */}
        {/* RESPONSIVE COMMAND CENTER */}
        {/* ======================================================= */}

        <div
          className="
            relative grid h-full min-h-0
            grid-cols-1
            grid-rows-[minmax(420px,1fr)_minmax(300px,auto)]
            lg:grid-cols-[300px_minmax(0,1fr)_360px]
            lg:grid-rows-[minmax(0,1fr)_auto]
          "
        >

          {/* ===================================================== */}
          {/* LEFT — SALES INTELLIGENCE */}
          {/* ===================================================== */}

          <aside
            className="
              hidden
              min-h-0
              overflow-y-auto
              border-r
              border-border/60
              bg-muted/[0.06]
              lg:col-start-1
              lg:row-start-1
              lg:block
            "
          >

            <div className="flex min-h-full flex-col">

              {/* Section header */}
              <div className="sticky top-0 z-10 border-b border-border/50 bg-background/85 px-4 py-3 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em]">
                      Sales Intelligence
                    </p>

                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      Customer state & adaptive context
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>

                </div>
              </div>

              {/* Intelligence */}
              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                {salesIntelligence}
              </div>

              {/* Pipeline metrics */}
              <div className="hidden">
                {pipelineMetrics}
              </div>

            </div>
          </aside>

          {/* ===================================================== */}
          {/* CENTER — AI SALES AGENT */}
          {/* ===================================================== */}

          <main
            className="
              col-start-1
              row-start-1
              flex
              min-h-0
              min-w-0
              flex-col
              lg:col-start-2
              lg:row-start-1
            "
          >

            {/* Session label */}
            <div className="flex shrink-0 items-center justify-center px-4 pt-4 md:pt-5">

              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 shadow-sm backdrop-blur-md">

                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                  Live AI Sales Session
                </span>

              </div>
            </div>

            {/* Visualizer */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">

              <div className="relative flex h-full w-full max-w-3xl items-center justify-center">

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-3xl" />

                <div className="relative flex w-full items-center justify-center">
                  {visualizer}
                </div>

              </div>
            </div>

            {/* Controls */}
            <div className="shrink-0 px-4 pb-3 pt-2 md:pb-4">
              <div className="flex justify-center">
                {controls}
              </div>
            </div>

            {/* Secure status */}
            <div className="flex shrink-0 items-center justify-center px-4 pb-4 md:pb-5">

              <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.12em] text-muted-foreground/45">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                Secure real-time AI conversation
              </div>

            </div>

          </main>

          {/* ===================================================== */}
          {/* RIGHT — LIVE TRANSCRIPT */}
          {/* ===================================================== */}

          <aside
            className="
              col-start-1
              row-start-2
              flex
              min-h-[300px]
              min-w-0
              flex-col
              border-t
              border-border/60
              bg-muted/[0.04]
              lg:col-start-3
              lg:row-start-1
              lg:min-h-0
              lg:border-l
              lg:border-t-0
            "
          >

            {/* Transcript header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em]">
                  Live Transcript
                </p>

                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  Real-time conversation
                </p>
              </div>

              <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>

            </div>

            {/* Transcript content */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {transcriptPanel}
            </div>

          </aside>

          {/* ===================================================== */}
          {/* DESKTOP — AGENTIC DECISION ENGINE */}
          {/* ===================================================== */}

          <section
            className="
              hidden
              border-t
              border-border/60
              bg-background/90
              px-4
              py-3
              backdrop-blur-xl
              lg:col-span-2
              lg:col-start-1
              lg:row-start-2
              lg:block
            "
          >
            <div className="min-w-0">
              {agenticEngine}
            </div>
          </section>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE — SALES INTELLIGENCE */}
      {/* ========================================================= */}

      <div className="border-t border-border/60 bg-muted/[0.05] lg:hidden">

        <div className="p-3">
          {salesIntelligence}
        </div>

      </div>

      {/* ========================================================= */}
      {/* MOBILE — AGENTIC ENGINE */}
      {/* ========================================================= */}

      <div className="border-t border-border/60 bg-background/95 px-3 py-3 lg:hidden">

        {agenticEngine}

      </div>

    </div>
  );
}