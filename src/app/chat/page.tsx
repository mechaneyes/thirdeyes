"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { useChat } from "ai/react";
import { Grid, Column } from "@carbon/react";
import { Upload } from "@carbon/icons-react";

import Header from "@/app/components/Header";
import ChatSaved from "./_chat-saved";
import ChatSettings from "./_chat-settings";
import { ButtonPrimary } from "@app/components/buttons/ButtonPrimary";
import { ButtonChatOptions } from "@app/components/buttons/ButtonChatOptions";

export default function Chat() {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [isHeightEqual, setIsHeightEqual] = useState(false);
  const [savedChatVisible, setSavedChatVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    // MutationObserver run when DOM changes are made
    const mutationObserver = new MutationObserver(() => {
      if (chatMessagesRef.current) {
        // Get all elements within chatMessagesRef.current
        // Convert the HTMLCollection to an array of HTMLDivElement
        const messages = Array.from(
          chatMessagesRef.current.getElementsByClassName(
            "chat__messages__message"
          )
        ) as HTMLDivElement[];

        // Calculate total height of messages
        const totalMessagesHeight = messages.reduce(
          (total, message) => total + message.offsetHeight,
          0
        );

        setIsHeightEqual(
          totalMessagesHeight > chatMessagesRef.current.offsetHeight - 76
        );
      }
    });

    // Start observing chatMessagesRef with the MutationObserver.
    // Observer will react to changes in the text content of
    // chatMessagesRef.current and its descendants
    //
    if (chatMessagesRef.current) {
      mutationObserver.observe(chatMessagesRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // cleanup function stopping observing any changes
    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHeightEqual === true && anchorRef.current) {
      setMessageExists(true);
      anchorRef.current.scrollIntoView({ block: "end" });
    }
  }, [isHeightEqual]);

  // focus on input when page loads
  //
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
      setImageLoaded(true);
    };

    // Call once initially
    handleResize();

    // call every time window is resized
    window.addEventListener("resize", handleResize);

    // clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <Header />
      <Grid className="thirdeyes chat">
        <Column max={6} xlg={6} lg={6} md={3} sm={4} className="chat__hero">
          <div
            className={`chat__hero__image ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth < 672
                ? "chat__hero__image--portrait"
                : ""
            } ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth >= 672
                ? "chat__hero__image--landscape"
                : ""
            }`}
          >
            {savedChatVisible ? (
              <ChatSaved />
            ) : settingsVisible ? (
              <ChatSettings />
            ) : (
              <Image
                src="/images/hero--whirli-hero.png"
                alt='The character, "m" from the Whirligig font by Zuzana Liko for Emigre'
                width={1080}
                height={1080}
                priority={true}
              />
            )}
            {(savedChatVisible || settingsVisible) && (
              <ButtonPrimary
                onClick={() => {
                  setSavedChatVisible(false);
                  setSettingsVisible(false);
                }}
                name="Close"
                classes="btn--chat-hero-close"
              />
            )}
          </div>

          <div className="chat__buttons">
            <ButtonPrimary
              onClick={() => {
                setSettingsVisible(false);
                setSavedChatVisible(true);
              }}
              name="Saved Chats"
              classes={`btn--saved-chats ${
                savedChatVisible ? "btn--disabled" : ""
              }`}
            />
            {/* <ButtonPrimary
              onClick={() => {
                setSettingsVisible(true);
                setSavedChatVisible(false);
              }}
              name="Settings"
              classes={`btn--saved-chats ${
                settingsVisible ? "btn--disabled" : ""
              }`}
            /> */}
            <ButtonChatOptions
              classes={`btn--chat-options ${
                settingsVisible ? "btn--disabled" : ""
              }`}
              onClick={() => {
                setSettingsVisible(true);
                setSavedChatVisible(false);
              }}
            />
          </div>
        </Column>

        <Column max={10} xlg={10} lg={10} md={5} sm={4} className="chat__panel">
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
                    Thirdeyes expects a prompt in the following format:<br /><br />
                    <div className="italic">Give me a bio for the artist, Erol Alkan, in the style of &apos;hetfield_phils&apos;.</div>
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
              <form className="chat__form__form" onSubmit={handleSubmit}>
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
        </Column>
      </Grid>
    </>
  );
}
