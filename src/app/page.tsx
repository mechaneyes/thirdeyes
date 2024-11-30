"use client";

import { useState } from "react";

import Header from "@/app/components/header";
import Strategies from "@/app/components/strategies";
import Research from "@/app/components/research";
import Writing from "@/app/components/writing";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="thirdeyes w-full flex flex-col items-center justify-center px-3 pb-4 bg-sky-100 overflow-hidden">
        <Header />
        <div
          className="third-body w-full max-w-7xl grid grid-rows-12 gap-3"
          style={{ height: "calc(100vh - 87px)" }}
        >
          <div
            className={`third-main w-full h-full relative row-span-${
              isExpanded ? 4 : 8
            } flex flex-row items-center justify-center gap-3 max-w-7xl text-left text-4 text-darkslategray-100 font-mr-eaves-xl-san-ot`}
          >
            <Strategies />
            <Research />
          </div>
          <div className={`third-write h-full row-span-${isExpanded ? 8 : 4}`}>
            <Writing
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
