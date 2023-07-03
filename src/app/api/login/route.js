import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request) {
  console.log("asdasd");
  const body = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (!existingUser) {
    return null;
  }

  if (!(await bcrypt.compare(body.password, existingUser.password))) {
    return null;
  }

  const { password, ...user } = existingUser;

  return new Response(JSON.stringify(user));
}
