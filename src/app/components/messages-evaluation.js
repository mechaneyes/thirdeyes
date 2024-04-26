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
import { Upload } from "@carbon/icons-react";
import { useAtom, useAtomValue } from "jotai";

import {
  firstPromptAtom,
  newChatAtom,
  queryAtom,
  selectedChatAtom,
  userDataAtom,
} from "@/app/store/atoms";
import GoogleSearch from "@/app/components/modules/GoogleSearch";
import { signalRefresh, selectModel } from "@/app/lib/api-actions";

const MessagesEditor = ({ chatMessagesRef, isHeightEqual }) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [injectSearch, setInjectSearch] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [query, setQuery] = useAtom(queryAtom);
  const [searches, setSearches] = useState([]);
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);
  const newChat = useAtomValue(newChatAtom);
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
      api: "/api/chat-model-select",
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

  const handleSelectModel = (e) => {
    const form = e.target;
    selectModel(form.value);
  };

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
        <div className="chat__messages__selector persona__selector">
          <Accordion>
            <AccordionItem title="Build Persona">
              <p className="persona__item">
                Select a persona to build a conversation with.
              </p>{" "}
              <p>
                As of today, fine tuning is based on Philip Sherburne&apos;s
                writing style applied to Hetfield. Other examples here are for
                demonstration purposes.
              </p>
              <p>However, you have the ability to customize the models.</p>
              <div className="persona__item">
                <h5>Select a Client</h5>
                <RadioButtonGroup
                  // legendText="Group label"
                  name="radio-button-client"
                  defaultSelected="hetfield"
                >
                  <RadioButton
                    labelText="Ulrich"
                    value="ulrich"
                    id="radio-ulrich"
                  />
                  <RadioButton
                    labelText="Hetfield"
                    value="hetfield"
                    id="radio-hetfield"
                  />
                  <RadioButton
                    labelText="Hammett"
                    value="hammett"
                    id="radio-hammett"
                  />
                  <RadioButton
                    labelText="Burton"
                    value="burton"
                    id="radio-burton"
                  />
                </RadioButtonGroup>
              </div>
              <div className="persona__item">
                <h5>Select a Writer</h5>
                <RadioButtonGroup
                  name="radio-button-writer"
                  defaultSelected="psherburne"
                >
                  <RadioButton
                    labelText="Philip Sherburne"
                    value="psherburne"
                    id="radio-psherburne"
                  />
                  <RadioButton
                    labelText="Mosi Reeves"
                    value="mreeves"
                    id="radio-mreeves"
                  />
                </RadioButtonGroup>
              </div>
              <div className="persona__item">
                <h5>Select a Model</h5>
                <RadioButtonGroup
                  name="radio-button-model"
                  defaultSelected="ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"
                  // orientation="vertical"
                >
                  <RadioButton
                    labelText="Hetfield Fine-Tuned"
                    value="ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"
                    id="radio-het001-240324v2"
                  />
                  <RadioButton
                    labelText="GPT-3.5 Turbo"
                    value="gpt-3.5-turbo-0125"
                    id="radio-gpt-3.5-turbo"
                  />
                  <RadioButton
                    labelText="GPT-4 Turbo"
                    value="gpt-4-turbo"
                    id="radio-gpt-4-turbo"
                  />
                </RadioButtonGroup>
              </div>
            </AccordionItem>
          </Accordion>
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
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></div>
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
      <Image
        src="/images/hero--whirli-hero.png"
        alt="login"
        // fill={true}
        style={{ objectFit: "cover" }}
        width={800}
        height={800}
        className={
          !messageExists ? "login-image" : "login-image login-image--fade-out"
        }
        priority={true}
      />
    </div>
  );
};

export default MessagesEditor;
