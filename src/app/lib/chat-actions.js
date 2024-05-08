// 'use server'
"use server";

import { createClient } from "@vercel/kv";
import { getSession } from "@auth0/nextjs-auth0";
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function performReasoning(prompt) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt,
  });

  return { text };
}

// ————————————————————————————————————o get user —>
//
export async function getUser() {
  const { user } = await getSession();

  return user;

  //   const kv = createClient({
  //     url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
  //     token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
  //   });

  //   return user;

  //   const key = `user_${user.email}`;
  //   const userDataString = await kv.get(key);

  //   let userData;
  //   try {
  //     userData = JSON.parse(JSON.stringify(userDataString));
  //   } catch (error) {
  //     console.error("Invalid JSON:", userDataString);
  //   }

  //   if (userData) {
  //     // Check if any of the properties in userObject are not present
  //     const missingItems = ["name", "nickname", "email", "chats"].filter(
  //       (item) => !(item in userData)
  //     );

  //     if (missingItems.length > 0) {
  //       // If any items are missing, add them
  //       userData = missingItems.reduce((acc, item) => {
  //         acc[item] = user[item] || [];
  //         return acc;
  //       }, userData);

  //       // Save the updated userData back to the key-value store
  //       await setUser(user);
  //     }
  //   } else {
  //     console.log("User not found");
  //     setUser(user);
  //   }

  // console.log(`Key: ${key}`, userData);
}
