import { useState, useEffect, useRef } from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  pageExpandedAtom,
  strategiesOriginsAtom,
  strategiesOriginsContextAtom,
  strategiesOriginsFirstLoadAtom,
  strategiesLoadingAtom,
  researchBioAtom,
} from "@/store/atoms";
import MessageForm from "./message-form";
import LoadingIndicator from "@/components/ui/loading-indicator";
import StrategiesOriginsWelcome from "./strategies-origins-welcome";
import TooltipCopied from "@/components/ui/tooltip-copied";

const StrategiesOrigins = () => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Primary");
  const [messages, setMessages] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scrollableRef = useRef(null);

  const isExpanded = useAtomValue(pageExpandedAtom);
  const [origins, setOrigins] = useAtom(strategiesOriginsAtom);
  const [reasoning, setReasoning] = useAtom(strategiesOriginsContextAtom);
  const [isFirstLoad, setIsFirstLoad] = useAtom(strategiesOriginsFirstLoadAtom);
  const reBio = useAtomValue(researchBioAtom);
  const setStrategiesLoading = useSetAtom(strategiesLoadingAtom);

  const placeholder = "Enter lede.";

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = 0;
    }
  }, []);

  const handleCopy = (content, event) => {
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
    setIsLoading(true);
    setIsFirstLoad(false);
    setError(null);

    try {
      // ————————————————————————————————————o origin model interaction —>
      //
      const response = await fetch("/api/strategies/origin", {
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

            if (data.primary) {
              setOrigins(data.primary.origins);
              setReasoning(data.primary.reasoning);
            }
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
      setIsLoading(false);
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
        className={`drafting-scrollable w-full flex-1 flex flex-col items-start gap-2 ${
          isFirstLoad ? "" : "pr-3 overflow-y-auto"
        }`}
        ref={scrollableRef}
      >
        {isLoading && (
          <LoadingIndicator
            loadingCopy={`Generating origins — ${loadingStep} model`}
          />
        )}

        {tooltipVisible && <TooltipCopied />}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isFirstLoad && origins.length == 0 && <StrategiesOriginsWelcome />}

        {origins.length > 0 && !isLoading && (
          <>
            {origins.map((origin) => (
              <div
                key={origin.id}
                className="origin w-full shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2 hover:bg-mediumseagreen-100/60 hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={(e) => handleCopy(origin.output, e)}
              >
                <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
                  {origin.strategy}
                </h4>
                <div className="text-base leading-6 text-darkslategray-200/90">
                  {origin.output}
                </div>
              </div>
            ))}
            <div className="origin w-full shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2">
              <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
                Context Reasoning
              </h4>
              <div className="text-base leading-6 text-darkslategray-200/90">
                {reasoning}
              </div>
            </div>
          </>
        )}
      </div>

      {!isExpanded && (
        <MessageForm
          input={input}
          setInput={setInput}
          onInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toReset={() => setOrigins([])}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default StrategiesOrigins;
