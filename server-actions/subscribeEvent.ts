"use server";

import prisma from "@/utils/prisma";

export async function subscribeEvent(eventId: number, userId: string) {
  return await prisma.participation.create({
    data: {
      userId,
      eventId,
    },
  });
}
