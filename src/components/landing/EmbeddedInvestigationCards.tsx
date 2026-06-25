import RobotInvestigationSection from "./Cards-for-portion-2/src/components/RobotInvestigationSection";

/**
 * Embeds the investigation cards directly on the parent section background.
 * Strips the inner section chrome (heading, grid matrix, bordered container)
 * without modifying Cards-for-portion-2.
 */
export function EmbeddedInvestigationCards() {
  return (
    <div
      className="
        relative w-screen max-w-none left-1/2 -translate-x-1/2 px-10 sm:px-16 lg:px-24 xl:px-32
        [&_section]:!mx-0
        [&_section]:!w-full
        [&_section]:!max-w-none
        [&_section]:!border-0
        [&_section]:!rounded-none
        [&_section]:!bg-transparent
        [&_section]:!p-0
        [&_section]:!shadow-none
        [&_section]:![background-image:none]
        [&_section>div:first-child]:hidden
        [&_section>div:nth-child(2)]:hidden
        [&_section>div:nth-child(3)]:gap-4
        md:[&_section>div:nth-child(3)]:gap-6
        lg:[&_section>div:nth-child(3)]:gap-8
        [&_section>div:nth-child(3)]:items-stretch
        [&_section>div:last-child]:hidden
      "
    >
      <RobotInvestigationSection />
    </div>
  );
}
