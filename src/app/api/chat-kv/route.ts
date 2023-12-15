import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const title = await kv.hget('chat', 'title');
  console.log(title);
  return NextResponse.json(title);
}