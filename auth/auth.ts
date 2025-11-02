import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema/zod";
import { getUserFromDb } from "@/utils/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/prisma";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email && !credentials.password) {
            throw new Error("Email and password are required");
          }

          const { email, password } = signInSchema.parse(credentials);

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error("Invalid credentials.");
          }
          const isPasswordValid = await bcryptjs.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { role: true },
        });
        if (dbUser) token.role = dbUser.role;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
