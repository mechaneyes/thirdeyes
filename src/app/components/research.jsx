"use client";

import React, { useState } from "react";
import TabsResearch from "./research-tabs";
import ResearchBody from "./research-body";
import ResearchNotes from "./research-notes";

const Research = () => {
  const [activeTab, setActiveTab] = useState("research"); // Default to research tab

  return (
    <div className="self-stretch flex-1 rounded-lg bg-darkorchid-200 border-researchpurple/70 border-[1px] border-solid flex flex-col items-center justify-start gap-[1.5rem] text-white">
      <TabsResearch activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />}
    </div>
  );
};

export default Research;