import { cn } from "@/lib/utils";
import { Calendar1, ChevronLeft, ChevronRight } from "lucide-react";
import { Views } from "react-big-calendar";

export default function CalendarToolbar({
  onNavigate,
  onView,
  view,
  isLargeScreen,
  messages,
}: any) {
  const goToToday = () => {
    onNavigate("TODAY");
  };

  const goToPrev = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToView = (viewType: string) => {
    onView(viewType);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-card rounded-md border">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={goToPrev}
          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={goToToday}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {isLargeScreen ? messages.today : <Calendar1 />}
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="flex gap-2">
        {isLargeScreen && Views.WEEK && (
          <button
            type="button"
            onClick={() => goToView(Views.WEEK)}
            className={cn(
              "px-3 py-1.5 rounded-md",
              view === Views.WEEK
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {messages.week}
          </button>
        )}
        {Views.DAY && (
          <button
            type="button"
            onClick={() => goToView(Views.DAY)}
            className={cn(
              "px-3 py-1.5 rounded-md",
              view === Views.DAY
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {messages.day}
          </button>
        )}
        {Views.MONTH && (
          <button
            type="button"
            onClick={() => goToView(Views.MONTH)}
            className={cn(
              "px-3 py-1.5 rounded-md",
              view === Views.MONTH
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {messages.month}
          </button>
        )}
      </div>
    </div>
  );
}
