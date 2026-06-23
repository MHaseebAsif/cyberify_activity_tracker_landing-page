import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import waves from "@/assets/cyber-waves.jpg";
import { ParticleField } from "./Core";
import { LayoutGrid, Apple, Terminal } from "lucide-react";

/* ============== HERO CLOCK ============== */
function HeroClock() {
  const [hourRotate, setHourRotate] = useState(0);
  const [minRotate, setMinRotate] = useState(0);
  const speedRef = useRef(1);

  useEffect(() => {
    let active = true;
    let lastTime = performance.now();
    const animate = (now: number) => {
      if (!active) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      speedRef.current = Math.min(speedRef.current + dt * 0.25, 4.0);
      setHourRotate(prev => (prev + dt * 8 * speedRef.current) % 360);
      setMinRotate(prev => (prev + dt * 96 * speedRef.current) % 360);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => { active = false; };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full bg-ember/15 blur-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <svg width="100%" height="100%" viewBox="0 0 200 200" className="relative drop-shadow-[0_0_25px_rgba(255,122,24,0.25)]">
        <defs>
          <radialGradient id="cf-hero" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#2a2a30" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </radialGradient>
          <linearGradient id="cb-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8dae0" />
            <stop offset="50%" stopColor="#6b6e76" />
            <stop offset="100%" stopColor="#e8eaef" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#cb-hero)" />
        <circle cx="100" cy="100" r="84" fill="url(#cf-hero)" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="#ff7a18" strokeWidth="0.5" opacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 - 90) * Math.PI / 180;
          const x1 = 100 + Math.cos(a) * 72;
          const y1 = 100 + Math.sin(a) * 72;
          const x2 = 100 + Math.cos(a) * 80;
          const y2 = 100 + Math.sin(a) * 80;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff7a18" strokeWidth="2" strokeLinecap="round" />;
        })}
        <g style={{ transform: `rotate(${hourRotate}deg)`, transformOrigin: "100px 100px" }}>
          <line x1="100" y1="100" x2="100" y2="50" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g style={{ transform: `rotate(${minRotate}deg)`, transformOrigin: "100px 100px" }}>
          <line x1="100" y1="100" x2="100" y2="35" stroke="#ff7a18" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="5" fill="#ff7a18" />
      </svg>
    </div>
  );
}

/* ============== FLOATING NODES ============== */
function FloatingNodes() {
  const nodes = [
    { x: "10%", y: "20%", c: "#22c55e", l: "ACTIVE" },
    { x: "85%", y: "30%", c: "#ff7a18", l: "FOCUS" },
    { x: "15%", y: "75%", c: "#ff7a18", l: "FOCUS" },
    { x: "80%", y: "70%", c: "#22c55e", l: "ACTIVE" },
    { x: "50%", y: "15%", c: "#ef4444", l: "IDLE" },
    { x: "92%", y: "85%", c: "#22c55e", l: "ACTIVE" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <line x1="10%" y1="20%" x2="50%" y2="15%" stroke="#ff7a18" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="85%" y1="30%" x2="50%" y2="15%" stroke="#ff7a18" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="15%" y1="75%" x2="80%" y2="70%" stroke="#ff7a18" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="80%" y1="70%" x2="85%" y2="30%" stroke="#ff7a18" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>
      {nodes.map((n, i) => (
        <motion.div key={i} className="absolute" style={{ left: n.x, top: n.y }} animate={{ y: [0, -12, 0] }} transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}>
          <div className="relative flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: n.c }} />
              <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: n.c, boxShadow: `0 0 12px ${n.c}` }} />
            </span>
            <span className="hidden md:inline text-[10px] font-mono tracking-widest text-muted-foreground">{n.l}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============== HERO ============== */
export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24">
      <div className="absolute inset-0">
        <img src={waves} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg radial-fade opacity-50" />
      </div>
      <ParticleField density={120} />
      <FloatingNodes />

      {/* Clock scrolls down with page to merge with hanging clock */}
      <motion.div
        style={{
          y: useTransform(scrollY, [0, typeof window !== 'undefined' ? window.innerHeight * 0.55 + 240 : 1000], [0, typeof window !== 'undefined' ? window.innerHeight * 0.55 + 240 : 1000]),
          opacity: useTransform(scrollY, [typeof window !== 'undefined' ? window.innerHeight * 0.55 - 61 : 500, typeof window !== 'undefined' ? window.innerHeight * 0.55 - 60 : 501], [1, 0]),
          scale: useTransform(scrollY, [0, typeof window !== 'undefined' ? window.innerHeight * 0.55 + 240 : 1000], [1, 0.75])
        }}
        className="absolute right-[6%] lg:right-[10%] top-[45%] -translate-y-1/2 hidden md:block z-[60] pointer-events-auto"
      >
        <HeroClock />
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-ember rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-ember mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
          WORKFORCE INTELLIGENCE · LIVE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]"
        >
          The <span className="text-ember-flow">AI-Powered</span> Workforce
          <br />Intelligence Platform
          <br /><span className="text-chrome">Built for Modern Teams</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          Know exactly how your team works — not just when they clock in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#intelligence" className="group relative bg-ember text-primary-foreground font-semibold px-8 py-4 rounded-xl glow-ember hover:scale-[1.03] transition flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
            Watch Intelligence In Action
            <span className="opacity-60 group-hover:translate-x-1 transition">→</span>
          </a>
          <a href="#features" className="glass px-8 py-4 rounded-xl font-medium hover:border-ember/40 transition">
            Explore Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-muted-foreground text-xs font-mono tracking-widest"
        >
          <span className="opacity-60">AVAILABLE ON</span>
          <span className="flex items-center gap-2 hover:text-ember transition"><LayoutGrid size={14} /> WINDOWS</span>
          <span className="flex items-center gap-2 hover:text-ember transition"><Apple size={14} /> MACOS</span>
          <span className="flex items-center gap-2 hover:text-ember transition"><Terminal size={14} /> LINUX</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
