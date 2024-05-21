"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";
import { useAtom, useAtomValue } from "jotai";
import { RingLoader } from "react-spinners";

import {
  firstPromptAtom,
  newChatAtom,
  queryAtom,
  reflectedFirstAtom,
  reflectionAtom,
  selectedChatAtom,
  userDataAtom,
} from "@/app/store/atoms";
import GoogleSearch from "@/app/components/modules/GoogleSearch";
import { signalRefresh } from "@/app/lib/api-actions";

const MessagesEditor = ({ chatMessagesRef, isHeightEqual }) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [injectSearch, setInjectSearch] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [query, setQuery] = useAtom(queryAtom);
  const [searches, setSearches] = useState([]);
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);
  const newChat = useAtomValue(newChatAtom);
  const reflectedFirst = useAtomValue(reflectedFirstAtom);
  const reflecting = useAtomValue(reflectionAtom);
  const selectedChat = useAtomValue(selectedChatAtom);
  const userData = useAtomValue(userDataAtom);

  const anchorRef = useRef(null);
  const chatPanelRef = useRef(null);
  const inputRef = useRef(null);
  const chatIdRef = useRef(null);

  let index = 0;

  // initialMessages ... loop through userData.chats + match
  // id with selectedChat (clicked on in sidebar). set initialMessages
  // to that chat's messages
  //
  useEffect(() => {
    if (userData) {
      const chat = userData.chats.find((chat) => chat.id === selectedChat);
      chat ? setInitialMessages(chat.messages) : [];
    }
  }, [newChat, selectedChat, userData]);

  useEffect(() => {
    setInitialMessages([]);

    // Signal refresh to api. Allows app to reset chatIdRef.current
    // and create a new object in the chats array
    //
    signalRefresh(chatIdRef.current);
  }, [newChat]);

  useEffect(() => {
    // focus on input when page loads
    //
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat-reflection",
      initialMessages: initialMessages,
      onFinish: async (messages) => {
        setFistPrompt(!fistPrompt);
      },
    });

  const handleQuery = (event) => {
    event.preventDefault();
    setQuery(input);
    setMessageExists(true);
  };

  useEffect(() => {
    if (isHeightEqual === true && anchorRef.current) {
      anchorRef.current.scrollIntoView({ block: "end" });
    }
  }, [isHeightEqual]);

  useEffect(() => {
    reflectedFirst !== null && setMessageExists(true);
  }, [reflectedFirst]);

  return (
    <div className="chat__panel__inner" ref={chatPanelRef}>
      <div ref={chatMessagesRef} className="chat__messages">
        {reflecting && reflectedFirst === null ? (
          <div className="reflecting-progress">
            <RingLoader color="#75beff" />
          </div>
        ) : reflectedFirst !== null ? (
          <>
            <div className="reflecting-intro">
              <p>
                GPT-4o has performed a reflection step in order to bring the
                fine-tuned model&apos;s output into alignment with the Hetfield
                style guide. This is the result:
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: reflectedFirst }} />
          </>
        ) : (
          <div className="chat__messages__intro">
            <div className="research">
              <p>LLM reflection action takes place here.</p>
              <p>
                With this pattern, we leverage GPT-4o to build upon the original
                model&apos;s output.
              </p>
            </div>
          </div>
        )}

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
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></div>
            );
          }
        })}

        <div ref={anchorRef} className="chat__messages__anchor"></div>
      </div>

      {/* <div className="chat__form">
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
      </div> */}
      <Image
        src="/images/hero--whirli-hero.png"
        alt="login"
        // fill={true}
        style={{ objectFit: "cover" }}
        width={800}
        height={800}
        className={
          !messageExists || reflecting ? "login-image" : "login-image login-image--fade-out"
        }
        priority={true}
      />
    </div>
  );
};

export default MessagesEditor;
