import { useState } from "react";
import MessageForm from "./message-form";
import LoadingIndicator from "./ui/loading-indicator";

const DraftingLedes = () => {
  const [messages, setMessages] = useState([]);
  const [ledes, setLedes] = useState([]);
  const [recommended, setRecommended] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const placeholder = "Enter artist name.";

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        messages: [
          ...messages,
          {
            role: "user",
            content: input || "",
          },
        ],
      };

      const response = await fetch("/api/drafting/lede-primary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.text();

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseData}`);
      }

      const data = JSON.parse(responseData);

      if (!Array.isArray(data.ledes) || typeof data.recommended !== "string") {
        console.log("Invalid data structure:", data);
        throw new Error("Invalid response format from server");
      }

      setLedes(data.ledes);
      setRecommended(data.recommended);
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput(""); // Clear after submission
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-3 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="drafting-scrollable w-full h-full flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll">
        {isLoading && <LoadingIndicator loadingCopy="Generating ledes" />}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {ledes.map((lede) => (
          <div
            key={lede.id}
            className="shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2"
          >
            <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
              {lede.strategy}
            </h4>
            <div className="text-base leading-6 text-darkslategray-200/90">
              {lede.output}
            </div>
          </div>
        ))}

        {recommended && (
          <div className="shadow-hieroshadow-15 rounded-md bg-mediumseagreen-100 border-seagreen border border-solid flex flex-col items-start justify-start p-3 pt-2">
            <h4 className="pb-1 text-base text-darkslategray-200 font-normal">
              Recommended
            </h4>
            <div className="text-base leading-6 text-darkslategray-200/90">
              {recommended}
            </div>
          </div>
        )}
      </div>

      <MessageForm
        input={input}
        onInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DraftingLedes;
