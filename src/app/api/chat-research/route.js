import { createClient } from "@vercel/kv";
import OpenAI from "openai";
import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { nanoid } from "nanoid";

// Edge runtime uses the Request and URL constructor directly rather than "req.query"
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

let chatId = nanoid().substring(0, 8);

let today = new Date();
const chatStart = today
  .toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  .replace(/\//g, "-")
  .replace(",", "")
  .replace(" ", "T");

// reset chatId on page refresh. creates a new object in the chats array
//
// export async function GET(req, res) {
//   chatId = nanoid().substring(0, 8);
//   const { theId } = req.query;
//   console.log("Refresh signal received", theId);
//   return new Response('Refresh signal received', {
//     status: 200,
//   })
// }

export async function GET(req) {
  const url = new URL(req.url);
  const passedId = url.searchParams.get("passedId");
  const passedReset = url.searchParams.get("passedReset");
  // console.log("passed else created chatId", passedId);

  // if no passedId is present create a new chatId
  if (!passedId) {
    chatId = nanoid().substring(0, 8);
  } else {
    chatId = passedId;
  }
  if (passedReset) {
    chatId = nanoid().substring(0, 8);
  }

  return new Response(
    JSON.stringify({ message: "GET request processed", passedId, chatId }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req) {
  const json = await req.json();
  const { messages, previewToken } = json;

  const kv = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
  });

  const { user } = await getSession();
  const key = `user_${user.email}`;
  const userData = await kv.get(key);

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  // const response = await openai.chat.completions.create({
  //   model: "gpt-4-turbo",
  //   messages,
  //   temperature: 0.8,
  //   stream: true,
  // });

  const response = await anthropic.messages.create({
    messages,
    model: 'claude-3-opus-20240229',
    stream: true,
    max_tokens: 1024,
  });

  // const stream = OpenAIStream(response, {
  //   async onCompletion(completion) {
  //     const title = json.messages[0].content.substring(0, 100);
  //     const path = `/chat/${chatId}`;

  //     const payload = {
  //       id: chatId,
  //       start: chatStart,
  //       path: path,
  //       title: title,
  //       messages: [
  //         ...messages,
  //         {
  //           content: completion,
  //           role: "assistant",
  //         },
  //       ],
  //     };

  //     // if this `chatId` is not in the user's chats, add chat.
  //     // if it's already there, update the messages. save to db
  //     let existingChat = userData.chats.find((c) => c.id === chatId);

  //     if (existingChat) {
  //       existingChat.messages = payload.messages;
  //     } else {
  //       userData.chats.push(payload);
  //     }

  //     // userData.chats = []
  //     await kv.set(key, JSON.stringify(userData));
  //   },
  // });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}
