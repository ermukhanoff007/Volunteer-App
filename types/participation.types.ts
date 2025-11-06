import { Prisma } from "@/lib/generated/prisma/client";


type ParticipationsWithEvent = Prisma.ParticipationGetPayload<{
    include: { event: true };
  }>;
  export interface IMyApplicationsProps {
    participations: ParticipationsWithEvent[];
  }