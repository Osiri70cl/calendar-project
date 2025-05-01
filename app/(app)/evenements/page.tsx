import { fetchGetAllUserEvents } from "@/src/api/events/route";
import GeneralEventComponent from "@/src/events/components/general-event-component/GeneralEventComponent";
import "./event-custom.css";

async function fetchData() {
  try {
    const data = await fetchGetAllUserEvents();
    return { data };
  } catch (error: any) {
    if (error.message === "NO_EVENTS_FOUND") return { data: null };
    return { data: null, error: error.message || "An error occurred" };
  }
}

export default async function EventsPage() {
  const { data } = await fetchData();

  return <GeneralEventComponent allEvents={data || []} />;
}
