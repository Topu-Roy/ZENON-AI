import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { users } from "./users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text", placeholder: "john@app.com" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.email) {
          return null;
        }
        const user = users.find((user) => user.email === credentials.email);

        if (user?.password === credentials.password) {
          return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
