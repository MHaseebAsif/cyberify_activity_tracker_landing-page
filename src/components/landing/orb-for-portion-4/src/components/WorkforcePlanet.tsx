import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Status = "active" | "focus" | "idle" | "meeting" | "coding";

const STATUS_COLORS: Record<Status, number> = {
  active: 0x4ade80,
  focus: 0xff8a3d,
  idle: 0xff5252,
  meeting: 0x3da5ff,
  coding: 0xb46bff,
};

const NODE_COUNT = 50;
const PARTICLE_COUNT = 4000;

// Fibonacci sphere distribution for evenly spaced nodes
function fibonacciSphere(n: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return points;
}

function randomStatus(): Status {
  const r = Math.random();
  if (r < 0.45) return "active";
  if (r < 0.7) return "focus";
  if (r < 0.82) return "coding";
  if (r < 0.92) return "meeting";
  return "idle";
}

export function WorkforcePlanet({ flashNodeIndex }: { flashNodeIndex: number | null }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const nodeFlashRef = useRef<((i: number) => void) | null>(null);
  const [counter, setCounter] = useState(50);

  // Animate counter
  useEffect(() => {
    const id = setInterval(() => {
      setCounter((c) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(50, Math.max(42, c + delta));
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // Trigger node flash from prop
  useEffect(() => {
    if (flashNodeIndex !== null && nodeFlashRef.current) {
      nodeFlashRef.current(flashNodeIndex);
    }
  }, [flashNodeIndex]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Background starfield
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 30 + Math.random() * 40;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPos[i * 3 + 2] = r * Math.cos(p);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5 })
    );
    scene.add(stars);

    const planet = new THREE.Group();
    scene.add(planet);

    const RADIUS = 2.2;

    // Wireframe sphere shell
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff8a3d,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    );
    planet.add(shell);

    // Inner core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.55, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.05 })
    );
    planet.add(core);

    // Orbital rings
    const ringGroup = new THREE.Group();
    planet.add(ringGroup);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(RADIUS * (1.05 + i * 0.08), 0.005, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0xff8a3d, transparent: true, opacity: 0.25 })
      );
      ring.rotation.x = Math.PI / 2 + i * 0.4;
      ring.rotation.y = i * 0.6;
      ringGroup.add(ring);
    }

    // Particle cloud — start scattered, converge into sphere
    const particleGeo = new THREE.BufferGeometry();
    const targets = fibonacciSphere(PARTICLE_COUNT, RADIUS);
    const startPos = new Float32Array(PARTICLE_COUNT * 3);
    const curPos = new Float32Array(PARTICLE_COUNT * 3);
    const targetArr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 6 + Math.random() * 8;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      startPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      startPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      startPos[i * 3 + 2] = r * Math.cos(p);
      curPos[i * 3] = startPos[i * 3];
      curPos[i * 3 + 1] = startPos[i * 3 + 1];
      curPos[i * 3 + 2] = startPos[i * 3 + 2];
      targetArr[i * 3] = targets[i].x;
      targetArr[i * 3 + 1] = targets[i].y;
      targetArr[i * 3 + 2] = targets[i].z;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(curPos, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0xff8a3d,
        size: 0.025,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    planet.add(particles);

    // Developer nodes
    const nodePositions = fibonacciSphere(NODE_COUNT, RADIUS * 1.005);
    const nodeStatuses: Status[] = Array.from({ length: NODE_COUNT }, () => randomStatus());
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeSizes = new Float32Array(NODE_COUNT);
    const baseSizes = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePos[i * 3] = nodePositions[i].x;
      nodePos[i * 3 + 1] = nodePositions[i].y;
      nodePos[i * 3 + 2] = nodePositions[i].z;
      const c = new THREE.Color(STATUS_COLORS[nodeStatuses[i]]);
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
      baseSizes[i] = 0.06 + Math.random() * 0.03;
      nodeSizes[i] = baseSizes[i];
    }
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    nodeGeo.setAttribute("size", new THREE.BufferAttribute(nodeSizes, 1));

    const nodeMat = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (320.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });
    const nodeMesh = new THREE.Points(nodeGeo, nodeMat);
    planet.add(nodeMesh);

    // Flash trigger
    const flashTimers = new Map<number, number>();
    nodeFlashRef.current = (i: number) => {
      flashTimers.set(i, performance.now());
    };

    // Connection lines (neural network) — animated
    const MAX_CONNS = 60;
    const connGeo = new THREE.BufferGeometry();
    const connPos = new Float32Array(MAX_CONNS * 2 * 3);
    connGeo.setAttribute("position", new THREE.BufferAttribute(connPos, 3));
    const connMat = new THREE.LineBasicMaterial({
      color: 0xff8a3d,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const connLines = new THREE.LineSegments(connGeo, connMat);
    planet.add(connLines);

    function rebuildConnections() {
      for (let i = 0; i < MAX_CONNS; i++) {
        const a = Math.floor(Math.random() * NODE_COUNT);
        let b = Math.floor(Math.random() * NODE_COUNT);
        if (b === a) b = (b + 1) % NODE_COUNT;
        const pa = nodePositions[a];
        const pb = nodePositions[b];
        connPos[i * 6] = pa.x;
        connPos[i * 6 + 1] = pa.y;
        connPos[i * 6 + 2] = pa.z;
        connPos[i * 6 + 3] = pb.x;
        connPos[i * 6 + 4] = pb.y;
        connPos[i * 6 + 5] = pb.z;
      }
      connGeo.attributes.position.needsUpdate = true;
    }
    rebuildConnections();
    const connInterval = setInterval(rebuildConnections, 2500);

    // Pulses: thin lines from random active nodes to core, animated alpha
    const MAX_PULSES = 24;
    type Pulse = { from: number; t: number; speed: number };
    const pulses: Pulse[] = [];
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(MAX_PULSES * 2 * 3);
    const pulseColors = new Float32Array(MAX_PULSES * 2 * 3);
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));
    const pulseMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseLines = new THREE.LineSegments(pulseGeo, pulseMat);
    planet.add(pulseLines);

    // Orbital satellites
    const satellites: { mesh: THREE.Mesh; speed: number; tilt: number; phase: number; radius: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.05, 0),
        new THREE.MeshBasicMaterial({ color: 0xff8a3d })
      );
      scene.add(sat);
      satellites.push({
        mesh: sat,
        speed: 0.2 + Math.random() * 0.3,
        tilt: (Math.random() - 0.5) * Math.PI,
        phase: Math.random() * Math.PI * 2,
        radius: RADIUS * (1.35 + Math.random() * 0.4),
      });
    }

    // Mouse parallax
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    function onMove(e: MouseEvent) {
      const rect = mount!.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMove);

    // Resize
    function onResize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // IntersectionObserver to trigger convergence
    let convergeStart = 0;
    let converging = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !converging) {
            converging = true;
            convergeStart = performance.now();
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const now = performance.now();

      // Converge particles
      if (converging) {
        const elapsed = (now - convergeStart) / 1000;
        const progress = Math.min(1, elapsed / 2.2);
        const eased = 1 - Math.pow(1 - progress, 3);
        const pos = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          pos[i3] = startPos[i3] + (targetArr[i3] - startPos[i3]) * eased;
          pos[i3 + 1] = startPos[i3 + 1] + (targetArr[i3 + 1] - startPos[i3 + 1]) * eased;
          pos[i3 + 2] = startPos[i3 + 2] + (targetArr[i3 + 2] - startPos[i3 + 2]) * eased;
        }
        particleGeo.attributes.position.needsUpdate = true;
        (particles.material as THREE.PointsMaterial).opacity = 0.7 - eased * 0.45;
        if (progress >= 1) converging = false;
      }

      // Breathing
      const breath = 1 + Math.sin(t * 0.6) * 0.018;
      planet.scale.setScalar(breath);

      // Rotate
      planet.rotation.y += 0.0015;
      planet.rotation.x = Math.sin(t * 0.2) * 0.05;

      // Mouse parallax (additional)
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      planet.rotation.y += current.x * 0.002;
      planet.rotation.x += -current.y * 0.002;
      camera.position.x = current.x * 0.3;
      camera.position.y = -current.y * 0.3;
      camera.lookAt(0, 0, 0);

      // Node blink + flash decay
      const sizes = nodeGeo.attributes.size.array as Float32Array;
      const colors = nodeGeo.attributes.color.array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const blink = 0.85 + Math.sin(t * 2 + i * 0.7) * 0.15;
        let s = baseSizes[i] * blink;
        const fStart = flashTimers.get(i);
        if (fStart !== undefined) {
          const dt = (now - fStart) / 1000;
          if (dt > 1.2) {
            flashTimers.delete(i);
          } else {
            const k = 1 - dt / 1.2;
            s += 0.15 * k;
            // brighten color toward white
            const base = new THREE.Color(STATUS_COLORS[nodeStatuses[i]]);
            const bright = base.clone().lerp(new THREE.Color(0xffffff), 0.6 * k);
            colors[i * 3] = bright.r;
            colors[i * 3 + 1] = bright.g;
            colors[i * 3 + 2] = bright.b;
          }
        } else {
          const base = new THREE.Color(STATUS_COLORS[nodeStatuses[i]]);
          colors[i * 3] = base.r;
          colors[i * 3 + 1] = base.g;
          colors[i * 3 + 2] = base.b;
        }
        sizes[i] = s;
      }
      nodeGeo.attributes.size.needsUpdate = true;
      nodeGeo.attributes.color.needsUpdate = true;

      // Spawn pulses
      if (Math.random() < 0.5 && pulses.length < MAX_PULSES) {
        // pick active-ish nodes
        let idx = Math.floor(Math.random() * NODE_COUNT);
        for (let k = 0; k < 6; k++) {
          if (nodeStatuses[idx] === "active" || nodeStatuses[idx] === "coding") break;
          idx = Math.floor(Math.random() * NODE_COUNT);
        }
        pulses.push({ from: idx, t: 0, speed: 1.2 + Math.random() * 0.8 });
      }

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += 0.016 * pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }
      // Fill pulse buffer
      for (let i = 0; i < MAX_PULSES; i++) {
        const p = pulses[i];
        const i6 = i * 6;
        if (!p) {
          for (let k = 0; k < 6; k++) pulsePos[i6 + k] = 0;
          continue;
        }
        const from = nodePositions[p.from];
        const len = 0.18;
        const tt = p.t;
        const headFactor = 1 - tt;
        const tailFactor = Math.max(0, 1 - tt - len);
        pulsePos[i6] = from.x * headFactor;
        pulsePos[i6 + 1] = from.y * headFactor;
        pulsePos[i6 + 2] = from.z * headFactor;
        pulsePos[i6 + 3] = from.x * tailFactor;
        pulsePos[i6 + 4] = from.y * tailFactor;
        pulsePos[i6 + 5] = from.z * tailFactor;
        const c = new THREE.Color(STATUS_COLORS[nodeStatuses[p.from]]);
        const alpha = Math.sin(tt * Math.PI);
        pulseColors[i6] = c.r * alpha;
        pulseColors[i6 + 1] = c.g * alpha;
        pulseColors[i6 + 2] = c.b * alpha;
        pulseColors[i6 + 3] = c.r * alpha * 0.4;
        pulseColors[i6 + 4] = c.g * alpha * 0.4;
        pulseColors[i6 + 5] = c.b * alpha * 0.4;
      }
      pulseGeo.attributes.position.needsUpdate = true;
      pulseGeo.attributes.color.needsUpdate = true;

      // Satellites orbit
      for (const s of satellites) {
        const angle = t * s.speed + s.phase;
        const x = Math.cos(angle) * s.radius;
        const z = Math.sin(angle) * s.radius;
        const y = Math.sin(angle * 0.6) * s.radius * 0.4 * Math.sin(s.tilt);
        s.mesh.position.set(x, y, z);
        s.mesh.rotation.x += 0.02;
        s.mesh.rotation.y += 0.03;
      }

      // Connection breathing
      (connLines.material as THREE.LineBasicMaterial).opacity = 0.12 + Math.sin(t * 0.8) * 0.08;

      // Stars subtle rotation
      stars.rotation.y += 0.0003;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(connInterval);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) mat.dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0" />
      {/* Holographic core HUD */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full border border-primary/30 animate-pulse-ring" />
            <div className="absolute inset-0 -m-3 rounded-full border border-primary/20" />
            <div
              className="font-mono text-6xl font-light tracking-tight text-foreground text-glow-primary animate-hud-flicker tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {counter}
            </div>
          </div>
          <div
            className="mt-2 font-mono text-[10px] tracking-[0.4em] text-primary"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            DEVS ONLINE
          </div>
          <div className="mt-1 font-mono text-[8px] tracking-[0.3em] text-muted-foreground/60">
            CYBERIFY NEURAL CORE
          </div>
        </div>
      </div>
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 scanline opacity-30 mix-blend-overlay" />
      {/* Crosshair markers */}
      <div className="pointer-events-none absolute inset-0">
        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((cls) => (
          <div key={cls} className={`absolute ${cls} h-4 w-4`}>
            <div className="absolute top-0 left-0 h-px w-3 bg-primary/60" />
            <div className="absolute top-0 left-0 h-3 w-px bg-primary/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
