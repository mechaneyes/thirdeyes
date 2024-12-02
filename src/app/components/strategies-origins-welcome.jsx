import { useAtom } from "jotai";

import { pageExpandedAtom } from "@/store/atoms";

export default function StrategiesOriginsWelcome() {
  const [isExpanded, setIsExpanded] = useAtom(pageExpandedAtom);

  return (
    <div className="lede-first-load w-full h-full flex items-center justify-center">
      <div
        className={`shadow-hieroshadow-25 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-full flex flex-col items-start justify-between gap-4 p-3 ${
          !isExpanded ? "pb-16" : "h-full"
        } text-darkslategray-200/90 text-base leading-6`}
      >
        <div>
          <h3 className="pb-2 text-xl text-darkslategray-200/90 font-normal">
            Strategies: Origins
          </h3>
          In this step you&apos;re drafting origins for your artist&apos;s bio.
          Enter the lede you&apos;ve been writing in the form below.
        </div>
        <div>
          Thirdeyes will use the Wikipedia information it&apos;s already
          generated as context to inform the LLM writing these origins.
        </div>
      </div>
    </div>
  );
}
