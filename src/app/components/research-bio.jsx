import { useAtom } from "jotai";

import { globalArtistNameAtom, researchBioAtom } from "@/store/atoms";

const ResearchBio = () => {
  const [artistName] = useAtom(globalArtistNameAtom);
  const [reBio] = useAtom(researchBioAtom);

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
      className={`research-inner relative w-full h-full ${
        reBio ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <h3 className="pb-6 text-xl text-darkslateblue-300 font-normal">
        Biographical Information
      </h3>

      {reBio ? (
        <>
          <div className="text-lg font-normal group-hover:text-researchlavender-300 pb-2">
            {artistName} via Wikipedia
          </div>
          {formatText(reBio)}
        </>
      ) : (
        "Biographical Information not yet available."
      )}
    </div>
  );
};

export default ResearchBio;
