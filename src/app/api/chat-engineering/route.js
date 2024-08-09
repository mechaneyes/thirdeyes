import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// Edge runtime uses the Request and URL constructor directly rather than "req.query"
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let model = "ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"

export async function GET(req) {
  const url = new URL(req.url);
  model = url.searchParams.get("model");

  return new Response(
    JSON.stringify({ message: "GET request processed", model }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req) {
  const json = await req.json();
  const { messages, previewToken } = json;

  const fixedPrompt = {
    role: 'system',
    content: 'Write a bio for '
  };

  // Prepend the fixed prompt to the messages array
  const modifiedMessages = [fixedPrompt, ...messages];

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  const response = await openai.chat.completions.create({
    model: model,
    messages: modifiedMessages,
    temperature: 0.8,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
