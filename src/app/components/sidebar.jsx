import Link from "next/link";
import { Column } from "@carbon/react";

import ChatSaved from "./chat-saved";
import { ButtonPrimary } from "./buttons/ButtonPrimary";

export default function Sidebar() {
  const pathname = window.location.pathname.split("/").pop();

  return (
    <Column max={6} xlg={6} lg={6} md={3} sm={4} className="chat__sidebar">
      <div className="chat__sidebar__inner">
        <ChatSaved />
      </div>

      <div className="chat__buttons">
        {pathname === "chat" ? (
          <ButtonPrimary
            onClick={() => window.location.reload()}
            name="New Chat"
            classes="btn--saved-chats"
          />
        ) : (
          <Link href="/chat">
            <ButtonPrimary name="New Chat" classes="btn--saved-chats" />
          </Link>
        )}
      </div>
    </Column>
  );
}
