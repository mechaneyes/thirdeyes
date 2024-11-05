"use client";

import React, { useState, useEffect } from "react";

const Editor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

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
    const a = document.createElement("a");
    a.href = url;
    a.download = "editorContent.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show tooltip
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000); // Hide tooltip after 2 seconds
  };

  return (
    <div className="editor w-full pr-2 text-writingtext shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-3xs bg-white border-writingborder border border-solid">
      <div className="flex justify-between items-center p-2">
        <span
          onClick={handleClearContent}
          className="pr-2 text-darkslateblue-300 cursor-pointer"
        >
          Clear
        </span>
        <span
          onClick={handleSaveContent}
          className="pr-2 text-darkslateblue-300 cursor-pointer relative"
        >
          Save
          {showTooltip && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 px-2 py-1 bg-black text-white text-xs rounded">
              Saved!
            </div>
          )}
        </span>
      </div>
      <textarea
        value={editorContent}
        onChange={handleContentChange}
        placeholder={`Draft your bio here. \nDrafts are saved automatically.`}
        className="editor-inner w-full h-80 overflow-auto mb-8 px-6 bg-transparent resize-none focus:outline-none text-darkslateblue-200"
      />
    </div>
  );
};

export default Editor;
