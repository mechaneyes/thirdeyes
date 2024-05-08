import { createClient } from "@vercel/kv";
import OpenAI from "openai";
import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { nanoid } from "nanoid";

// Edge runtime uses the Request and URL constructor directly rather than "req.query"
export const runtime = "edge";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function POST(req) {
  const json = await req.json();
  const { messages } = json;

  // console.log('json', json)

  const response = await anthropic.messages.create({
    messages,
    model: 'claude-3-opus-20240229',
    stream: true,
    max_tokens: 1024,
  });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}
