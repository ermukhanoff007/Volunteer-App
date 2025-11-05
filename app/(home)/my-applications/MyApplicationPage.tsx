import MyApplications from "@/components/MyApplications";
import getParticipate from "@/server-actions/getParticipate";

export default async function MyApplicationsPage(){
    const participations = await getParticipate();
    return <MyApplications participations={participations ?? []}/>
}