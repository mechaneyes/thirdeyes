"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";
import { useAtom, useAtomValue } from "jotai";

import {
  firstPromptAtom,
  selectedChatAtom,
  userDataAtom,
} from "@/app/store/atoms";
import GoogleSearch from "@/app/components/modules/GoogleSearch";
import { signalRefresh } from "@/app/lib/api-actions";

const MessagesEditor = ({ chatMessagesRef, isHeightEqual }) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [query, setQuery] = useState(null);
  const [searches, setSearches] = useState([]);
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);
  const selectedChat = useAtomValue(selectedChatAtom);
  const userData = useAtomValue(userDataAtom);

  const anchorRef = useRef(null);
  const chatPanelRef = useRef(null);
  const inputRef = useRef(null);
  const chatIdRef = useRef(null);

  let index = 1;

  useEffect(() => {
    // loop through userData.chats + match id with selectedChat (clicked on in sidebar).
    // set initialMessages to that chat's messages
    //
    if (userData) {
      const chat = userData.chats.find((chat) => chat.id === selectedChat);
      chat ? setInitialMessages(chat.messages) : [];
    }
  }, [userData, selectedChat]);

  useEffect(() => {
    // Signal refresh to api. Run on page refresh. Allows app to
    // reset chatIdRef.current and create a new object in the chats array
    //
    signalRefresh(chatIdRef.current);

    // focus on input when page loads
    //
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: initialMessages,
      onFinish: (messages) => {
        // adding placeholder to be filled by search module
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: "search_placeholder",
            id: `search_placeholder-${index}`,
          },
        ]);
        setFistPrompt(!fistPrompt);
      },
    });

  const handleQuery = (event) => {
    event.preventDefault();
    setQuery(input);
  };

  useEffect(() => {
    setSearches((prevSearches) => [
      ...prevSearches,
      <GoogleSearch
        key={new Date().getTime()}
        query={query}
        // prevSearches.length + 2 === index in search array. It's
        // handled this way to stay in line with the index of the place
        // holder. Hacky due to problematic incrementing component-wide
        index={prevSearches.length + 2}
      />,
    ]);
  }, [query]);

  useEffect(() => {
    if (isHeightEqual === true && anchorRef.current) {
      anchorRef.current.scrollIntoView({ block: "end" });
    }
  }, [isHeightEqual]);

  return (
    <div className="chat__panel__inner" ref={chatPanelRef}>
      <div ref={chatMessagesRef} className="chat__messages">
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

export default MessagesEditor;
