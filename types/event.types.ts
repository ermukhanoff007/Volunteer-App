 interface IEvent {
    id: number;
    title: string;
    description: string;
    location: string;
    date: Date;
    image: string | null;
  }
  
  interface IUser {
    id: string;
  }
  
  interface ISession {
    user: {
      id: string;
      role: "USER" | "ORGANIZER";
    };
  }

  export interface IEventProps {
    events: IEvent[];
    user: IUser | null;
    session: ISession | null;
  }