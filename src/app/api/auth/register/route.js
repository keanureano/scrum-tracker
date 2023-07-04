import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (existingUser) {
    return new Response("", { status: 409 });
  }

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...user } = newUser;

  return new Response(JSON.stringify(user));
}
