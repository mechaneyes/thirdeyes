"use client";

import Link from "next/link";
import { useAtom } from "jotai";

import { newChatAtom } from "@/app/store/atoms";
import ChatSavedEditor from "./chat-saved-editor";
import { ButtonPrimary } from "./buttons/ButtonPrimary";

export default function SidebarEditor() {
  const [newChat, setNewChat] = useAtom(newChatAtom);

  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname.split("/").pop();
  }

  return (
    <>
      <div className="chat__sidebar__inner">
        <ChatSavedEditor />
        <div className="chat__buttons">
          {pathname === "chat" ? (
            <ButtonPrimary
              onClick={() => window.location.reload()}
              name="New Chat"
              classes="btn--saved-chats"
            />
          ) : (
            <Link href="/editor">
              <ButtonPrimary
                onClick={() => setNewChat(!newChat)}
                name="New Chat"
                classes="btn--saved-chats"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
