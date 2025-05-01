import { CalendarEvent } from "@/src/calendar/components/calendar/general-calendar-component/GeneralCalendarComponent";

interface EventComponentProps {
  event: CalendarEvent;
}

export default function EventComponent({ event }: EventComponentProps) {
  const getBackgroundColor = () => {
    const resource = event.resource;
    const visibility = event.visibility;

    if (resource) {
      switch (resource) {
        case "meeting":
        case "private":
          return "var(--primary)";
        case "lunch":
          return "var(--accent)";
        case "presentation":
          return "var(--secondary)";
        case "conference":
        case "public":
          return "var(--muted)";
        default:
          return "var(--primary)";
      }
    }

    if (visibility) {
      switch (visibility) {
        case "PRIVATE":
          return "var(--primary)";
        case "PUBLIC":
          return "var(--muted)";
        default:
          return "var(--primary)";
      }
    }

    return "var(--primary)";
  };

  return (
    <div
      className="cursor-pointer font-bold text-xs overflow-hidden"
      style={{
        color: "#fff",
        maxHeight: "15px",
        width: "100%",
      }}
    >
      {event.title}
    </div>
  );
}
