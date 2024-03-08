import ChatIds from "@/app/components/chat-ids";
import MessagesIds from "@/app/components/chat-messages-ids";

export const runtime = "edge";

export default function ChatIdPage({params}) {
  return <ChatIds messages={MessagesIds} />;
}
