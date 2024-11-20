import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, res) {
  try {
    const { text } = req.body;
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    res.status(200).json({ embedding: response.data.data[0].embedding });
  } catch (error) {
    res.status(500).json({ error: "Error generating embedding" });
  }
}
