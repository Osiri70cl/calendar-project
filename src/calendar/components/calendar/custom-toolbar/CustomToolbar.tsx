import { cn } from "@/lib/utils";

const CustomToolbar = (toolbar) => {
  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const goToPrev = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToView = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-card rounded-md border">
      {/* Left section - Navigation buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={goToPrev}
          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
        >
          {messages.previous}
        </button>
        <button
          type="button"
          onClick={goToToday}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {messages.today}
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
        >
          {messages.next}
        </button>
      </div>

      {/* Middle section - Month/year label - can be removed if not needed */}
      {/* <span className="font-medium">{toolbar.label}</span> */}

      {/* Right section - View options (only week and day) */}
      <div className="flex gap-2">
        {Views.WEEK && (
          <button
            type="button"
            onClick={() => goToView(Views.WEEK)}
            className={cn(
              "px-3 py-1.5 rounded-md",
              toolbar.view === Views.WEEK
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
              toolbar.view === Views.DAY
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {messages.day}
          </button>
        )}
        {/* Month and Agenda views removed */}
      </div>
    </div>
  );
};

export default CustomToolbar;
