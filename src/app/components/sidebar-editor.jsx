"use client";

import Link from "next/link";

import ChatSaved from "./chat-saved";
import { ButtonPrimary } from "./buttons/ButtonPrimary";

export default function SidebarEditor() {
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname.split("/").pop();
  }

  return (
    <>
      <div className="chat__sidebar__inner">
        <ChatSaved />
        <div className="chat__buttons">
          {pathname === "chat" ? (
            <ButtonPrimary
              onClick={() => window.location.reload()}
              name="New Chat"
              classes="btn--saved-chats"
            />
          ) : (
            <Link href="/editor">
              <ButtonPrimary name="New Chat" classes="btn--saved-chats" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
