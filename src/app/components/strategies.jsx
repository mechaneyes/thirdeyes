"use client";

import { useState } from "react";
import StrategiesTabs from "./strategies-tabs";
import StrategiesLedes from "./strategies-ledes";
import StrategiesOrigin from "./strategies-origins";
import StrategiesWorks from "./strategies-works";
import MessageForm from "./message-form";

const Strategies = () => {
  const [activeTab, setActiveTab] = useState("lede");

  const renderContent = () => {
    switch (activeTab) {
      case "research":
        return <StrategiesLedes />;
      case "origin":
        return <StrategiesOrigin />;
      case "works":
        return <StrategiesWorks />;
      default:
        return <StrategiesLedes />;
    }
  };

  return (
    <div className="strategies h-full self-stretch flex-1 pb-1 rounded-lg bg-mediumseagreen-200 shadow-hieroshadow-35 border-seagreen border-x border-b border-b-lg border-solid flex flex-col items-center justify-start">
      <StrategiesTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Strategies;
