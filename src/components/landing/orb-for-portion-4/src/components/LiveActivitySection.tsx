import { useEffect, useState } from "react";
import { WorkforcePlanet } from "./WorkforcePlanet";

type Status = "Active" | "Focus Mode" | "Returned" | "Idle" | "Coding Sprint" | "Meeting";

const STATUS_DOT: Record<Status, string> = {
  Active: "bg-status-active shadow-[0_0_8px_var(--color-status-active)]",
  "Focus Mode": "bg-status-focus shadow-[0_0_8px_var(--color-status-focus)]",
  Returned: "bg-status-active shadow-[0_0_8px_var(--color-status-active)]",
  Idle: "bg-status-idle shadow-[0_0_8px_var(--color-status-idle)]",
  "Coding Sprint": "bg-status-coding shadow-[0_0_8px_var(--color-status-coding)]",
  Meeting: "bg-status-meeting shadow-[0_0_8px_var(--color-status-meeting)]",
};

const SEED: { name: string; status: Status; ago: string; nodeIndex: number }[] = [
  { name: "Bilal", status: "Active", ago: "now", nodeIndex: 4 },
  { name: "Ayesha", status: "Focus Mode", ago: "2m", nodeIndex: 11 },
  { name: "Hassan", status: "Returned", ago: "5m", nodeIndex: 19 },
  { name: "Fatima", status: "Idle", ago: "8m", nodeIndex: 27 },
  { name: "Usman", status: "Active", ago: "10m", nodeIndex: 33 },
  { name: "Zara", status: "Focus Mode", ago: "12m", nodeIndex: 40 },
  { name: "Daniyal", status: "Coding Sprint", ago: "14m", nodeIndex: 16 },
  { name: "Sana", status: "Meeting", ago: "17m", nodeIndex: 46 },
];

export function LiveActivitySection() {
  const [items] = useState(SEED);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<number>(0);

  // Cycle through rows, flashing the corresponding sphere node
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % items.length;
      setActiveRow(i);
      setFlashIndex(items[i].nodeIndex);
      // reset so the same index can flash again
      setTimeout(() => setFlashIndex(null), 100);
    }, 1600);
    return () => clearInterval(id);
  }, [items]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Deep space backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, color-mix(in oklab, var(--status-coding) 5%, transparent) 0%, transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 holo-grid opacity-[0.04]" />
      {/* Green scan line accent */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-status-active/70 shadow-[0_0_12px_var(--color-status-active)]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        {/* Left: Copy + Activity list */}
        <div className="flex flex-col justify-center">
          <div
            className="mb-6 font-mono text-xs tracking-[0.3em] text-primary"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            // LIVE ACTIVITY INTELLIGENCE
          </div>
          <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-foreground">A real-time</span>
            <br />
            <span className="text-muted-foreground/70">operations center</span>
            <br />
            <span className="text-muted-foreground/70">for your workforce.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every developer, every state, every signal — live. See your entire global team breathe in
            one shared canvas.
          </p>

          {/* Activity feed */}
          <div className="mt-10 max-w-md space-y-1.5">
            {items.map((it, idx) => (
              <div
                key={it.name}
                className={`group flex items-center justify-between rounded-md border px-4 py-3 font-mono text-sm transition-all duration-300 ${
                  idx === activeRow
                    ? "border-primary/50 bg-card/80 shadow-[0_0_24px_-8px_var(--primary)]"
                    : "border-border/40 bg-card/40"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${STATUS_DOT[it.status]}`} />
                  <span className="font-semibold text-foreground">{it.name}</span>
                  <span className="text-muted-foreground">{it.status}</span>
                </div>
                <span className="text-xs text-muted-foreground/70">{it.ago}</span>
              </div>
            ))}
          </div>

          {/* Status legend */}
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
               style={{ fontFamily: "var(--font-mono)" }}>
            {[
              { label: "ACTIVE", c: "bg-status-active" },
              { label: "FOCUS", c: "bg-status-focus" },
              { label: "CODING", c: "bg-status-coding" },
              { label: "MEETING", c: "bg-status-meeting" },
              { label: "IDLE", c: "bg-status-idle" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.c}`} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Planet */}
        <div className="relative aspect-square w-full lg:aspect-auto lg:h-[640px]">
          <WorkforcePlanet flashNodeIndex={flashIndex} />
        </div>
      </div>
    </section>
  );
}
