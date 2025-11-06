"use server"

import prisma from "@/utils/prisma"

export async function isUserSubscribed (eventId : number ,userId : string) {
    const participation = await prisma.participation.findUnique({
        where : {
            userId_eventId : {
                userId ,eventId
            }
        }
    })
    return !!participation
}