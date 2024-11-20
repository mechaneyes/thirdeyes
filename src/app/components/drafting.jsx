"use client";

import { useState } from "react";
import TabsDrafting from "./drafting-tabs";
import DraftingLedes from "./drafting-ledes";
import DraftingOrigin from "./drafting-origins";
import DraftingWorks from "./drafting-works";
import MessageForm from "./message-form";

const Drafting = () => {
  const [activeTab, setActiveTab] = useState("lede");

  const renderContent = () => {
    switch (activeTab) {
      case "research":
        return <DraftingLedes />;
      case "origin":
        return <DraftingOrigin />;
      case "works":
        return <DraftingWorks />;
      default:
        return <DraftingLedes />;
    }
  };

  return (
    <div className="drafting self-stretch flex-1 pb-1 rounded-lg bg-mediumseagreen-200 shadow-hieroshadow-35 border-seagreen border-x border-b border-b-lg border-solid flex flex-col items-center justify-start">
      <TabsDrafting activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Drafting;
