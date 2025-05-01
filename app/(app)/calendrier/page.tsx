import { fetchGetAllUserEvents } from "@/src/api/events/route";
import { GeneralCalendarComponent } from "@/src/calendar/components/calendar/general-calendar-component/GeneralCalendarComponent";

async function fetchData() {
  try {
    const data = await fetchGetAllUserEvents();
    return { data };
  } catch (error: any) {
    if (error.message === "NO_EVENTS_FOUND") return { data: null };
    return { data: null, error: error.message || "An error occurred" };
  }
}

export default async function CalendarPage() {
  const { data } = await fetchData();

  return <GeneralCalendarComponent eventsServer={data || []} />;
}
