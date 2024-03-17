"use client";

import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import { runSpotify } from "@/app/lib/spotify-functions";
import { queryAtom } from "@/app/store/atoms";

export default function SpotifyComponent() {
  const [artistName, setArtistName] = useState("");
  const [artistInfo, setArtistInfo] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const query = useAtomValue(queryAtom);

  // ————————————————————————————————————o ID the artists —>
  //
  const identifyArtists = async (query) => {
    const response = await fetch(
      // `https://thirdeyes-backend.vercel.app/google?form-input=${query}`
      `http://127.0.0.1:5328/identify-artists?form-input=${query}`
    );
    const data = await response.json();

    return data;
  };

  // ————————————————————————————————————o get deets from spotify —>
  //
  useEffect(() => {
    if (query !== null) {
      identifyArtists(query).then((data) => {
        runSpotify(data.artists[0])
          .then((topTracks) => {
            console.log("topTracks", topTracks);
          })
          .catch((error) => {
            // handle error
          });
      });
    } else {
      console.log("that shit's null");
    }
  }, [query]);

  return (
    <div className="chat__sidebar__inner chat__sidebar__inner--spotify">
      {artistInfo && (
        <div>
          <h2>Artist Name: {artistInfo.name}</h2>
          <h3>Top 5 Tracks:</h3>
          <ul>
            {topTracks.map((track) => (
              <li key={track.id}>
                <p>Track: {track.name}</p>
                <p>Album: {track.album.name}</p>
                <p>
                  Spotify Link: <a href={track.external_urls.spotify}>Listen</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
