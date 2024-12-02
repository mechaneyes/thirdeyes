import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import { worksPrimary, worksEdit } from "../prompts";

const openai = new OpenAI();

interface RequestBody {
  messages: any[];
  wikipediaContext?: string;
}

const MusicReviewWorks = z.object({
  works: z.array(
    z.object({
      id: z.number().int(),
      option: z.string(),
      original: z.string(),
      edit: z.string(),
    }).strict()
  ).describe("A list of works, each providing details including ID, option, original text, and edited text"),
}).strict();

export const maxDuration = 120;
export const revalidate = 0; // Disable caching

export async function POST(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      async function processMessages() {
        try {
          const { messages, wikipediaContext = "" } =
            (await req.json()) as RequestBody;

          if (!messages || !Array.isArray(messages)) {
            controller.enqueue(
              `data: ${JSON.stringify({
                error: "Invalid messages format",
              })}\n\n`
            );
            controller.close();
            return;
          }

          const validMessages = messages.filter((msg) => msg.content);

          // Enhance prompt with Wikipedia context
          // const enhancedPrompt = `${ledePrimary.content}\n\nContext:\n"""""\n${wikipediaContext}\n"""""`;

          // ————————————————————————————————————o primary model —>
          //
          const primaryCompletion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
              { role: "system", content: worksPrimary.content },
              ...validMessages.map((msg) => ({
                role: msg.role || "user",
                content: msg.content,
              })),
            ],
            response_format: {
              type: "text",
            },
            temperature: 0.91,
            max_tokens: 4095,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          const primaryResult = primaryCompletion.choices[0].message.content;
          controller.enqueue(
            `data: ${JSON.stringify({ primary: primaryResult })}\n\n`
          );

          // ————————————————————————————————————o Secondary model —>
          //
          const secondaryCompletion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
              { role: "system", content: worksEdit.content },
              { role: "user", content: JSON.stringify(primaryResult) },
            ],
            response_format: zodResponseFormat(MusicReviewWorks, "result"),
            temperature: 0.91,
            max_tokens: 4095,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
          });

          const secondaryResult = secondaryCompletion.choices[0].message.parsed;
          
          controller.enqueue(
            `data: ${JSON.stringify({ secondary: secondaryResult })}\n\n`
          );

          // // ————————————————————————————————————o Tertiary model —>
          // //
          // const tertiaryCompletion = await openai.beta.chat.completions.parse({
          //   model: "gpt-4o-2024-08-06",
          //   messages: [
          //     { role: "system", content: ledeEvaluation.content },
          //     { role: "user", content: JSON.stringify(secondaryResult) },
          //   ],
          //   response_format: zodResponseFormat(MusicReviewLedes, "result"),
          //   temperature: 0.9,
          //   max_tokens: 4095,
          //   top_p: 1,
          //   frequency_penalty: 0,
          //   presence_penalty: 0,
          // });

          // const tertiaryResult = tertiaryCompletion.choices[0].message.parsed;
          // controller.enqueue(
          //   `data: ${JSON.stringify({ tertiary: tertiaryResult })}\n\n`
          // );
          controller.close();
        } catch (error) {
          console.error("API route error:", error);

          let errorMessage = "An unknown error occurred";
          if (error instanceof Error) {
            errorMessage = error.message;
          }

          controller.enqueue(
            `data: ${JSON.stringify({ error: errorMessage })}\n\n`
          );
          controller.close();
        }
      }

      processMessages();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
