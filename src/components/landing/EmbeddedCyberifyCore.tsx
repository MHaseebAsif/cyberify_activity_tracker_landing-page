import { CyberifyCore } from "./Core-spark-portion-3/src/components/CyberifyCore";

/**
 * Embeds the cinematic intelligence core from Core-spark-portion-3.
 * Strips duplicate section chrome without modifying that folder.
 */
export function EmbeddedCyberifyCore() {
  return (
    <div
      className="
        relative -mt-2 w-screen max-w-none left-1/2 -translate-x-1/2
        [&_section]:!mx-0
        [&_section]:!w-full
        [&_section]:!max-w-none
        [&_section]:!overflow-visible
        [&_section]:!bg-transparent
        [&_section]:!text-inherit
        [&_section]:!min-h-0
        [&_section]:!h-[min(78vh,700px)]
        [&_section>canvas]:!z-[1]
        [&_section>canvas]:!bg-transparent
        [&_section>div:nth-child(2)]:hidden
        [&_section>div:nth-child(3)]:hidden
      "
    >
      <CyberifyCore />
    </div>
  );
}
