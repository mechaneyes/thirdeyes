import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getSession } from '@auth0/nextjs-auth0/edge';
import { nanoid } from 'nanoid'

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const json = await req.json();
  const { messages, previewToken } = json;

  const { user } = await getSession();
  console.log('user', user);

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  const oaiRes = await openai.chat.completions.create({
    // model: "gpt-4-1106-preview",
    // model: "ft:gpt-3.5-turbo-1106:mechaneyes:het-ps-1224-01:8ZRROlSO",
    model: 'gpt-3.5-turbo',
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
      console.log('stream id title:', id, title);
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
