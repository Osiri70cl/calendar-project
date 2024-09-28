import CalendarComponent from "@/calendar/components/calendar-component/CalendarComponent";
import { fetchEventsByUserId, getSharedEvents } from "@actions/events";

export default async function CalendrierPartage({ params }: any) {
  console.log(params, "params");
  const token = params.token;

  if (!token) {
    return {
      errors: {
        _form: ["Invalid share token"],
      },
    };
  }
  const events = await getSharedEvents(token);
  console.log(events);

  return (
    <div>
      <CalendarComponent eventData={events} publicCalendar={true} />
    </div>
  );
}
