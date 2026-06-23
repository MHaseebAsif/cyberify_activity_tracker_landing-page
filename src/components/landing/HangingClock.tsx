import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ClockSvg } from "./Core";

export function HangingRubberClock() {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const anchorX = 120;
  const anchorY = 0;
  const clockRestY = 300;
  const clockTopOffset = 10;

  const pathD = useTransform([dragX, dragY], ([lx, ly]) => {
    const cx = anchorX + Number(lx);
    const cy = clockRestY + clockTopOffset + Number(ly);
    const ctrl1X = anchorX + Number(lx) * 0.35;
    const ctrl1Y = (anchorY + cy) * 0.5 + Math.max(0, 40 - Math.abs(Number(lx)) * 0.1);
    return `M ${anchorX} ${anchorY} Q ${ctrl1X} ${ctrl1Y} ${cx} ${cy}`;
  });

  const glowPathD = pathD;

  const strokeWidth = useTransform([dragX, dragY], ([lx, ly]) => {
    const cx = anchorX + Number(lx);
    const cy = clockRestY + clockTopOffset + Number(ly);
    const dist = Math.sqrt((cx - anchorX) ** 2 + (cy - anchorY) ** 2);
    return Math.max(1.2, Math.min(2.5, 2.5 - (dist - clockRestY) * 0.004));
  });

  const glowWidth = useTransform(strokeWidth, (v) => Number(v) * 6);
  const shadowWidth = useTransform(strokeWidth, (v) => Number(v) + 3);

  const beadTs = [0.18, 0.36, 0.54, 0.72];

  const computeBeads = useCallback((lx: number, ly: number) => {
    const endX = anchorX + lx;
    const endY = clockRestY + clockTopOffset + ly;
    const ctrl1X = anchorX + lx * 0.35;
    const ctrl1Y = (anchorY + endY) * 0.5 + Math.max(0, 40 - Math.abs(lx) * 0.1);
    return beadTs.map((t) => ({
      x: (1 - t) * (1 - t) * anchorX + 2 * (1 - t) * t * ctrl1X + t * t * endX,
      y: (1 - t) * (1 - t) * anchorY + 2 * (1 - t) * t * ctrl1Y + t * t * endY,
    }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [beads, setBeads] = useState(() => computeBeads(0, 0));

  useEffect(() => {
    const update = () => setBeads(computeBeads(dragX.get(), dragY.get()));
    const unsubX = dragX.on("change", update);
    const unsubY = dragY.on("change", update);
    return () => { unsubX(); unsubY(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [hasDropped, setHasDropped] = useState(false);
  const { scrollY } = useScroll();
  const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.55 - 60 : 500;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= threshold && !hasDropped) {
      setHasDropped(true);
      dragY.set(-300);
      import("framer-motion").then(({ animate }) => {
        animate(dragY, 0, { type: "spring", stiffness: 150, damping: 7, mass: 1.2, velocity: 1200 });
      });
    } else if (latest < threshold - 100 && hasDropped) {
      setHasDropped(false);
    }
  });

  return (
    <motion.div
      className="relative w-[240px] h-[540px] flex flex-col items-center select-none"
      style={{
        opacity: useTransform(scrollY, [typeof window !== 'undefined' ? window.innerHeight * 0.55 - 61 : 500, typeof window !== 'undefined' ? window.innerHeight * 0.55 - 60 : 501], [0, 1])
      }}
    >
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10" style={{ filter: "url(#chandelier-glow)" }}>
        <defs>
          <filter id="chandelier-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="string-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#ff7a18" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffb347" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="bead-grad" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ff7a18" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c0600a" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <motion.path d={glowPathD} fill="none" stroke="#ff7a18" strokeWidth={glowWidth} strokeLinecap="round" opacity={0.18} />
        <motion.path d={pathD} fill="none" stroke="#ffd580" strokeWidth={useTransform(strokeWidth, v => Number(v) * 3)} strokeLinecap="round" opacity={0.25} />
        <motion.path d={pathD} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth={shadowWidth} strokeLinecap="round" />
        <motion.path d={pathD} fill="none" stroke="url(#string-grad)" strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx={anchorX} cy={anchorY} r="7" fill="#1a1a20" stroke="#ff7a18" strokeWidth="1.5" />
        <circle cx={anchorX} cy={anchorY} r="3.5" fill="#ff7a18" opacity="0.9" />
        <circle cx={anchorX} cy={anchorY} r="14" fill="#ff7a18" opacity="0.12" />
        <g>
          {beads.map((bead, i) => (
            <g key={i}>
              <circle cx={bead.x} cy={bead.y} r={i % 2 === 0 ? 10 : 7} fill="#ff7a18" opacity="0.12" />
              <circle cx={bead.x} cy={bead.y} r={i % 2 === 0 ? 4.5 : 3} fill="url(#bead-grad)" stroke="#ffd580" strokeWidth="0.6" />
              <circle cx={bead.x - (i % 2 === 0 ? 1.5 : 1)} cy={bead.y - (i % 2 === 0 ? 1.5 : 1)} r={i % 2 === 0 ? 1.5 : 1} fill="white" opacity="0.7" />
            </g>
          ))}
        </g>
      </svg>

      <div
        className="absolute pointer-events-none z-0"
        style={{ left: anchorX - 40, top: 0, width: 80, height: 120, background: "radial-gradient(ellipse at 50% 0%, rgba(255,122,24,0.22) 0%, transparent 70%)" }}
      />

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.85}
        dragTransition={{ bounceStiffness: 220, bounceDamping: 14 }}
        style={{ x: dragX, y: dragY }}
        className="absolute left-[36px] top-[300px] w-[168px] h-[168px] cursor-grab active:cursor-grabbing z-20 flex items-center justify-center"
      >
        <div className="absolute pointer-events-none" style={{ width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,122,24,0.18) 0%, rgba(255,180,50,0.08) 40%, transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%, -50%)", filter: "blur(8px)" }} />
        <motion.div className="absolute pointer-events-none rounded-full border border-ember/30" style={{ width: 200, height: 200, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute pointer-events-none rounded-full" style={{ width: 185, height: 185, left: "50%", top: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 18px 4px rgba(255,122,24,0.35), inset 0 0 12px rgba(255,180,50,0.15)" }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <div className="w-[280px] h-[280px] scale-[0.6] flex items-center justify-center pointer-events-none">
          <ClockSvg phase={4} spinFace={false} spinHands={true} />
        </div>
      </motion.div>
    </motion.div>
  );
}
