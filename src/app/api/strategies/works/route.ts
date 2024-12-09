import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import { worksPrimary, worksEdit } from "../prompts";

const openai = new OpenAI();

interface RequestBody {
  messages: any[];
  wikipediaContext?: string;
}

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
          console.log("🐮 Valid Messages", validMessages);

          // Enhance prompt with Wikipedia context
          // const enhancedPrompt = `${ledePrimary.content}\n\nContext:\n"""""\n${wikipediaContext}\n"""""`;

          // ————————————————————————————————————o primary model —>
          //
          const primaryCompletion = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
              { role: "system", content: worksPrimary.content },
              ...validMessages.map((msg) => ({
                role: msg.role || "user",
                content: msg.content,
              })),
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "works_schema",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    works: {
                      type: "array",
                      description:
                        "A collection of works that include an 'id', 'option', and 'edit'.",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            description: "A unique identifier for each work."
                          },
                          option: {
                            type: "string",
                            description:
                              "A description of the strategy and approach taken in the work."
                          },
                          edit: {
                            type: "string",
                            description:
                              "The detailed commentary or analysis regarding the work."
                          }
                        },
                        required: ["id", "option", "edit"],
                        additionalProperties: false
                      }
                    }
                  },
                  required: ["works"],
                  additionalProperties: false
                }
              }
            },
            temperature: 0.91,
            max_tokens: 4095,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          const primaryResult = primaryCompletion.choices[0].message.content;
          // console.log("🔍 Primary Result Type:", typeof primaryResult);
          // console.log("🔍 Primary Result Structure:", JSON.stringify(primaryResult, null, 2));
          // Parse the JSON string into an object, providing a default empty object if null
          const parsedResult = JSON.parse(primaryResult || '{}');
          
          controller.enqueue(
            `data: ${JSON.stringify({ primary: parsedResult })}\n\n`
          );
          console.log("🐮 Primary Result", parsedResult);
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
