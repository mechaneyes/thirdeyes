"use client";

import { useState } from "react";
import TabsDrafting from "./drafting-tabs";
import DraftingLede from "./drafting-lede";
import Textbox from "./textbox";

const Drafting = () => {
  const [activeTab, setActiveTab] = useState("lede");

  return (
    <div className="drafting self-stretch flex-1 rounded-lg bg-mediumseagreen-200 shadow-hieroshadow-35 border-seagreen border-x border-b border-b-lg border-solid flex flex-col items-center justify-start">
      <TabsDrafting activeTab={activeTab} onTabChange={setActiveTab} />
      {/* {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />} */}
      <div className="h-full flex flex-col items-center justify-between p-3 pr-2 gap-4" style={{ height: 'calc(100% - 33px)' }}>
        <div className="drafting-scrollable flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll">
          <DraftingLede />
          <DraftingLede />
          <DraftingLede />
          <DraftingLede />
          <DraftingLede />
          <DraftingLede />
        </div>
        <Textbox borderColor="border-seagreen" />
      </div>
    </div>
  );
};

export default Drafting;
