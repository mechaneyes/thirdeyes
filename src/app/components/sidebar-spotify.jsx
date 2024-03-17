"use client";

import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import { runSpotify } from "@/app/lib/spotify-functions";
import { queryAtom } from "@/app/store/atoms";

export default function SpotifyComponent() {
  const [spotifyData, setSpotifyData] = useState([]);
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
            console.log("topTracks", topTracks, topTracks[0]);
            setSpotifyData(topTracks);
          })
          .catch((error) => {
            console.error("runSpotify error:", error);
          });
      });
    } else {
      console.log("that shit's null");
    }
  }, [query]);

  return (
    <div className="sidebar__module sidebar__module--spotify spotify">
      <ul className="spotify__list">
        {spotifyData &&
          spotifyData.map((item) => {
            return (
              <a
                key={item.id}
                href={item.external_urls.spotify}
                className="spotify__link"
              >
                <li className="spotify__track">
                  <p className="spotify__title">{item.name}</p>
                  <p className="spotify__album">{item.album.name}</p>
                  <p className="spotify__url">{item.external_urls.spotify}</p>
                </li>
              </a>
            );
          })}
      </ul>
    </div>
  );
}
