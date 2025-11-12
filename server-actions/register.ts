"use server";

import prisma from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/password";
import { registerSchema } from "@/schema/zod";

export async function registerForm(data: unknown) {
  try {
    const { email, password } = registerSchema.parse(data);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User with that email already exists" };
    }

    const hashedPassword = await saltAndHashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
}
