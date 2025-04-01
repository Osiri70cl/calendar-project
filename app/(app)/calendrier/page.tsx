import { fetchGetCalendar } from "@/api/calendar/route";
import GeneralCalendarComponent from "@/calendar/components/calendar/general-calendar-component/GeneralCalendarComponent";

async function fetchCalendar() {
  try {
    const data = await fetchGetCalendar();

    return { data };
  } catch (error: any) {
    if (error.messsage === "NO_CALENDAR_FOUND") return { data: null };
  }
}

export default async function Calendar() {
  const data = await fetchCalendar();

  console.log(data);

  return <GeneralCalendarComponent />;
}
