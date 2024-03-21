"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAtomValue } from "jotai";

import { runSpotify } from "@/app/lib/spotify-functions";
import SpotifyLogin from "@/app/components/spotify-login";
import SpotifyWebPlayback from "@/app/components/spotify-webplayback";
import { queryAtom } from "@/app/store/atoms";

export default function SpotifyModule() {
  const [spotifyData, setSpotifyData] = useState([]);
  const [token, setToken] = useState("");
  const query = useAtomValue(queryAtom);

  // ————————————————————————————————————o spotify token —>
  //
  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:3000/api/spotify/token");
      const json = await response.json();
      setToken(json.access_token.value);
    }

    getToken();
  }, []);

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
        console.log("data", data.artists, data.artists[0]);
        runSpotify(data.artists[0])
          .then((topTracks) => {
            console.log("topTracks", topTracks, topTracks[0]);
            setSpotifyData(topTracks);
          })
          .catch((error) => {
            console.error("runSpotify error:", error);
          });
      });
    }
  }, [query]);

  // ————————————————————————————————————o play selected track —>
  //
  const playTrack = async (trackId) => {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`],
        position_ms: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="chat__sidebar__inner chat__sidebar__inner--spotify">
      <div className="module module--spotify">
        <div className="spotify-player">
          {token ? <SpotifyWebPlayback token={token} /> : <SpotifyLogin />}
        </div>
        <ul className="spotify-playlist">
          {spotifyData &&
            spotifyData.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => playTrack(item.id)}
                  className="spotify-playlist__link"
                >
                  <li className="spotify-playlist__track">
                    <Image
                      src={item.album.images[2].url}
                      width={64}
                      height={64}
                      alt={`Album artwork from ${item.album.name}`}
                    />
                    <div className="spotify-playlist__copy">
                      <p className="spotify-playlist__title">{item.name}</p>
                      <p className="spotify-playlist__album">
                        {item.album.name}
                      </p>
                    </div>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
