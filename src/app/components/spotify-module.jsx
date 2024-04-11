"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";

import { runSpotify, playTrack } from "@/app/lib/spotify-functions";
import SpotifyLogin from "@/app/components/spotify-login";
import SpotifyWebPlayback from "@/app/components/spotify-webplayback";
import { queryAtom, spotifyDataAtom } from "@/app/store/atoms";

export default function SpotifyModule() {
  const [spotifyData, setSpotifyData] = useAtom(spotifyDataAtom);
  const [token, setToken] = useState("");
  const query = useAtomValue(queryAtom);

  // ————————————————————————————————————o spotify token —>
  //
  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:3000/api/spotify/token");
      const json = await response.json();
      json.access_token && setToken(json.access_token.value);
    }

    getToken();
    // setToken('')
  }, []);

  // ————————————————————————————————————o ID the artists —>
  //
  const identifyArtists = async (query) => {
    const response = await fetch(
      `https://thirdeyes-backend.vercel.app/identify-artists?form-input=${query}`
      // `http://127.0.0.1:5328/identify-artists?form-input=${query}`
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
            // console.log("topTracks", topTracks, topTracks[0]);
            setSpotifyData(topTracks);
          })
          .catch((error) => {
            console.error("runSpotify error:", error);
          });
      });
    }
  }, [query]);

  return (
    <div className="chat__sidebar__inner chat__sidebar__inner--spotify">
      <div className="module module--spotify">
        <div className="spotify-player">
          {/* {token ? <SpotifyWebPlayback token={token} /> : <SpotifyLogin />} */}
        </div>
        <ul className="spotify-playlist">
          {spotifyData &&
            spotifyData.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => playTrack(item.id)}
                  className="spotify-playlist__track"
                >
                  <Image
                    src={item.album.images[2].url}
                    width={64}
                    height={64}
                    alt={`Album artwork from ${item.album.name}`}
                  />
                  <div className="spotify-playlist__copy">
                    <p className="spotify-playlist__title">{item.name}</p>
                    <p className="spotify-playlist__album">{item.album.name}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
