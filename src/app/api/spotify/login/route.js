import { URLSearchParams } from "url";
import { redirect } from "next/navigation";

export async function GET(req, res) {
  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope: "streaming user-read-email user-read-private",
    redirect_uri: "http://localhost:3000/api/spotify/callback",
    state: generateRandomString(16),
  });

  // res.redirect(
  //   "https://accounts.spotify.com/authorize/?" +
  //     auth_query_parameters.toString()
  // );

  redirect(
    `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`
  );
}

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
