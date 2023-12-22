import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string | null;
  image: string | null;
  // role: Role;
};

type Response = {
  users: User[];
};

export async function GET() {
  const users = await prisma.user.findMany();
  // console.log("users", users);
  return Response.json({ users });
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  let passedValue = await new Response(req.body).text();
  let valueToJson = JSON.parse(passedValue);

  const existingUser = await prisma.user.findUnique({
    where: { email: valueToJson.email },
  });

  if (existingUser) {
    res.status(400).json({ message: existingUser });
    return;
  }

  const user = await prisma.user.create({
    data: valueToJson,
  });

  // https://nextjs.org/docs/app/api-reference/functions/next-response#json
  return NextResponse.json(user)
}
