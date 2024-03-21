import fetch from "node-fetch";
import { URL } from "url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// https://nextjs.org/docs/app/api-reference/functions/cookies

export async function GET(req, res) {
  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "http://localhost:3000/api/spotify/callback";
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get("code");

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  if (!response.ok) {
    return Response.json({ error: "Failed to obtain access token" });
  }

  const data = await response.json();
  const accessToken = data.access_token;

  console.log('accessToken', accessToken)

  // Set the access_token cookie
  cookies().set("access_token", accessToken, {
    httpOnly: true, // Security enhancement
    maxAge: 3600,
  });

  redirect("/editor");

  // return Response.json({ message: "Access token set in cookie." });
}
