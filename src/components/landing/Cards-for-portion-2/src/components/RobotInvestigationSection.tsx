import { forwardRef, useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { motion, animate, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from "framer-motion";

type Problem = {
  id: string;
  title: string;
  tool: "scanner" | "crusher" | "neural" | "absorber" | "hourglass";
};

const problems: Problem[] = [
  { id: "#01", title: "No one knows what was actually accomplished", tool: "scanner" },
  { id: "#02", title: "Status meetings waste hours", tool: "crusher" },
  { id: "#03", title: "Managers guess productivity", tool: "neural" },
  { id: "#04", title: "Reports take forever", tool: "absorber" },
  { id: "#05", title: "Focus time disappears unnoticed", tool: "hourglass" },
];

/* ---------------- Per-card holographic tools ---------------- */

function ScannerTool({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* floating drone */}
      <motion.div
        className="absolute left-1/2 top-2 -translate-x-1/2"
        animate={active ? { y: [0, 6, 0] } : { y: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="36" height="18" viewBox="0 0 36 18">
          <ellipse cx="18" cy="10" rx="9" ry="3" fill="#0ea5e9" opacity="0.25" />
          <rect x="13" y="7" width="10" height="4" rx="2" fill="#7dd3fc" />
          <circle cx="8" cy="9" r="2" fill="#38bdf8" />
          <circle cx="28" cy="9" r="2" fill="#38bdf8" />
        </svg>
      </motion.div>
      {/* scan beam */}
      <motion.div
        className="absolute left-1/2 top-6 h-32 w-24 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0) 100%)",
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
        }}
        animate={active ? { opacity: [0, 0.9, 0.9, 0], scaleY: [0.6, 1, 1, 0.6] } : { opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      {/* fragments → timeline */}
      <div className="absolute inset-x-3 bottom-3 flex items-end gap-1">
        {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-sky-400/80"
            initial={{ height: 4, opacity: 0.3 }}
            animate={
              active
                ? { height: [4, h, h], opacity: [0.3, 1, 1] }
                : { height: 4, opacity: 0.3 }
            }
            transition={{ duration: 1.4, delay: i * 0.08 }}
            style={{ boxShadow: "0 0 8px rgba(56,189,248,0.8)" }}
          />
        ))}
      </div>
    </div>
  );
}

function ClockHand({
  active,
  targetRotate,
  length,
  stroke,
  strokeWidth,
}: {
  active: boolean;
  targetRotate: number;
  length: number;
  stroke: string;
  strokeWidth: number;
}) {
  const gRef = useRef<SVGGElement>(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const el = gRef.current;
    if (!el) return;

    const controls = animate(angleRef.current, active ? targetRotate : 0, {
      duration: 2.2,
      ease: "easeInOut",
      onUpdate: (angle) => {
        angleRef.current = angle;
        el.setAttribute("transform", `rotate(${angle}, 0, 0)`);
      },
    });

    return () => controls.stop();
  }, [active, targetRotate]);

  return (
    <g ref={gRef} transform="rotate(0, 0, 0)">
      <line
        x1="0" y1="0" x2="0" y2={-length}
        stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
      />
    </g>
  );
}

function CrusherTool({ active }: { active: boolean }) {
  // Premium analog clock — hour arcs burn away as a sleek AI summary chip condenses underneath.
  const ticks = Array.from({ length: 60 });
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ambient glow */}
      <motion.div
        className="absolute inset-0"
        animate={active ? { opacity: [0.2, 0.5, 0.3] } : { opacity: 0.1 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(251,146,60,0.35), transparent 60%)",
        }}
      />
      {/* clock face */}
      <div className="absolute left-1/2 top-3 -translate-x-1/2">
        <svg width="76" height="76" viewBox="-40 -40 80 80">
          <defs>
            <linearGradient id="rim" x1="0" x2="0" y1="-1" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle r="32" fill="rgba(8,12,20,0.7)" stroke="url(#rim)" strokeWidth="0.8" />
          {ticks.map((_, i) => {
            const a = (i * Math.PI) / 30;
            const major = i % 5 === 0;
            const r1 = major ? 26 : 28;
            return (
              <line
                key={i}
                x1={Math.sin(a) * r1}
                y1={-Math.cos(a) * r1}
                x2={Math.sin(a) * 30}
                y2={-Math.cos(a) * 30}
                stroke={major ? "#fb923c" : "#475569"}
                strokeWidth={major ? 0.8 : 0.3}
                opacity={major ? 0.9 : 0.5}
              />
            );
          })}
          {/* sweep arc that "burns" the hour */}
          <motion.circle
            r="22"
            fill="none"
            stroke="#fb923c"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 22}
            initial={{ strokeDashoffset: 2 * Math.PI * 22, rotate: -90 }}
            animate={
              active
                ? { strokeDashoffset: 0, rotate: 270 }
                : { strokeDashoffset: 2 * Math.PI * 22, rotate: -90 }
            }
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{
              transformOrigin: "center",
              filter: "drop-shadow(0 0 4px rgba(251,146,60,0.8))",
            }}
          />
          {/* minute & hour hands — native SVG rotate(angle, cx, cy) */}
          <ClockHand active={active} targetRotate={360} length={20} stroke="#e2e8f0" strokeWidth={1.2} />
          <ClockHand active={active} targetRotate={30} length={12} stroke="#fb923c" strokeWidth={1.8} />
          <circle r="1.6" fill="#fb923c" />
        </svg>
      </div>
      {/* condensed AI summary chip */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 12, scale: 0.85 }}
        animate={
          active
            ? { opacity: [0, 0, 1], y: [12, 12, 0], scale: [0.85, 0.85, 1] }
            : { opacity: 0, y: 12, scale: 0.85 }
        }
        transition={{ duration: 2.4, times: [0, 0.55, 1], ease: "easeOut" }}
      >
        <div
          className="flex items-center gap-1.5 rounded-full border border-sky-400/60 bg-slate-950/80 px-2.5 py-1 font-mono text-[10px] text-sky-200 backdrop-blur"
          style={{ boxShadow: "0 0 14px rgba(56,189,248,0.45)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          1h meeting → 12s recap
        </div>
      </motion.div>
    </div>
  );
}

function NeuralTool({ active }: { active: boolean }) {
  const points = [
    [20, 30], [50, 20], [80, 35], [30, 60], [60, 55], [85, 65], [45, 80],
  ];
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-2 -translate-x-1/2 text-xs font-mono text-orange-300/80"
        animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 0.4 }}
        transition={{ duration: 0.15, repeat: active ? 8 : 0 }}
      >
        ◉ ◉
      </motion.div>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {points.map(([x1, y1], i) =>
          points.slice(i + 1).map(([x2, y2], j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#38bdf8" strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4 + (i + j) * 0.05 }}
            />
          ))
        )}
        {points.map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r="1.5" fill="#7dd3fc"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{ filter: "drop-shadow(0 0 3px #38bdf8)" }}
          />
        ))}
      </svg>
    </div>
  );
}

function AbsorberTool({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* falling papers — behind the percentage card */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0 h-3 w-4 rounded-sm bg-zinc-300/80"
          style={{ left: 10 + i * 10 + "%" }}
          initial={{ y: -10, opacity: 0 }}
          animate={active ? { y: [-10, 80, 80], opacity: [0, 1, 0] } : { y: -10, opacity: 0 }}
          transition={{ duration: 1.6, delay: i * 0.15, repeat: active ? Infinity : 0 }}
        />
      ))}
      {/* holo cube */}
      <motion.div
        className="absolute bottom-3 left-1/2 z-10 h-12 w-12 -translate-x-1/2 rounded-sm bg-slate-950/95 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          border: "1px solid rgba(251,146,60,0.7)",
          background: "linear-gradient(135deg, rgba(251,146,60,0.15), rgba(56,189,248,0.15))",
          boxShadow: "0 0 18px rgba(251,146,60,0.5)",
        }}
      >
        <div className="flex h-full items-center justify-center font-mono text-[10px] text-orange-300">
          98.2%
        </div>
      </motion.div>
    </div>
  );
}

function HourglassTool({ active }: { active: boolean }) {
  // Premium focus timeline — deep-work blocks get sliced by notification pings, revealing fragmented attention.
  const blocks = [
    { x: 4, w: 22, label: "FOCUS" },
    { x: 30, w: 14, label: "" },
    { x: 48, w: 26, label: "DEEP" },
    { x: 78, w: 18, label: "" },
  ];
  const pings = [18, 42, 66, 88];
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* grid backdrop */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      {/* axis label */}
      <div className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-widest text-sky-300/70">
        focus.timeline
      </div>
      <div className="absolute right-2 top-2 font-mono text-[9px] text-orange-300/80">
        <motion.span
          animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.5 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          ● LIVE
        </motion.span>
      </div>

      {/* timeline track */}
      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2">
        <div className="relative h-7 rounded-md border border-slate-700/80 bg-slate-950/60">
          {/* focus blocks */}
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full overflow-hidden rounded-sm"
              style={{
                left: `${b.x}%`,
                width: `${b.w}%`,
                background:
                  "linear-gradient(180deg, rgba(56,189,248,0.55), rgba(56,189,248,0.2))",
                boxShadow: "inset 0 0 8px rgba(56,189,248,0.4)",
              }}
              initial={{ opacity: 0.85, filter: "saturate(1)" }}
              animate={
                active
                  ? {
                      opacity: [0.85, 0.85, 0.25],
                      filter: ["saturate(1)", "saturate(1)", "saturate(0.2)"],
                    }
                  : { opacity: 0.85, filter: "saturate(1)" }
              }
              transition={{ duration: 2.2, times: [0, 0.55, 1], delay: 0.1 + i * 0.08 }}
            >
              {b.label && (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] tracking-widest text-sky-100/90">
                  {b.label}
                </span>
              )}
            </motion.div>
          ))}

          {/* notification slices cutting the blocks */}
          {pings.map((p, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-px"
              style={{
                left: `${p}%`,
                background: "linear-gradient(180deg, #fb923c, transparent)",
                boxShadow: "0 0 8px #fb923c",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={active ? { scaleY: [0, 1, 1], opacity: [0, 1, 0.6] } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.25 }}
            />
          ))}

          {/* playhead sweep */}
          <motion.div
            className="absolute top-0 h-full w-[2px] bg-orange-300"
            style={{ boxShadow: "0 0 10px #fb923c, 0 0 20px #fb923c" }}
            initial={{ left: "0%" }}
            animate={active ? { left: "100%" } : { left: "0%" }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </div>

        {/* leak counter */}
        <div className="mt-2 flex items-center justify-between font-mono text-[9px]">
          <span className="text-slate-400">deep work</span>
          <motion.span
            className="text-orange-300"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: [0, 0, 1] } : { opacity: 0 }}
            transition={{ duration: 2.4, times: [0, 0.6, 1] }}
            style={{ textShadow: "0 0 6px rgba(251,146,60,0.7)" }}
          >
            −2h 47m lost
          </motion.span>
        </div>
      </div>

      {/* notification pings floating up */}
      {pings.map((p, i) => (
        <motion.div
          key={`b-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-orange-400"
          style={{ left: `${p}%`, top: "30%", boxShadow: "0 0 8px #fb923c" }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={
            active
              ? { y: [-2, -14, -22], opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.1, delay: 0.4 + i * 0.25 }}
        />
      ))}
    </div>
  );
}

const toolMap = {
  scanner: ScannerTool,
  crusher: CrusherTool,
  neural: NeuralTool,
  absorber: AbsorberTool,
  hourglass: HourglassTool,
};

/* ---------------- Robot SVG ---------------- */

function Robot({ eyeTarget }: { eyeTarget: { x: number; y: number } }) {
  const ex = Math.max(-2, Math.min(2, eyeTarget.x));
  const ey = Math.max(-1.5, Math.min(1.5, eyeTarget.y));
  return (
    <svg width="110" height="170" viewBox="0 0 110 170">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4e4e7" />
          <stop offset="100%" stopColor="#71717a" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glow under robot */}
      <ellipse cx="55" cy="165" rx="40" ry="6" fill="url(#glow)" />
      {/* head */}
      <rect x="30" y="10" width="50" height="42" rx="10" fill="url(#body)" stroke="#27272a" />
      <rect x="36" y="20" width="38" height="20" rx="6" fill="#0b0b0f" />
      {/* eyes that track */}
      <circle cx={45 + ex} cy={30 + ey} r="3.2" fill="#fb923c">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={65 + ex} cy={30 + ey} r="3.2" fill="#fb923c">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* antenna */}
      <line x1="55" y1="10" x2="55" y2="2" stroke="#a1a1aa" strokeWidth="1.5" />
      <circle cx="55" cy="2" r="2" fill="#38bdf8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
      </circle>
      {/* neck */}
      <rect x="48" y="52" width="14" height="6" fill="#52525b" />
      {/* torso */}
      <rect x="22" y="58" width="66" height="58" rx="8" fill="url(#body)" stroke="#27272a" />
      <circle cx="55" cy="87" r="9" fill="#0b0b0f" stroke="#fb923c" />
      <circle cx="55" cy="87" r="4" fill="#fb923c">
        <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* arms */}
      <motion.g
        style={{ transformOrigin: "22px 64px" }}
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="10" y="62" width="14" height="46" rx="5" fill="#a1a1aa" stroke="#27272a" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "88px 64px" }}
        animate={{ rotate: [8, -8, 8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="86" y="62" width="14" height="46" rx="5" fill="#a1a1aa" stroke="#27272a" />
      </motion.g>
      {/* legs (walking) */}
      <motion.g
        style={{ transformOrigin: "40px 116px" }}
        animate={{ rotate: [-12, 12, -12] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="32" y="116" width="16" height="42" rx="5" fill="#52525b" stroke="#27272a" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "70px 116px" }}
        animate={{ rotate: [12, -12, 12] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="62" y="116" width="16" height="42" rx="5" fill="#52525b" stroke="#27272a" />
      </motion.g>
    </svg>
  );
}

/* ---------------- Main Section ---------------- */

export default function RobotInvestigationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [stops, setStops] = useState<number[]>([]);
  const [finalCenter, setFinalCenter] = useState(0);
  const [robotY, setRobotY] = useState(0);

  // mouse tracking for eyes + parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [eyeTarget, setEyeTarget] = useState({ x: 0, y: 0 });

  // compute stop positions
  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      if (!c) return;
      const cRect = c.getBoundingClientRect();
      const positions = cardRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.left - cRect.left + r.width / 2 - 55;
      });
      setStops(positions);
      setFinalCenter(cRect.width / 2 - 55);
      setRobotY(cRect.height - 200);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // mouse → eyes + parallax
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const c = containerRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
      setEyeTarget({ x: nx * 4, y: ny * 3 });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const robotX = hoveredIndex >= 0 ? (stops[hoveredIndex] ?? finalCenter) : finalCenter;
  const activeIndex = hoveredIndex;
  const finale = false;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#06070b] px-6 py-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 0%, rgba(251,146,60,0.08), transparent 40%), radial-gradient(circle at 80% 100%, rgba(56,189,248,0.08), transparent 40%)",
      }}
    >
      {/* grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mb-12 text-center">
        <div className="mb-3 font-mono text-xs tracking-[0.3em] text-orange-400/80">
          AI · INVESTIGATION · UNIT-07
        </div>
        <h2 className="text-3xl font-semibold text-zinc-100 md:text-5xl">
          Productivity, under investigation.
        </h2>
      </div>

      {/* cards */}
      <div className="relative grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-5 md:gap-6 lg:gap-8">
        {problems.map((p, i) => {
          const Tool = toolMap[p.tool];
          const isActive = activeIndex === i;
          return (
            <div
              key={p.id}
              className="h-full min-w-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex((h) => (h === i ? -1 : h))}
            >
              <CardTilt
                mouseX={mouseX}
                mouseY={mouseY}
                ref={(el) => { cardRefs.current[i] = el; }}
                active={isActive}
                finale={finale}
              >
                <div className="mb-2 font-mono text-xs text-orange-400">{p.id}</div>
                <div className="mb-3 min-h-[4rem] text-sm font-medium leading-snug text-zinc-100">
                  {p.title}
                </div>
                <div className="relative h-40 shrink-0 rounded-md border border-zinc-800/80 bg-black/40">
                  <Tool active={isActive} />
                </div>
              </CardTilt>
            </div>
          );
        })}
      </div>


      {/* Robot */}
      {stops.length > 0 && (
        <motion.div
          className="pointer-events-none absolute left-6 z-20"
          animate={{ x: robotX, y: robotY }}
          transition={{ type: "spring", stiffness: 40, damping: 14 }}
        >
          <Robot eyeTarget={eyeTarget} />
        </motion.div>
      )}


      {/* ambient particles */}
      <Particles />
    </section>
  );
}

/* ---------------- Card with mouse parallax tilt ---------------- */

const CardTilt = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    active: boolean;
    finale: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
  }
>(function CardTilt({ children, active, finale, mouseX, mouseY }, ref) {
  const rx = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 12 });
  const ry = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 12 });
  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: active ? rx : 0,
        rotateY: active ? ry : 0,
        transformStyle: active ? "preserve-3d" : undefined,
      }}
      className={`relative flex h-full min-h-[17.5rem] w-full min-w-0 flex-col rounded-xl border bg-zinc-950/70 p-5 backdrop-blur transition-colors duration-500 ${
        active
          ? "border-orange-500/60 shadow-[0_0_30px_rgba(251,146,60,0.25)]"
          : finale
          ? "border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.2)]"
          : "border-zinc-800/80"
      }`}
    >
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-x-0 h-8"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.25), transparent)",
            }}
            animate={{ y: ["-10%", "110%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
});

/* ---------------- Ambient floating particles ---------------- */

function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 8) * 0.7;
        const dur = 8 + (i % 5);
        return (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-orange-300/60"
            style={{ left: `${left}%`, top: "100%", boxShadow: "0 0 6px #fb923c" }}
            animate={{ y: ["0%", "-700%"], opacity: [0, 1, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
