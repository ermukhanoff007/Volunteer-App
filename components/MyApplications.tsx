import Link from "next/link";
import UnSubscribeButton from "./UnsubscribeButton";
import { IMyApplicationsProps } from "@/types/participation.types";

function MyApplicationsPage({ participations }: IMyApplicationsProps) {
  return (
    <section className="flex items-center flex-col mt-4">
      {participations.length === 0 && ( 
        <div className="flex flex-col items-center justify-center h-[900px]">
          <p className="text-gray-500 text-lg italic">You have not subscribed for any events yet.</p>
          <Link href="/events"className="text-blue-500 underline" >Go to events</Link>
        </div>
      )}
      <div className="flex flex-col rounded-xl gap-4 items-start bg-white shadow-lg">
        {participations.map((particpation) => (
          <div
            key={particpation.id}
            className="flex flex-row rounded-xl p-4 justify-between w-full items-center  h-[120px] border "
          >
            <div className="flex flex-row p-4 items-center justify-between w-[320px]">
              <div>
                <h4 className="text-xl">{particpation.event.title}</h4>
                <p>{particpation.event.location}</p>
              </div>
              <p>{new Date(particpation.event.date).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col justify-end">
              <UnSubscribeButton eventId={particpation.eventId} userId={particpation.userId} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyApplicationsPage;
