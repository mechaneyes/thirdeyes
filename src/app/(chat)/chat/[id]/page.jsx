import Chat from "@/app/components/chat";
import MessagesIds from "@/app/components/chat-messages-ids";

export const runtime = "edge";

export default function ChatIdPage({params}) {
  return <Chat messages={MessagesIds} />;
}
