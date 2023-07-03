import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth";
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

        if (!user) return null;

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
