const axios = require("axios");
const querystring = require("querystring");

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// obtain an access token
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
  return response.data.tracks.slice(0, 7);
}

export async function runSpotify(artistName) {
  const accessToken = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

  try {
    const artistInfo = await getArtistInfo(accessToken, artistName);
    const artistId = artistInfo.id;

    // Get the artist's top 5 tracks
    const topTracks = await getArtistTopTracks(accessToken, artistId);
    // console.log('topTracks', topTracks)

    return topTracks;
  } catch (e) {
    console.log(`An error occurred: ${e}\n`);
  }
}

// ————————————————————————————————————o token for web and webplayback apis —>
//
export async function getToken() {
  // const response = await fetch("http://localhost:3000/api/spotify/token");
  // const response = await fetch("https://thirdeyes-dev.vercel.app/api/spotify/token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_PREFIX}/api/spotify/token`);
  const json = await response.json();
  return json.access_token.value;
}

// ————————————————————————————————————o play selected track from list —>
//
export const playTrack = async (trackId) => {
  const token = await getToken();

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
