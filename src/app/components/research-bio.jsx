import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { reWikipediaDefault } from "@/store/atoms";

const ResearchBio = () => {
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
    <div className="research-inner relative h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="space-y-2">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          {title} via Wikipedia
        </h3>
        {formatText(wikiDefault)}
      </div>
    </div>
  );
};

export default ResearchBio;
