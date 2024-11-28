import { useEffect } from "react";
import { useAtom } from "jotai";

import {
  globalArtistNameAtom,
  researchActiveAtom,
  researchBioAtom,
  researchDiscourseAtom,
  researchDiscourseProgressAtom,
  researchInfluencesAtom,
  researchInfluencesProgressAtom,
  researchLyricalAnalysisAtom,
  researchLyricalAnalysisProgressAtom,
  researchSonicAnalysisAtom,
  researchSonicAnalysisProgressAtom,
} from "@/store/atoms";
import ResearchBio from "./research-bio";
import ResearchDiscourse from "./research-discourse";
import ResearchInfluences from "./research-influences";
import ResearchLyricalAnalysis from "./research-lyrical-analysis";
import ResearchSonicAnalysis from "./research-sonic-analysis";
import ResearchWelcome from "./research-welcome";
import ButtonResearch from "@/components/ui/button-research";

const ResearchBody = () => {
  const [activeView, setActiveView] = useAtom(researchActiveAtom);
  const [artistName] = useAtom(globalArtistNameAtom);
  const [reBio] = useAtom(researchBioAtom);
  const [reDiscourse, setReDiscourse] = useAtom(researchDiscourseAtom);
  const [reDiscourseProg, setReDiscourseProg] = useAtom(
    researchDiscourseProgressAtom
  );
  const [reInfluences, setReInfluences] = useAtom(researchInfluencesAtom);
  const [reInfluencesProg, setReInfluencesProg] = useAtom(
    researchInfluencesProgressAtom
  );
  const [reLyrical, setReLyrical] = useAtom(researchLyricalAnalysisAtom);
  const [reLyricalProg, setReLyricalProg] = useAtom(
    researchLyricalAnalysisProgressAtom
  );
  const [reSonic, setReSonic] = useAtom(researchSonicAnalysisAtom);
  const [reSonicProg, setReSonicProg] = useAtom(
    researchSonicAnalysisProgressAtom
  );

  const renderActiveView = () => {
    switch (activeView) {
      case "bio":
        return <ResearchBio />;
      case "discourse":
        return <ResearchDiscourse />;
      case "influences":
        return <ResearchInfluences />;
      case "lyrical":
        return <ResearchLyricalAnalysis />;
      case "sonic":
        return <ResearchSonicAnalysis />;
      default:
        return <ResearchWelcome />;
    }
  };

  const fetchDiscourse = async () => {
    try {
      setReDiscourseProg(true);
      const response = await fetch("/api/research/discourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: artistName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch discourse.");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to get discourse");
      }

      console.log("Response content:", data);
      setReDiscourse(data.content);
      setReDiscourseProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchInfluences = async () => {
    try {
      setReInfluencesProg(true);
      const response = await fetch("/api/research/influences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: artistName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch influences.");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to get influences");
      }

      console.log("Response content:", data);
      setReInfluences(data.content);
      setReInfluencesProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLyricalAnalysis = async () => {
    try {
      setReLyricalProg(true);
      const response = await fetch("/api/research/lyrical-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: artistName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sonic analysis.");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to get sonic analysis");
      }

      console.log("Response content:", data);
      setReLyrical(data.content);
      setReLyricalProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchSonicAnalysis = async () => {
    try {
      setReSonicProg(true);
      const response = await fetch("/api/research/sonic-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: artistName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sonic analysis.");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to get sonic analysis");
      }

      console.log("Response content:", data);
      setReSonic(data.content);
      setReSonicProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (reBio !== undefined) {
      setActiveView("bio");
    }
  }, [reBio]);

  useEffect(() => {
    artistName
      ? (fetchDiscourse(),
        fetchInfluences(),
        fetchLyricalAnalysis(),
        fetchSonicAnalysis())
      : console.log("No artist name.");
  }, [artistName]);

  return (
    <div
      className="research-body w-full h-full flex-1 flex flex-col items-center justify-start p-3 gap-3 text-darkslateblue-300"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="research-content w-full h-full shadow-hieroshadow-25 rounded-md bg-researchlavender-100 border-researchlavender-500 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 pr-2">
        {renderActiveView()}
      </div>
      <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 py-1 text-white">
        <ButtonResearch classes="pointer-events-none" name="Discography" />
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
        <ButtonResearch classes="pointer-events-none" name="Recent News" />
        <ButtonResearch classes="pointer-events-none" name="Artist Socials" />
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
  );
};

export default ResearchBody;
