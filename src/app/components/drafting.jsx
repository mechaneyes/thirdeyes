"use client";

import { useState } from "react";
import TabsDrafting from "./drafting-tabs";
import DraftingLede from "./drafting-lede";
import Textbox from "./textbox";

const Drafting = () => {
  const [activeTab, setActiveTab] = useState("lede");

  return (
    <div className="drafting self-stretch flex-1 rounded-lg bg-mediumseagreen-200 border-seagreen shadow-hieroshadow-35 border border-solid flex flex-col items-center justify-start">
      <TabsDrafting activeTab={activeTab} onTabChange={setActiveTab} />
      {/* {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />} */}
      <div className="h-full flex flex-col items-center justify-between p-3 gap-3" style={{ height: 'calc(100% - 33px)' }}>
        <div className="flex flex-col items-center justify-between gap-2 overflow-y-scroll">
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
