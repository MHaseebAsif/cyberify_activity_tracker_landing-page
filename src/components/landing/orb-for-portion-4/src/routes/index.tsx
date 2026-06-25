import { createFileRoute } from "@tanstack/react-router";
import { LiveActivitySection } from "@/components/LiveActivitySection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyberify — Living Workforce Planet" },
      {
        name: "description",
        content:
          "A real-time operations center for your workforce. See every developer, every state, every signal — live, as a single neural sphere.",
      },
      { property: "og:title", content: "Cyberify — Living Workforce Planet" },
      {
        property: "og:description",
        content: "Your entire team as a living digital organism.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <LiveActivitySection />
    </main>
  );
}
