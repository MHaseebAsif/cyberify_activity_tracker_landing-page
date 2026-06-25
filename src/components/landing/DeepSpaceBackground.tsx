import { motion } from "framer-motion";

const ORANGE_DOTS = 48;
const STARS = 120;
const BOKEH = 22;

export function DeepSpaceBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {/* deep space base + nebula */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 10% 5%, rgba(251,146,60,0.12), transparent 55%),
            radial-gradient(ellipse 70% 50% at 90% 15%, rgba(251,146,60,0.07), transparent 50%),
            radial-gradient(ellipse 65% 55% at 85% 90%, rgba(56,189,248,0.08), transparent 50%),
            radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,122,24,0.08), transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(2,3,8,0.95), transparent)
          `,
        }}
      />

      {/* distant stars — spread across full height */}
      {Array.from({ length: STARS }).map((_, i) => {
        const left = (i * 47 + 13) % 100;
        const top = (i * 61 + 7) % 100;
        const size = i % 5 === 0 ? 1.5 : 1;
        const opacity = 0.2 + (i % 7) * 0.1;
        return (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity,
              boxShadow: i % 9 === 0 ? "0 0 4px rgba(255,255,255,0.6)" : undefined,
            }}
          />
        );
      })}

      {/* static orange bokeh — full section coverage */}
      {Array.from({ length: BOKEH }).map((_, i) => {
        const left = (i * 73 + 11) % 100;
        const top = (i * 41 + 19) % 100;
        const size = 3 + (i % 5);
        return (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full bg-orange-300/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              boxShadow: `0 0 ${10 + (i % 5) * 4}px rgba(251,146,60,0.55)`,
            }}
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
          />
        );
      })}

      {/* scattered orange dots — anchored across full height */}
      {Array.from({ length: ORANGE_DOTS }).map((_, i) => {
        const left = (i * 53 + 7) % 100;
        const top = (i * 37 + 11) % 100;
        const size = i % 3 === 0 ? 4 : 3;
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-orange-300/70"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              boxShadow: "0 0 8px #fb923c",
            }}
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        );
      })}

      {/* rising orange dots — drift upward through entire section */}
      {Array.from({ length: 28 }).map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 8) * 0.7;
        const dur = 10 + (i % 5);
        const size = i % 3 === 0 ? 4 : 3;
        return (
          <motion.div
            key={`rise-${i}`}
            className="absolute rounded-full bg-orange-300/60"
            style={{
              left: `${left}%`,
              top: "100%",
              width: size,
              height: size,
              boxShadow: "0 0 6px #fb923c",
            }}
            animate={{ y: ["0%", "-120%"], opacity: [0, 1, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
