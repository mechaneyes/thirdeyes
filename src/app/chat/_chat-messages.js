"use client";

import { useState, useEffect, useRef } from "react";

import { useSetAtom } from "jotai";
import { Upload } from "@carbon/icons-react";
import { useChat } from "ai/react";

import { queryAtom } from "@/app/store/atoms";

const Messages = ({ chatMessagesRef, isHeightEqual }) => {
  const setQuery = useSetAtom(queryAtom);

  const [messageExists, setMessageExists] = useState(false);

  const inputRef = useRef(null);
  const chatPanelRef = useRef(null);
  const anchorRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleQuery = (event) => {
    event.preventDefault();
    setQuery(input);
  };

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
            {/* Caught in a trap &middot; No turnin&apos; back &middot; We&apos;re lost in music<br /> */}
            Thirdeyes expects a prompt in the following format:
            <br />
            <br />
            <div className="italic">
              Give me a bio for the artist, Erol Alkan, in the style of
              &apos;hetfield_phils&apos;.
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat__messages__message ${
              m.role === "user"
                ? "chat__messages__message--user "
                : "chat__messages__message--ai"
            }`}
          >
            {m.content}
          </div>
        ))}

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
