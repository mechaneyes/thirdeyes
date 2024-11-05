import { useState } from "react";

const ResearchNotes = ({ text }) => {
  const [scratchpadContent, setScratchpadContent] =
    useState(`Start writing here.`);

  const handleContentChange = (event) => {
    setScratchpadContent(event.target.value);
  };

  return (
    <div className="notes self-stretch flex-1 flex flex-col items-center justify-start pt-[0rem] px-4 pb-6 gap-6 z-[0]">
      <div className="self-stretch flex-1 shadow-hieroshadow-25 rounded-3xs bg-gray border-researchpurple/65 border border-solid overflow-hidden flex flex-col items-start justify-start p-4 gap-[0.75rem]">
        <h3 className="relative text-darkslateblue-300 font-extrabold">
          Your Scratchpad
        </h3>
        <textarea
          value={scratchpadContent}
          onChange={handleContentChange}
          className="scratchpad w-full h-full mb-8 p-4 bg-transparent border rounded-3xs border-darkslateblue-400/60 shadow-hieroshadow-15 resize-none focus:outline-none  text-darkslateblue-200"
        />
      </div>
    </div>
  );
};

export default ResearchNotes;
