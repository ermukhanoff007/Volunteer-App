import EventsList from "@/components/Event/EventList";
import { getEvents } from "@/server-actions/getEvents";

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsList events={events} />;
}
