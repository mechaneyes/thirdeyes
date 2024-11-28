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
          "content": [
            {
              "text": "Your job is to discuss the production qualities and the sound of the subject listed below.  \n\n### Summary ##\nPlease provide a brief (short paragraph) description that summarizes the subject's sound, production techniques and also speaks to the importance of their sound within their work.  Keep in mind, lyrics are not important to every artist, and it's okay to say that. \n\n##Scorecard##\n1.  Context Availability. Please provide a grade between 1 and 10 for how much information you have about the artist compared to other musicians.  For instance, an artist such as Pink Floyd or Bob Dylan would score closer to a 10, while an lesser known artist who does not have much information (e.g, Tomberlin or Hand Habits) would score closer to 1. Please normalize the scores so you give as many 1s as you do 10s.\n\n\n## Analysis Section##\n\nPlease provide analysis for each of the following criteria:\n\n1. Primary Instruments/ Equipment. For this piece of analysis, please list out the instruments or production equipment that the subject uses. Generate two paragraphs, and be specific as possible. List out specific makes and models if known. Discuss the tone of their instruments, or any unusual ways they use them,\n2. Genre/ Subgenre associations. Please list the genres and subgenres that they are most closely associated with. If they blend different genres or subgenres, please note that, and in detail, describe the different ways that they blend these different elements (e.g. if their drums come from classic soul and their guitar sound takes cues from post-punk). Be as specific and detailed as possible here, and site examples when that helps reinforce your theme. Also provide any contextual information that you have about how their sound corresponds to others in their genre – is it similar, or is it unique?\n3. Consistency and Evolution. Does the subject have a consistent sound, or does it vary by song or release? If it does vary, how does it vary – what elements are added and what elements are replaced, and how has that affected their overall music and impact. Similarly, how has that sound evolved over time?\n4. Melodic approach.  If you have any available data, relay any observations around the subject's use of melody.  Discuss their hooks and choruses, how they approach things like pitch, contour or phrasing, and how this impacts their overall sound. Don't be afraid to be technical. If there is not any or much information available, please say so.\n5. Rhythmic  approach.   If you have any available data, relay any observations around the subject's use of rhythm -- the beats, tempos and meters they use, or whether their sound is syncopated or polyrhythmic.  Also discuss the traditions and genres that they use. If there is not any or much information available, please say so.\n\n\nYour descriptions for the above criteria should be explained via three bullet points that capture different themes, poetic devices or perspectives the subject uses. Within each bullet point, provide a three to four sentence explanation.  Be concise -- focus on the specifics and details, and forgo broad generalizations. When it's beneficial, site specific songs, but the emphasis in discussing those should be in supporting the themes and ideas you present in each of the above sections. Please bold each category name and list them first.\n\n## Similar Artists##\n\nWe want to identify different artists and groups who influenced the subject’s approach to their sound and production. \n\nThis can range from the genres and subgenres that they used, their approach to melody, rhythm, texture, harmony – what type of key they prefer (major vs. minor), and the emotions and imagery their sound evokes. It can also focus on similarities in the tone of their instrumentation, or  specific ways that they stylized their production, whether their sound is considered  lo-fi,  retro, glossy, etc. The more nuanced and idiosyncratic the similarities are the better.\n\nGroup this into four sections. \n1. The first section should have the header \"Genre Similars,\" and these examples should come within the subject's genre. The more specific you can get within the subject’s sub-genre, the better. If an artist is considered g-funk, compare them to other g-funk artists.\n2. The section section should have the header \"Contemporaries.\" The artist in this section should be within the same era as the subject.  They do not have to be within the same genre, but they deal with similar themes and use similar approaches.\n3. The next section should have the header \"Influences.\" You don't have to pick artist who the subject has said influence them, rather you can chose artist who preceded the subject and likely had an impact on their work. \n4. The third section is titled \"Wild Card.\"  Please choose artists who might surprise the user. These may not be within the subject’s genre or his era, and they are not artists who the reader frequently associates with the subject, but they do share some of the approaches outlined above.   Favor \"wild card\" artists who are specific matches for the subjects -- if the \"wild card\" selections can apply to a broad range of artist rather than the specific subject, they are less valuable to the researcher. \n\nGuidelines:\n1. Relate the artist to one another based on their sound, not their lyrics, popularity or cultural impacts. \n3 .Please choose two similar for each category.  For each section, try to pick out one artist who is well known and recognizable, and another who is more obscure but still relevant.\n4. We are looking only for similarities in between artists' sound.  Please focus only on that – and not the sound of their music, their popularity, or their career evolution.\n5. Please bold the section headers in your output. Below that list the artist in italics, and then describe the subjects similarities to those artists in three or four sentences. \n6. When describing the similarities, list out the ways that they are similar, as well as the ways that they are different. \n\n#Notes on Writing Style and Voice##\nThis will be used as a research tool for music experts who are writing biographies. The prose should be dry, analytical, and academic.  Don't be afraid of using obscure words or complex ideas. Write at a post-graduate writing level. Avoid colorful language. Most importantly, the observations should be precise and very specific. Some examples of being specific within music writing:\na. Instead of saying: \"His early work with groups like Transmission Trio and Antibalas Afrobeat Orchestra provided him with diverse experiences that fueled his innovative trajectory. \" Say:  “His formative years included playing with ensembles like Transmission Trio and Antibalas Afrobeat Orchestra, where he honed his improvisational skills and gained exposure to the rich rhythms of jazz and Afrobeat.” \nb. Instead of saying: \"he crafted songs that reflected both his artistic independence and an eclectic blend of influences,\" say: “he crafted songs blending influences, ranging from the introspective folk of Elliott Smith to the lo-fi experimentation of Pavement and the melodic sensibilities of The Beatles.”\nc. Instead of saying: “where he met kindred spirits who shared his enthusiasm for raw, unpolished sounds. His collaborations with fellow musicians served as a catalyst for honing his unique style, which would eventually capture the attention of a broader audience.” Say: “he found camaraderie among musicians who shared his enthusiasm for raw, unpolished sounds reminiscent of indie acts like Neutral Milk Hotel and Guided by Voices. Engaging with peers such as Emily Yacina and Rachel Giannascoli, he collaborated on projects that allowed him to refine his distinctive sound—a mix of lo-fi textures, introspective lyrics, and unconventional song structures.”\nd. Instead of saying:  “Her time with the band exposed her to soulful R&B sounds and honed her skills, setting the stage for her future as a solo artist.” Say: “Her experience with the band allowed her to refine her vocal techniques and stage presence, providing a crucial learning ground for the smooth, emotive style she would soon develop.” \ne. Instead of saying: “The band’s early performances at downtown venues helped to establish ANOHNI’s presence as a powerful and innovative performer willing to push boundaries and meld various styles.“ Say: “ She pushed the boundaries of conventional pop by blending baroque pop, ambient music, and cabaret into her sound, creating a unique musical approach that challenged and captivated audiences.”\nf. Instead of saying: “Her involvement with experimental theater collectives further honed her unique approach to music and performance, leading to the formation of Antony and the Johnsons.” Say: “Her involvement with experimental theater collectives allowed her to explore themes of identity and transformation. Through this experience, she begin blending theatrical storytelling with emotive musical compositions, leading to the formation of Antony and the Johnsons.”\ng. Instead of saying this: “This convergence of talents allowed them to meld distinct influences into a cohesive and innovative musical project.” Say this: “Cornell brought an introspective grunge ethos marked by powerful and emotive vocals, while Morello, Commerford, and Wilk contributed their background in alternative metal and rap-rock, characterized by intricate guitar work, rhythmic precision, and politically charged undertones.” \nh. Instead of saying: “Their mutual appreciation for minimalist compositions and atmospheric soundscapes set the foundation for their unique musical identity.” Say: “Their sound emerged from a shared fascination with vintage keyboards, minimalist melodies, and dreamy soundscapes, drawing on influences like the sparse beauty of Mazzy Star and the ethereal textures of Cocteau Twins.”\ni. Instead of saying: “This melding of styles was further enriched by their participation in the Baltimore indie scene, where they honed their craft alongside other pioneering musicians.” Say: “This melding of styles was further enriched by their participation in the Baltimore indie scene, where they honed their craft alongside other pioneering musicians like Animal Collective and Dan Deacon.”\nj. Instead of saying: \"He played alongside prominent local musicians,\" say: \"He played alongside prominent local musicians such as Tommy Flanagan, Milt Jackson, and Wardell Gray.\"\nK. Instead of saying: “ He experimented with the jacking beats and electronic innovation characteristic of the era, producing tracks that reflected the raw energy and evolving soundscape of Chicago's underground clubs.\" Say:  “Chicago's underground clubs became breeding grounds for innovation, with DJs and producers like Stallings playing sets that combined mechanical rhythms with soulful vocals, creating an atmosphere that was both exhilarating and transformative.\"\nL. Instead of saying: “This early exposure provided a rich tapestry of sounds that influenced his journey into music production, encouraging a blend of organic and electronic elements that became a hallmark of his work.\" Say: “As he began creating music, Hebden combined organic elements like live instrumentation and field recordings with beats and digital manipulation, crafting a sound that intertwined acoustic textures with electronic rhythms.\n\n#Final Instructions##\nBelow, you will find the subject. Using the guidelines above, perform your analysis.\n\n",
              "type": "text"
            }
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
