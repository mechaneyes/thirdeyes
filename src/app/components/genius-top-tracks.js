import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import { spotifyDataAtom } from "@/app/store/atoms";

export default function GeniusTopTracks() {
  const [lyrics, setLyrics] = useState("");
  const spotifyData = useAtomValue(spotifyDataAtom);

  let collectedLyrics = [];
  let collectedLyricsString = "";

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
    // setLyrics(data.returnedLyrics);
    collectedLyrics.push(data.returnedLyrics);
    console.log("collectedLyrics", collectedLyrics, collectedLyrics.length);
    collectedLyricsString = collectedLyricsString.concat(
      `\n\n💥💥New Song💥💥\nTitle: ${title}\n`,
      data.returnedLyrics
    );

    if (collectedLyrics.length === 7) {
      console.log("collectedLyricsString", collectedLyricsString);
    }
  }

  // loop through spotifyData, fetch artist and track name
  // then send to fetchLyrics()
  //
  useEffect(() => {
    if (spotifyData[0] !== undefined) {
      // console.log(
      //   "spotifyData[0]",
      //   spotifyData[0].name,
      //   spotifyData[0].artists[0].name
      // );
      spotifyData.map((item) => {
        fetchLyrics(item.name, item.artists[0].name);
      });
    }
  }, [spotifyData]);

  return (
    <div>
      <h3>Genius Top Tracks</h3>
      {lyrics && <p>{lyrics}</p>}
    </div>
  );
}
