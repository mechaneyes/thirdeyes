"use client";

import React, { useState } from "react";
import TabsResearch from "./research-tabs";
import ResearchBody from "./research-body";
import ResearchNotes from "./research-notes";

const Research = () => {
  const [activeTab, setActiveTab] = useState("research"); // Default to research tab

  return (
    <div className="research h-full self-stretch flex-1 rounded-lg bg-darkorchid-200 shadow-hieroshadow-35 border-researchpurple/70 border-[1px] border-solid flex flex-col items-center justify-start text-white">
      <TabsResearch activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />}
    </div>
  );
};

export default Research;