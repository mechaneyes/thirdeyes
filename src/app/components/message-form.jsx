import React from "react";

const MessageForm = ({ input, handleInputChange, handleSubmit, isLoading }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };

  return (
    <div className="self-stretch flex flex-col items-center justify-end">
      <form onSubmit={onSubmit} className="self-stretch flex gap-2">
        <div className="flex-1 relative shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-md bg-white border border-solid border-seagreen">
          <input
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full h-10 px-3 bg-transparent outline-none border-0"
            placeholder="Type your message..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 px-4 shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] bg-blue-500 text-white rounded-md disabled:opacity-50 border-0"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
