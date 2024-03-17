const axios = require("axios");
const querystring = require("querystring");

// Replace these with your Spotify API credentials
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Function to obtain an access token
export async function getAccessToken(clientId, clientSecret) {
  const url = "https://accounts.spotify.com/api/token";
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await axios.post(
    url,
    querystring.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

// Example function to get information about the artist by name
export async function getArtistInfo(accessToken, artistName) {
  const url = `https://api.spotify.com/v1/search?type=artist&q=${artistName}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.artists.items[0];
}

// Function to retrieve an artist's top tracks
export async function getArtistTopTracks(
  accessToken,
  artistId,
  countryCode = "US"
) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      country: countryCode,
    },
  });
  return response.data.tracks.slice(0, 5); // Return top 5 tracks
}

export async function runSpotify() {
  const accessToken = await getAccessToken(CLIENT_ID, CLIENT_SECRET);
  console.log("Authenticated with Spotify\n");

  let artistName = "";
  while (artistName !== "quit") {
    artistName = prompt(
      "Enter an artist's name to get top tracks, or 'quit' to exit: "
    );
    if (artistName.toLowerCase() === "quit") {
      break;
    }
    try {
      const artistInfo = await getArtistInfo(accessToken, artistName);
      const artistId = artistInfo.id;
      console.log(`\nArtist Name: ${artistInfo.name}`);

      // Get the artist's top 5 tracks
      const topTracks = await getArtistTopTracks(accessToken, artistId);
      console.log("\nTop 5 Tracks:");
      for (const track of topTracks) {
        console.log(`Track: ${track.name}`);
        console.log(`Album: ${track.album.name}`);
        console.log(`Spotify Link: ${track.external_urls.spotify}\n`);
      }
    } catch (e) {
      console.log(`An error occurred: ${e}\n`);
    }
  }
}
