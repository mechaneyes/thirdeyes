"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";

import Header from "../_components/header";
import ChatSaved from "./_chat-saved";
import ChatSettings from "./_chat-settings";

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

  // Focus on input when page loads
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

    // Then call it every time the window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <main className="chat thirdeyes cds--grid">
        <div className="chat__header cds--row">
          <div className="chat__header__inner cds--col-sm-2 cds--col-md-16 cds--col-lg-16 cds--col-xlg-16 cds--col-max-16">
            <Header />
          </div>
        </div>
        <div className="chat__container cds--row">
          <section className="chat__hero cds--col-sm-2 cds--col-md-3 cds--col-lg-6 cds--col-xlg-6 cds--col-max-6">
            <div
              className="chat__hero__image chat__hero__image--portrait"
              // "chat__hero__image--landscape"
            >
              {savedChatVisible ? (
                <ChatSaved />
              ) : settingsVisible ? (
                <ChatSettings />
              ) : (
                <Image
                  src="/images/hero--steve-johnson-portrait.jpg"
                  alt="Generative Illustration by Steve Johnson on Unsplash"
                  width={720}
                  height={1080}
                  priority={true}
                />
              )}
              {(savedChatVisible || settingsVisible) && (
                <button
                  onClick={() => {
                    setSavedChatVisible(false);
                    setSettingsVisible(false);
                  }}
                  type="button"
                  className="btn btn--outline-primary btn--chat-hero-close"
                >
                  Close
                </button>
              )}
            </div>
            <div className="chat__buttons">
              <button
                onClick={() => {
                  setSavedChatVisible(true);
                  setSettingsVisible(false);
                }}
                type="button"
                className="btn btn--outline-primary btn--saved-chats"
              >
                Saved Chat
              </button>
              <button
                onClick={() => {
                  setSettingsVisible(true);
                  setSavedChatVisible(false);
                }}
                type="button"
                className="btn btn--outline-primary btn--saved-chats"
              >
                Settings
              </button>
            </div>
          </section>
          <section ref={chatPanelRef} className="chat__panel cds--col-sm-2 cds--col-md-5 cds--col-lg-10 cds--col-xlg-10 cds--col-max-10">
            <div className="chat__panel__inner">
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
                    The quick brown fox jumps over the lazy dog
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
          </section>
        </div>
      </main>
    </>
  );
}
