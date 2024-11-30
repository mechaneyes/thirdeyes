"use client";

import { useState } from "react";
import { motion } from "motion/react";

import Header from "@/app/components/header";
import Strategies from "@/app/components/strategies";
import Research from "@/app/components/research";
import Writing from "@/app/components/writing";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalHeight = "calc(100vh - 87px)";

  return (
    <>
      <div className="thirdeyes w-full flex flex-col items-center justify-center px-3 pb-4 bg-sky-100 overflow-hidden">
        <Header />
        <div
          className="third-body w-full max-w-7xl flex flex-col gap-3"
          style={{ height: totalHeight }}
        >
          <motion.div
            layout
            className={`third-main flex flex-row items-center justify-center gap-3`}
            style={{ height: isExpanded ? "33%" : "66%" }}
          >
            <Strategies />
            <Research />
          </motion.div>
          <motion.div
            layout
            className="third-write"
            style={{ height: isExpanded ? "66%" : "33%" }}
          >
            <Writing
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
