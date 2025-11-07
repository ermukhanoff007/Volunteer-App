import { IEvent } from "@/types/event.types";
import { create } from "zustand";
interface EventStore {
  events: IEvent[];
  filteredEvents: IEvent[];
  cityFilter: string;
  setEvents: (events: IEvent[]) => void;
  setCityFilter: (city: string) => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  filteredEvents: [],
  cityFilter: "",
  setEvents: (events: IEvent[]) => set({ events, filteredEvents: events }),
  setCityFilter: (city: string) => {
    const allEvents = get().events;
    const filtered = city
      ? allEvents.filter((event) => event.location.toLowerCase().includes(city.toLowerCase()))
      : allEvents;
    set({ cityFilter: city, filteredEvents: filtered });
  },
}));
