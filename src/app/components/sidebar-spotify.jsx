"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";

import { runSpotify } from "@/app/lib/spotify-functions";
import SpotifyLogin from "@/app/components/spotify-login";
import SpotifyWebPlayback from "@/app/components/spotify-webplayback";
import { queryAtom } from "@/app/store/atoms";

export default function SpotifyComponent() {
  const [spotifyData, setSpotifyData] = useState([]);
  const [token, setToken] = useState("");
  const query = useAtomValue(queryAtom);

  // ————————————————————————————————————o spotify player —>
  //
  // if (typeof window !== "undefined") {
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     const token = process.env.NEXT_PUBLIC_SPOTIFY_TOKEN;
  //     const player = new Spotify.Player({
  //       name: "Web Playback SDK Quick Start Player",
  //       getOAuthToken: (cb) => {
  //         cb(token);
  //       },
  //       volume: 0.5,
  //     });

  //     // Ready
  //     player.addListener("ready", ({ device_id }) => {
  //       console.log("Ready with Device ID", device_id);
  //     });

  //     // Not Ready
  //     player.addListener("not_ready", ({ device_id }) => {
  //       console.log("Device ID has gone offline", device_id);
  //     });

  //     player.addListener("initialization_error", ({ message }) => {
  //       console.error(message);
  //     });

  //     player.addListener("authentication_error", ({ message }) => {
  //       console.error(message);
  //     });

  //     player.addListener("account_error", ({ message }) => {
  //       console.error(message);
  //     });

  //     player.connect();

  //     document.getElementById("togglePlay").onclick = function () {
  //       player.togglePlay();
  //     };
  //   };
  // }

  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:3000/api/spotify/token");
      const json = await response.json();

      console.log("json", json.access_token);

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

  return (
    <div className="chat__sidebar__inner chat__sidebar__inner--spotify">
      <SpotifyLogin />
      {token && <SpotifyWebPlayback token={token} />}

      <ul className="spotify spotify__list">
        {spotifyData &&
          spotifyData.map((item) => {
            return (
              <a
                key={item.id}
                href={item.external_urls.spotify}
                className="spotify__link"
              >
                <li className="spotify__track">
                  <Image
                    src={item.album.images[2].url}
                    width={64}
                    height={64}
                    alt={`Album artwork from ${item.album.name}`}
                  />
                  <div className="spotify__copy">
                    <p className="spotify__title">{item.name}</p>
                    <p className="spotify__album">{item.album.name}</p>
                  </div>
                </li>
              </a>
            );
          })}
      </ul>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
