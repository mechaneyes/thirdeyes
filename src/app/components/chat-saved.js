import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createClient } from "@vercel/kv";
import { useSetAtom, useAtomValue } from "jotai";
import { firstPromptAtom } from "@/app/store/atoms";
import { userDataAtom } from "@/app/store/atoms";

const ChatSaved = () => {
  const { user } = useUser();
  const [savedChats, setSavedChats] = useState([]);
  const fistPrompt = useAtomValue(firstPromptAtom);
  const setUserData = useSetAtom(userDataAtom);

  // ————————————————————————————————————o get users —>
  // get the user data from KV the associated chat titles
  //
  useEffect(() => {
    const kv = createClient({
      url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
      token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
    });

    if (user) {
      const key = `user_${user.email}`;
      const userData = kv.get(key);

      userData.then((data) => {
        if (Array.isArray(data.chats)) {
          setSavedChats(data.chats);
          setUserData(data);

          console.log("data.chats", data.chats);
        }
      });
    }
    // when first prompt is triggerd in chat-messages.js this useEffect
    // will fire and present that initial prompt in a refreshed savedChats
  }, [user, fistPrompt]);

  return (
    <div className="chat__sidebar chat__saved">
      <ul>
        {savedChats
          .slice()
          .reverse()
          .map((chat, index) => (
            <li key={index}>
              {chat.path === window.location.pathname ? (
                chat.title
              ) : (
                <Link href={chat.path}>{chat.title}</Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatSaved;
