"use server"
import { signOut } from "@/auth/auth";

export async function signOutFn() {
  try {
    const result = await signOut({ redirect: false });
    return result;
  } catch (error) {
    console.error("Autorization error", error);
    throw error;
  }
}
