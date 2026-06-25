import { LiveActivitySection } from "./orb-for-portion-4/src/components/LiveActivitySection";

/**
 * Embeds the live activity orb section from orb-for-portion-4
 * without modifying that folder.
 */
export function EmbeddedLiveActivitySection() {
  return (
    <div
      className="
        relative w-screen max-w-none left-1/2 -translate-x-1/2
        [&_section]:!mx-0
        [&_section]:!w-full
        [&_section]:!max-w-none
        [&_section]:!bg-transparent
      "
    >
      <LiveActivitySection />
    </div>
  );
}
