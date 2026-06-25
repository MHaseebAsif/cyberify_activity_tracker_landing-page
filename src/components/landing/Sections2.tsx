import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, Section } from "./Core";
import logo from "@/assets/cyberify-logo.png";
import clockIcon from "@/assets/cyberify-clock.png";
import windowsIcon from "@/assets/Icons/windows.png";
import windows11Icon from "@/assets/Icons/windows_11.png";
import appleIcon from "@/assets/Icons/apple.png";
import macIcon from "@/assets/Icons/mac.png";
import linuxIcon from "@/assets/Icons/linux.png";
import archLinuxIcon from "@/assets/Icons/arch_linux.png";
import {
  Radio, Brain, Zap, BarChart3, Users, LayoutDashboard, Shield,
  Monitor, Lock, Cloud, CheckCircle, Target,
  Smartphone, RefreshCw, ShieldCheck
} from "lucide-react";

/* ============== FEATURE GRID ============== */
export function FeatureGrid() {
  const features = [
    { i: <Radio size={28} className="text-ember" />, t: "Real-Time Activity Intelligence", d: "Every signal, every state, streamed live." },
    { i: <Brain size={28} className="text-ember" />, t: "AI Productivity Analysis", d: "Cyberify turns activity into human summaries." },
    { i: <Zap size={28} className="text-ember" />, t: "Smart Work Tracking", d: "Zero-config, app-aware, privacy-first." },
    { i: <BarChart3 size={28} className="text-ember" />, t: "Daily Reports", d: "Auto-generated. Auto-delivered." },
    { i: <Users size={28} className="text-ember" />, t: "Team Reports", d: "Roll up insights across squads." },
    { i: <LayoutDashboard size={28} className="text-ember" />, t: "Role Dashboards", d: "CEO, Ops, PM, Dev — purpose-built views." },
    { i: <Shield size={28} className="text-ember" />, t: "RBAC", d: "Granular permission control." },
    { i: <Monitor size={28} className="text-ember" />, t: "Desktop App", d: "Native on Windows, macOS, Linux." },
    { i: <Lock size={28} className="text-ember" />, t: "Security", d: "JWT, OTP, session invalidation." },
    { i: <Cloud size={28} className="text-ember" />, t: "Cloud Infrastructure", d: "Built on FastAPI, Redis, Postgres." },
    { i: <CheckCircle size={28} className="text-ember" />, t: "Approval Workflow", d: "Leaves, overtime, exceptions — fast." },
    { i: <Target size={28} className="text-ember" />, t: "Focus Tracking", d: "Deep work, measured." },
  ];
  return (
    <Section id="features" className="bg-[oklch(0.09_0.012_250)]">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// CAPABILITIES</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            Twelve pillars. <span className="text-ember-flow">One platform.</span>
          </h2>
        </Reveal>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.04}>
            <FeatureCard {...f} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ i, t, d }: { i: React.ReactNode; t: string; d: string }) {
  const [r, setR] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - 0.5;
        const y = (e.clientY - b.top) / b.height - 0.5;
        setR({ x: y * -8, y: x * 8 });
      }}
      onMouseLeave={() => setR({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${r.x}deg) rotateY(${r.y}deg)` }}
      className="glass rounded-2xl p-6 h-full transition-all hover:border-ember/50 hover:bg-ember/5 group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
        style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,122,24,0.15), transparent 40%)" }}
      />
      <div className="mb-4">{i}</div>
      <h3 className="font-semibold text-foreground mb-2">{t}</h3>
      <p className="text-sm text-muted-foreground">{d}</p>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

/* ============== ARCHITECTURE ============== */
export function Architecture() {
  const stack = [
    { n: "Electron App", d: "Native desktop client" },
    { n: "FastAPI", d: "High-performance Python API" },
    { n: "Redis", d: "Real-time stream layer" },
    { n: "PostgreSQL", d: "Source of truth" },
    { n: "Cyberify", d: "AI analysis engine" },
    { n: "S3 Storage", d: "Artifact persistence" },
    { n: "PDF Reports", d: "Delivered automatically" },
  ];
  return (
    <Section id="architecture">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// ARCHITECTURE</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            Engineered like <span className="text-ember-flow">infrastructure</span>.
          </h2>
        </Reveal>
      </div>
      <div className="relative max-w-3xl mx-auto">
        {/* central beam */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ember to-transparent -translate-x-1/2 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-ember to-transparent"
            animate={{ y: ["-100%", "1000%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="space-y-4">
          {stack.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className={`flex items-center gap-6 ${i % 2 ? "flex-row-reverse text-right" : ""}`}>
                <div className="flex-1 glass rounded-xl p-5 hover:border-ember/40 transition">
                  <div className="font-mono text-xs text-ember tracking-widest">LAYER {(i + 1).toString().padStart(2, "0")}</div>
                  <div className="text-xl font-bold text-chrome">{s.n}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
                </div>
                <div className="relative z-10 w-4 h-4 rounded-full bg-ember glow-ember-sm shrink-0" />
                <div className="flex-1" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============== COUNTERS ============== */
function Counter({ to, suffix = "", duration = 1.6 }: { to: number | string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  const isNum = typeof to === "number";
  useEffect(() => {
    if (!inView || !isNum) return;
    const start = performance.now();
    const end = to as number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      setV(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration, isNum]);
  return <span ref={ref}>{isNum ? v : to}{suffix}</span>;
}

export function WhyCyberify() {
  const stats: { v: number | string; s?: string; l: string }[] = [
    { v: 60, s: "+", l: "API Endpoints" },
    { v: 4, l: "Role Dashboards" },
    { v: 5, l: "Automated Workers" },
    { v: "99.9", s: "%", l: "Uptime Target" },
    { v: "Cyberify", l: "AI Engine" },
    { v: 3, l: "Desktop Platforms" },
  ];
  return (
    <Section className="bg-[oklch(0.09_0.012_250)]">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// WHY CYBERIFY</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            The numbers <span className="text-ember-flow">speak</span>.
          </h2>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden glass">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="bg-background/60 p-8 sm:p-10 h-full flex flex-col justify-end hover:bg-ember/5 transition">
              <div className="text-5xl sm:text-6xl font-bold text-chrome">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 font-mono text-xs tracking-widest text-ember">{s.l.toUpperCase()}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============== COMPARISON ============== */
export function Comparison() {
  const rows = [
    ["Visibility", "Hours clocked", "AI-decoded outcomes"],
    ["Reports", "Manual & late", "Auto-generated daily"],
    ["Insight depth", "Spreadsheets", "Cyberify summaries"],
    ["Focus signal", "Invisible", "Tracked & rewarded"],
    ["Privacy", "Surveillance", "Activity-only, no keystrokes"],
    ["Setup", "Weeks", "Minutes"],
  ];
  return (
    <Section>
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// COMPARISON</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            Trackers <span className="text-muted-foreground/60 line-through">measure time.</span><br />
            Cyberify <span className="text-ember-flow">measures work.</span>
          </h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="glass rounded-2xl p-8 border-destructive/30 h-full">
            <div className="font-mono text-xs tracking-widest text-destructive mb-6">// TRADITIONAL TRACKERS</div>
            <div className="space-y-3">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 py-2 border-b border-border/40 last:border-0">
                  <span className="text-destructive mt-0.5">✕</span>
                  <div>
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="text-sm">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass-ember rounded-2xl p-8 h-full glow-ember-sm">
            <div className="font-mono text-xs tracking-widest text-ember mb-6">// CYBERIFY</div>
            <div className="space-y-3">
              {rows.map(([k, , v]) => (
                <div key={k} className="flex items-start gap-3 py-2 border-b border-ember/20 last:border-0">
                  <span className="text-ember mt-0.5">✓</span>
                  <div>
                    <div className="text-xs text-ember/80">{k}</div>
                    <div className="text-sm text-foreground">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============== DESKTOP SHOWCASE ============== */
export function DesktopShowcase() {
  return (
    <Section className="bg-[oklch(0.09_0.012_250)] overflow-hidden">
      <div className="text-center mb-16">
        <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// DESKTOP CLIENT</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            Native. Everywhere.
          </h2>
        </Reveal>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* orbiting OS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[
            <motion.img key="win" src={windowsIcon} className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" alt="Windows 11" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />,
            <motion.img key="mac" src={macIcon} className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" alt="macOS" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />,
            <motion.img key="lin" src={linuxIcon} className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" alt="Linux" animate={{ rotate: [0, 15, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{ "--orbit-r": "320px" } as React.CSSProperties}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -i * 6.66 }}
            >
              <div style={{ transform: `translateX(320px)` }}>
                <motion.span animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -i * 6.66 }} className="inline-block">
                  {o}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ rotateX: 30, opacity: 0 }}
          whileInView={{ rotateX: 8, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          style={{ perspective: 1200 }}
        >
          <div className="relative rounded-2xl glass p-1 glow-ember">
            <div className="rounded-xl bg-background/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <div className="ml-4 font-mono text-xs text-muted-foreground">cyberify · workforce intelligence client</div>
              </div>
              <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-3 space-y-2">
                  {["Dashboard", "Activity", "Reports", "Team", "Approvals", "Settings"].map((it, i) => (
                    <div key={it} className={`px-3 py-2 rounded-lg text-sm font-mono ${i === 1 ? "bg-ember/15 text-ember" : "text-muted-foreground"}`}>{it}</div>
                  ))}
                </div>
                <div className="col-span-9 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[["Focus", "4h 12m"], ["Active", "7h 48m"], ["Score", "94"]].map(([k, v]) => (
                      <div key={k} className="glass rounded-lg p-4">
                        <div className="text-xs font-mono text-muted-foreground">{k}</div>
                        <div className="text-2xl font-bold text-chrome">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-lg p-4 h-40 relative overflow-hidden">
                    <div className="font-mono text-xs text-muted-foreground mb-2">ACTIVITY TIMELINE</div>
                    <svg viewBox="0 0 400 80" className="w-full h-24">
                      <defs>
                        <linearGradient id="actL" x1="0" x2="1">
                          <stop offset="0" stopColor="#ff7a18" stopOpacity="0" />
                          <stop offset="0.5" stopColor="#ff7a18" />
                          <stop offset="1" stopColor="#ff7a18" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,60 Q50,30 100,40 T200,30 T300,50 T400,20" fill="none" stroke="url(#actL)" strokeWidth="2" />
                      <path d="M0,60 Q50,30 100,40 T200,30 T300,50 T400,20" fill="none" stroke="#ff7a18" strokeWidth="0.5" opacity="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ============== DOWNLOAD CENTER ============== */
export function DownloadCenter() {
  const [versions, setVersions] = useState<{ [key: string]: string }>({
    Windows: "1.0.0",
    Linux: "1.0.0",
    macOS: "1.0.0",
  });

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://cyberifytracker.run.place";
    fetch(`${backendUrl}/api/v1/app/latest-download`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data) {
          setVersions({
            Windows: data.windows || "1.0.0",
            Linux: data.linux || "1.0.0",
            macOS: data.mac || "1.0.0",
          });
        }
      })
      .catch(() => {
        // Fall back silently to defaults
      });
  }, []);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://cyberifytracker.run.place";

  const platforms = [
    {
      os: "Windows",
      icon: (
        <div className="flex items-center justify-center h-20">
          <motion.img animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} src={windowsIcon} className="w-12 h-12 object-contain drop-shadow-xl" alt="Windows" />
        </div>
      ),
      v: versions.Windows, details: "Windows 10+ · 64-bit", primary: true, buttons: [{ l: "Download .exe", k: "exe", url: `${backendUrl}/api/v1/app/download/windows` }], req: ["Windows 10+", "4 GB RAM", "200 MB Storage", "Internet Connection"]
    },
    {
      os: "Linux",
      icon: (
        <div className="flex items-center justify-center h-20">
          <motion.img animate={{ y: [0, -6, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} src={linuxIcon} className="w-16 h-16 object-contain drop-shadow-xl" alt="Linux" />
        </div>
      ),
      v: versions.Linux, details: "Ubuntu · Debian · Fedora · Arch", buttons: [{ l: "Download .deb", k: "deb", url: `${backendUrl}/api/v1/app/download/linux/deb` }, { l: "Download .AppImage", k: "appimage", url: `${backendUrl}/api/v1/app/download/linux` }], req: ["Ubuntu 20.04+", "Debian 11+", "Fedora 37+", "4 GB RAM"]
    },
    {
      os: "macOS",
      icon: (
        <div className="flex items-center justify-center h-20">
          <motion.img animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} src={macIcon} className="w-20 h-20 object-contain drop-shadow-xl" alt="macOS" />
        </div>
      ),
      v: versions.macOS, details: "Apple Silicon · Intel", buttons: [{ l: "Download .dmg (Apple Silicon)", k: "dmg-arm", url: `${backendUrl}/api/v1/app/download/mac` }, { l: "Download .dmg (Intel)", k: "dmg-intel", url: `${backendUrl}/api/v1/app/download/mac?arch=x64` }], req: ["macOS 13+", "Apple Silicon", "Intel Supported"]
    },
  ];
  return (
    <Section id="download">
      <div className="text-center mb-16">
        <Reveal>
          <div className="inline-flex glass rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs tracking-[0.3em] text-ember">// WORKFORCE INTELLIGENCE CLIENT</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
            Select Your <span className="text-ember-flow">Operating System</span>
          </h2>
        </Reveal>
      </div>

      {/* central hub */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full border border-ember/20 animate-pulse" />
          <div className="absolute w-96 h-96 rounded-full border border-ember/10" />
        </div>
        <div className="relative flex items-center justify-center mb-12">
          <div className="relative w-40 h-40 rounded-2xl glass-ember flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute inset-x-0 h-2 bg-gradient-to-b from-ember/0 via-ember to-ember/0"
              animate={{ y: ["-50%", "150%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <img src={logo} alt="Cyberify" className="w-24 relative z-10" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {platforms.map((p, i) => (
            <Reveal key={p.os} delay={i * 0.1}>
              <PlatformCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* requirements */}
      <div className="mt-20 text-center mb-10">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-ember mb-3">// SYSTEM REQUIREMENTS</p>
          <h3 className="text-3xl font-bold text-chrome">Built to run anywhere</h3>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {platforms.map((p, i) => (
          <Reveal key={p.os} delay={i * 0.08}>
            <div className="glass rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-chrome opacity-90">{p.icon}</span>
                <span className="font-bold text-lg">{p.os}</span>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground font-mono">
                {p.req.map(r => <li key={r}>· {r}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { v: 4280, l: "Windows" },
          { v: 1947, l: "Linux" },
          { v: 3120, l: "macOS" },
          { v: `v${versions.Windows}`, l: "Current" },
          { v: "Today", l: "Last Update" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-chrome">
                {typeof s.v === "number" ? <Counter to={s.v} /> : s.v}
              </div>
              <div className="font-mono text-[10px] tracking-widest text-ember mt-1">{s.l.toUpperCase()}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PlatformCard({ os, icon, v, details, buttons, primary }: { os: string; icon: React.ReactNode; v: string; details: string; buttons: { l: string; k: string; url: string }[]; primary?: boolean }) {
  const [clickedKey, setClickedKey] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "verified">("idle");
  const handle = (key: string, url: string) => {
    if (state !== "idle") return;
    setClickedKey(key);
    setState("loading");
    setTimeout(() => {
      setState("verified");
      if (url && url !== "#") {
        window.location.href = url;
      }
    }, 1800);
    setTimeout(() => {
      setState("idle");
      setClickedKey(null);
    }, 3800);
  };
  return (
    <div className={`relative glass rounded-2xl p-7 h-full group hover:border-ember/40 transition ${primary ? "border-ember/30" : ""}`}>
      {primary && <div className="absolute -top-3 right-6 bg-ember text-primary-foreground text-[10px] font-mono tracking-widest px-2 py-1 rounded">RECOMMENDED</div>}
      <motion.div
        className="mb-4 inline-block text-chrome"
        whileHover={{ scale: 1.2, rotate: 5 }}
      >{icon}</motion.div>
      <h3 className="text-2xl font-bold text-chrome">Cyberify for {os}</h3>
      <div className="font-mono text-xs text-ember mt-1">Version {v}</div>
      <p className="text-sm text-muted-foreground mt-2">{details}</p>

      <div className="mt-6 space-y-2">
        {buttons.map((b) => {
          const isCurrent = clickedKey === b.k;
          const buttonState = isCurrent ? state : "idle";
          return (
            <button
              key={b.k}
              onClick={() => handle(b.k, b.url)}
              disabled={state !== "idle"}
              className="w-full bg-ember text-primary-foreground font-semibold px-4 py-3 rounded-lg hover:scale-[1.02] transition disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {buttonState === "idle" && <>↓ {b.l}</>}
              {buttonState === "loading" && <>
                <motion.span className="inline-block w-3 h-3 rounded-full border-2 border-current border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                Initializing Secure Download...
              </>}
              {buttonState === "verified" && <>✓ Authenticity Verified</>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============== SECURITY FORTRESS ============== */
export function SecurityFortress() {
  return (
    <Section className="bg-black overflow-hidden relative">
      {/* laser grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(255,122,24,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,24,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(800px) rotateX(60deg)",
            transformOrigin: "center bottom",
          }}
        />
      </div>
      <motion.div
        className="absolute inset-x-0 h-1 bg-ember pointer-events-none"
        style={{ boxShadow: "0 0 30px #ff7a18, 0 0 60px #ff7a18" }}
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative">
        <div className="text-center mb-16">
          <Reveal><p className="font-mono text-xs tracking-[0.3em] text-ember mb-6">// SECURITY FORTRESS</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance">
              <span className="text-chrome">Military-grade</span><br />
              <span className="text-ember-flow">workforce data.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { i: <Lock size={40} className="text-ember mx-auto" />, t: "JWT Tokens", d: "Stateless, signed, revocable." },
            { i: <Smartphone size={40} className="text-ember mx-auto" />, t: "OTP Shields", d: "Multi-factor authentication." },
            { i: <RefreshCw size={40} className="text-ember mx-auto" />, t: "Session Invalidation", d: "Instant revocation, anywhere." },
            { i: <ShieldCheck size={40} className="text-ember mx-auto" />, t: "RBAC", d: "Role-based granular access." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className="glass-ember rounded-xl p-6 h-full text-center">
                <div className="mb-4">{s.i}</div>
                <div className="font-bold text-chrome">{s.t}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============== FINAL CTA ============== */
export function FinalCTA() {
  return (
    <Section className="text-center">
      <Reveal>
        <h2 className="text-5xl sm:text-8xl font-bold tracking-tight text-balance leading-[1]">
          From <span className="text-chrome">Clock-In</span><br />
          To <span className="text-ember-flow">AI Insight</span><br />
          <span className="text-muted-foreground/60 text-3xl sm:text-5xl font-medium">In One Platform.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col items-center gap-3">
          <img src={clockIcon} alt="" className="w-32 h-32 rounded-2xl glow-ember mb-6" />
          <div className="font-mono text-xs tracking-[0.3em] text-ember">CYBERIFY</div>
          <div className="text-lg text-foreground">Workforce Intelligence</div>
          <div className="text-sm text-muted-foreground">Built For Teams That Ship.</div>
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <a
          href="#download"
          className="mt-12 inline-flex items-center gap-3 bg-ember text-primary-foreground font-bold text-lg px-10 py-5 rounded-2xl glow-ember hover:scale-105 transition relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative flex items-center gap-2"><Zap size={20} /> Access Command Center</span>
        </a>
      </Reveal>
    </Section>
  );
}

/* ============== FOOTER ============== */
export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Cyberify" className="h-6" />
          <span className="text-xs font-mono text-muted-foreground">© 2026 · WORKFORCE INTELLIGENCE</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground tracking-widest">
          <a href="#" className="hover:text-ember transition">DOCS</a>
          <a href="#" className="hover:text-ember transition">SECURITY</a>
          <a href="#" className="hover:text-ember transition">CHANGELOG</a>
          <a href="#" className="hover:text-ember transition">SUPPORT</a>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-ember">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
