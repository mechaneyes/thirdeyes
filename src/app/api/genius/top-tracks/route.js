import { NextResponse } from "next/server";
import { getLyrics } from "genius-lyrics-api";

export async function POST(req) {
  const res = await req.json();

  const options = {
    apiKey: process.env.NEXT_PUBLIC_CLIENT_GENIUS_ACCESS_TOKEN,
    title: res.title,
    artist: res.artist,
    optimizeQuery: true,
  };

  // Use try-catch to handle errors in the asynchronous call
  try {
    // Await the getLyrics function to resolve the lyrics
    const returnedLyrics = await getLyrics(options);

    // Check if the lyrics were found
    if (returnedLyrics) {
    //   console.log("returnedLyrics", returnedLyrics);
      return new NextResponse(JSON.stringify({ returnedLyrics }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // If lyrics are not found, return a non-200 status code, e.g. 404
      return new NextResponse(JSON.stringify({ message: "Lyrics not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Failed to get lyrics:", error);
    // Return an error status code, e.g. 500, with the error message
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
