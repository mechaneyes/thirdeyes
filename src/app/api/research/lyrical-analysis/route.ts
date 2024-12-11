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
              type: "text",
              text: 'Your job is to discuss the subject\'s lyrics and identify artists who use a similar approach to lyrics as the subject  listed below.  \n\n##Scorecard##\n1.  Context Availability. Please provide a grade between 1 and 10 for how much information you have about the artist compared to other musicians.  For instance, an artist such as Pink Floyd or Bob Dylan would score closer to a 10, while an little known artist who does not have much information (e.g, Tomberlin or Hand Habits) would score closer to 1. Please normalize the scores so you give as many 1s as you do 10s.\n2. Lyrical Renown. Please provide a grade between 1 and 10 for how central the subject\'s lyrics are to the artist\'s identify. 10 would be an artist like Bob Dylan or Leonard Cohen, who is renowned for their lyrics. An artist who is not known for their lyrics, or who\'s lyrics are regarded as trite, dumb, boring, cliche, would score closer to 1.\n2. Lyrical Complexity. Please provide a grade between 1 and 10 for how complex the subject\'s lyrics are. Complexity is determined by the sophistication of their lyrics, how often and adeptly they employ specific poetics devices, or the complexity of their themes. 10 is very complex and refers to artist who tackle important themes in a nuanced, thoughtful manner. 1 is very simple, where the themes are simple and common, and relayed in a very straightforward manner.\n\n## Analysis Section##\n\nPlease provide analysis for each of the following criteria:\n\n* Themes*\nThis can range from the themes that a subject explores, as well as their perspective on those themes. Be specific and provide examples. It’s one thing to say that two singers both sing love songs, but it’s more relevant to understand that two singers focus on finding love in wartime, or that two singers focus on the anxiety that love occasionally creates.\n\n* Poetic Devices*\nYet another approach is to look at the poetic devices – do they frequently use metaphors or similes, are their songs surrealistic, and do they tend to use a specific type of imagery or enjambment, alliteration, symbolism, Anaphora, personification, paradox, etc.  Identify two or three common traits, be very specific (i.e., don\'t just say that they provide "vivid imagery," explain how they use imagery, whether it\'s mainly sensory imagery that describes the smell, sound or taste of something, or if imagery that enhances or provides a counter-point to the song\'s themes.  The more detailed and specific you can be, the better.\n\n3. Perspective.\nWhat do the subject\'s lyrics say about their attitude and worldview. Are they political? Lovelorn?  Honry? Lonely? Cynical? Defiant? Easy going? Etc.\n\nYour descriptions for the above criteria should be explained via three bullet points that capture different themes, poetic devices or perspectives the subject uses. Within each bullet point, provide a detailed explanation of between 150 and 200 words. When it\'s beneficial, site specific songs, but the emphasis in discussing those should be in supporting the themes and ideas you present in each of the above sections. Please bold each category name and list them first.\n\nFor themes, you should have three blurbs that are 150 to 200 words each. The same for poetic devices or perspectives. The total word count for this section should be approximately 1500 words.\n\n\nSee the below example for length and level of detail for each section:  \n\nExample 1:\n“#### Complex Rhyme Schemes\nRakim\'s ability to weave intricate rhymes seamlessly into his verses is a hallmark of his lyrical style. He employs internal rhymes, where rhyming words occur within the same line or in close proximity, creating a rhythmic complexity that enhances the flow of his delivery. For example, in "Eric B. Is President," Rakim uses multi-syllabic rhymes that not only align at the end of lines but also interlock within them, maintaining a consistent cadence and adding layers to the lyrical structure. This technique allows him to maintain a fluid narrative while keeping listeners engaged with unexpected rhyme patterns. Rakim\'s mastery of this device set a new standard for lyrical dexterity in hip-hop, influencing subsequent generations of MCs to explore more sophisticated approaches to rhyme construction.”\nExample 2:\n“### Urban and Industrial Imagery\nSonic Youth employs imagery that often draws on urban and industrial motifs, reflecting the chaotic and fragmented nature of city life. This imagery frequently includes settings like gritty streets, dimly lit rooms, and sprawling urban landscapes, which serve as backdrops for their explorations of alienation and existential angst. For instance, in "Shadow of a Doubt," the lyrics evoke a sense of dreamlike uncertainty with surreal images such as "a train runs through the middle of the house" and "a shadow of a doubt." These images create an atmosphere that blurs the lines between reality and imagination, capturing the disorienting experience of modern life.\nThe band\'s imagery is also rooted in the cultural moment of the 1980s and 1990s, reflecting the post-punk and no-wave movements\' emphasis on raw, unfiltered expression. Sonic Youth\'s lyrics often incorporate references to contemporary art and media, using imagery to critique consumerism and commodification. In "Kool Thing," for example, they blend visual motifs from popular culture with subversive commentary on gender dynamics and artistic integrity.”\n\nExample 3:\n“### Symbolism\nSonic Youth\'s lyrics are rich with symbolism, often employing objects, colors, and natural elements to convey complex emotions and themes. One recurring symbol in their work is water, which appears in songs like "The Diamond Sea." Here, water serves as a metaphor for the fluidity and impermanence of relationships, capturing the ebb and flow of love and loss. This use of water as a symbol allows the band to explore themes of emotional depth and transformation, inviting listeners to contemplate the transient nature of human connections.\nAnother prominent symbol in Sonic Youth\'s lyrics is light, which frequently represents enlightenment, revelation, or clarity amidst chaos. In "Candle," light is used to signify hope and guidance, contrasting with the surrounding darkness that symbolizes confusion or despair. This duality reflects the band\'s exploration of existential themes, where moments of insight are juxtaposed against a backdrop of uncertainty and alienation.\nSonic Youth also employs symbols drawn from urban and industrial settings to critique contemporary culture. For example, in "Expressway to Yr Skull," the expressway becomes a symbol of modern life\'s relentless pace and the dehumanizing effects of consumerism. By using such symbols, Sonic Youth critiques societal norms and challenges listeners to question the status quo. Their symbolic language often blurs the line between reality and abstraction, creating a rich tapestry that encourages multiple interpretations and deeper engagement with their music.”\n\n\n## Similar Artists##\n\nWe want to identify different artists and groups who influenced the subject’s approach to lyrics. This can range from the themes that a subject explores, as well as their perspective on those themes (i.e., it’s one thing to say that two singers both sing love songs, but it’s more relevant to understand that two singers focus on finding love in wartime, or that two singers focus on the anxiety that love occasionally creates). Another approach for this is the types of songs, whether this is a folk ballad or both work within the tradition of hip-hop storytelling, or both sing punk rock protest songs. Yet another approach is to look for similarities when it comes to poetic devices – do they use similar types of metaphors, are their songs surrealistic, and do they use similar types of imagery or enjambment, alliteration, etc. Ideally, the influences you site would share multiple traits with the subject, and you should be very specific in terms of what those shared trains are.\n\nGroup this into four sections. \n1. The first section should have the header "Genre Similars," and these examples should come within the subject\'s genre. The more specific you can get within the subject’s sub-genre, the better. If an artist is considered g-funk, compare them to other g-funk artists and not to \n2. The section section should have the header "Contemporaries." The artist in this section should be within the same era as the subject.  They do not have to be within the same subgenre, but they deal with similar themes and use similar approaches.\n3. The next section should have the header "Influences." You don\'t have to pick artist who the subject has said influence them, rather you can chose artist who preceded the subject and likely had an impact on their work. \n4. The third section is titled "Wild Card."  Please choose artists who might surprise the user. These may not be within the subject’s genre or his era, and they are not artists who the reader frequently associates with the subject, but they do share some of the approaches outlined above.  Please do not favor similar artists who are well-known for their lyrics, and avoid comparing everyone to lyricists like Bob Dylan, Tom Waits, Leonard Cohon, Gil Scott-Heron, Johnny Cash, Nick Drake, Patti Smith, Nas, etc.  Not everyone is a lyricist of that caliber, and the subject may or may not be adept at writing lyrics. If an artist is not known for their lyrics, do not compare them to someone who is – find others who have the same or similar score for "lyrical complexity" or "renown." What we are looking for rather is the specificity of their similar characteristics rather than the quality or renown of those lyrics.  Favor "wild card" artists who are specific matches for the subjects -- if the "wild card" selections can apply to a broad range of artists rather than the specific subject stipulated below, they are less valuable to the researcher. The goal here is to present interesting and relevant selections that the researcher may not have thought about themselves.\n\nGuidelines:\n1. Relate the artist to one another based on their lyrics, not their sound, popularity or reputation. \n3 .Please choose two simliar for each category.  For each section, try to pick out one artist who is well known and recognizable, and another who is more obscure but still relevant.\n4. We are looking only for similarities in between artists\' lyrics.  Please focus only on that – and not the sound of their music, their popularity, or their career evolution.\n5. Please bold the section headers in your output. Below that list the artist in italics, and then describe the subjects similarities to those artists in three or four sentences. \n6. When describing the similarities, list out the ways that they are similar, as well as the ways that they are different. \n\n#Notes on Writing Style and Voice##\nThis will be used as a research tool for music experts who are writing biographies. The prose should be dry, analytical, and academic.  Don\'t be afraid of using obscure words or complex ideas. Write at a post-graduate writing level. Avoid colorful language. Most importantly, the observations should be precise and very specific. Some examples of being specific within music writing:\n\na. Instead of saying: "His early work with groups like Transmission Trio and Antibalas Afrobeat Orchestra provided him with diverse experiences that fueled his innovative trajectory. " Say:  “His formative years included playing with ensembles like Transmission Trio and Antibalas Afrobeat Orchestra, where he honed his improvisational skills and gained exposure to the rich rhythms of jazz and Afrobeat.” \nb. Instead of saying: "he crafted songs that reflected both his artistic independence and an eclectic blend of influences," say: “he crafted songs blending influences, ranging from the introspective folk of Elliott Smith to the lo-fi experimentation of Pavement and the melodic sensibilities of The Beatles.”\nc. Instead of saying: “where he met kindred spirits who shared his enthusiasm for raw, unpolished sounds. His collaborations with fellow musicians served as a catalyst for honing his unique style, which would eventually capture the attention of a broader audience.” Say: “he found camaraderie among musicians who shared his enthusiasm for raw, unpolished sounds reminiscent of indie acts like Neutral Milk Hotel and Guided by Voices. Engaging with peers such as Emily Yacina and Rachel Giannascoli, he collaborated on projects that allowed him to refine his distinctive sound—a mix of lo-fi textures, introspective lyrics, and unconventional song structures.”\nd. Instead of saying:  “Her time with the band exposed her to soulful R&B sounds and honed her skills, setting the stage for her future as a solo artist.” Say: “Her experience with the band allowed her to refine her vocal techniques and stage presence, providing a crucial learning ground for the smooth, emotive style she would soon develop.” \ne. Instead of saying: “The band’s early performances at downtown venues helped to establish ANOHNI’s presence as a powerful and innovative performer willing to push boundaries and meld various styles.“ Say: “ She pushed the boundaries of conventional pop by blending baroque pop, ambient music, and cabaret into her sound, creating a unique musical approach that challenged and captivated audiences.”\nf. Instead of saying: “Her involvement with experimental theater collectives further honed her unique approach to music and performance, leading to the formation of Antony and the Johnsons.” Say: “Her involvement with experimental theater collectives allowed her to explore themes of identity and transformation. Through this experience, she begin blending theatrical storytelling with emotive musical compositions, leading to the formation of Antony and the Johnsons.”\ng. Instead of saying this: “This convergence of talents allowed them to meld distinct influences into a cohesive and innovative musical project.” Say this: “Cornell brought an introspective grunge ethos marked by powerful and emotive vocals, while Morello, Commerford, and Wilk contributed their background in alternative metal and rap-rock, characterized by intricate guitar work, rhythmic precision, and politically charged undertones.” \nh. Instead of saying: “Their mutual appreciation for minimalist compositions and atmospheric soundscapes set the foundation for their unique musical identity.” Say: “Their sound emerged from a shared fascination with vintage keyboards, minimalist melodies, and dreamy soundscapes, drawing on influences like the sparse beauty of Mazzy Star and the ethereal textures of Cocteau Twins.”\ni. Instead of saying: “This melding of styles was further enriched by their participation in the Baltimore indie scene, where they honed their craft alongside other pioneering musicians.” Say: “This melding of styles was further enriched by their participation in the Baltimore indie scene, where they honed their craft alongside other pioneering musicians like Animal Collective and Dan Deacon.”\nj. Instead of saying: "He played alongside prominent local musicians," say: "He played alongside prominent local musicians such as Tommy Flanagan, Milt Jackson, and Wardell Gray."\nK. Instead of saying: “ He experimented with the jacking beats and electronic innovation characteristic of the era, producing tracks that reflected the raw energy and evolving soundscape of Chicago\'s underground clubs." Say:  “Chicago\'s underground clubs became breeding grounds for innovation, with DJs and producers like Stallings playing sets that combined mechanical rhythms with soulful vocals, creating an atmosphere that was both exhilarating and transformative."\nL. Instead of saying: “This early exposure provided a rich tapestry of sounds that influenced his journey into music production, encouraging a blend of organic and electronic elements that became a hallmark of his work." Say: “As he began creating music, Hebden combined organic elements like live instrumentation and field recordings with beats and digital manipulation, crafting a sound that intertwined acoustic textures with electronic rhythms.\n\n#Final Instructions##\nBelow, you will find the subject. Using the guidelines above, perform your analysis. If the subject is not a singer or a lyricists, please simply say, "The subject is not a singer or a lyricists."\n\nFormatting Output\nIn the output you return, start any headers/headlines that are of the highest order with two pound signs, ##.\nSubsequent headers should be preceded by three pound signs, ###.\nContinue this matching your order of importance, but go no further down and five pound signs, #####.\nDo not add any pound signs to the ends of these lines.\nDo not use stars to signify headlines. Stick to pound signs.\nIn the “Similar Artists” section, using the example below you will replace “[artist_name]” with the artist name. Do not wrap that artist name in star signs, “*”. So instead of writing “#### *Aphex Twin*”, you will write “#### Aphex Twin”. And in your analysis about that artist do not wrap that analysis in “*” signs; it should just be straight copy.\n\nAn example of the headers you will output should follow something like this:\n\n```\n## Analysis Section\n\n### Themes\n#### Urban Decay and Existential Despair\n#### Sexual Ambiguity and Identity\n#### Artistic Alienation\n\n### Poetic Devices\n#### Narrative Storytelling\n#### Vivid Imagery\n#### Symbolism\n\n\n### Perspective  \n#### Cynical Realism\n#### Defiant Nonconformity\n#### Introspective Reflection\n\n\n## Similar Artists. \n\n### Genre Similars. \n#### [artist_name]\n#### [artist_name]\n```\n',
            },
          ],
        },
        message,
      ],
      response_format: {
        type: "text",
      },
      temperature: 0.37,
      max_tokens: 1200,
      top_p: 1,
      frequency_penalty: 0.05,
      presence_penalty: 0.2,
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
