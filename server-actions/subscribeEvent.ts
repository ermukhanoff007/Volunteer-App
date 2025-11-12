"use server";

import {prisma} from "@/utils/prisma";

export async function subscribeEvent(eventId: number, userId: string) {
  const existing = await prisma.participation.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });
  if (existing) return { success: false, message: "Already subscribed" };

  const participation = await prisma.participation.create({
    data: {
      userId,
      eventId,
    },
  });

  return { success: true, participation };
}
