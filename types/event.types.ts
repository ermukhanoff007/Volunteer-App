export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string | null;
}

export interface IUser {
  id: string;
}

export interface ISession {
  user: {
    id: string;
    role: "USER" | "ORGANIZER";
  };
}

export interface IEventProps {
  events: IEvent[];
}
