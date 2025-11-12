"use server";
import { auth } from "@/auth/auth";
import {prisma} from "@/utils/prisma";

export default async function getParticipate() {
  const session = await auth();
  if (!session?.user.email) return null;
  const participation = await prisma.participation.findMany({
    where: { userId: session.user.id }, 
    include : {event:true}
  });
  return participation
}
