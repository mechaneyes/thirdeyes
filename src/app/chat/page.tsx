"use client";

import Image from "next/image";
import Link from "next/link";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";
import { useEffect, useState, useRef } from "react";

export default function Chat() {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [isHeightEqual, setIsHeightEqual] = useState(false);

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
          totalMessagesHeight > chatMessagesRef.current.offsetHeight
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
    <main className="chat">
      <section className="chat__hero">
      <Link href="/">
        <h1>Thirdeyes</h1>
      </Link>
        <div
          className={`chat__hero__image ${
            imageLoaded && aspectRatio < 1.3
              ? "chat__hero__image--portrait"
              : ""
          } ${
            imageLoaded && aspectRatio > 1.3
              ? "chat__hero__image--landscape"
              : ""
          }`}
        >
          {aspectRatio < 1.3 ? (
            <Image
              src="/images/hero--steve-johnson-portrait.jpg"
              alt="Generative Illustration by Steve Johnson on Unsplash"
              width={720}
              height={1080}
              layout="responsive"
              priority={true}
            />
          ) : (
            <Image
              src="/images/hero--steve-johnson-landscape.jpg"
              alt="Generative Illustration by Steve Johnson on Unsplash"
              width={900}
              height={600}
              layout="responsive"
              priority={true}
            />
          )}
        </div>
      </section>
      <section ref={chatPanelRef} className="chat__panel">
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
              Type something, you fithy animal.
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
      </section>
    </main>
  );
}
