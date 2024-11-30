import { useState, useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";

import MessageForm from "./message-form";
import TooltipCopied from "@/components/ui/tooltip-copied";

const DraftingWorks = () => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scrollableRef = useRef(null);

  const placeholder = "Enter your draft.";

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleSubmit = async () => {};

  return (
    <div
      className="relative w-full h-full flex flex-col p-3 pr-2 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div
        className="drafting-scrollable w-full flex-1 flex flex-col items-start gap-2 pr-3 overflow-y-auto"
        ref={scrollableRef}
      >
        {/* {strategiesLoading && (
          <div className="lede-first-load w-full h-full flex flex-col items-center justify-center">
            <div className="h-20">
              <LoadingIndicator
                loadingCopy={`Generating ledes — ${loadingStep} model`}
              />
            </div>
            <div className="shadow-hieroshadow-25 mt-4 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-11/12 flex flex-col items-start justify-center gap-4 p-3 pb-4 transition duration-200 text-darkslategray-200/90 text-base leading-6">
              <div>
                <h3 className="pb-2 text-xl text-darkslategray-200/90 font-normal">
                  Strategies: A Waiting Game
                </h3>
                While Thirdeyes is out there dancing with models, the
                information it&apos;s retrieving is being deposited in the
                Research panel to the right. 👉
              </div>
              <div>
                Feel free to explore the other research tools while you wait.
              </div>
              <ButtonResearchGroup
                activeView={activeView}
                setActiveView={setActiveView}
                isResearch={false}
              />
            </div>
          </div>
        )} */}

        {tooltipVisible && (
          <TooltipCopied />
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* {isFirstLoad && ledes.length == 0 && ( */}
        <div className="lede-first-load w-full h-full flex items-center justify-center">
          <div className="shadow-hieroshadow-25 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-11/12 flex flex-col items-start justify-center gap-4 p-3 pb-4 transition duration-200 text-darkslategray-200/90 text-base leading-6">
            <div>
              <h3 className="pb-2 text-xl text-darkslategray-200/90 font-normal">
                Strategies: Works
              </h3>
              Here you&apos;ll be drafting the works section for artist bios.
              Enter the data in the form below to get started.
            </div>
            <div>
              I row upon the belly on the back and between two waters. I am not
              so dexte rous that you. Nothing is more easy than to swim; it do
              not what don't to be afraid of.
            </div>
          </div>
        </div>
        {/* )} */}

        {/* {ledes.length > 0 && !strategiesLoading && (
          <>
            {ledes.map((lede) => (
              <div
                key={lede.id}
                className="lede w-full shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2 hover:bg-mediumseagreen-100/60 hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={(e) => handleCopy(lede.output, e)}
              >
                <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
                  {lede.strategy}
                </h4>
                <div className="text-base leading-6 text-darkslategray-200/90">
                  {lede.output}
                </div>
              </div>
            ))}
          </>
        )} */}
      </div>

      <MessageForm
        input={input}
        onInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        // strategiesLoading={strategiesLoading}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DraftingWorks;
