import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createClient } from "@vercel/kv";
import { useAtomValue } from "jotai";
import { firstPromptAtom } from "@/app/store/atoms";

const ChatSaved = () => {
  const { user, error, isLoading } = useUser();
  const [savedChats, setSavedChats] = useState([]);
  const fistPrompt = useAtomValue(firstPromptAtom);

  // ————————————————————————————————————o get users —>
  // get the user data from KV the associated chat titles
  // 
  useEffect(() => {
    const kv = createClient({
      url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
      token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
    });

    if(user) {
      const key = `user_${user.email}`;
      const userData = kv.get(key);
      userData.then(data => {
        const chatTitles = data.chats.map(chat => chat.title);
        setSavedChats(chatTitles);
      });
    }
    // when first prompt is triggerd in chat-messages.js this useEffect
    // will fire and present that initial prompt in a refreshed savedChats
  }, [user, fistPrompt]);

  useEffect(() => {
    console.log("savedChats", savedChats);
  }, [savedChats]);

  return (
    <div className="chat__sidebar chat__saved">
      <ul>
        {savedChats.slice().reverse().map((chat, index) => (
          <li key={index}>{chat}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSaved;
