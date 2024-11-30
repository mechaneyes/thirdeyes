"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
          className="w-full max-w-7xl flex flex-col justify-between gap-3"
          style={{ height: "calc(100vh - 87px)" }}
        >
          <motion.div
            layout="position"
            className="flex flex-row items-center justify-center gap-3"
            style={{ height: isExpanded ? "33%" : "66%" }}
          >
            <motion.div layout="position" className="w-full h-full">
              <Strategies />
            </motion.div>
            <motion.div layout="position" className="w-full h-full">
              <Research />
            </motion.div>
          </motion.div>
          <motion.div
            layout="position"
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
