import { useState, useEffect, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useChat, useCompletion } from "ai/react";

import { spotifyDataAtom } from "@/app/store/atoms";

export default function GeniusTopTracks() {
  const [isLoading, setIsLoading] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const spotifyData = useAtomValue(spotifyDataAtom);

  let collectedLyrics = [];
  let collectedLyricsString = "";

  // fetch lyrics from genius-lyrics-api. take fetched lyrics
  // and push to collectedLyrics array
  //
  async function fetchLyrics(title, artist) {
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_PREFIX}/api/genius/top-tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
      }),
    });

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    collectedLyrics.push(data.returnedLyrics);
    collectedLyricsString = collectedLyrics.join("\n");
    // console.log("collectedLyrics", collectedLyrics, collectedLyrics.length);
    // console.log("collectedLyricsString", collectedLyricsString);

    if (collectedLyrics.length === 5) {
      fetchSentiment(collectedLyrics);
      // setInput(collectedLyricsString);
    }
  }

  const { complete } = useCompletion({
    api: `${process.env.NEXT_PUBLIC_API_URL_PREFIX}/api/genius/sentiment`
  });

  const fetchSentiment = useCallback(
    async (lyrics) => {
      const completion = await complete(lyrics);
      if (!completion) throw new Error("Failed to check typos");
      setLyrics(completion);
      setIsLoading(false);
    },
    [complete]
  );

  // const useChatOptions = {
  //   api: "/api/genius/sentiment",
  // };

  // const { messages, input, setInput, handleInputChange, handleSubmit } =
  //   useChat(useChatOptions);

  // useEffect(() => {
  //   console.log("messages", messages);
  // }, [messages]);

  // when populated, loop through spotifyData, fetch artist and
  // track name then send to fetchLyrics()
  //
  useEffect(() => {
    if (spotifyData[0] !== undefined) {
      spotifyData.map((item) => {
        fetchLyrics(item.name, item.artists[0].name);
      });
    }
  }, [spotifyData]);

  return (
    <div className={`sidebar__inner ${lyrics ? "animate" : ""}`}>
      <h3>
        Lyrics Analysis
        <br />
        via GPT & Genius
      </h3>

      <div className="module module--genius">
        <div className={`loading-msg ${isLoading ? "loaded" : ""}`}>
          {isLoading && "Processing..."}
        </div>
        <div dangerouslySetInnerHTML={{ __html: lyrics }} />
      </div>

      {/* {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))} */}
    </div>
  );
}
