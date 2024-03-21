import { useState, useEffect } from "react";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { playerAtom, playerPausedAtom } from "@/app/store/atoms";
import { PlayOutline, PauseOutline } from "@carbon/icons-react";

import { getAccessToken } from "@/app/lib/spotify-functions";

export default function SpotifyWebPlayback(props) {
  const [playerPaused, setPlayerPaused] = useAtom(playerPausedAtom);
  const [isPaused, setIsPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(undefined);
  const [player, setPlayer] = useAtom(playerAtom);

  const playTrack = async () => {
    const response = await fetch("http://localhost:3000/api/spotify/token");
    const json = await response.json();
    const accessToken = json.access_token.value;

    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
        offset: {
          position: 5,
        },
        position_ms: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      window.$player = new window.Spotify.Player({
        name: "Thirdeyes",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.2,
      });

      setPlayer(window.$player);

      window.$player.addListener("ready", ({ device_id }) => {
        // console.log("Ready with Device ID", device_id);
        // window.$player.play("spotify:track:39s8GgTlqPRGZOftmOoPGt")
      });

      window.$player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      window.$player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        // playTrack();

        setTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        window.$player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      window.$player.connect();
    };
  }, []);

  return (
    <>
      <div className="spotify-player__inner">
        {current_track && (
          <div className="spotify__now-playing">
            <div
              className="spotify__now-playing__image-controls"
              onClick={() => {
                if (isPaused) {
                  // window.$player.resume();
                  playTrack();
                } else {
                  window.$player.pause();
                }
              }}
            >
              <Image
                src={current_track.album.images[1].url}
                className="spotify__now-playing__cover"
                alt="Now Playing Cover Image"
                width={300}
                height={300}
              />
              <div className="spotify__now-playing__controls">
                {isPaused ? (
                  <PlayOutline size="36" className="play-pause" />
                ) : (
                  <PauseOutline size="36" className="play-pause" />
                )}
              </div>
            </div>

            <div className="spotify__now-playing__deets">
              <div className="spotify__now-playing__name">
                {current_track.name}
              </div>

              <div className="spotify__now-playing__artist">
                {current_track.artists[0].name}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
