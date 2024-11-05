import React, { useState, useEffect } from "react";

const ResearchNotes = () => {
  const [scratchpadContent, setScratchpadContent] = useState("");

  useEffect(() => {
    // Load scratchpadContent when the component mounts
    const savedContent = localStorage.getItem("scratchpadContent");
    if (savedContent) {
      setScratchpadContent(savedContent);
    }
  }, []);

  useEffect(() => {
    // Save scratchpadContent whenever it changes
    localStorage.setItem("scratchpadContent", scratchpadContent);
  }, [scratchpadContent]);

  const handleContentChange = (event) => {
    setScratchpadContent(event.target.value);
  };

  const handleClearContent = () => {
    setScratchpadContent("");
  };

  return (
    <div className="notes self-stretch flex-1 flex flex-col items-center justify-start pt-[0rem] px-4 pb-6 gap-6 z-[0]">
      <div className="self-stretch flex-1 shadow-hieroshadow-25 rounded-3xs bg-gray border-researchpurple/65 border border-solid overflow-hidden flex flex-col items-start justify-start p-4 gap-[0.75rem]">
        <div className="flex flex-row items-center justify-between w-full">
          <h3 className="text-xl text-darkslateblue-300 font-bold">
            Scratchpad
          </h3>

          <span onClick={handleClearContent} className="pr-2 text-darkslateblue-300 cursor-pointer">
            Clear
          </span>
        </div>

        <textarea
          value={scratchpadContent}
          onChange={handleContentChange}
          placeholder={`Write your notes here. \nNotes are saved automatically.`}
          className="scratchpad w-full h-full mb-8 p-4 bg-transparent border rounded-3xs border-darkslateblue-400/60 shadow-hieroshadow-15 resize-none focus:outline-none  text-darkslateblue-200"
        />
      </div>
    </div>
  );
};

export default ResearchNotes;
