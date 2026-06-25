import { createFileRoute } from "@tanstack/react-router";
import { CyberifyCore } from "@/components/CyberifyCore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyberify — Intelligence Engine" },
      { name: "description", content: "One command center. Every signal. The Cyberify Intelligence Core." },
      { property: "og:title", content: "Cyberify — Intelligence Engine" },
      { property: "og:description", content: "One command center. Every signal." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-black">
      <CyberifyCore />
      <section className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
        <div className="max-w-2xl">
          <div className="font-mono text-xs tracking-[0.35em] text-[#ff8a3d]">// SYSTEM ACTIVATED</div>
          <h3 className="mt-4 text-4xl font-bold text-white md:text-5xl">Intelligence online.</h3>
          <p className="mt-4 text-neutral-400">Every workspace signal — now unified, scored, and acted on in real time.</p>
        </div>
      </section>
    </main>
  );
}
