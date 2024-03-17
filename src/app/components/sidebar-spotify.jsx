"use client";

import { useState } from "react";
import {
  getAccessToken,
  getArtistInfo,
  getArtistTopTracks,
} from "./modules/spotify.js";

import artists from "@/app/store/artists-electronic-filtered.json";

export default function SpotifyComponent() {
  const [artistName, setArtistName] = useState("");
  const [artistInfo, setArtistInfo] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  // check if submitted input value is in the artists.json file
  //
  const checkArtist = (artistName) => {
    const artist = artists.find(
      (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
    );
    return artist;
  };

  const runSpotify = async () => {
    const accessToken = await getAccessToken(clientId, clientSecret);
    console.log("Authenticated with Spotify\n");

    const artist = checkArtist(artistName);
    console.log('found artist', artist);

    if (artistName.toLowerCase() === "quit") {
      setArtistName("");
      setArtistInfo(null);
      setTopTracks([]);
      return;
    }

    try {
      const artist = await getArtistInfo(accessToken, artistName);
      const artistId = artist.id;
      console.log(`\nArtist Name: ${artist.name}`);
      setArtistInfo(artist);

      // Get the artist's top 5 tracks
      const tracks = await getArtistTopTracks(accessToken, artistId);
      console.log("\nTop 5 Tracks:");
      setTopTracks(tracks);
    } catch (e) {
      console.log(`An error occurred: ${e}\n`);
    }
  };

  return (
    <div className="chat__sidebar__inner chat__sidebar__inner--spotify">
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Enter an artist's name"
      />
      <button onClick={runSpotify}>Get Top Tracks</button>

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
