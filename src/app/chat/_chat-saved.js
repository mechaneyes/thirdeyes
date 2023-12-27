import React, { useState, useEffect } from "react";

const ChatSaved = ()=> {
  const [savedChats, setSavedChats] = useState([]);
 
  const fetchChats = async () => {
    const response = await fetch("/api/chat-kv");
    const data = await response.json();
    setSavedChats(data);
    console.log('data', data)
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="chat__sidebar chat__saved">
      <ul>
        <li>
          Introduce me to ambient music{" "}
          <span className="chat__saved__date">2023.12.31</span>
        </li>
        <li>
          How did Frankie Knuckles impact music and culture?{" "}
          <span className="chat__saved__date">2023.12.31</span>
        </li>
        <li>
          Give me a 20 song playlist inspired by David Mancuso&apos;s party, The Loft{" "}
          <span className="chat__saved__date">2023.12.19</span>
        </li>
        <li>
          Dissect Radiohead&apos;s Kid A{" "}
          <span className="chat__saved__date">2023.12.18</span>
        </li>
        <li>
          What is the history of the Roland TB-303?{" "}
          <span className="chat__saved__date">2023.12.17</span>
        </li>
        <li>
          Tell me about music that incorporates NASA mission sounds{" "}
          <span className="chat__saved__date">2023.12.01</span>
        </li>
      </ul>
    </div>
  );
};

export default ChatSaved;
