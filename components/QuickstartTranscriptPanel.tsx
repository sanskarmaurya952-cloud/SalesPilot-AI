'use client';

import { useEffect, useMemo, useRef } from 'react';

type TranscriptMessage = {
  turn_id?: string | number;
  uid: number;
  text?: string;
  createdAt?: number;
};

type QuickstartTranscriptPanelProps = {
  messageList: TranscriptMessage[];
  currentInProgressMessage: TranscriptMessage | null;
  agentUID: string;
};

function formatMessageTime(createdAt?: number) {
  if (!createdAt) return null;

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(createdAt));
}

export function QuickstartTranscriptPanel({
  messageList,
  currentInProgressMessage,
  agentUID,
}: QuickstartTranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(
    () =>
      currentInProgressMessage
        ? [...messageList, currentInProgressMessage]
        : messageList,
    [currentInProgressMessage, messageList],
  );

  useEffect(() => {
    const node = scrollRef.current;

    if (!node) return;

    node.scrollTop = node.scrollHeight;
  }, [messages]);

  return (
    <section
      className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_2px_14px_rgba(0,0,0,0.045)]"
      aria-label="Transcription panel"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex h-[62px] shrink-0 items-center justify-between border-b border-border/70 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-sm">
            💬
          </div>

          <div>
            <h2 className="text-[13px] font-bold tracking-[-0.01em] text-foreground">
              Live Transcript
            </h2>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Real-time voice turns
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
            Live
          </span>
        </div>
      </div>

      {/* =====================================================
          TRANSCRIPT BODY
      ===================================================== */}
      <div
        ref={scrollRef}
        className="scrollbar-thin flex min-h-0 flex-1 w-full flex-col gap-4 overflow-y-auto px-3.5 py-4"
      >
        {messages.length === 0 ? (
          /* ===================================================
              EMPTY STATE
          =================================================== */
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xl">
              🎙️
            </div>

            <p className="text-sm font-semibold text-foreground">
              Waiting for conversation
            </p>

            <p className="mt-1.5 max-w-[230px] text-[10px] leading-relaxed text-muted-foreground">
              Start speaking to see the live transcript
              appear here.
            </p>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 [animation-delay:300ms]" />
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isAgent =
              String(message.uid) === agentUID;

            const label = isAgent
              ? 'SalesPilot'
              : 'You';

            const text = message.text?.trim();

            const time = formatMessageTime(
              message.createdAt,
            );

            return (
              <article
                key={`${message.turn_id ?? message.uid}-${index}`}
                className={`flex w-full flex-col ${
                  isAgent
                    ? 'items-start'
                    : 'items-end'
                }`}
              >
                {/* =================================================
                    MESSAGE META
                ================================================= */}
                <div
                  className={`mb-1.5 flex items-center gap-2 px-1 ${
                    isAgent
                      ? 'flex-row'
                      : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold ${
                      isAgent
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                        : 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
                    }`}
                  >
                    {isAgent ? 'AI' : 'Y'}
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    {label}
                  </span>

                  {time && (
                    <span className="text-[9px] font-medium text-muted-foreground/50">
                      {time}
                    </span>
                  )}
                </div>

                {/* =================================================
                    MESSAGE BUBBLE
                ================================================= */}
                <div
                  className={`max-w-[92%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[11px] leading-[1.65] shadow-sm ${
                    isAgent
                      ? 'rounded-tl-md border border-cyan-500/10 bg-muted/60 text-foreground'
                      : 'rounded-tr-md border border-primary/10 bg-primary/[0.07] text-foreground'
                  }`}
                >
                  {text || (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-current" />
                      <span className="h-1 w-1 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                      <span className="h-1 w-1 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      {messages.length > 0 && (
        <div className="flex shrink-0 items-center justify-between border-t border-border/60 px-3.5 py-2.5">
          <span className="text-[9px] font-medium text-muted-foreground/60">
            {messages.length} conversation turn
            {messages.length !== 1 ? 's' : ''}
          </span>

          <div className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Agora real-time
          </div>
        </div>
      )}
    </section>
  );
}