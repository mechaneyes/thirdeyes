"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload } from "@carbon/icons-react";
import { useAtom } from "jotai";
import { firstPromptAtom } from "@/app/store/atoms";

const ChatInput = ({ passInputValue, passSubmit, passQuery, passInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);
  const inputRef = useRef(null);
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
    passInputValue(event.target.value);
  };

  // focus on input when page loads
  //
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="chat__form">
      <form
        className="chat__form__form"
        onSubmit={(event) => {
          passSubmit(event);
          passQuery(event);
        }}
      >
        <label>
          <input
            ref={inputRef}
            className="chat__form__input"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit">
            <Upload size={24} className="chat__form__send-icon" />
          </button>
        </label>
      </form>
    </div>
  );
};

export default ChatInput;
