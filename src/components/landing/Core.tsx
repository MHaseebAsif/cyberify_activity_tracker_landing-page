import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============== PARTICLE CANVAS ============== */
export function ParticleField({ density = 80, color = "#ff7a18", className = "" }: { density?: number; color?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.6 + 0.2,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = color + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density, color]);
  return <canvas ref={ref} className={"absolute inset-0 w-full h-full " + className} />;
}

/* ============== CLOCK SVG (shared) ============== */
export function ClockSvg({ phase, spinFace = true, spinHands = false }: { phase: number; spinFace?: boolean; spinHands?: boolean }) {
  return (
    <motion.svg
      width="280" height="280" viewBox="0 0 200 200"
      className="relative"
      animate={spinFace && phase >= 4 ? { rotate: 360 } : {}}
      transition={{ duration: phase >= 5 ? 0.4 : 2, repeat: spinFace && phase >= 4 ? Infinity : 0, ease: "linear" }}
    >
      <defs>
        <radialGradient id="cf" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2a2a30" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </radialGradient>
        <linearGradient id="cb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8dae0" />
          <stop offset="50%" stopColor="#6b6e76" />
          <stop offset="100%" stopColor="#e8eaef" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#cb)" />
      <circle cx="100" cy="100" r="84" fill="url(#cf)" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#ff7a18" strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        const x1 = 100 + Math.cos(a) * 72;
        const y1 = 100 + Math.sin(a) * 72;
        const x2 = 100 + Math.cos(a) * 80;
        const y2 = 100 + Math.sin(a) * 80;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff7a18" strokeWidth="2" strokeLinecap="round" />;
      })}
      <g>
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          animate={spinHands ? { rotate: 360 } : { rotate: 360 * (phase >= 5 ? 12 : phase >= 4 ? 4 : 1) }}
          transition={spinHands ? { duration: 12, repeat: Infinity, ease: "linear" } : { duration: 4, ease: "easeIn" }}
        >
          <circle cx="100" cy="100" r="100" fill="transparent" />
          <line x1="100" y1="100" x2="100" y2="50" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          animate={spinHands ? { rotate: 360 } : { rotate: 360 * (phase >= 5 ? 60 : phase >= 4 ? 20 : 4) }}
          transition={spinHands ? { duration: 1.5, repeat: Infinity, ease: "linear" } : { duration: 4, ease: "easeIn" }}
        >
          <circle cx="100" cy="100" r="100" fill="transparent" />
          <line x1="100" y1="100" x2="100" y2="35" stroke="#ff7a18" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </g>
      <circle cx="100" cy="100" r="5" fill="#ff7a18" />
    </motion.svg>
  );
}

/* ============== SECTION WRAPPER ============== */
export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={"relative py-28 sm:py-36 px-6 " + className}>
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
}

/* ============== REVEAL ============== */
export function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}
