import { useAtom } from "jotai";

import { researchActiveAtom } from "@/store/atoms";
import ResearchArtistSocials from "./research-artist-socials";
import ResearchBio from "./research-bio";
import ResearchDiscography from "./research-discography";
import ResearchDiscourse from "./research-discourse";
import ResearchInfluences from "./research-influences";
import ResearchLyricalAnalysis from "./research-lyrical-analysis";
import ResearchNews from "./research-news";
import ResearchSonicAnalysis from "./research-sonic-analysis";
import ResearchWelcome from "./research-welcome";
import ButtonResearchGroup from "@/components/ui/button-research-group";

const ResearchBody = () => {
  const [activeView, setActiveView] = useAtom(researchActiveAtom);

  const renderActiveView = () => {
    switch (activeView) {
      case "bio":
        return <ResearchBio />;
      case "discography":
        return <ResearchDiscography />;
      case "discourse":
        return <ResearchDiscourse />;
      case "influences":
        return <ResearchInfluences />;
      case "lyrical":
        return <ResearchLyricalAnalysis />;
      case "news":
        return <ResearchNews />;
      case "socials":
        return <ResearchArtistSocials />;
      case "sonic":
        return <ResearchSonicAnalysis />;
      default:
        return <ResearchWelcome />;
    }
  };

  return (
    <div
      className="research-body w-full h-full flex-1 flex flex-col items-center justify-start p-3 gap-3 text-darkslateblue-300"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="research-content w-full h-full shadow-hieroshadow-25 rounded-md bg-researchlavender-100 border-researchlavender-500 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 pr-2">
        {renderActiveView()}
      </div>

      <ButtonResearchGroup
        activeView={activeView}
        setActiveView={setActiveView}
        isResearch={true}
      />
    </div>
  );
};

export default ResearchBody;
