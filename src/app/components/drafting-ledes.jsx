import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import MessageForm from "./message-form";

const DraftingLedes = () => {
  const scrollContainerRef = useRef(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/drafting/lede-primary",
      body: {
        model: "gpt-4-turbo",
      },
    });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]); // Scroll whenever messages update

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-3 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div
        ref={scrollContainerRef}
        className="drafting-scrollable w-full h-full flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll"
      >
        <div className="self-stretch w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className="pb-3 text-base font-normal leading-6 text-darkslategray-200/70"
            >
              <strong>{message.role === "user" ? "You: " : "AI: "}</strong>
              <span>{message.content}</span>
            </div>
          ))}
        </div>
      </div>
      <MessageForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DraftingLedes;
