"use client";

import React, { useState, useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { Upload } from "@carbon/icons-react";
import { useChat } from "ai/react";

import { queryAtom } from "@/app/store/atoms";
import GoogleSearch from "@app/components/modules/GoogleSearch";

const Messages = ({ chatMessagesRef, isHeightEqual }) => {
  const [query, setQuery] = useState(null);
  const [messageExists, setMessageExists] = useState(false);

  const inputRef = useRef(null);
  const chatPanelRef = useRef(null);
  const anchorRef = useRef(null);

  const [searches, setSearches] = useState([]);

  let index = 1;

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      messages: [],
      onFinish: (messages) => {
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: "search_placeholder",
            id: `search_placeholder-${index}`,
          },
        ]);
      },
    });

  const handleQuery = (event) => {
    event.preventDefault();
    setQuery(input);
    setMessageExists(true);
  };

  useEffect(() => {
    setSearches((prevSearches) => [
      ...prevSearches,
      <GoogleSearch
        key={new Date().getTime()}
        query={query}
        // prevSearches.length + 2 is the index of the search. It's handled this way
        // to stay in line with the index of the messages. Incrementing index was problematic
        index={prevSearches.length + 2}
      />,
    ]);
  }, [query]);

  // focus on input when page loads
  //
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isHeightEqual === true && anchorRef.current) {
      setMessageExists(true);
      anchorRef.current.scrollIntoView({ block: "end" });
    }
  }, [isHeightEqual]);

  return (
    <div className="chat__panel__inner" ref={chatPanelRef}>
      <div
        ref={chatMessagesRef}
        className={`${
          messageExists
            ? "chat__messages"
            : "chat__messages chat__messages--hidden"
        }`}
      >
        {!messageExists && (
          <div className="chat__messages__intro">
            Thirdeyes expects a prompt in the following format:
            <br />
            <br />
            <div className="italic">
              Give me a bio for the artist, Erol Alkan, in the style of
              &apos;hetfield_phils&apos;.
            </div>
          </div>
        )}

        {messages.map((message) => {
          if (message.id === `search_placeholder-${index}`) {
            index++;
            return searches[index];
          } else {
            return (
              <div
                key={message.id}
                className={`chat__messages__message ${
                  message.role === "user"
                    ? "chat__messages__message--user "
                    : "chat__messages__message--ai"
                }`}
              >
                {message.content}
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
            handleSubmit(event);
            handleQuery(event);
          }}
        >
          <label>
            <input
              ref={inputRef}
              className="chat__form__input"
              value={input}
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

export default Messages;
