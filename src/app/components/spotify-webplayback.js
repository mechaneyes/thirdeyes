import { useState, useEffect } from "react";
import Image from "next/image";
import { PlayOutline, PauseOutline } from "@carbon/icons-react";

export default function SpotifyWebPlayback(props) {
  const [isPaused, setIsPaused] = useState(false);
  const [current_track, setTrack] = useState(undefined);

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
      });

      window.$player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      window.$player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      window.$player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setIsPaused(state.paused);
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
                  window.$player.resume();
                  setIsPaused(false);
                } else {
                  window.$player.pause();
                  setIsPaused(true);
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
