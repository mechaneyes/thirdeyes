import { useState } from "react";
import { useAtom } from "jotai";

import { researchFirstRun } from "@/store/atoms";
import MessageForm from "./message-form";
import LoadingIndicator from "./ui/loading-indicator";

const DraftingLedes = () => {
  const [messages, setMessages] = useState([]);
  const [ledes, setLedes] = useState([]);
  const [loadingStep, setLoadingStep] = useState("Primary");
  const [recommended, setRecommended] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  const [firstRun, setFirstRun] = useAtom(researchFirstRun);

  const placeholder = "Enter artist name.";

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/wikipedia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
        }),
      });

      const data = await response.json();
      // console.log("Wikipedia API Response:", JSON.stringify(data.context, null, 2));

      setFirstRun(data.context);

      if (!data.success) {
        throw new Error(data.error || "Wikipedia search failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error in handleSubmit:", err);
    }

    try {
      const response = await fetch("/api/drafting/lede-primary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
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
              console.log(
                "🎬🎬🎬 Primary Data 🎬🎬🎬",
                JSON.stringify(data.primary, null, 2)
              );
              setLoadingStep("Voice");
            }
            if (data.secondary) {
              console.log(
                "🙊🙊🙊 Voice Data 🙊🙊🙊",
                JSON.stringify(data.secondary, null, 2)
              );
              setLoadingStep("Evaluation");
            }
            if (data.tertiary) {
              console.log(
                "✅✅✅ Evaluation Data ✅✅✅",
                JSON.stringify(data.tertiary, null, 2)
              );
              setLoadingStep("Primary");
              setLedes(data.tertiary.ledes);
              setRecommended(data.tertiary.recommended);
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
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-3 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="drafting-scrollable w-full h-full flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll">
        {isLoading && (
          <LoadingIndicator
            loadingCopy={`Generating ledes — ${loadingStep} model`}
          />
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!isLoading && (
          <>
            {ledes.map((lede) => (
              <div
                key={lede.id}
                className="shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2"
              >
                <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
                  {lede.strategy}
                </h4>
                <div className="text-base leading-6 text-darkslategray-200/90">
                  {lede.output}
                </div>
              </div>
            ))}

            {recommended && (
              <div className="shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2">
                <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
                  Recommended
                </h4>
                <div className="text-base leading-6 text-darkslategray-200/90">
                  {recommended}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <MessageForm
        input={input}
        onInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DraftingLedes;
