import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { reWikipediaDefault } from "@/store/atoms";
import MessageForm from "./message-form";
import ButtonResearch from "@/components/ui/button-research";

const ResearchBody = () => {
  const [wikiDefault] = useAtom(reWikipediaDefault);
  const [title, setTitle] = useState("Research");

  useEffect(() => {
    if (wikiDefault) {
      const match = wikiDefault.match(/Page: (.*?)\nSummary:/);
      if (match && match[1]) {
        setTitle(match[1]);
      }
    }
  }, [wikiDefault]);

  const formatText = (text) => {
    if (!text) return null;

    // Remove "Page:" and "Summary:" prefixes
    const cleanText = text.replace(/^Page:.*\nSummary:\s*/, "");

    return cleanText
      .split("\n")
      .filter((line) => line.trim().length > 0) // kill empty lines
      .map((line, index) => {
        if (
          (line.startsWith("==") || line.startsWith("===")) &&
          (line.endsWith("==") || line.endsWith("==="))
        ) {
          const headerText = line.replace(/===/g, "").replace(/==/g, "").trim();
          return (
            <h4 key={index} className="font-normal text-lg mt-4 mb-2">
              {headerText}
            </h4>
          );
        }
        return (
          // only paragraphs for non-empty lines
          line.trim() && ( 
            <p key={index} className="mb-2">
              {line}
            </p>
          )
        );
      });
  };

  return (
    <div
      className="research-body h-full flex-1 flex flex-col items-center justify-start p-3 gap-4 text-darkslateblue-300"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="research-content h-full shadow-hieroshadow-25 rounded-md bg-researchlavender-100 border-researchlavender-500 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 pb-5 pr-2">
        <div className="research-inner relative h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
          {wikiDefault === undefined ? (
            <>
              <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
                Research
              </h3>
              <p className="text-base leading-6">
                Welcome to the research tool! You can use this tool to find
                information about artists, bands, or other topics.
              </p>
              <p className="text-base leading-6">
                The tool will automatically load the Wikipedia data associated
                with the artist you&apos;re building the lede for.
              </p>
              <p className="text-base leading-6">More in store.</p>
            </>
          ) : (
            <div className="space-y-2">
              <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
                {title}
              </h3>
              {formatText(wikiDefault)}
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 text-white">
        <ButtonResearch name="Discography" />
        <ButtonResearch name="Media Link Tree" />
        <ButtonResearch name="Artist Genres" />
        <ButtonResearch name="Biographical Info" />
        <ButtonResearch name="Adjective Cloud" />
        <ButtonResearch name="Recent News" />
        <ButtonResearch name="Artist Socials" />
        <ButtonResearch name="Similar Artists" />
      </div>
      <MessageForm />
    </div>
  );
};

export default ResearchBody;
