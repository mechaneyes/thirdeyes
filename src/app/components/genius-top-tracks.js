import { useState, useEffect } from "react";

export default function GeniusTopTracks() {
  const [lyrics, setLyrics] = useState("");

  async function fetchLyrics(messageFromChat) {
    const response = await fetch("/api/genius/top-tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Posthumous Forgiveness",
        artist: "Tame Impala",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setLyrics(data.returnedLyrics);
    // console.log("data", data);
  }

  useEffect(() => {
    fetchLyrics();
  }, []);

  return (
    <div>
      <h3>Genius Top Tracks</h3>
      {lyrics && <p>{lyrics}</p>}
    </div>
  );
}
