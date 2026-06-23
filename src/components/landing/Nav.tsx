import { motion } from "framer-motion";
import logo from "@/assets/cyberify-logo.png";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Cyberify" className="h-7 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#intelligence" className="hover:text-foreground transition">Engine</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#architecture" className="hover:text-foreground transition">Architecture</a>
          <a href="#download" className="hover:text-foreground transition">Download</a>
        </nav>
        <a href="#download" className="text-xs sm:text-sm font-mono tracking-wider bg-ember text-primary-foreground px-4 py-2 rounded-lg glow-ember-sm hover:scale-105 transition">
          DEPLOY
        </a>
      </div>
    </header>
  );
}

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
        <motion.div
          key={i}
          className="absolute"
          style={{ left: n.x, top: n.y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        >
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
