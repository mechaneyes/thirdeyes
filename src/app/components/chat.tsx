"use client";

import React, { use } from 'react'
import { useEffect, useState, useRef } from "react";
import { Grid, Column } from "@carbon/react";

import { useAtom } from "jotai";
import { firstPromptAtom } from "../store/atoms";
import Header from "./Header";
import ChatSaved from "./chat-saved";
import ChatSettings from "./chat-settings";
import Messages from "./chat-messages";
import GoogleSearch from "./modules/GoogleSearch";
import { ButtonPrimary } from "./buttons/ButtonPrimary";
import { ButtonChatOptions } from "./buttons/ButtonChatOptions";

export default function Chat() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHeightEqual, setIsHeightEqual] = useState(false);
  const [savedChatVisible, setSavedChatVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(true);
  const [fistPrompt, setFistPrompt] = useAtom(firstPromptAtom);

  const chatMessagesRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // setFistPrompt(false);
  }, []);

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

  return (
    <>
      <Header />
      <Grid className="thirdeyes chat">
        {/* // ————————————————————————————————————o————————————————————————————————————o sidebar -->
            // ————————————————————————————————————o sidebar —>
        //  */}
        <Column max={6} xlg={6} lg={6} md={3} sm={4} className="chat__sidebar">
          <div
            className={`chat__sidebar__inner ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth < 672
                ? "chat__sidebar__inner--portrait"
                : ""
            } ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth >= 672
                ? "chat__sidebar__inner--landscape"
                : ""
            }`}
          >
            {settingsVisible && (
              // <ChatSettings onClick={() => setSettingsVisible(false)} />
              // <GoogleSearch
              //   key={new Date().getTime()}
              //   query="what is house music?"
              //   index={0}
              // />
              <ChatSaved />
            )}
          </div>

          <div className="chat__buttons">
            {/* <ButtonPrimary
              onClick={() => {
                setSettingsVisible(false);
                setSavedChatVisible(true);
              }}
              name="Saved Chats"
              classes={`btn--saved-chats ${
                savedChatVisible ? "btn--disabled" : ""
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

        {/* // ————————————————————————————————————o————————————————————————————————————o chat -->
            // ————————————————————————————————————o chat —>
        //  */}
        <Column max={10} xlg={10} lg={10} md={5} sm={4} className="chat__panel">
          <Messages
            chatMessagesRef={chatMessagesRef}
            isHeightEqual={isHeightEqual}
          />
        </Column>
      </Grid>
    </>
  );
}
