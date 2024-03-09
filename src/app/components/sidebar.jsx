import { Column } from "@carbon/react";

import ChatSaved from "./chat-saved";
import { ButtonPrimary } from "./buttons/ButtonPrimary";

export default function Sidebar() {
  return (
    <Column max={6} xlg={6} lg={6} md={3} sm={4} className="chat__sidebar">
      <div className="chat__sidebar__inner">
        <ChatSaved />
      </div>

      <div className="chat__buttons">
        <ButtonPrimary
          onClick={() => window.location.reload()}
          name="New Chat"
          classes="btn--saved-chats"
        />
      </div>
    </Column>
  );
}
