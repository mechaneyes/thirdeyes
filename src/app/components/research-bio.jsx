import { useAtom } from "jotai";

import { globalArtistNameAtom, researchBioAtom } from "@/store/atoms";

const ResearchBio = () => {
  const [artistName] = useAtom(globalArtistNameAtom);
  const [reBio] = useAtom(researchBioAtom);

  console.log('reBio', reBio);

  const formatText = (text) => {
    if (!text) return null;

    return text
      .split("\n")
      .filter((line) => line.trim().length > 0) // kill empty lines
      .map((line, index) => {
        if (line.match(/^Page:(.*)/)) {
          line = line.replace(/^Page:\s*/, "");
          return (
            <div key={index} className="text-xl font-normal leading-6 mb-2">
              Wikipedia: {line}
            </div>
          );
        }
        if (line.startsWith("==") && line.endsWith("==")) {
          const headerText = line.replace(/==/g, "").trim();
          return (
            <h4 key={index} className="font-normal text-lg mt-4 mb-2">
              {headerText}
            </h4>
          );
        } else if (line.startsWith("===") && line.endsWith("===")) {
          const headerText = line.replace(/===/g, "").trim();
          return (
            <h4 key={index} className="font-normal text-base mt-4 mb-2">
              {headerText}
            </h4>
          );
        }
        return (
          // only paragraphs for non-empty lines
          line.trim() && (
            <div key={index} className="text-base font-base leading-6 mb-2">
              {line}
            </div>
          )
        );
      });
  };

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reBio ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <h3 className="pb-6 text-2xl text-darkslateblue-300 font-normal">
        Biographical Information
      </h3>

      {reBio
        ? formatText(reBio)
        : "Biographical Information not yet available."}
    </div>
  );
};

export default ResearchBio;
