import { useEffect } from "react";
import { useAtom } from "jotai";

import { researchActiveAtom, researchBioAtom } from "@/store/atoms";
import ResearchBio from "./research-bio";
import MessageForm from "./message-form";
import ButtonResearch from "@/components/ui/button-research";

const ResearchBody = () => {
  const [reBio] = useAtom(researchBioAtom);
  const [activeView, setActiveView] = useAtom(researchActiveAtom);

  useEffect(() => {
    if (reBio !== undefined) {
      setActiveView("bio");
    }
  }, [reBio]);

  return (
    <div
      className="research-body w-full h-full flex-1 flex flex-col items-center justify-start p-3 gap-3 text-darkslateblue-300"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="research-content w-full h-full shadow-hieroshadow-25 rounded-md bg-researchlavender-100 border-researchlavender-500 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 pr-2">
        {reBio === undefined ? (
          <div className="research-inner relative h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
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
          </div>
        ) : (
          <ResearchBio />
        )}
      </div>
      {/* <MessageForm /> */}
      <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 py-1 text-white">
        <ButtonResearch name="Discography" />
        <ButtonResearch name="Influences" />
        <ButtonResearch
          name="Biographical Info"
          isActive={activeView === "bio"}
          onClick={() => setActiveView("bio")}
        />
        <ButtonResearch name="Discource" />
        <ButtonResearch name="Recent News" />
        <ButtonResearch name="Artist Socials" />
        <ButtonResearch name="Sonic Analysis" />
        <ButtonResearch name="Lyrical Analysis" />
      </div>
    </div>
  );
};

export default ResearchBody;
