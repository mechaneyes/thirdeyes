import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error(
    "The SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables are required"
  );
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
export const runtime = "edge";
