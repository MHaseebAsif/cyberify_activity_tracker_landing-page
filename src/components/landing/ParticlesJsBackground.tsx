import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: { value: 90, density: { enable: true } },
    color: { value: ["#ff8a3d", "#fb923c", "#ffb070"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.25, max: 0.75 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 1.5, sync: false },
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.7 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#fb923c",
      opacity: 0.18,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 140,
        links: { opacity: 0.35 },
      },
    },
  },
};

export function ParticlesJsBackground() {
  const particleOptions = useMemo(() => options, []);

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        id="portion-3-particles-js"
        className="absolute inset-0 h-full w-full"
        options={particleOptions}
      />
    </ParticlesProvider>
  );
}
