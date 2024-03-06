import { createClient } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { nanoid } from "nanoid";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatId = nanoid();

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


export async function POST(req) {
  const json = await req.json();
  const { messages, previewToken } = json;

  const kv = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
  });

  const { user } = await getSession();
  
  const key = `user_${user.email}`;
  const userDataString = await kv.get(key);

  let userData;
  try {
    userData = JSON.parse(JSON.stringify(userDataString));
    // console.log('userData 🥝', userData)
  } catch (error) {
    console.error("Invalid JSON:", userDataString);
  }

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  const oaiRes = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    // model: "ft:gpt-3.5-turbo-1106:mechaneyes:het-ps-1224-01:8ZRROlSO",
    // model: "gpt-3.5-turbo",
    messages,
    temperature: 0.8,
    stream: true,
  });

  const stream = OpenAIStream(oaiRes, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const id = json.id ?? nanoid();
      const createdAt = Date.now();
      const path = `/chat/${id}`;
      const payload = {
        id,
        title,
        // userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      };

      // look for an existing chat. If it exists, update the messages array
      // otherwise, create a new chat object with the messages array
      // 
      let chat = userData.chats.find((chat) => chat.chatId === chatId);

      if (chat) {
        // Update the messages array in the chat
        chat.messages = messages;
      } else {
        let chatData = {
          id: chatId,
          start: chatStart,
          title: title,
          messages: messages,
        };
        userData.chats.push(chatData);
      }

      console.log("🥝🥝 Updated userData 🥝🥝", userData);
      // await kv.hmset(`chat:${id}`, payload);
      // await kv.zadd(`user:chat:${userId}`, {
      //   score: createdAt,
      //   member: `chat:${id}`,
      // });
      // // await kv.hset('userSession', { userId: 123, email: 'ex@example.com' });
      // await kv.hset(`chat`, payload);
    },
  });

  return new StreamingTextResponse(stream);
}
