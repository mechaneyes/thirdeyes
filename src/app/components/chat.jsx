"use client";

import { useEffect, useState, useRef } from "react";
import { Grid, Column } from "@carbon/react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/app/store/atoms";
import Header from "./Header";
import Sidebar from "./sidebar";
import Messages from "./chat-messages";
import ChatLogin from "./chat-login";

export default function Chat() {
  const [isHeightEqual, setIsHeightEqual] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const chatMessagesRef = useRef(null);

  const { user } = useUser();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, [user]);

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
        );

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
        <Sidebar />
        
        <Column max={10} xlg={10} lg={10} md={5} sm={4} className="chat__panel">
          {!isLoggedIn ? (
            <ChatLogin />
          ) : (
            <Messages
              chatMessagesRef={chatMessagesRef}
              isHeightEqual={isHeightEqual}
            />
          )}
        </Column>
      </Grid>
    </>
  );
}
