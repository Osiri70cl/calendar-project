"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import frFR from "date-fns/locale/fr";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar1, ChevronLeft, ChevronRight } from "lucide-react";
import "./calendar-custom.css";

const locales = {
  fr: frFR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const myEventsList = [
    {
      id: 1,
      title: "Réunion d'équipe",
      start: new Date(currentYear, currentMonth, currentDay, 10, 0),
      end: new Date(currentYear, currentMonth, currentDay, 11, 30),
      allDay: false,
      resource: "meeting",
      description:
        "Discussion sur les objectifs du trimestre et répartition des tâches",
      location: "Salle de conférence A",
    },
    {
      id: 2,
      title: "Déjeuner client",
      start: new Date(currentYear, currentMonth, currentDay, 12, 30),
      end: new Date(currentYear, currentMonth, currentDay, 14, 0),
      allDay: false,
      resource: "lunch",
      description: "Déjeuner avec le client pour discuter du nouveau projet",
      location: "Restaurant Le Café Moderne",
    },
    {
      id: 3,
      title: "Présentation projet",
      start: new Date(currentYear, currentMonth, currentDay + 1, 15, 0),
      end: new Date(currentYear, currentMonth, currentDay + 1, 16, 30),
      allDay: false,
      resource: "presentation",
      description: "Présentation des maquettes finales au client",
      location: "Salle de réunion B",
    },
    {
      id: 4,
      title: "Conférence mensuelle",
      start: new Date(currentYear, currentMonth, currentDay + 3),
      end: new Date(currentYear, currentMonth, currentDay + 5),
      allDay: true,
      resource: "conference",
      description: "Conférence annuelle sur les nouvelles technologies",
      location: "Centre de conférence",
    },
  ];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const messages = {
    allDay: "Journée",
    previous: "Précédent",
    next: "Suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Événement",
    noEventsInRange: "Aucun événement dans cette plage",
  };

  const formatHeader = () => {
    return format(currentDate, "MMMM yyyy", { locale: frFR });
  };

  const eventPropGetter = (event) => {
    let className = "";
    let style = {
      borderRadius: "8px",
      border: "none",
      padding: "2px 5px",
      cursor: "pointer",
    };

    switch (event.resource) {
      case "meeting":
        style.backgroundColor = "var(--primary)";
        break;
      case "lunch":
        style.backgroundColor = "var(--accent)";
        break;
      case "presentation":
        style.backgroundColor = "var(--secondary)";
        break;
      case "conference":
        style.backgroundColor = "var(--muted)";
        break;
      default:
        style.backgroundColor = "var(--primary)";
    }

    return {
      className,
      style,
    };
  };

  const formatEventTime = (start, end, allDay) => {
    if (allDay) {
      return "Toute la journée";
    }

    const startFormat = format(start, "HH:mm", { locale: frFR });
    const endFormat = format(end, "HH:mm", { locale: frFR });
    return `${startFormat} - ${endFormat}`;
  };

  const formatEventDate = (date) => {
    return format(date, "EEEE d MMMM yyyy", { locale: frFR });
  };

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
          {Views.MONTH && (
            <button
              type="button"
              onClick={() => goToView(Views.MONTH)}
              className={cn(
                "px-3 py-1.5 rounded-md",
                toolbar.view === Views.MONTH
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
  };

  const EventComponent = ({ event }) => {
    return (
      <div className="cursor-pointer font-medium text-xs md:text-sm">
        {event.title}
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{formatHeader()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="p-4 flex-1">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 100px)" }}
          culture="fr"
          messages={messages}
          onNavigate={(date) => setCurrentDate(date)}
          eventPropGetter={eventPropGetter}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
          className="custom-calendar"
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  <div className="mt-2 space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Date
                      </div>
                      <div className="text-base">
                        {formatEventDate(selectedEvent.start)}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Heure
                      </div>
                      <div className="text-base">
                        {formatEventTime(
                          selectedEvent.start,
                          selectedEvent.end,
                          selectedEvent.allDay
                        )}
                      </div>
                    </div>

                    {selectedEvent.location && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Lieu
                        </div>
                        <div className="text-base">
                          {selectedEvent.location}
                        </div>
                      </div>
                    )}

                    {selectedEvent.description && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Description
                        </div>
                        <div className="text-base">
                          {selectedEvent.description}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
