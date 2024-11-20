"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";
import ReactHtmlParser from "react-html-parser";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  firstPromptAtom,
  newChatAtom,
  queryAtom,
  reflectedFirstAtom,
  reflectionAtom,
  reflectionOriginalPromptAtom,
  selectedChatAtom,
  userDataAtom,
} from "@/app/store/atoms";
import GoogleSearch from "@/app/components/modules/GoogleSearch";
import { signalRefresh, selectModel } from "@/app/lib/api-actions";
import { performReasoning, getMarkdownContent } from "@/app/lib/chat-actions";
import { ledeCandidate } from "@/app/lib/instructions-lede-candidate-1.js";
// import WikipediaSearch from "./components/WikipediaSearch";

// const fs = require("fs").promises;

const MessagesEditor = ({ chatMessagesRef, isHeightEqual }) => {
  const [firstDraft, setFirstDraft] = useState("");
  const [initialMessages, setInitialMessages] = useState([]);
  const [injectSearch, setInjectSearch] = useState(false);
  const [inputPrepend, setInputPrepend] = useState("Write a bio for ");
  const [isAccordionItemOpen, setIsAccordionItemOpen] = useState(false);
  const [messageExists, setMessageExists] = useState(false);

  const [query, setQuery] = useAtom(queryAtom);
  const [searches, setSearches] = useState([]);
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);
  const newChat = useAtomValue(newChatAtom);
  const [reflectedFirst, setReflectedFirst] = useAtom(reflectedFirstAtom);
  const [reflecting, setReflecting] = useAtom(reflectionAtom);
  const setReflectionOriginalPrompt = useSetAtom(reflectionOriginalPromptAtom);
  const selectedChat = useAtomValue(selectedChatAtom);
  const userData = useAtomValue(userDataAtom);

  const anchorRef = useRef(null);
  const chatPanelRef = useRef(null);
  const inputRef = useRef(null);
  const chatIdRef = useRef(null);

  let index = 0;

  // const { setInput, append } = useChat({
  //   api: "/api/chat-research",
  //   messages: firstDraft,
  // });

  const WikipediaSearch = async (query) => {
    const response = await fetch("/api/wikipedia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data;
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-model-select",
    initialMessages: initialMessages,
    onFinish: async (messages) => {
      setFistPrompt(!fistPrompt);
      setReflecting(true);
      setReflectedFirst(null);

      const fromWikipedia = await WikipediaSearch(input);
      console.log("From Wikipedia", fromWikipedia);

      let reflectingPrompt = `To follow will be instructions for which you should consider this context: 
      ${fromWikipedia}.  ${ledeCandidate} """ ${messages.content} """`;

      setFirstDraft(reflectingPrompt);

      const reasoned = performReasoning(reflectingPrompt);
      reasoned.then((resolvedValue) => {
        // console.log("reasoned", resolvedValue.text);

        let strippedText = resolvedValue.text;
        const index = resolvedValue.text.indexOf("```html");
        if (index !== -1) {
          strippedText = resolvedValue.text.substring(index + 7);
        }
        strippedText = strippedText.replace(/```/g, "");
        setReflectedFirst(strippedText);

        setReflecting(false);
      });
    },
  });

  const handleQuery = (event) => {
    event.preventDefault();

    setQuery(input);
    setReflectionOriginalPrompt(`Write a bio for ${input}`);
    setMessageExists(true);
    setReflecting(false);
    setIsAccordionItemOpen(false);
    // handleSubmit(event);
  };

  const handleAccordionToggle = (index, isOpen) => {
    // Assuming you want to close the AccordionItem, set the state to false
    setIsAccordionItemOpen(!isOpen);
  };

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

  // injectSearch is used to trigger the creation of a new GoogleSearch
  // component. It's triggered by the onFinish function in useChat
  //
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
  }, [injectSearch]);

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
            setIsAccordionItemOpen(false);
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
