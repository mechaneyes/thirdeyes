import {
    BedrockRuntimeClient,
    InvokeModelWithResponseStreamCommand,
  } from '@aws-sdk/client-bedrock-runtime';
  import { AWSBedrockLlama2Stream, StreamingTextResponse } from 'ai';
  import { experimental_buildLlama2Prompt } from 'ai/prompts';
   
  export async function POST(req: Request) {
    // Extract the `prompt` from the body of the request
    const { messages } = await req.json();
   
    const bedrockClient = new BedrockRuntimeClient({
      region: process.env.AWS_REGION ?? '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
   
    // Ask Claude for a streaming chat completion given the prompt
    const bedrockResponse = await bedrockClient.send(
      new InvokeModelWithResponseStreamCommand({
        modelId: 'meta.llama2-13b-chat-v1',
        // modelId: 'arn:aws:bedrock:us-east-1:923157297013:custom-model/meta.llama2-13b-v1:0:4k/qdllw9a421u9',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          prompt: experimental_buildLlama2Prompt(messages),
          max_gen_len: 1000,
        }),
      }),
    );
   
    // Convert the response into a friendly text-stream
    const stream = AWSBedrockLlama2Stream(bedrockResponse);
   
    // Respond with the stream
    return new StreamingTextResponse(stream);
  }