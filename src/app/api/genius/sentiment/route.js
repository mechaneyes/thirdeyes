export async function POST(req) {
  const res = await req.json();
  console.log("res", res);

  //   const newPrompt = `Summarize the key points from this conversation so far: ${messageFromChat}`;

  //   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: newPrompt }],
  //   });

  //   console.log("response", response);

  return Response.json({ res });
}
