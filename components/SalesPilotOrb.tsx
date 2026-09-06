"use client";

type SalesPilotOrbProps = {
  state?: "idle" | "listening" | "thinking" | "speaking";
};

export function SalesPilotOrb({
  state = "idle",
}: SalesPilotOrbProps) {
  const statusText = {
    idle: "READY",
    listening: "LISTENING",
    thinking: "THINKING",
    speaking: "SPEAKING",
  }[state];

  return (
   <div className="flex flex-col items-center justify-center pb-10">
      {/* Orb */}
      <div
        className={`relative flex h-56 w-56 items-center justify-center transition-all duration-500 ${
          state === "speaking"
            ? "scale-105"
            : state === "listening"
              ? "scale-[1.02]"
              : ""
        }`}
      >
        {/* Outer pulse */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-500 ${
            state === "speaking"
              ? "animate-ping border-cyan-400/30"
              : state === "listening"
                ? "animate-pulse border-cyan-400/40"
                : "border-cyan-300/20"
          }`}
        />

        {/* Outer ring */}
        <div className="absolute inset-5 rounded-full border border-cyan-300/25" />

        {/* Rotating ring */}
        <div
          className={`absolute inset-10 rounded-full border border-dashed border-cyan-400/35 ${
            state === "thinking" ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "4s" }}
        />

        {/* Glow */}
        <div
          className={`absolute h-40 w-40 rounded-full blur-3xl transition-all duration-500 ${
            state === "speaking"
              ? "bg-cyan-400/30"
              : state === "listening"
                ? "bg-cyan-400/25"
                : state === "thinking"
                  ? "bg-violet-400/25"
                  : "bg-cyan-300/15"
          }`}
        />

        {/* Core */}
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/50 bg-white/80 shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-400/20">
            <span className="text-2xl">✦</span>
          </div>
        </div>

        {/* Small orbit dots */}
        <span className="absolute left-8 top-16 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <span className="absolute right-10 top-10 h-1.5 w-1.5 rounded-full bg-violet-400" />
        <span className="absolute bottom-12 right-7 h-2 w-2 rounded-full bg-cyan-300" />
      </div>

      {/* Status */}
      <div className="mt-5 flex items-center gap-2 rounded-full border border-cyan-200/60 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md">
        <span
          className={`h-2 w-2 rounded-full ${
            state === "thinking"
              ? "bg-violet-400"
              : state === "idle"
                ? "bg-slate-300"
                : "bg-cyan-400"
          }`}
        />

        <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">
          {statusText}
        </span>
      </div>

      <p className="mt-2 text-[10px] tracking-[0.18em] text-slate-400">
        SALES INTELLIGENCE ACTIVE
      </p>
    </div>
  );
}