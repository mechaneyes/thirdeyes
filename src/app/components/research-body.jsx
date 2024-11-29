import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";

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
  researchNewsAtom,
  researchNewsProgressAtom,
  researchSonicAnalysisAtom,
  researchSonicAnalysisProgressAtom,
} from "@/store/atoms";
import ResearchBio from "./research-bio";
import ResearchDiscourse from "./research-discourse";
import ResearchInfluences from "./research-influences";
import ResearchLyricalAnalysis from "./research-lyrical-analysis";
import ResearchNews from "./research-news";
import ResearchSonicAnalysis from "./research-sonic-analysis";
import ResearchWelcome from "./research-welcome";
import ButtonResearchGroup from "@/components/ui/button-research-group";

const ResearchBody = () => {
  const [activeView, setActiveView] = useAtom(researchActiveAtom);
  const [artistName] = useAtom(globalArtistNameAtom);
  const [reBio] = useAtom(researchBioAtom);
  const setReDiscourse = useSetAtom(researchDiscourseAtom);
  const setReDiscourseProg = useSetAtom(researchDiscourseProgressAtom);
  const setReInfluences = useSetAtom(researchInfluencesAtom);
  const setReInfluencesProg = useSetAtom(researchInfluencesProgressAtom);
  const setReLyrical = useSetAtom(researchLyricalAnalysisAtom);
  const setReLyricalProg = useSetAtom(researchLyricalAnalysisProgressAtom);
  const setReNews = useSetAtom(researchNewsAtom);
  const setReNewsProg = useSetAtom(researchNewsProgressAtom);
  const setReSonic = useSetAtom(researchSonicAnalysisAtom);
  const setReSonicProg = useSetAtom(researchSonicAnalysisProgressAtom);

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
      case "news":
        return <ResearchNews />;
      case "sonic":
        return <ResearchSonicAnalysis />;
      default:
        return <ResearchWelcome />;
    }
  };

  const formatText = (text) => {
    if (!text) return null;

    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line, index) => {
        if (line.startsWith("#####")) {
          const headerText = line.replace("##### ", "").trim();
          return (
            <div key={index} className="font-bold text-sm mt-2 mb-1">
              {headerText}
            </div>
          );
        }
        if (line.startsWith("####")) {
          const headerText = line.replace("#### ", "").trim();
          return (
            <div key={index} className="font-normal text-base mt-2 mb-1">
              {headerText}
            </div>
          );
        }
        if (line.startsWith("###")) {
          const headerText = line.replace("### ", "").trim();
          return (
            <div key={index} className="font-normal text-lg mt-4 mb-1">
              {headerText}
            </div>
          );
        }
        if (line.startsWith("##")) {
          const headerText = line.replace(/^#+\s?/, "").trim();
          return (
            <div key={index} className="font-normal text-xl mt-6 mb-2">
              {headerText}
            </div>
          );
        }
        return (
          line.trim() && (
            <div key={index} className="mb-2">
              {line}
            </div>
          )
        );
      });
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

      const formattedText = formatText(data.content);
      setReDiscourse(formattedText);
      setReDiscourseProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchNews = async () => {
    setReNewsProg(true);
    try {
      const response = await fetch(
        `/api/research/search?q=${encodeURIComponent(artistName)}`
      );
      const data = await response.json();
      setReNews(data.results.items);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setReNewsProg(false);
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

      const formattedText = formatText(data.content);
      setReInfluences(formattedText);
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

      const formattedText = formatText(data.content);
      setReLyrical(formattedText);
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

      const formattedText = formatText(data.content);
      setReSonic(formattedText);
      setReSonicProg(false);
      return data.content;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (reBio !== null) {
      setActiveView("bio");
    }
  }, [reBio]);

  useEffect(() => {
    setReDiscourse(null);
    setReNews(null);
    setReInfluences(null);
    setReLyrical(null);
    setReSonic(null);
    artistName
      ? (fetchDiscourse(),
        fetchNews(),
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

      <ButtonResearchGroup
        activeView={activeView}
        setActiveView={setActiveView}
        isResearch={true}
      />
    </div>
  );
};

export default ResearchBody;
