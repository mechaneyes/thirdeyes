"use client";

import React, { useState, useEffect } from "react";

const Writing = () => {
  const [editorContent, setEditorContent] = useState("");
  const [savedContent, setSavedContent] = useState(false);

  useEffect(() => {
    // Load editorContent when the component mounts
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  useEffect(() => {
    // Save editorContent whenever it changes
    localStorage.setItem("editorContent", editorContent);
  }, [editorContent]);

  const handleContentChange = (event) => {
    setEditorContent(event.target.value);
  };

  const handleClearContent = () => {
    setEditorContent("");
  };

  const handleSaveContent = () => {
    const blob = new Blob([editorContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    // Generate timestamp
    const now = new Date();
    const date = now.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    const time = now.toLocaleTimeString("en-GB", { hour12: false }); // Format: HH:MM:SS
    const timestamp = `${date}—${time.replace(/:/g, "-")}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = `thirdeyes—${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // saved content text for feedback
    setSavedContent(true);
    setTimeout(() => {
      setSavedContent(false);
    }, 1300);
  };
  return (
    <div className="w-full h-full relative rounded-3xs bg-lightblue shadow-hieroshadow-35 border-writingborder border border-solid box-border flex flex-col items-center justify-start text-left text-3.5 text-darkslateblue font-mr-eaves-xl-san-ot">
      <div className="h-full self-stretch flex flex-col items-start justify-start p-3 gap-2">
        <div className="self-stretch flex justify-between items-center pr-10">
          <h3 className="text-xl text-darkslateblue-100 font-normal">Editor</h3>

          <div className="flex justify-end items-center">
            <div
              onClick={handleSaveContent}
              className="text-darkslateblue-100 font-normal cursor-pointer"
            >
              {!savedContent && <span>Save locally</span>}
              {savedContent && (
                <span className="text-seagreen cursor-wait">Saved!</span>
              )}
            </div>
            <b className="px-2 text-5xl leading-[0rem] text-darkslateblue-100">·</b>
            <span
              onClick={handleClearContent}
              className="text-darkslateblue-100 font-normal cursor-pointer"
            >
              Clear
            </span>
          </div>
        </div>

        <div className="h-full self-stretch flex flex-row items-start justify-start gap-4">
          <div className="editor w-full h-full pr-2 text-writingtext shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-3xs bg-white border-writingborder/70 border border-solid">
            <textarea
              value={editorContent}
              onChange={handleContentChange}
              placeholder={`Draft your bio here. \n\nDrafts are saved automatically. \nClick "Save locally" to download a copy.`}
              className="editor-inner w-full h-full overflow-auto px-4 bg-transparent resize-none focus:outline-none text-base text-darkslateblue-200"
            />
          </div>

          <div className="w-[1.5rem] overflow-hidden shrink-0 flex flex-col items-center justify-center py-[0.562rem] px-[0rem] box-border gap-[0.5rem]">
            <div
              className="w-4 relative h-4 overflow-hidden shrink-0"
              width={16}
              height={16}
              alt=""
              src="Fit-to-height.svg"
            />
            <div
              className="w-4 relative h-4 overflow-hidden shrink-0"
              width={16}
              height={16}
              alt=""
              src="Open-panel--filled--bottom.svg"
            />
            <div
              className="self-stretch relative max-w-full overflow-hidden h-[0.375rem] shrink-0"
              width={24}
              height={6}
              alt=""
              src="spacer.svg"
            />
            <div
              className="w-4 relative h-4 overflow-hidden shrink-0"
              width={16}
              height={16}
              alt=""
              src="Folder.svg"
            />
            <div
              className="w-[1.063rem] relative h-[1.063rem] overflow-hidden shrink-0"
              width={17}
              height={17}
              alt=""
              src="Save.svg"
            />
            <div
              className="w-4 relative h-4 overflow-hidden shrink-0"
              width={16}
              height={16}
              alt=""
              src="cloud--upload.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing;
