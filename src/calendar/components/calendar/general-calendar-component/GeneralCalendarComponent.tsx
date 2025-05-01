"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FormProvider, useForm } from "react-hook-form";
import "./calendar-custom.css";

import { format } from "date-fns/format";
import { getDay } from "date-fns/getDay";
import { fr } from "date-fns/locale/fr";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

import CalendarHeader from "@/src/calendar/components/calendar/calendar-header/CalendarHeader";
import CalendarToolbar from "@/src/calendar/components/calendar/calendar-toolbar/CalendarToolbar";
import CreateEventDialog from "@/src/calendar/components/calendar/create-event/CreateEventDialog";
import EventComponent from "@/src/calendar/components/calendar/event-component/EventComponent";
import ViewEventDialog from "@/src/calendar/components/calendar/view-event/ViewEventDialog";

const frenchMessages = {
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

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

type GeneralCalendarComponentProps = React.ComponentPropsWithoutRef<"div"> & {
  eventsServer?: any[];
};

export function GeneralCalendarComponent({
  className,
  eventsServer = [],
  ...props
}: GeneralCalendarComponentProps) {
  const methods = useForm({
    defaultValues: {
      user: {
        firstName: "Remi",
        lastName: "Uxer",
        email: "remi@uxer.fr",
        telephone: "+33612345678",
      },
      events: eventsServer,
      selectedEvent: {},
      eventCreation: {},
    },
  });
  const { setValue, watch } = methods;
  const events = watch("events");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [newEventSlot, setNewEventSlot] = useState<any>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectEvent = (event: any) => {
    const originalEvent = events.find((e) => e.id === event.id);
    setSelectedEvent(originalEvent);
    setIsViewDialogOpen(true);
  };
  const handleSelectSlot = (slotInfo: any) => {
    const startDate = slotInfo.start;
    const endDate = slotInfo.end;

    const startISO = startDate.toISOString();
    const startTime = format(startDate, "HH:mm", { locale: fr });
    const endTime = format(endDate, "HH:mm", { locale: fr });

    const formattedStartDate = format(startDate, "yyyy-MM-dd", { locale: fr });
    const formattedEndDate = format(endDate, "yyyy-MM-dd", { locale: fr });

    const dataOfSelectedEvent = {
      startDate: startISO,
      endDate: startISO,
      startTime,
      endTime,
      formattedStartDate,
      formattedEndDate,
    };

    setValue("selectedEvent", dataOfSelectedEvent);
    setNewEventSlot(slotInfo);
    setIsCreateEventOpen(true);
  };

  const handleCreateEventClick = () => {
    setNewEventSlot({
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      slots: [new Date()],
      action: "click",
    });
    const currentDate = new Date();
    const dataOfSelectedEvent = {
      startDate: currentDate.toISOString(),
      endDate: currentDate.toISOString(),
    };
    setValue("selectedEvent", dataOfSelectedEvent);
    setIsCreateEventOpen(true);
  };

  const renderCalendar = useMemo(() => {
    const adaptedEvents = events.map((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      let adjustedEnd = end;
      if (start.getTime() === end.getTime()) {
        adjustedEnd = new Date(start.getTime() + 30 * 60 * 1000);
      }
      const startDay = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate()
      );
      const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const isMultiDay = startDay.getTime() !== endDay.getTime();

      return {
        id: event.id,
        title: event.name,
        start: start,
        end: adjustedEnd,
        allDay: isMultiDay,
        resource: event.visibility,
      };
    });

    return (
      <Calendar
        localizer={localizer}
        events={adaptedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 100px)" }}
        culture="fr"
        messages={frenchMessages}
        onNavigate={(date) => setCurrentDate(date)}
        components={{
          toolbar: (props) => (
            <CalendarToolbar
              {...props}
              isLargeScreen={isLargeScreen}
              messages={frenchMessages}
            />
          ),
          event: EventComponent,
        }}
        className="custom-calendar"
        onSelectEvent={handleSelectEvent}
        selectable={true}
        onSelectSlot={handleSelectSlot}
      />
    );
  }, [events, isLargeScreen, watch("events")]);

  return (
    <FormProvider {...methods}>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <CalendarHeader currentDate={currentDate} />
      </header>
      <div className="p-4 flex-1 relative">
        {renderCalendar}
        <Button
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
          size="icon"
          onClick={handleCreateEventClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        event={selectedEvent}
      />

      <CreateEventDialog
        open={isCreateEventOpen}
        onOpenChange={setIsCreateEventOpen}
        eventSlot={newEventSlot}
      />
    </FormProvider>
  );
}
