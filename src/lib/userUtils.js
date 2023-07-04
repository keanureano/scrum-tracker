import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function createUser(body) {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (existingUser) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
    },
  });

  const { password, ...user } = newUser;

  return user;
}
