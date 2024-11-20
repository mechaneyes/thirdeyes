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
    <div className="notes self-stretch flex-1 flex flex-col items-center justify-start p-3 pb-4 gap-4 z-[0]">
      <div className="self-stretch flex-1 shadow-hieroshadow-25 rounded-3xs bg-gray border-researchlavender-500 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 gap-2">
        <div className="flex flex-row items-start justify-between w-full">
          <h3 className="text-xl text-darkslateblue-300 font-normal">
            Scratchpad
          </h3>

          <span
            onClick={handleClearContent}
            className="text-darkslateblue-300 align-top font-normal cursor-pointer"
          >
            Clear
          </span>
        </div>

        <textarea
          value={scratchpadContent}
          onChange={handleContentChange}
          placeholder={`Write your notes here. \n\nNotes are saved automatically.`}
          className="scratchpad w-full h-full mb-4 p-4 bg-transparent border rounded-3xs border-researchlavender-500 shadow-hieroshadow-15 resize-none focus:outline-none text-base text-darkslateblue-200"
        />
      </div>
    </div>
  );
};

export default ResearchNotes;
