'use client';

type CustomerMemory = {
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

type CustomerMemoryPanelProps = {
  memory: CustomerMemory | null;
};

export function CustomerMemoryPanel({
  memory,
}: CustomerMemoryPanelProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_2px_14px_rgba(0,0,0,0.045)]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="border-b border-border/70 px-4 pb-3.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-sm">
              🧠
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-[-0.01em] text-foreground">
                Customer Memory
              </h2>

              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Context remembered across interactions
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            MEMORY
          </span>
        </div>
      </div>

      {!memory ? (
        /* =====================================================
            EMPTY STATE
        ===================================================== */
        <div className="p-4">
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border/80 bg-muted/[0.08] px-5 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5 text-xl">
              🧠
            </div>

            <p className="text-sm font-semibold text-foreground">
              Building customer memory...
            </p>

            <p className="mt-1.5 max-w-[230px] text-[11px] leading-relaxed text-muted-foreground">
              Customer context will appear as the
              conversation develops.
            </p>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {/* ===================================================
              CUSTOMER PROFILE
          =================================================== */}
          <div className="rounded-xl border border-border/80 bg-background/40 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-sm">
                  👤
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Customer Profile
                  </p>

                  <p className="mt-0.5 text-[9px] text-muted-foreground/60">
                    Identity & commercial context
                  </p>
                </div>
              </div>

              <span className="text-[9px] font-medium text-muted-foreground/60">
                LIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <MemoryItem
                label="Name"
                value={memory.name ?? 'Not detected'}
              />

              <MemoryItem
                label="Role"
                value={memory.role ?? 'Not detected'}
              />

              <MemoryItem
                label="Company"
                value={memory.company ?? 'Not detected'}
              />

              <MemoryItem
                label="Budget"
                value={memory.budget ?? 'Not detected'}
              />
            </div>
          </div>

          {/* ===================================================
              NEEDS
          =================================================== */}
          <MemoryList
            icon="🎯"
            label="Customer Needs"
            items={memory.needs}
            emptyText="No specific needs detected yet"
          />

          {/* ===================================================
              PREFERENCES
          =================================================== */}
          <MemoryList
            icon="⭐"
            label="Preferences"
            items={memory.preferences}
            emptyText="No preferences detected yet"
          />

          {/* ===================================================
              OBJECTIONS
          =================================================== */}
          <MemoryList
            icon="🚧"
            label="Previous Objections"
            items={memory.objections}
            emptyText="No objections detected yet"
          />

          {/* ===================================================
              CONVERSATION CONTEXT
          =================================================== */}
          <div className="rounded-xl border border-border/80 bg-background/40 p-3.5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-sm">
                📌
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Conversation Context
                </p>

                <p className="mt-0.5 text-[9px] text-muted-foreground/60">
                  Latest remembered signals
                </p>
              </div>
            </div>

            <div className="divide-y divide-border/60 rounded-lg border border-border/60 bg-muted/[0.08] px-3">
              <ContextRow
                label="Buying Stage"
                value={
                  memory.buyingStage ??
                  'Not detected'
                }
              />

              <ContextRow
                label="Last Intent"
                value={
                  memory.lastIntent ??
                  'Not detected'
                }
              />

              <ContextRow
                label="Last Sentiment"
                value={
                  memory.lastSentiment ??
                  'Not detected'
                }
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MemoryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-border/60 bg-muted/[0.12] px-3 py-2.5 transition-colors hover:bg-muted/20">
      <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-muted-foreground/70">
        {label}
      </p>

      <p className="mt-1 truncate text-[11px] font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}

function MemoryList({
  icon,
  label,
  items,
  emptyText,
}: {
  icon: string;
  label: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-background/40 p-3.5">
      <div className="mb-2.5 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/60 text-sm">
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {label}
          </p>

          <p className="mt-0.5 text-[9px] text-muted-foreground/60">
            {items.length > 0
              ? `${items.length} signal${items.length > 1 ? 's' : ''} remembered`
              : 'No signals yet'}
          </p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="max-w-full rounded-full border border-border/70 bg-muted/[0.12] px-2.5 py-1 text-[9px] font-semibold text-foreground transition-colors hover:bg-muted/30"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border/60 bg-muted/[0.06] px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground">
            {emptyText}
          </p>
        </div>
      )}
    </div>
  );
}

function ContextRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-[42px] items-center justify-between gap-3">
      <span className="text-[10px] font-medium text-muted-foreground">
        {label}
      </span>

      <span className="max-w-[60%] truncate text-right text-[10px] font-bold text-foreground">
        {value}
      </span>
    </div>
  );
}