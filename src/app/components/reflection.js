import React, { useEffect, useState } from 'react';
import { useChat } from 'path-to-useChat-hook'; // Adjust the import path as necessary

function ReflectionComponent() {
  const [reflectionPrompt, setReflectionPrompt] = useState('Your initial reflection prompt');
  const [reflectionMessages, setReflectionMessages] = useState([]);

  const {
    messages: hookReflectionMessages,
    handleSubmit: handleReflectionSubmit,
    setMessages: setReflectionMessagesFromHook,
  } = useChat({
    api: "/api/reflection",
    initialInput: reflectionPrompt,
    onResponse: (response) => {
      console.log("🔫 response", response);
      setReflectionMessages(prevMessages => [...prevMessages, response]);
      setReflectionMessagesFromHook(prevMessages => [...prevMessages, response]);
    },
  });

  useEffect(() => {
    handleReflectionSubmit(reflectionPrompt);
  }, [reflectionPrompt, handleReflectionSubmit]);

  return (
    <div>
      <h2>Reflections</h2>
      <ul>
        {reflectionMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReflectionComponent;