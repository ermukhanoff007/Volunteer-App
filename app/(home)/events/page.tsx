import CityFilter from "@/components/CityFilter";
import EventsPage from "./EventsPage";

const page = () => {
  return <div className="flex items-start justify-center p-4 gap-4">
    <CityFilter/>
    <EventsPage />
  </div>
};
export default page;
