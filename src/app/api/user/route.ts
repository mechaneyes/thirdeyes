import prisma from '../../../lib/prisma'

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
  const users = await prisma.user.findMany()
  console.log('users', users)
  return Response.json({ users })
}

export default GET;
