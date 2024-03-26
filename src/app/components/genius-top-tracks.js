import { useState, useEffect, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useCompletion } from "ai/react";

import { spotifyDataAtom } from "@/app/store/atoms";

export default function GeniusTopTracks() {
  const [lyrics, setLyrics] = useState("");
  const spotifyData = useAtomValue(spotifyDataAtom);

  let collectedLyrics = [];

  // fetch lyrics from genius-lyrics-api. take fetched lyrics
  // and push to collectedLyrics array
  //
  async function fetchLyrics(title, artist) {
    const response = await fetch("/api/genius/top-tracks", {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    collectedLyrics.push(data.returnedLyrics);
    // console.log("collectedLyrics", collectedLyrics, collectedLyrics.length);

    if (collectedLyrics.length === 3) {
      fetchSentiment(collectedLyrics);
    }
  }

  const { complete } = useCompletion({
    api: "/api/genius/sentiment",
  });

  const fetchSentiment = useCallback(
    async (lyrics) => {
      const completion = await complete(lyrics);
      if (!completion) throw new Error("Failed to check typos");
      setLyrics(completion);
      console.log('completion', completion)
    },
    [complete]
  );

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
    <div className="sidebar__inner">
      <h3>Lyrics Analysis<br/>via Genius</h3>
      <div dangerouslySetInnerHTML={{ __html: lyrics }} />
    </div>
  );
}
