import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { ledePrimary } from "../prompts";

const openai = new OpenAI();

const Lede = z.object({
  id: z.string(),
  strategy: z.string(),
  output: z.string(),
});

const MusicReviewLedes = z.object({
  ledes: z.array(Lede),
  recommended: z.string(),
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400 }
      );
    }

    const validMessages = messages.filter((msg) => msg.content);
    
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: ledePrimary.content,
        },
        ...validMessages.map((msg) => ({
          role: msg.role || "user",
          content: msg.content,
        })),
      ],
      response_format: zodResponseFormat(MusicReviewLedes, "result"),
      temperature: 0.84,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0.24,
      presence_penalty: 0.72,
    });

    const result = completion.choices[0].message.parsed;

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}