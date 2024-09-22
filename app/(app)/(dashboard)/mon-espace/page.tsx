import CalendarComponent from "@/calendar/components/calendar-component/CalendarComponent";
import { fetchEventsByUserId } from "@actions/events";

export default async function MonEspace() {
  const events = await fetchEventsByUserId(1);

  return (
    <div>
      <CalendarComponent eventData={events} />
    </div>
  );
}
