import { createFileRoute } from "@tanstack/react-router";
import RobotInvestigationSection from "@/components/RobotInvestigationSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Investigation Unit — Productivity Revealed" },
      { name: "description", content: "An AI robot investigating workplace productivity problems." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[#06070b] px-4 py-12">
      <RobotInvestigationSection />
    </main>
  );
}
