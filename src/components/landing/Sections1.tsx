import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Reveal, Section, ParticleField } from "./Core";
import { HangingRubberClock } from "./HangingClock";
import { FileSpreadsheet, ClipboardList, MessageSquare, FileText, Globe, LineChart, Phone, StickyNote } from "lucide-react";
import saadNaeemImg from "@/assets/Pictures/CEO.png";
/* ============== PROBLEM ============== */
export function ProblemSection() {
  const items = [
    { t: "No one knows what was actually accomplished" },
    { t: "Status meetings waste hours" },
    { t: "Managers guess productivity" },
    { t: "Reports take forever" },
    { t: "Focus time disappears unnoticed" },
  ];

  const clutter = [
    { icon: <FileSpreadsheet size={14} />, text: "Excel" },
    { icon: <ClipboardList size={14} />, text: "Timesheets" },
    { icon: <MessageSquare size={14} />, text: "Status mtg" },
    { icon: <FileText size={14} />, text: "Reports" },
    { icon: <Globe size={14} />, text: "Tabs" },
    { icon: <LineChart size={14} />, text: "Metrics" },
    { icon: <Phone size={14} />, text: "Calls" },
    { icon: <StickyNote size={14} />, text: "Notes" },
  ];

  return (
    <Section className="bg-[oklch(0.09_0.012_250)] overflow-hidden relative">
      <ParticleField density={40} color="#6b6e76" />
      <div className="absolute right-[6%] lg:right-[10%] top-[-144px] h-[540px] hidden lg:block z-20">
        <HangingRubberClock />
      </div>
      <div className="relative max-w-7xl mx-auto mb-20">
        <div className="text-center lg:text-left max-w-3xl">
          <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// THE PROBLEM</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
              Work isn't broken.<br />
              <span className="text-ember-flow">Visibility is.</span>
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="relative h-48 mb-16 overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 bottom-1 h-1 bg-gradient-to-r from-transparent via-ember to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ boxShadow: "0 0 30px #ff7a18" }}
        />
      </div>
      <div className="grid md:grid-cols-5 gap-4">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="glass rounded-xl p-5 h-full hover:border-ember/40 transition">
              <div className="text-ember font-mono text-xs mb-3">#{(i + 1).toString().padStart(2, "0")}</div>
              <p className="text-sm text-foreground/90 leading-snug">{it.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============== INTELLIGENCE ENGINE ============== */
export function IntelligenceEngine() {
  const features = ["Live Activity", "AI Analysis", "Reports", "Dashboards", "Approvals", "Security", "Infrastructure", "Focus"];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <Section id="intelligence" className="overflow-hidden">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// CYBERIFY INTELLIGENCE ENGINE</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            One <span className="text-chrome">command center.</span><br />
            <span className="text-ember-flow">Every signal.</span>
          </h2>
        </Reveal>
      </div>
      <div ref={ref} className="relative h-[600px] flex items-center justify-center">
        <motion.div style={{ rotate: rot }} className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute border border-ember/20 rounded-full" style={{ width: `${i * 120}px`, height: `${i * 120}px`, transform: `rotateX(${65 + i * 5}deg)` }} />
          ))}
        </motion.div>
        <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -270]) }} className="absolute inset-0 flex items-center justify-center">
          {features.map((f, i) => {
            const angle = (i / features.length) * Math.PI * 2;
            const r = 240;
            return (
              <motion.div key={f} className="absolute glass-ember rounded-lg px-4 py-2 font-mono text-xs tracking-wider text-ember whitespace-nowrap" style={{ transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r * 0.5}px)` }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.2, repeat: Infinity }}>
                {f}
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-ember/40 to-ember/10 backdrop-blur-xl border border-ember/40 flex items-center justify-center glow-ember" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}>
          <div className="absolute inset-4 rounded-full border border-ember/30" />
          <div className="absolute inset-8 rounded-full border border-ember/20" />
          <div className="text-center">
            <div className="font-mono text-xs text-ember tracking-widest">CORE</div>
            <div className="text-2xl font-bold text-chrome mt-1">Cyberify</div>
            <div className="font-mono text-[10px] text-muted-foreground mt-1">v1.0 · ONLINE</div>
          </div>
          <motion.div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 49%, rgba(255,122,24,0.6) 50%, transparent 51%)" }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
    </Section>
  );
}

/* ============== LIVE ACTIVITY ============== */
export function LiveActivity() {
  const events = [
    { name: "Ahmed", action: "Active", color: "#22c55e", time: "now" },
    { name: "Sara", action: "Focus Mode", color: "#ff7a18", time: "2m" },
    { name: "Lukas", action: "Returned", color: "#22c55e", time: "5m" },
    { name: "Yui", action: "Idle", color: "#ef4444", time: "8m" },
    { name: "Marco", action: "Active", color: "#22c55e", time: "10m" },
    { name: "Priya", action: "Focus Mode", color: "#ff7a18", time: "12m" },
  ];
  return (
    <Section className="bg-[oklch(0.09_0.012_250)]">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// LIVE ACTIVITY INTELLIGENCE</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance">
              A real-time <span className="text-chrome">operations center</span> for your workforce.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground">Every developer, every state, every signal — live. See your entire global team breathe in one shared canvas.</p>
          </Reveal>
          <div className="mt-10 space-y-2 font-mono text-sm">
            {events.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 glass rounded-lg p-3">
                <span className="w-2 h-2 rounded-full" style={{ background: e.color, boxShadow: `0 0 10px ${e.color}` }} />
                <span className="text-foreground">{e.name}</span>
                <span className="text-muted-foreground flex-1">{e.action}</span>
                <span className="text-xs text-muted-foreground">{e.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square max-w-[500px] mx-auto w-full">
          <motion.div className="absolute inset-0 rounded-full border border-ember/30 grid-bg" style={{ background: "radial-gradient(circle at 30% 30%, oklch(0.74 0.18 50 / 0.2), transparent 60%), radial-gradient(circle, oklch(0.17 0.018 250), oklch(0.09 0.012 250))" }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="absolute inset-0 rounded-full border border-ember/10" style={{ transform: `rotateY(${i * 30}deg)` }} />
            ))}
          </motion.div>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r = 35 + Math.random() * 10;
            return (
              <motion.div key={i} className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: i % 4 === 0 ? "#ff7a18" : i % 5 === 0 ? "#ef4444" : "#22c55e", boxShadow: `0 0 8px currentColor`, color: i % 4 === 0 ? "#ff7a18" : i % 5 === 0 ? "#ef4444" : "#22c55e", transform: `translate(${Math.cos(a) * r}%, ${Math.sin(a) * r}%)` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2 + (i % 3), repeat: Infinity }} />
            );
          })}
          <div className="absolute inset-1/4 rounded-full border border-ember/40 flex items-center justify-center font-mono text-xs text-ember">
            <div className="text-center"><div className="text-3xl text-chrome font-bold">142</div><div className="tracking-widest">DEVS ONLINE</div></div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============== AI BRAIN ============== */
export function AIBrain() {
  return (
    <Section>
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// AI PRODUCTIVITY ANALYSIS</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            <span className="text-chrome">Raw activity</span> in.<br />
            <span className="text-ember-flow">Human insight</span> out.
          </h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div className="space-y-3">
          {["VS Code", "Chrome", "Database", "Terminal"].map((s, i) => (
            <Reveal key={s} delay={i * 0.1}>
              <div className="glass rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ember animate-pulse" />
                <span className="font-mono text-sm">{s}</span>
                <span className="ml-auto text-xs text-muted-foreground">streaming</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="relative aspect-square flex items-center justify-center">
          <motion.div className="absolute inset-8 rounded-full border-2 border-ember/40" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-12 rounded-full border border-ember/30" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="brainG">
                <stop offset="0%" stopColor="#ff7a18" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#brainG)" />
            {Array.from({ length: 30 }).map((_, i) => {
              const a1 = Math.random() * Math.PI * 2, a2 = Math.random() * Math.PI * 2;
              const r1 = 30 + Math.random() * 40, r2 = 30 + Math.random() * 40;
              return (<line key={i} x1={100 + Math.cos(a1) * r1} y1={100 + Math.sin(a1) * r1} x2={100 + Math.cos(a2) * r2} y2={100 + Math.sin(a2) * r2} stroke="#ff7a18" strokeWidth="0.3" opacity={0.4 + Math.random() * 0.4}><animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" /></line>);
            })}
            {Array.from({ length: 20 }).map((_, i) => {
              const a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 60;
              return (<circle key={"n" + i} cx={100 + Math.cos(a) * r} cy={100 + Math.sin(a) * r} r="1.5" fill="#ff7a18"><animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + Math.random() * 2}s`} repeatCount="indefinite" /></circle>);
            })}
          </svg>
          <div className="relative font-mono text-xs text-ember tracking-widest text-center">
            <div className="text-chrome font-bold text-lg">Cyberify</div>
            <div>ANALYSIS</div>
          </div>
        </div>
        <Reveal delay={0.3}>
          <div className="glass-ember rounded-xl p-6">
            <div className="font-mono text-xs text-ember tracking-widest mb-3">// AI DAILY SUMMARY</div>
            <p className="text-foreground leading-relaxed">Today <span className="text-ember">Ahmed</span> completed API integration, resolved Redis caching issue and improved authentication flow.</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Productivity score: <span className="text-chrome">94</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============== ROTATING AVATAR ============== */
import ops1 from "@/assets/Pictures/team/ops_1.png";
import ops2 from "@/assets/Pictures/team/ops_2.png";
import ops3 from "@/assets/Pictures/team/ops_3.svg";
import pm1 from "@/assets/Pictures/team/pm_1.png";
import pm2 from "@/assets/Pictures/team/pm_2.png";
import dev1 from "@/assets/Pictures/team/dev_1.png";
import dev2 from "@/assets/Pictures/team/dev_2.svg";
import dev3 from "@/assets/Pictures/team/dev_3.svg";

function RotatingAvatar({ images, color }: { images: string[]; color: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-20 h-20 mb-5 relative">
      {images.map((src, idx) => (
        <motion.img
          key={idx}
          src={src}
          alt={`Team member ${idx + 1}`}
          className="absolute inset-0 w-full h-full rounded-full object-cover z-10"
          style={{ boxShadow: `0 0 30px ${color}40` }}
          initial={false}
          animate={{
            opacity: idx === currentIndex ? 1 : 0,
            scale: idx === currentIndex ? 1 : 0.92,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute -inset-2 rounded-full border opacity-40 pointer-events-none z-20"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ============== DASHBOARD UNIVERSE ============== */
export function DashboardUniverse() {
  /* ── To add new team members: just import their image and push to the array below ── */
  const opsTeam = [ops1, ops2, ops3];
  const pmTeam = [pm1, pm2];
  const devTeam = [dev1, dev2, dev3];

  const planets = [
    { name: "CEO", color: "#ff7a18", items: ["Company Productivity", "Attendance", "Workforce Trends"], team: null as string[] | null },
    { name: "Operations", color: "#fbbf24", items: ["Approvals", "Attendance", "Tracking"], team: opsTeam },
    { name: "PM", color: "#22d3ee", items: ["Team Reports", "Developer Insights"], team: pmTeam },
    { name: "Developer", color: "#a78bfa", items: ["Personal Performance", "Daily History", "Focus Analytics"], team: devTeam },
  ];
  return (
    <Section className="bg-[oklch(0.09_0.012_250)] overflow-hidden">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// DASHBOARD UNIVERSE</p></Reveal>
        <Reveal delay={0.1}><h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance"><span className="text-ember-flow">Every role.</span> Its own world.</h2></Reveal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planets.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div className="glass rounded-2xl p-6 h-full group hover:border-ember/40 transition relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition" style={{ background: p.color }} />
              <div className="relative">
                {i === 0 ? (
                  <div className="w-20 h-20 mb-5 relative">
                    <img src={saadNaeemImg} alt="CEO Saad Naeem" className="w-full h-full rounded-full object-cover relative z-10" style={{ boxShadow: `0 0 30px ${p.color}40` }} />
                    <motion.div className="absolute -inset-2 rounded-full border opacity-40 pointer-events-none" style={{ borderColor: p.color }} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                  </div>
                ) : (
                  <RotatingAvatar images={p.team!} color={p.color} />
                )}
                <h3 className="text-2xl font-bold text-chrome">{p.name}</h3>
                <p className="font-mono text-xs text-ember tracking-widest mt-1 mb-4">PLANET</p>
                <ul className="space-y-1.5">{p.items.map(it => (<li key={it} className="text-sm text-muted-foreground flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-ember" />{it}</li>))}</ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============== TIMELINE ============== */
export function Timeline() {
  const points = [
    { t: "09:00", l: "Active", c: "#22c55e" },
    { t: "11:00", l: "Deep Focus", c: "#ff7a18" },
    { t: "13:00", l: "Break", c: "#a78bfa" },
    { t: "14:00", l: "Active", c: "#22c55e" },
    { t: "18:00", l: "Overtime", c: "#fbbf24" },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <Section>
      <div className="text-center mb-20">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// PRODUCTIVITY TIMELINE</p></Reveal>
        <Reveal delay={0.1}><h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">A day, <span className="text-ember-flow">decoded.</span></h2></Reveal>
      </div>
      <div ref={ref} className="relative glass rounded-3xl p-8 sm:p-12 overflow-hidden">
        <div className="relative h-2 bg-secondary rounded-full">
          <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember via-yellow-400 to-ember rounded-full glow-ember-sm" initial={{ width: "0%" }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 2.5, ease: "easeInOut" }} />
        </div>
        <div className="relative mt-2 grid grid-cols-5 gap-2">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.3 }} className="text-center relative">
              <div className="w-4 h-4 rounded-full mx-auto -mt-3" style={{ background: p.c, boxShadow: `0 0 12px ${p.c}` }} />
              <div className="font-mono text-xs text-muted-foreground mt-2">{p.t}</div>
              <div className="text-sm font-medium mt-1">{p.l}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-ember tracking-widest">AI SCORE</div>
            <div className="text-6xl font-bold text-chrome">
              <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2 }}>92</motion.span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <div><div className="text-muted-foreground">FOCUS</div><div className="text-chrome text-lg">4h 12m</div></div>
            <div><div className="text-muted-foreground">ACTIVE</div><div className="text-chrome text-lg">7h 48m</div></div>
            <div><div className="text-muted-foreground">SHIPS</div><div className="text-ember text-lg">3</div></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
