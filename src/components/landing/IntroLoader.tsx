import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/cyberify-logo.png";
import { ClockSvg, ParticleField } from "./Core";

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const messages = [
    "Initializing Workforce Intelligence...",
    "Loading AI Analysis Engine...",
    "Connecting Activity Streams...",
    "Analyzing Team Presence...",
  ];
  useEffect(() => {
    const timers: number[] = [];
    messages.forEach((_, i) => {
      timers.push(window.setTimeout(() => setPhase(i + 1), 700 + i * 700));
    });
    timers.push(window.setTimeout(() => setPhase(5), 3600));
    timers.push(window.setTimeout(() => setPhase(6), 5200));
    timers.push(window.setTimeout(() => setPhase(7), 7200));
    timers.push(window.setTimeout(() => setPhase(8), 9200));
    timers.push(window.setTimeout(() => onDone(), 10200));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const shards = [
    { path: "polygon(0% 0%, 30% 0%, 45% 35%, 25% 65%, 0% 70%)", explode: { x: -250, y: -60, rotate: -120 } },
    { path: "polygon(30% 0%, 60% 0%, 45% 35%)", explode: { x: 110, y: -230, rotate: 80 } },
    { path: "polygon(60% 0%, 100% 0%, 100% 40%, 75% 45%, 45% 35%)", explode: { x: 230, y: 60, rotate: 145 } },
    { path: "polygon(100% 40%, 100% 100%, 30% 100%, 55% 80%, 75% 45%)", explode: { x: -40, y: 260, rotate: -95 } },
    { path: "polygon(30% 100%, 0% 100%, 0% 70%, 25% 65%, 55% 80%)", explode: { x: -190, y: 150, rotate: 50 } },
    { path: "polygon(45% 35%, 75% 45%, 55% 80%, 25% 65%)", explode: { x: -30, y: -120, rotate: -180 } },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase >= 8 ? 0 : 1 }}
      transition={{ duration: 1, delay: phase >= 8 ? 0.6 : 0 }}
      style={{ pointerEvents: phase >= 8 ? "none" : "auto" }}
    >
      <ParticleField density={phase >= 4 ? 150 : 40} />
      <div className="relative flex flex-col items-center gap-10">
        <motion.div
          className="relative w-[280px] h-[280px]"
          animate={{ scale: phase >= 4 ? 1 : 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {phase < 6 && (
            <motion.div
              className="absolute inset-0 rounded-full bg-ember blur-3xl"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: phase < 6 ? 1 : 0 }}
          >
            <ClockSvg phase={phase} />
          </motion.div>
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: phase >= 6 ? 1 : 0 }} transition={{ duration: 0 }}>
            {shards.map((s, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{ clipPath: s.path }}
                initial={false}
                animate={phase < 6 ? { x: 0, y: 0, rotate: 0 } : phase === 6 ? s.explode : { x: 0, y: 0, rotate: 0 }}
                transition={{ duration: phase === 6 ? 1.5 : 1.8, ease: phase === 6 ? "easeOut" : [0.25, 1, 0.5, 1] }}
              >
                <motion.div className="absolute inset-0 flex items-center justify-center" initial={false} animate={{ opacity: phase >= 7 ? 0 : 1 }} transition={{ duration: 0.8 }}>
                  <ClockSvg phase={phase} />
                </motion.div>
                <motion.div className="absolute inset-0 flex items-center justify-center" initial={false} animate={{ opacity: phase >= 7 ? 1 : 0 }} transition={{ duration: 0.8 }}>
                  <img src={logo} alt="Logo" className="w-[250px] h-auto object-contain" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="h-12 font-mono text-xs sm:text-sm text-ember/80 tracking-widest text-center">
          <AnimatePresence mode="wait">
            {phase >= 1 && phase < 5 && (
              <motion.div key={Math.min(phase, 4)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                {messages[Math.min(phase, 4) - 1]}
              </motion.div>
            )}
            {phase === 5 && (
              <motion.div key="dead" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-chrome text-xl sm:text-2xl font-bold tracking-[0.3em]">
                TIME TRACKING IS DEAD
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
