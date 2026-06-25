import { useEffect, useRef, useState } from "react";

/**
 * Cyberify Intelligence Core — cinematic reactor.
 * Canvas: particles, rings, orbits, satellites, neural cables, pulse waves, exit beam.
 * DOM: heading reveal, HUD holograms, mouse parallax tilt.
 */

type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; size: number; locked: boolean; a: number };
type RingSeg = { ring: number; angle: number; target: number; locked: boolean; speed: number; len: number; offset: number };
type Satellite = { orbit: number; angle: number; speed: number; label: string; color: string };
type NeuralVein = { angle: number; len: number; grown: number; nodeLabel: string; pulse: number };

const SAT_LABELS = [
  { l: "ACTIVITY", c: "#ff8a3d" },
  { l: "AI REPORTS", c: "#ffb070" },
  { l: "FOCUS", c: "#ff8a3d" },
  { l: "SCREENSHOTS", c: "#ffb070" },
  { l: "BROWSER", c: "#ff8a3d" },
  { l: "SCORE", c: "#ffb070" },
];

const HUD_STATS = [
  { k: "PRODUCTIVITY", v: () => `${(87 + Math.sin(Date.now() / 800) * 4).toFixed(1)}%` },
  { k: "ACTIVE USERS", v: () => `${1240 + Math.floor(Math.sin(Date.now() / 1200) * 30)}` },
  { k: "FOCUS SCORE", v: () => `${(92 + Math.sin(Date.now() / 600) * 3).toFixed(0)}` },
  { k: "APP USAGE", v: () => `${(74 + Math.sin(Date.now() / 900) * 5).toFixed(1)}%` },
  { k: "AI INSIGHTS", v: () => `${320 + Math.floor(Math.sin(Date.now() / 1500) * 12)}/m` },
];

const LINE_A = "One command center.";
const LINE_B = "Every signal.";
const START_PHASE = 6;

export function CyberifyCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [phase] = useState(START_PHASE);
  const [headingReveal] = useState({ a: LINE_A.length, b: LINE_B.length });

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mouseRef.current.tx = x;
      mouseRef.current.ty = y;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Canvas engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0;
    const resize = () => {
      const r = section.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    // Init scene
    const PARTICLES = 420;
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLES; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * Math.max(W, H);
      particles.push({
        x: W / 2 + Math.cos(a) * d,
        y: H / 2 + Math.sin(a) * d,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
        size: Math.random() * 1.4 + 0.3,
        locked: false,
        a: Math.random() * Math.PI * 2,
      });
    }

    // Rings: 3 rings, segments fly in then lock
    const ringDefs = [
      { r: 220, segs: 18, speed: 0.0025, dir: 1 }, // outer slow
      { r: 160, segs: 14, speed: -0.006, dir: -1 }, // medium
      { r: 105, segs: 10, speed: 0.014, dir: 1 }, // inner fast
    ];
    const segments: RingSeg[] = [];
    ringDefs.forEach((rd, ri) => {
      for (let i = 0; i < rd.segs; i++) {
        const target = (i / rd.segs) * Math.PI * 2;
        segments.push({
          ring: ri,
          angle: target,
          target,
          locked: true,
          speed: rd.speed,
          len: (Math.PI * 2) / rd.segs - 0.06,
          offset: 0,
        });
      }
    });

    // Satellites
    const satellites: Satellite[] = SAT_LABELS.map((s, i) => ({
      orbit: 280 + (i % 2) * 60,
      angle: (i / SAT_LABELS.length) * Math.PI * 2,
      speed: 0.003 + (i % 3) * 0.0015,
      label: s.l,
      color: s.c,
    }));

    // Neural veins
    const veins: NeuralVein[] = [];
    const veinCount = 14;
    for (let i = 0; i < veinCount; i++) {
      veins.push({
        angle: (i / veinCount) * Math.PI * 2 + Math.random() * 0.2,
        len: 300 + Math.random() * 380,
        grown: 1,
        nodeLabel: ["NODE", "LINK", "SYNC", "SCAN", "FEED"][i % 5] + "·" + (i + 1).toString().padStart(2, "0"),
        pulse: Math.random(),
      });
    }

    // Pulse waves
    const pulses: { r: number; a: number }[] = [];
    let lastPulse = performance.now();

    // Stars
    const stars: { x: number; y: number; s: number; t: number }[] = [];
    for (let i = 0; i < 140; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, s: Math.random() * 1.2, t: Math.random() * Math.PI * 2 });
    }

    let t0 = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(40, now - t0);
      t0 = now;
      const time = now / 1000;

      // mouse easing
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cx = W / 2 + mx * 30;
      const cy = H * 0.52 + my * 20;

      // transparent frame — parent section background shows through
      ctx.clearRect(0, 0, W, H);

      // stars
      for (const s of stars) {
        s.t += 0.02;
        const a = 0.3 + Math.sin(s.t) * 0.3;
        ctx.fillStyle = `rgba(255,180,120,${a * 0.4})`;
        ctx.fillRect(s.x + mx * 8, s.y + my * 8, s.s, s.s);
      }

      // Particles: phase 0 = attract to center; later orbit thinly
      for (const p of particles) {
        if (phase >= 1) {
          const dx = cx - p.x;
          const dy = cy - p.y;
          const d = Math.hypot(dx, dy);
          if (d > 60) {
            p.vx += (dx / d) * 0.15;
            p.vy += (dy / d) * 0.15;
          } else {
            p.a += 0.04;
            const r = 40 + Math.sin(p.a + d) * 18;
            p.vx += (Math.cos(p.a) * r - (p.x - cx)) * 0.02;
            p.vy += (Math.sin(p.a) * r - (p.y - cy)) * 0.02;
          }
        }
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.x += p.vx;
        p.y += p.vy;
        const glow = phase >= 1 ? 0.9 : 0.4;
        ctx.fillStyle = `rgba(255,140,60,${glow})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Core glow
      const corePulse = 1 + Math.sin(time * 2) * 0.06;
      const coreR = (28 + (phase >= 1 ? 22 : 0)) * corePulse;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 6);
      grad.addColorStop(0, "rgba(255,180,90,0.9)");
      grad.addColorStop(0.25, "rgba(255,130,40,0.45)");
      grad.addColorStop(0.6, "rgba(255,90,20,0.12)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - coreR * 6, cy - coreR * 6, coreR * 12, coreR * 12);

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,120,0.95)";
      ctx.fill();

      // Rings — phase 2: segments fly in & lock
      if (phase >= 2) {
        for (const seg of segments) {
          const rd = ringDefs[seg.ring];
          if (!seg.locked) {
            const diff = seg.target - seg.angle;
            seg.angle += diff * 0.08;
            if (Math.abs(diff) < 0.02) seg.locked = true;
          } else {
            seg.offset += rd.speed * (dt / 16);
          }
          const ang = seg.angle + seg.offset;
          // tilt with mouse for depth
          const rx = rd.r * (1 + mx * 0.05);
          const ry = rd.r * (1 + my * 0.05);
          ctx.beginPath();
          ctx.arc(cx, cy, rx < ry ? rx : ry, ang, ang + seg.len);
          ctx.strokeStyle = seg.locked
            ? `rgba(255,140,60,${0.75 - seg.ring * 0.12})`
            : "rgba(255,210,150,0.9)";
          ctx.lineWidth = 2.5 - seg.ring * 0.5;
          ctx.shadowColor = "rgba(255,140,60,0.8)";
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Satellites + laser packets — phase 3
      if (phase >= 3) {
        for (let i = 0; i < satellites.length; i++) {
          const s = satellites[i];
          s.angle += s.speed * (dt / 16);
          const sx = cx + Math.cos(s.angle) * s.orbit * (1 + mx * 0.08);
          const sy = cy + Math.sin(s.angle) * s.orbit * 0.55 * (1 + my * 0.08);
          // orbit path
          ctx.beginPath();
          ctx.ellipse(cx, cy, s.orbit * (1 + mx * 0.08), s.orbit * 0.55 * (1 + my * 0.08), 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,140,60,0.06)";
          ctx.lineWidth = 1;
          ctx.stroke();
          // satellite
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
          // label
          ctx.font = "9px ui-monospace, monospace";
          ctx.fillStyle = "rgba(255,180,120,0.75)";
          ctx.fillText(s.label, sx + 8, sy - 6);

          // laser packet to next
          const next = satellites[(i + 1) % satellites.length];
          const nx = cx + Math.cos(next.angle) * next.orbit * (1 + mx * 0.08);
          const ny = cy + Math.sin(next.angle) * next.orbit * 0.55 * (1 + my * 0.08);
          const tt = (time * 0.6 + i * 0.2) % 1;
          const lx = sx + (nx - sx) * tt;
          const ly = sy + (ny - sy) * tt;
          ctx.beginPath();
          ctx.arc(lx, ly, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,220,160,0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(lx, ly);
          ctx.strokeStyle = "rgba(255,180,90,0.18)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Neural veins — phase 4
      if (phase >= 4) {
        for (const v of veins) {
          v.grown = Math.min(1, v.grown + 0.012);
          v.pulse += 0.03;
          const len = v.len * v.grown;
          const ang = v.angle;
          const ex = cx + Math.cos(ang) * len + mx * 40;
          const ey = cy + Math.sin(ang) * len * 0.7 + my * 30;
          // jagged path
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          const segs = 6;
          for (let k = 1; k <= segs; k++) {
            const tt = k / segs;
            const jx = cx + (ex - cx) * tt + Math.sin(v.pulse + k) * 6;
            const jy = cy + (ey - cy) * tt + Math.cos(v.pulse + k * 1.3) * 6;
            ctx.lineTo(jx, jy);
          }
          const pulseA = 0.35 + Math.sin(v.pulse) * 0.25;
          ctx.strokeStyle = `rgba(255,140,60,${pulseA * v.grown})`;
          ctx.lineWidth = 1.1;
          ctx.shadowColor = "rgba(255,140,60,0.6)";
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
          // end node
          if (v.grown > 0.9) {
            ctx.beginPath();
            ctx.arc(ex, ey, 4, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,180,90,0.8)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(ex, ey, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,220,160,0.9)";
            ctx.fill();
            ctx.font = "8px ui-monospace, monospace";
            ctx.fillStyle = "rgba(255,180,120,0.6)";
            ctx.fillText(v.nodeLabel, ex + 6, ey + 3);
          }
        }
      }

      // Pulse wave every ~9s — phase 5+
      if (phase >= 5 && now - lastPulse > 9000) {
        pulses.push({ r: coreR, a: 1 });
        lastPulse = now;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pw = pulses[i];
        pw.r += 6;
        pw.a -= 0.012;
        if (pw.a <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(cx, cy, pw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,140,60,${pw.a * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [phase]);

  const lineA = LINE_A;
  const lineB = LINE_B;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white"
      style={{ minHeight: "100vh", height: "120vh" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* top tag */}
      <div className="pointer-events-none absolute left-0 right-0 top-8 z-10 text-center font-mono text-[11px] tracking-[0.35em] text-[#ff8a3d]">
        // CYBERIFY INTELLIGENCE ENGINE
      </div>

      {/* heading */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-20 z-10 px-6 text-center"
        style={{
          transform: `perspective(900px) rotateX(${mouseRef.current.y * -3}deg) rotateY(${mouseRef.current.x * 4}deg)`,
        }}
      >
        <h2 className="font-sans text-5xl font-bold tracking-tight md:text-7xl">
          <span className="text-white">{lineA.slice(0, headingReveal.a).split(" ")[0]}</span>{" "}
          <span className="text-neutral-500">
            {lineA.slice(0, headingReveal.a).split(" ").slice(1).join(" ")}
          </span>
          {headingReveal.a > 0 && headingReveal.a < lineA.length && (
            <span className="inline-block w-1 animate-pulse bg-[#ff8a3d]">&nbsp;</span>
          )}
          <br />
          <span
            className="bg-gradient-to-b from-[#ffb070] to-[#ff6a1f] bg-clip-text text-transparent"
            style={{
              textShadow: headingReveal.b > 0 ? "0 0 40px rgba(255,140,60,0.5)" : undefined,
            }}
          >
            {lineB.slice(0, headingReveal.b)}
          </span>
          {headingReveal.b > 0 && headingReveal.b < lineB.length && (
            <span className="inline-block w-1 animate-pulse bg-[#ff8a3d]">&nbsp;</span>
          )}
        </h2>
      </div>

      {/* HUD stats — phase 6 */}
      {phase >= 6 && (
        <HudHolograms mouseRef={mouseRef} />
      )}

      {/* corner brackets */}
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      {/* boot log */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-10 font-mono text-[10px] leading-relaxed text-[#ff8a3d]/70">
        <div>[BOOT] reactor.init {phase >= 1 ? "OK" : "..."}</div>
        <div>[ASSY] rings.lock {phase >= 2 ? "OK" : "..."}</div>
        <div>[ORBT] satellites {phase >= 3 ? "OK" : "..."}</div>
        <div>[NEUR] veins.spread {phase >= 4 ? "OK" : "..."}</div>
        <div>[CMD ] beam.form {phase >= 5 ? "OK" : "..."}</div>
        <div>[HUD ] holo.proj {phase >= 6 ? "OK" : "..."}</div>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 font-mono text-[10px] leading-relaxed text-[#ff8a3d]/70 text-right">
        <div>SYS: CYBERIFY-CORE</div>
        <div>PWR: {(96 + Math.sin(Date.now() / 500) * 3).toFixed(1)}%</div>
        <div>LAT: 12ms</div>
      </div>
    </section>
  );
}

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-6 w-6 border-[#ff8a3d]/60";
  const map = {
    tl: "left-4 top-4 border-l border-t",
    tr: "right-4 top-4 border-r border-t",
    bl: "left-4 bottom-4 border-l border-b",
    br: "right-4 bottom-4 border-r border-b",
  } as const;
  return <div className={`${base} ${map[pos]}`} />;
}

function HudHolograms({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number; tx: number; ty: number }> }) {
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        transform: `perspective(1200px) rotateX(${mouseRef.current.y * 6}deg) rotateY(${mouseRef.current.x * -8}deg)`,
      }}
    >
      {HUD_STATS.map((s, i) => {
        const angle = (i / HUD_STATS.length) * Math.PI * 2 + Date.now() / 8000;
        const rx = 42 + Math.cos(angle) * 18;
        const ry = 48 + Math.sin(angle) * 14;
        return (
          <div
            key={s.k}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#ff8a3d]/40 bg-[#ff8a3d]/[0.04] px-3 py-2 font-mono backdrop-blur-sm"
            style={{ left: `${rx}%`, top: `${ry}%` }}
          >
            <div className="text-[9px] tracking-[0.25em] text-[#ff8a3d]/80">{s.k}</div>
            <div className="text-sm font-semibold text-neutral-100">{s.v()}</div>
          </div>
        );
      })}
    </div>
  );
}
