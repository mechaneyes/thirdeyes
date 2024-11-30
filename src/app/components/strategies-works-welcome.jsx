import { useAtom } from "jotai";

import { pageExpandedAtom } from "@/store/atoms";

export default function StrategiesWorksWelcome() {
  const [isExpanded, setIsExpanded] = useAtom(pageExpandedAtom);

  return (
    <div className="lede-first-load w-full h-full flex items-start justify-center">
      <div
        className={`shadow-hieroshadow-25 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-full flex flex-col items-start justify-between gap-4 p-3 ${
          !isExpanded ? "pb-16" : "h-full"
        } text-darkslategray-200/90 text-base leading-6`}
      >
        <div>
          <div>
            <h3 className="pb-2 text-xl text-darkslategray-200/90 font-normal">
              Strategies: Works
            </h3>
            Here you&apos;ll be drafting the works section for artist bios.
            Enter the data in the form below to get started.
          </div>
          <div className="pt-4">
            I row upon the belly on the back and between two waters. I am not so
            dexte rous that you. Nothing is more easy than to swim; it do not
            what don&apos;t to be afraid of.
          </div>
        </div>
      </div>
    </div>
  );
}
