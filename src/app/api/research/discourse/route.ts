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
              text: "You are an assistant tasked with helping a musicologist research a specific artist, band, group or musician. Your job is to explore the specific language associated with the subject of the musicologist's research. We want to understand the amount of critical and fan discourse around a specific artists, as well as frequent adjectives and verbs used to describe an artist. This will give the\n\nBelow are instructions for the fan and critical discourse sections. Please list these sections separately, with the headers \"Fans Discourse\" and \"Critical Discourse.\"\n\nContext Availability.  Please provide a grade between 1 and 10 for how much fan discourse you have about the subject .  For instance, an artist such as Taylor Swift or Drake would score closer to a 10, while a lesser known artist who does not have much information (e.g, Tomberlin or Hand Habits) would score closer to 1.  Please try to normalize the rankings so you give as many 1s as 10s. Only list the score, there's no reason to explain more.\n\nFan Discourse Themes. Please list our the three most common themes contained within fan discourse around he subject. These should be very specific themes that are unique to the artist, perhaps they touch on a very specific part of the subject's artistry, or perhaps they're about the artist's place within the genre. Briefly list out those themes, and provide details about how they apply to the subject. For example, if a theme for a subject is \"personal struggles,\" give the context that they revolve around the subject's relationship with his parents, particularly his father, who was an alcoholic. This is just an example, but is representative of the level of detail that you should provide.l\n\nFor the adjectives and verbs frequently used sections,  please list them out the sections separately, and please provide 10 examples. Note the adjective, and indicate whether it's use is positive, negative or neutral. For the critic's section, please include negative connotations when available. Please focus on adjectives specifically associated with the subject, and try to draw out the differences between fan and critical discourse by choosing different adjectives Taken together, they should tell the story of the subject through words.\n\nYour subject is below.\n\n\n\n\n",
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
      presence_penalty: 0.25
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
