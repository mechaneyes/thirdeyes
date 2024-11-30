"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
          className="playground w-full max-w-7xl flex flex-col justify-between gap-3"
          style={{ height: "calc(100vh - 87px)" }}
        >
          <motion.div
            layoutId="playground"
            className="flex flex-row items-center justify-center gap-3"
            style={{ height: isExpanded ? "33%" : "66%" }}
            transition={{
              default: { ease: "linear" },
              layout: { duration: 0.3 },
            }}
          >
            <motion.div className="w-full h-full">
              <Strategies />
            </motion.div>

            <motion.div className="w-full h-full">
              <Research />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            <motion.div
              key="writing-expanded"
              layoutId="writing"
              initial={{ height: "33%" }} // Changed from 66%
              animate={{ height: isExpanded ? "66%" : "33%" }} // Made dynamic
              exit={{ height: 0 }}
              transition={{
                default: { ease: "linear" },
                layout: { duration: 0.3 },
              }}
              className="w-full h-full"
            >
              <Writing onToggle={() => setIsExpanded(!isExpanded)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
