"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: number) {
    await prisma.event.delete({
        where: {
            id: eventId
        }
    })
    revalidatePath("/events");
}