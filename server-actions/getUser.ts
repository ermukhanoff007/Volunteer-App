import { auth } from "@/auth/auth";
import prisma from "@/utils/prisma";

export default async function getUser() {
  const session = await auth();
  if (!session?.user.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  return user;
}
