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
import { hetfieldStyleGuide } from "@/app/lib/hetfield-style-guide.js";
import { reflectionInstructions } from "@/app/lib/instructions-reflection.js";
import { ledeInstructions } from "@/app/lib/instructions-lede.js";

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

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat-model-select",
      // initialInput: inputPrepend,
      initialMessages: initialMessages,
      onFinish: async (messages) => {
        setFistPrompt(!fistPrompt);
        setReflecting(true);
        setReflectedFirst(null);

        // let reflectingPrompt = `Following is text wrapped between opening and closing """. Take that text and wrap any distinct paragraphs in HTML <p> tags. This is the text to manipulate: """ ${messages.content} """`;

        let reflectingPrompt = `Following is text wrapped between opening and closing """. 
            ${ledeInstructions} This is the text to manipulate: """ ${messages.content} """`;

        setFirstDraft(reflectingPrompt);

        const reasoned = performReasoning(reflectingPrompt);
        reasoned.then((resolvedValue) => {
          console.log("reasoned", resolvedValue.text);

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
    handleSubmit(event);
  };

  const handleSelectModel = (e) => {
    const form = e.target;
    const radioButtonValue = form.value;
    selectModel(radioButtonValue);
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
        <div className="chat__messages__selector persona__selector">
          <Accordion>
            <AccordionItem
              title="Select Model"
              open={isAccordionItemOpen}
              onHeadingClick={() =>
                handleAccordionToggle(0, isAccordionItemOpen)
              }
            >
              {/* <p className="persona__item">
                Select a persona to build a conversation with.
              </p>
              <p>
                Fine tuning is based on bios written in the style of Hetfield.
                Other examples here are for demonstration purposes.
              </p>
              <p>However, you have the ability to choose between models.</p>
              <div className="persona__item">
                <h5>Select Client</h5>
                <RadioButtonGroup
                  // legendText="Group label"
                  name="radio-button-client"
                  defaultSelected="hetfield"
                  // orientation="vertical"
                >
                  <RadioButton
                    labelText="Ulrich"
                    value="ulrich"
                    id="radio-ulrich"
                    disabled
                    className="cds--radio-button--disabled"
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
                    disabled
                    className="cds--radio-button--disabled"
                  />
                  <RadioButton
                    labelText="Burton"
                    value="burton"
                    id="radio-burton"
                    disabled
                    className="cds--radio-button--disabled"
                  />
                </RadioButtonGroup>
              </div>
              <div className="persona__item">
                <h5>Select Writer</h5>
                <RadioButtonGroup name="radio-button-writer">
                  <RadioButton
                    labelText="Philip Sherburne"
                    value="psherburne"
                    id="radio-psherburne"
                    disabled
                    className="cds--radio-button--disabled"
                  />
                  <RadioButton
                    labelText="Mosi Reeves"
                    value="mreeves"
                    id="radio-mreeves"
                    disabled
                    className="cds--radio-button--disabled"
                  />
                </RadioButtonGroup>
              </div> */}
              <div className="persona__item">
                <h5>Select Model to Evaluate</h5>
                <RadioButtonGroup
                  name="radio-button-model"
                  defaultSelected="ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"
                  onChange={(e) => selectModel(e)}
                >
                  <RadioButton
                    labelText="Hetfield Fine-Tuned 240324v2"
                    value="ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"
                    id="radio-het001-240324v2"
                  />
                  <RadioButton
                    labelText="Hetfield Fine-Tuned 240808a"
                    value="ft:gpt-4o-mini-2024-07-18:thirdeyes:het200-240808a:9u1gjMnP"
                    id="radio-het001-240808a"
                  />
                  <RadioButton
                    labelText="GPT-3.5 Turbo"
                    value="gpt-3.5-turbo-0125"
                    id="radio-gpt-3.5-turbo"
                  />
                  <RadioButton
                    labelText="GPT-4o"
                    value="gpt-4o"
                    id="radio-gpt-4-turbo"
                  />
                </RadioButtonGroup>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

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
