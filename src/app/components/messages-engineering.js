"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "ai/react";
import {
  Accordion,
  AccordionItem,
  RadioButton,
  RadioButtonGroup,
} from "carbon-components-react";
import { Copy, Upload } from "@carbon/icons-react";
import ReactHtmlParser from "react-html-parser";
import { signalRefresh, selectModel } from "@/app/lib/api-actions";

const MessagesEditor = ({ chatMessagesRef, isHeightEqual }) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [isAccordionItemOpen, setIsAccordionItemOpen] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [searches, setSearches] = useState([]);

  const anchorRef = useRef(null);
  const chatPanelRef = useRef(null);
  const inputRef = useRef(null);

  let index = 0;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-engineering",
    initialMessages: initialMessages,
  });

  const handleQuery = (event) => {
    event.preventDefault();
    setMessageExists(true);
    handleSubmit(event);
  };

  useEffect(() => {
    // focus on input when page loads
    //
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isHeightEqual === true && anchorRef.current) {
      anchorRef.current.scrollIntoView({ block: "end" });
    }
  }, [isHeightEqual]);

  return (
    <div className="chat__panel__inner" ref={chatPanelRef}>
      <div
        ref={chatMessagesRef}
        className="chat__messages chat__messages--model-select chat__messages--persona-select"
      >
        <div className="chat__intro">
          <p>
            The input field simply requires the artist name. Thirdeyes will
            prepend &quot;Write a bio for&quot; to the artist name before
            submitting the prompt.
          </p>
        </div>

        {messages.map((message, count) => {
          if (message.id === `search_placeholder-${index}`) {
            index++;
            return searches[index];
          } else {
            return (
              <div
                key={count}
                className={`chat__messages__message ${
                  message.role === "user"
                    ? "chat__messages__message--user "
                    : "chat__messages__message--ai"
                }`}
              >
                {message.role === "user"
                  ? `Write a bio for ${message.content}`
                  : ReactHtmlParser(message.content)}
                {message.role === "assistant" && (
                  <Copy
                    size="20"
                    className="chat__messages__copy"
                    onClick={() =>
                      navigator.clipboard.writeText(`"""${message.content}"""`)
                    }
                  />
                )}
              </div>
            );
          }
        })}

        <div ref={anchorRef} className="chat__messages__anchor"></div>
      </div>

      <div className="chat__form">
        <form
          className="chat__form__form"
          onSubmit={(event) => {
            handleQuery(event);
          }}
        >
          <label>
            <input
              ref={inputRef}
              className="chat__form__input"
              value={input}
              placeholder="Write a bio for"
              onChange={handleInputChange}
            />
            <button type="submit">
              <Upload size={24} className="chat__form__send-icon" />
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default MessagesEditor;
