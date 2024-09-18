import bcrypt from "bcrypt";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma as db } from "../utils/prismaDB";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: { email: credentials?.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            image: true,
          },
        });

        if (!user) {
          throw new Error("There is no user with that email");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.password as string,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  events: {
    async signIn(message) {
      console.log("Signed in!", { message });
    },
    async signOut(message) {
      console.log("Signed out!", { message });
    },
    async createUser(message) {
      console.log("User created!", { message });
    },
  },

  callbacks: {
    jwt({ token }) {
      return {
        id: token.id,
        name: token.name,
        email: token.email,
        picture: "",
      };
    },
    async session({ token, session }) {
      if (token && session?.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
};
