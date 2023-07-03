import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (!existingUser) {
    return new Response("", { status: 404 });
  }

  if (!(await bcrypt.compare(body.password, existingUser.password))) {
    return new Response("", { status: 401 });
  }

  const { password, ...user } = existingUser;

  return new Response(JSON.stringify(user));
}
