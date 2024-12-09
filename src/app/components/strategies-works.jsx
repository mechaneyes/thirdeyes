import { useState, useEffect, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  pageExpandedAtom,
  researchBioAtom,
  strategiesWorksAtom,
  strategiesWorksFirstLoadAtom,
  strategiesLoadingAtom,
} from "@/store/atoms";

import LoadingIndicator from "@/components/ui/loading-indicator";
import MessageForm from "./message-form";
import StrategiesWorksWelcome from "./strategies-works-welcome";
import TooltipCopied from "@/components/ui/tooltip-copied";

const StrategiesWorks = () => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [loadingStep, setLoadingStep] = useState("Primary");
  const [messages, setMessages] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scrollableRef = useRef(null);
  const [showError, setShowError] = useState(false);

  const [strategiesLoading, setStrategiesLoading] = useAtom(
    strategiesLoadingAtom
  );
  const [works, setWorks] = useAtom(strategiesWorksAtom);
  const [isFirstLoad, setIsFirstLoad] = useAtom(strategiesWorksFirstLoadAtom);
  const isExpanded = useAtomValue(pageExpandedAtom);
  const reBio = useAtomValue(researchBioAtom);

  const placeholder = "Enter your draft.";

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    });
  };

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleSubmit = async () => {
    setStrategiesLoading(true);
    setIsFirstLoad(false);
    setError(null);

    try {
      // ————————————————————————————————————o works model interaction —>
      //
      const response = await fetch("/api/strategies/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
          wikipediaContext: reBio,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(5));
            console.log("Received data:", data);

            if (data.primary) {
              console.log("data.primary:", data.primary.works);
              setWorks(Array.isArray(data.primary.works) ? data.primary.works : []);
              // setLoadingStep("Edit");
            }
            // if (data.secondary) {
            //   console.log(
            //     "🐔 Edit Data",
            //     JSON.stringify(data.secondary, null, 2)
            //   );
            //   setLoadingStep("Primary");
            //   // setWorks(data.secondary.works);
            // }
          }
        }
      }

      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput(""); // Clear after submission
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error in handleSubmit:", err);
    } finally {
      setStrategiesLoading(false);
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col p-3 ${
        isFirstLoad ? "" : "pr-2"
      } gap-4`}
      style={{ height: "calc(100% - 33px)" }}
    >
      <div
        className={`drafting-scrollable w-full flex-1 flex flex-col items-start justify-start gap-2 ${
          isFirstLoad ? "" : "pr-3 overflow-y-auto"
        }`}
        ref={scrollableRef}
      >
        {strategiesLoading && (
          <div className="lede-first-load w-full h-full flex flex-col items-center justify-center">
            <div className="h-20">
              <LoadingIndicator
                loadingCopy={`Generating Works — ${loadingStep} Model`}
              />
            </div>
            <div className="shadow-hieroshadow-25 mt-4 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-11/12 flex flex-col items-start justify-center gap-4 p-3 pb-4 transition duration-200 text-darkslategray-200/90 text-base leading-6">
              <div>
                Your pens have any notches, and its spit. How do you like its?
                will you its are fine or broad? I won&apos;t me also a wafer or
                some sealing wax and a seal. In this drawer, there is all that,
                falding stick, rule, scraper, saud, etc. There is the postman I
                go to put it him again.
              </div>
            </div>
          </div>
        )}

        {tooltipVisible && <TooltipCopied />}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isFirstLoad && works.length === 0 && <StrategiesWorksWelcome />}

        {/* {works.length > 0 && ( */}
          <>
            {Array.isArray(works) && works.map((work) => (
              <div
                key={work.id}
                className="lede w-full shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2 hover:bg-mediumseagreen-100/60 hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={() => handleCopy(work.edit)}
              >
                <h4 className="pb-2 text-lg text-darkslategray-200 font-normal">
                  {work.option}
                </h4>
                <div className="text-base leading-6 text-darkslategray-200/90">
                  {work.edit}
                </div>
              </div>
            ))}
          </>
        {/* )} */}
      </div>

      {!isExpanded && (
        <MessageForm
          input={input}
          setInput={setInput}
          onInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toReset={() => setWorks([])}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default StrategiesWorks;
