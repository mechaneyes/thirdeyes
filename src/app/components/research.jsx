"use client";

import { useState, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";

import TabsResearch from "./research-tabs";
import ResearchBody from "./research-body";
import ResearchNotes from "./research-notes";

import {
  globalArtistNameAtom,
  researchArtistSocialsAtom,
  researchArtistSocialsProgressAtom,
  researchDiscographyAtom,
  researchDiscographyProgressAtom,
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

const Research = () => {
  const [activeTab, setActiveTab] = useState("research");

  const [artistName] = useAtom(globalArtistNameAtom);
  const setReDiscography = useSetAtom(researchDiscographyAtom);
  const setReDiscographyProg = useSetAtom(researchDiscographyProgressAtom);
  const setReDiscourse = useSetAtom(researchDiscourseAtom);
  const setReDiscourseProg = useSetAtom(researchDiscourseProgressAtom);
  const setReInfluences = useSetAtom(researchInfluencesAtom);
  const setReInfluencesProg = useSetAtom(researchInfluencesProgressAtom);
  const setReLyrical = useSetAtom(researchLyricalAnalysisAtom);
  const setReLyricalProg = useSetAtom(researchLyricalAnalysisProgressAtom);
  const setReNews = useSetAtom(researchNewsAtom);
  const setReNewsProg = useSetAtom(researchNewsProgressAtom);
  const setReArtistSocials = useSetAtom(researchArtistSocialsAtom);
  const setReArtistSocialsProg = useSetAtom(researchArtistSocialsProgressAtom);
  const setReSonic = useSetAtom(researchSonicAnalysisAtom);
  const setReSonicProg = useSetAtom(researchSonicAnalysisProgressAtom);

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
            <div key={index} className="font-normal text-xl pt-4 mb-2">
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

  const fetchArtistSocials = async () => {
    setReArtistSocialsProg(true);
    try {
      const response = await fetch(
        `/api/research/search?q=${encodeURIComponent(
          `${artistName} social media links`
        )}`
      );
      const data = await response.json();
      setReArtistSocials(data.results.items);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setReArtistSocialsProg(false);
    }
  };

  // const fetchDiscography = async () => {
  //   setReDiscographyProg(true);
  //   try {
  //     const response = await fetch(
  //       `/api/research/discography?artistName=${encodeURIComponent(artistName)}`
  //     );
  //     const data = await response.json();
  //     // console.log(data.discography);

  //     const releases = data.discography
  //       .filter((release) => release.title)
  //       .map((release) => ({
  //         artist: release.artistCredits.map((names) => names.name),
  //         title: release.title,
  //         date: release.date && release.date,
  //         format: release.media[0]?.format || "Unknown Format",
  //         label: release.labels?.[0]?.name && release.labels?.[0]?.name,
  //         tracks:
  //           release.media[0]?.tracks?.map((track) => ({
  //             position: track.position,
  //             title: track.title,
  //             duration: track.length,
  //           })) || [],
  //       }))
  //       .sort((a, b) => new Date(a.date) - new Date(b.date));

  //     setReDiscography(releases);
  //   } catch (error) {
  //     console.error("Search failed:", error);
  //   } finally {
  //     setReDiscographyProg(false);
  //   }
  // };

  const fetchDiscography = async () => {
    setReDiscographyProg(true);

    try {
      const response = await fetch(
        `/api/research/brainz?artistName=${encodeURIComponent(artistName)}`
      );
      const data = await response.json();
      console.log(data);

      const releases = data.releases.map((release) => ({
        title: release.title,
        date: release.date,
        format: release.format,
        tracks: release.tracks.map((track) => ({
          title: track.title,
          number: track.number,
        })),
      }));

      setReDiscographyProg(false);
      setReDiscography(releases);
    } catch (error) {
      console.error("Fetch failed:", error);
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
    setReArtistSocials(null);
    setReDiscourse(null);
    setReNews(null);
    setReInfluences(null);
    setReLyrical(null);
    setReSonic(null);
    if (artistName) {
      fetchArtistSocials(),
        fetchDiscography(),
        fetchDiscourse(),
        fetchNews(),
        fetchInfluences(),
        fetchLyricalAnalysis(),
        fetchSonicAnalysis();
    }
  }, [artistName]);

  return (
    <div className="research h-full self-stretch flex-1 rounded-lg bg-researchlavender-200 shadow-hieroshadow-35 border-researchlavender-500 border-x border-b border-b-lg border-solid flex flex-col items-center justify-start text-white">
      <TabsResearch activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />}
    </div>
  );
};

export default Research;
