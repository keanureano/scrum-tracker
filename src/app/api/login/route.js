import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
