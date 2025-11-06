import { auth } from "@/auth/auth";
import EventsList from "@/components/EventList";
import { getEvents } from "@/server-actions/getEvents";
import getUser from "@/server-actions/getUser";

export default async function EventsPage() {
  const events = await getEvents();
  const user = await getUser();
  const session = await auth();

  return <EventsList events={events} user={user} session={session} />;
}
