import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return await verifyUser(credentials);
      },
    }),
  ],
};

async function verifyUser(credentials) {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: credentials.username,
    },
  });

  if (!existingUser) {
    return null;
  }

  const correctPassword = await bcrypt.compare(
    credentials.password,
    existingUser.password
  );

  if (!correctPassword) {
    return null;
  }

  const { password, ...user } = existingUser;

  return user;
}
