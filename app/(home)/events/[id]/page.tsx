import { auth } from "@/auth/auth";
import EventComponent from "@/components/EventComponent";
import getUser from "@/server-actions/getUser";
import prisma from "@/utils/prisma";

interface IEventPageProps {
  params: { id: string };
}
export default async function EventPage({ params }: IEventPageProps) {
  const res = await params;
  console.log("Event ID:", res.id);
  const event = await prisma.event.findUnique({
    where: { id: Number(res.id) },
  });

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-600 text-lg">
        Event not found 😕
      </div>
    );
  }
  const user = await getUser();
  const session = await auth();

  return <EventComponent event={event} user={user} session={session} />;
}
