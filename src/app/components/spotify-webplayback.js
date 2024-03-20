import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { playTrack } from "@/app/lib/spotify-functions";

export default function SpotifyWebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Thirdeyes",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        // volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  // document.getElementById("togglePlay").onclick = function () {
  //   player.togglePlay();
  // };

  const nowPlayingCoverStyle = {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
  };

  return (
    <>
      <div className="container">
        {current_track !== undefined ? (
          <div className="main-wrapper">
            <Image
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
              width={64}
              height={64}
              style={nowPlayingCoverStyle}
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>

              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>
            </div>
            {/* <button
              className="btn-spotify"
              onClick={() => {
                player.previousTrack();
              }}
            >
              &lt;&lt;
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                player.nextTrack();
              }}
            >
              &gt;&gt;
            </button> */}
          </div>
        ) : (
          // <Link href="/api/spotify/login">
          //   <button
          //     type="button"
          //     className="btn btn--outline-primary btn--login-logout"
          //   >
          //     Spotify
          //   </button>
          // </Link>
          <></>
        )}

        {/* <button id="togglePlay" className="btn-spotify">
          {is_paused ? "PLAY" : "PAUSE"}
        </button> */}
      </div>
    </>
  );
}
