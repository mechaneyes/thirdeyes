"use client";

import { useState } from "react";
import TabsDrafting from "./drafting-tabs";

const Drafting = () => {
  const [activeTab, setActiveTab] = useState("lede");

  return (
    <div className="self-stretch flex-1 rounded-lg bg-mediumseagreen-200 border-seagreen shadow-hieroshadow-35 border border-solid flex flex-col items-center justify-start gap-6">
      <TabsDrafting activeTab={activeTab} onTabChange={setActiveTab} />
      {/* {activeTab === "research" ? <ResearchBody /> : <ResearchNotes />} */}
      <div className="h-full flex flex-col items-center justify-between px-4 pb-6 gap-6">
        <div className="flex flex-col items-center justify-between gap-3 max-h-[650px] overflow-y-scroll">
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #00
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid box-border flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #00
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid box-border flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #000
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid box-border flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #00
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid box-border flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #00
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
          <div className="shadow-hieroshadow-15 rounded-3xs bg-gray border-seagreen border border-solid box-border flex flex-col items-start justify-start p-3">
            <h4 className="text-base text-darkslategray-200 font-bold">
              Lede Strategy #00
            </h4>
            <div className="text-base leading-5 text-darkslategray-200/75">
              The Strokes became the toast of New York in the early ’00s by
              putting a modern spin on other Big Apple musical eras—specifically
              the late-’60s counterculture that spawned the Velvet Underground,
              and the fertile ’70s scene when leather-clad punk bands roared
              through CBGB.
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-end">
          <div className="self-stretch relative shadow-hieroshadow-35 rounded-md bg-white border-seagreen border border-solid box-border h-[2.5rem]">
            <div className="absolute right-[0.75rem] bottom-[0.75rem] flex fl3tems-center justify-center">
              <div
                className="w-4 relative h-4 overflow-hidden shrink-0"
                width={16}
                height={16}
                alt=""
                src="SVG.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drafting;
