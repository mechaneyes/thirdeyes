import { URLSearchParams } from "url";

export default async function handler(req, res) {
  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = `${req.headers.origin}/api/spotify/callback`;

  if (req.method === "GET") {
    switch (req.query.route) {
      case "login":
        const scope =
          "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
        const state = generateRandomString(16);
        const queryParams = new URLSearchParams({
          response_type: "code",
          client_id: spotify_client_id,
          scope: scope,
          redirect_uri: `${req.headers.origin}/api/spotify/callback`,
          state: state,
        });

        res.redirect("https://accounts.spotify.com/authorize?" + queryParams);
        break;

      case "callback":
        // In your current code, code is not defined here, capture it from the query
        const { code } = req.query;

        if (!code) {
          return res.status(400).json({ error: 'Parameter "code" is missing' });
        }

        // Fetch the access token
        const authOptions = {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                spotify_client_id + ":" + spotify_client_secret
              ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code",
          }),
        };

        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            authOptions
          );
          const data = await response.json();

          if (response.ok) {
            var access_token = data.access_token;
            // For the purpose of this example, we are just sending the token to the client.
            // In a real app, you might want to do something different, like creating a session.
            return res.json({ access_token });
          } else {
            throw new Error("Failed to obtain access token");
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
        break;

      case "token":
        // You should replace this with how you intend to track and manage the access token
        res.json({
          access_token: access_token,
        });
        break;

      default:
        res.status(404).json({ error: "Not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
