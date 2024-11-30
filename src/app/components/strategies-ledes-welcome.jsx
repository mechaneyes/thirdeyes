import { useAtom } from "jotai";

import { pageExpandedAtom } from "@/store/atoms";

export default function StrategiesLedesWelcome() {
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
              Strategies: Ledes
            </h3>
            Here you&apos;ll be drafting ledes for artist bios. Enter the
            artist&apos;s name in the form below to get started.
          </div>
          <div>
            While working on the ledes, Thirdeyes is out gathering information
            you can use in crafting your bio. It will be presented in the
            Research panel to the right. 👉
          </div>
        </div>

        {/* <LogoLoopy inputText="Stragtegies" /> */}
      </div>
    </div>
  );
}
