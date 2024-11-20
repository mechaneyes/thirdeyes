"use client";

import { useState } from "react";
import TabsDrafting from "./drafting-tabs";
import DraftingLedes from "./drafting-ledes";
import DraftingOrigin from "./drafting-origins";
import DraftingWorks from "./drafting-works";
import MessageForm from './message-form';
import Textbox from "./textbox";

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
    <div className="drafting self-stretch flex-1 rounded-lg bg-mediumseagreen-200 shadow-hieroshadow-35 border-seagreen border-x border-b border-b-lg border-solid flex flex-col items-center justify-start">
      <TabsDrafting activeTab={activeTab} onTabChange={setActiveTab} />
      <div
        className="h-full flex flex-col items-center justify-between p-3 pr-2 gap-4"
        style={{ height: "calc(100% - 33px)" }}
      >
        <div className="drafting-scrollable flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll">
          {renderContent()}
        </div>
        <Textbox borderColor="border-seagreen" />
        <MessageForm />
      </div>
    </div>
  );
};

export default Drafting;
