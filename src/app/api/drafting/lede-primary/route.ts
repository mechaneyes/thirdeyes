import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { ledePrimary } from "../prompts";

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

    console.log('messages', messages);

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400 }
      );
    }

    // Validate message content exists
    const validMessages = messages.filter((msg) => msg.content);

    const result = await generateObject({
      model: openai("gpt-4o", {
        structuredOutputs: true,
        temperature: 0.84,
        maxTokens: 4095,
        topP: 1,
        frequencyPenalty: 0.24,
        presencePenalty: 0.72,
      }),
      schema: MusicReviewLedes,
      mode: "json",
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
    });

    return new Response(JSON.stringify(result.object), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
