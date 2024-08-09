"use client";

import { useEffect, useState, useRef } from "react";
import MessagesEngineering from "./messages-engineering";
import ChatLogin from "./chat-login";

export default function Chat() {
  const [isHeightEqual, setIsHeightEqual] = useState(false);
  const chatMessagesRef = useRef(null);

  const isLoggedIn = true

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
      {!isLoggedIn && <ChatLogin />}
      <MessagesEngineering
        chatMessagesRef={chatMessagesRef}
        isHeightEqual={isHeightEqual}
      />
    </>
  );
}
