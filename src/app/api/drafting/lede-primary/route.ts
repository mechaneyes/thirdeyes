import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { ledePrimary, ledeVoice, ledeEvaluation } from "../prompts";

const openai = new OpenAI();

const Lede = z.object({
  id: z.number().int(),
  strategy: z.string(),
  output: z.string(),
});

const MusicReviewLedes = z.object({
  ledes: z.array(Lede),
  recommended: z.string(),
});

export const maxDuration = 120;
export const revalidate = 0; // Disable caching

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

    // ————————————————————————————————————o primary model —>
    //
    const primaryCompletion = await openai.beta.chat.completions.parse({
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

    const primaryResult = primaryCompletion.choices[0].message.parsed;
    console.log("🪼 🪼 🪼 primary:", JSON.stringify(primaryResult, null, 2));

    // ————————————————————————————————————o voice reflection model —>
    //
    const secondaryCompletion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: ledeVoice.content,
        },
        {
          role: "user",
          content: JSON.stringify(primaryResult),
        },
      ],
      response_format: zodResponseFormat(MusicReviewLedes, "result"),
      temperature: 0.83,
      max_tokens: 4095,
      top_p: 0.9,
      frequency_penalty: 0.29,
      presence_penalty: 1.25,
    });

    const secondaryResult = secondaryCompletion.choices[0].message.parsed;
    console.log(
      "🐦‍🔥 🐦‍🔥 🐦‍🔥 secondary:",
      JSON.stringify(secondaryResult, null, 2)
    );

    // ————————————————————————————————————o evaluation reflection model —>
    //
    const tertiaryCompletion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: ledeEvaluation.content,
        },
        {
          role: "user",
          content: JSON.stringify(secondaryResult),
        },
      ],
      response_format: zodResponseFormat(MusicReviewLedes, "result"),
      temperature: 0.9,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const tertiaryResult = tertiaryCompletion.choices[0].message.parsed;
    console.log("🐔 🐔 🐔 tertiary:", JSON.stringify(tertiaryResult, null, 2));

    const allResults = {
      primary: primaryResult,
      secondary: secondaryResult,
      tertiary: tertiaryResult,
    };

    return new Response(JSON.stringify(allResults), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API route error:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
