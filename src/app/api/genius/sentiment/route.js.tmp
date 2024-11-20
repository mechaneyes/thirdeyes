import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    // model: "gpt-4-0125-preview",
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "user",
        content: `Your role is to analyze the sentiment of lyrics from multiple songs. For each song, consider the emotional tone, themes, and general expressions. Provide a sentiment analysis that describes the main characteristics, emotional tone, and overall sentiment of each set of lyrics separately. The songs are not related, and you should not compare them or point out anything that's dissimilar. Return HTML as ouput using <p></p> tags to wrap paragraphs. Here are lyrics from several songs: ${prompt.join(
          "\n\n"
        )}`,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
