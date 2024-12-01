import { useState } from "react";

import { Unplug } from "lucide-react";

const MessageForm = ({
  input,
  onInputChange,
  handleSubmit,
  isLoading,
  placeholder,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isLoading}
            className="w-full h-10 px-3 bg-transparent outline-none border-0"
            placeholder={placeholder}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 px-4 shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] text-white hover:text-blue-500 text-base border-solid border-2 rounded-md border-blue-500 bg-blue-500 hover:bg-white transition-colors duration-300 disabled:opacity-50 cursor-pointer"
        >
          Send
        </button>
        <Unplug
          // onClick={!isTopActive ? handleBottomClick : undefined}
          color={isHovered ? "#3b82f6" : "white"}
          className="cursor-pointer border-solid border-2 rounded-md border-blue-500 bg-blue-500 hover:bg-white transition-colors duration-300 w-10 h-10 p-1.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </form>
    </div>
  );
};

export default MessageForm;
