import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";

import {
  globalArtistNameAtom,
  strategiesLedesAtom,
  strategiesLoadingAtom,
  strategiesRecAtom,
  researchActiveAtom,
  researchBioAtom,
} from "@/store/atoms";
import MessageForm from "./message-form";
import LoadingIndicator from "./ui/loading-indicator";
import ButtonResearch from "@/components/ui/button-research";

const StrategiesLedes = () => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Primary");
  const [messages, setMessages] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scrollableRef = useRef(null);

  const [activeView, setActiveView] = useAtom(researchActiveAtom);
  const [artistName, setArtistName] = useAtom(globalArtistNameAtom);
  const [ledes, setLedes] = useAtom(strategiesLedesAtom);
  const [strategiesLoading, setStrategiesLoading] = useAtom(
    strategiesLoadingAtom
  );
  const [recommended, setRecommended] = useAtom(strategiesRecAtom);
  const [reBio, setReBio] = useAtom(researchBioAtom);

  const placeholder = "Enter artist name.";

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
    setIsFirstLoad(false);
    setError(null);
    setArtistName(input);

    try {
      // ————————————————————————————————————o wikipedia context —>
      //
      const wikiResponse = await fetch("/api/wikipedia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
        }),
      });

      const wikiData = await wikiResponse.json();
      setReBio(wikiData.context);

      if (!wikiData.success) {
        throw new Error(wikiData.error || "Wikipedia search failed");
      }

      // ————————————————————————————————————o lede model interaction —>
      //
      const response = await fetch("/api/strategies/lede", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
          wikipediaContext: wikiData.context,
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
              // console.log(
              //   "🎬🎬🎬 Primary Data 🎬🎬🎬",
              //   JSON.stringify(data.primary, null, 2)
              // );
              setLoadingStep("Voice");
            }
            if (data.secondary) {
              // console.log(
              //   "🙊🙊🙊 Voice Data 🙊🙊🙊",
              //   JSON.stringify(data.secondary, null, 2)
              // );
              setLoadingStep("Evaluation");
            }
            if (data.tertiary) {
              // console.log(
              //   "✅✅✅ Evaluation Data ✅✅✅",
              //   JSON.stringify(data.tertiary, null, 2)
              // );
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
      setStrategiesLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col p-3 pr-2 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div
        className="drafting-scrollable w-full flex-1 flex flex-col items-start gap-2 pr-3 overflow-y-auto"
        ref={scrollableRef}
      >
        {strategiesLoading && (
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
                information it&apos;s retrieving is being deposited in the Research
                panel to the right. 👉
              </div>
              <div>
                Feel free to explore the other research tools while you wait.
              </div>
              <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 py-1 pt-3 text-white">
                <ButtonResearch
                  classes="pointer-events-none"
                  name="Discography"
                />
                <ButtonResearch
                  name="Influences"
                  isActive={activeView === "influences"}
                  onClick={() => setActiveView("influences")}
                />
                <ButtonResearch
                  name="Biographical Info"
                  isActive={activeView === "bio"}
                  onClick={() => setActiveView("bio")}
                />
                <ButtonResearch
                  name="Discourse"
                  isActive={activeView === "discourse"}
                  onClick={() => setActiveView("discourse")}
                />
                <ButtonResearch
                  classes="pointer-events-none"
                  name="Recent News"
                />
                <ButtonResearch
                  classes="pointer-events-none"
                  name="Artist Socials"
                />
                <ButtonResearch
                  name="Sonic Analysis"
                  isActive={activeView === "sonic"}
                  onClick={() => setActiveView("sonic")}
                />
                <ButtonResearch
                  name="Lyrical Analysis"
                  isActive={activeView === "lyrical"}
                  onClick={() => setActiveView("lyrical")}
                />
              </div>
            </div>
          </div>
        )}

        {tooltipVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-darkslategray-200 border-2 border-solid bg-mediumseagreen-200 text-darkslategray-200 py-2 px-4 rounded-md shadow-lg font-base text-2xl text-center leading-8">
            Copied to clipboard!
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isFirstLoad && ledes.length == 0 && (
          <div className="lede-first-load w-full h-full flex items-center justify-center">
            <div className="shadow-hieroshadow-25 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid w-11/12 flex flex-col items-start justify-center gap-4 p-3 pb-4 transition duration-200 text-darkslategray-200/90 text-base leading-6">
              <div>
                <h3 className="pb-2 text-xl text-darkslategray-200/90 font-normal">
                  Strategies: Ledes
                </h3>
                Here you&apos;ll be drafting ledes for artist bios. Enter the
                artist&apos;s name in the form below to get started.
              </div>
              <div>
                While working on the ledes, Thirdeyes is out gathering
                information you can use in crafting your bio. It will be
                presented in the Research panel to the right. 👉
              </div>
            </div>
          </div>
        )}

        {ledes.length > 0 && !strategiesLoading && (
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

            {recommended && (
              <div
                className="recommended shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2 hover:bg-mediumseagreen-100/60 hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={(e) => handleCopy(recommended, e)}
              >
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
        strategiesLoading={strategiesLoading}
        placeholder={placeholder}
      />
    </div>
  );
};

export default StrategiesLedes;
