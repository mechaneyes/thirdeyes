import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser() {
  await prisma.user.create({
    data: {
      id: 2,
      email: "alice@prisma.io",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });

  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}
