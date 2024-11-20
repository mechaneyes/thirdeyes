import { useChat } from 'ai/react';
import MessageForm from './message-form';

const DraftingLedes = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/drafting/lede-primary',
    body: {
      model: 'gpt-4-turbo'
    }
  });

  return (
    <div className="self-stretch w-full">
      <div className="space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className="p-3 rounded-lg bg-gray-50">
            <strong>{message.role === "user" ? "You: " : "AI: "}</strong>
            <span>{message.content}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type your message..."
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DraftingLedes;