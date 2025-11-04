import EventsList from '@/components/EventList';
import { getEvents } from '@/server-actions/getEvents';
import getUser from '@/server-actions/getUser';

export default async function EventsPage() {
  const events = await getEvents();
  const user = await getUser();

  return <EventsList events={events} user={user} />;
}