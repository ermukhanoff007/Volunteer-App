"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function unsubscribeEvent(eventId: number, userId: string) {
  await prisma.participation.delete({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });
  revalidatePath("/my-applications");
}
