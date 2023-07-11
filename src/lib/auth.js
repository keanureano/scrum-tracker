import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
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

        return { user };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      return token;
    },
  },
  theme: {
    colorScheme: "light",
    brandColor: "#EFAA2D",
    logo: "/logo.png",
    buttonText: "",
  },
};
