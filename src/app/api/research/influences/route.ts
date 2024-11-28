import OpenAI from "openai";

const openai = new OpenAI();

export const maxDuration = 120;
export const revalidate = 0; // Disable caching

export async function POST(req: Request) {
  try {
    const message = await req.json();

    if (!message.content) {
      throw new Error("No content provided");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              text: 'You are an assistant tasked with helping a musicologist research a specific artist, band, group or musician. Your job is to explore the specific influences associated with the subject of the musicologist\'s research. \n\nWe want to understand the importance of influences for an artists as measured by the percentage of the discourse that\'s focused on the subject\'s influences. Please provide a four to five sentence overview of that, citing key themes and listing out a percentage.\n\nWe also want to understand the five most often cited artists or groups who influenced the subject, and how they influenced the subject. Please list five, and provide a sentence or two explaining the influence, being as specific as possible. \n\nAnd we also want to understand the sonic building blocks -- the sounds, genres, and approaches that impacted the subject. This should be a short, 4-6 sentence paragraph. \n\nAnd finally, we want to understand the larger societal context that informs the subject\'s artistry.  Please list out three to five factors, and in two or three sentences explain what they are, and very specifically how they were important to the subject, siting examples. For these, we want you to listen about specific societal culture conditions, and not summarize the subject\'s themes. Their themes and these conditions may influence one another, but we want you to focus on the conditions here.\n\nPlease break this out into five sections -- "The Importance of Influence," "Key Influences," "The Artist Building Blocks," and "Societal Context."\n\nIn your output, precede the titles of each of the sections with two pound signs, "##".\n\nYour subject is below.',
              type: "text",
            },
          ],
        },
        message,
      ],
      response_format: {
        type: "text",
      },
      temperature: 0.58,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0.24,
      presence_penalty: 0.25,
    });

    return new Response(
      JSON.stringify({
        success: true,
        content: completion.choices[0].message.content,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
