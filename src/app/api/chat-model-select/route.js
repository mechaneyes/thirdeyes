import { createClient } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { nanoid } from "nanoid";

// Edge runtime uses the Request and URL constructor directly rather than "req.query"
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

let model = "ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v2:96IxroFm"

export async function GET(req) {
  const url = new URL(req.url);
  model = url.searchParams.get("model");

  // console.log("🟣 searchParams model", model)

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

  const response = await openai.chat.completions.create({
    model: model,
    // model: "ft:gpt-3.5-turbo-0125:mechaneyes:het001-240324v1:96HPQb1E",
    // model: "ft:gpt-3.5-turbo-0125:mechaneyes:het001-240323-v1:962T1JmV",
    // model: "gpt-4-1106-preview",
    // model: "gpt-3.5-turbo",
    messages: modifiedMessages,
    temperature: 0.8,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const path = `/chat/${chatId}`;

      const payload = {
        id: chatId,
        start: chatStart,
        path: path,
        title: title,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      };

      // if this `chatId` is not in the user's chats, add chat.
      // if it's already there, update the messages. save to db
      // let existingChat = userData.chats.find((c) => c.id === chatId);

      // if (existingChat) {
      //   // console.log("present 🟢", chatId, payload.title);
      //   existingChat.messages = payload.messages;
      // } else {
      //   // console.log("missing ❌", chatId, payload.title);
      //   userData.chats.push(payload);
      // }

      // // userData.chats = []
      // // console.log("userData.chats 🔵🔵", userData.chats);
      // await kv.set(key, JSON.stringify(userData));
    },
  });

  return new StreamingTextResponse(stream);
}
