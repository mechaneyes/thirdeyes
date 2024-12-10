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

const PrimaryLedes = z.object({
  ledes: z.array(
    z.object({
      id: z.number().int(),
      strategy: z.string(),
      output: z.string(),
    })
  ),
});

const MusicReviewLedes = z.object({
  ledes: z.array(Lede),
});

export const maxDuration = 120;
export const revalidate = 0; // Disable caching

export async function POST(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      async function processMessages() {
        try {
          const { messages, wikipediaContext } = await req.json();

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
            model: "gpt-4o",
            messages: [
              { role: "system", content: ledePrimary.content },
              ...validMessages.map((msg) => ({
                role: msg.role || "user",
                content: msg.content,
              })),
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "ledes_schema",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    ledes: {
                      type: "array",
                      description:
                        "A collection of exactly 11 strategies and outputs associated with the artist Frankie Knuckles.",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            description:
                              "A unique identifier for the strategy.",
                          },
                          strategy: {
                            type: "string",
                            description:
                              "The specific strategy related to the artist.",
                          },
                          output: {
                            type: "string",
                            description:
                              "The detailed output or description corresponding to the strategy.",
                          },
                        },
                        required: ["id", "strategy", "output"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["ledes"],
                  additionalProperties: false,
                },
              },
            },
            temperature: 0.91,
            max_tokens: 1948,
            top_p: 1,
            frequency_penalty: 0.1,
            presence_penalty: 0.5,
          });

          const primaryResult = primaryCompletion.choices[0].message.parsed;

          console.log(
            "🎬 Primary Data",
            JSON.stringify(primaryResult, null, 2)
          );

          controller.enqueue(
            `data: ${JSON.stringify({ primary: primaryResult })}\n\n`
          );

          // ————————————————————————————————————o Secondary model —>
          //
          // const secondaryCompletion = await openai.beta.chat.completions.parse({
          //   model: "gpt-4o",
          //   messages: [
          //     { role: "system", content: ledeVoice.content },
          //     { role: "user", content: JSON.stringify(primaryResult) },
          //   ],
          //   response_format: zodResponseFormat(MusicReviewLedes, "result"),
          //   temperature: 0.83,
          //   max_tokens: 4095,
          //   top_p: 0.9,
          //   frequency_penalty: 0.29,
          //   presence_penalty: 1.25,
          // });

          // const secondaryResult = secondaryCompletion.choices[0].message.parsed;
          // controller.enqueue(
          //   `data: ${JSON.stringify({ secondary: secondaryResult })}\n\n`
          // );

          // ————————————————————————————————————o Tertiary model —>
          //
          const tertiaryCompletion = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
              { role: "system", content: ledeEvaluation.content },
              { role: "user", content: JSON.stringify(primaryResult) },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "ledes_schema",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    ledes: {
                      type: "array",
                      description:
                        "A collection of exactly 11 strategies and outputs associated with the artist Frankie Knuckles.",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            description:
                              "A unique identifier for the strategy.",
                          },
                          strategy: {
                            type: "string",
                            description:
                              "The specific strategy related to the artist.",
                          },
                          output: {
                            type: "string",
                            description:
                              "The detailed output or description corresponding to the strategy.",
                          },
                        },
                        required: ["id", "strategy", "output"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["ledes"],
                  additionalProperties: false,
                },
              },
            },
            temperature: 0.9,
            max_tokens: 1400,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          const tertiaryResult = tertiaryCompletion.choices[0].message.parsed;
          controller.enqueue(
            `data: ${JSON.stringify({ tertiary: tertiaryResult })}\n\n`
          );
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
