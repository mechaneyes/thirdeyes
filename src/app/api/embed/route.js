import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}