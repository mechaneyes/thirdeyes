import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  });

  return result.toAIStreamResponse();
}