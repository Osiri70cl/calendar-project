"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEventDialog from "@/src/calendar/components/calendar/create-event/CreateEventDialog";
import ViewEventDialog from "@/src/calendar/components/calendar/view-event/ViewEventDialog";
import { Separator } from "@radix-ui/react-separator";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import EventCard from "../event-card/EventCard";

type Props = {
  allEvents: any[];
};

const GeneralEventComponent = ({ allEvents }: Props) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const methods = useForm({
    defaultValues: {
      user: {
        firstName: "Remi",
        lastName: "Uxer",
        email: "remi@uxer.fr",
        telephone: "+33612345678",
      },
      events: allEvents,
      selectedEvent: {},
      eventCreation: {},
    },
  });
  const { setValue, watch } = methods;
  const [newEventSlot, setNewEventSlot] = useState<any>(null);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const events = watch("events");

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const referenceDate = new Date();
    const processedEvents = events.map((event) => ({
      ...event,
      dateObj: new Date(event.startDate),
      attendees: event.participants
        ? event.participants.map((p) => ({
            name: p.user ? `${p.user.firstname} ${p.user.lastname}` : "Unknown",
          }))
        : [],
    }));

    const upcoming = processedEvents.filter(
      (event) => new Date(event.endDate) >= referenceDate
    );

    const past = processedEvents.filter(
      (event) => new Date(event.endDate) < referenceDate
    );

    const sortedUpcoming = upcoming.sort(
      (a, b) => a.dateObj.getTime() - b.dateObj.getTime()
    );

    const sortedPast = past.sort(
      (a, b) => b.dateObj.getTime() - a.dateObj.getTime()
    );

    return {
      upcomingEvents: sortedUpcoming,
      pastEvents: sortedPast,
    };
  }, [events]);

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

  const handleSelectEvent = (event: any) => {
    console.log(event);
    setValue("selectedEvent", event);
    setIsViewDialogOpen(true);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl">
                  Vos événements
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full flex-1 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="upcoming" className="px-4">
                  À venir
                </TabsTrigger>
                <TabsTrigger value="past" className="px-4">
                  Passés
                </TabsTrigger>
              </TabsList>
              <Button
                size="sm"
                onClick={handleCreateEventClick}
                className="cursor-pointer"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Nouvel événement
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <TabsContent value="upcoming" className="mt-0 h-full">
                <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
                  {upcomingEvents.map((event, i) => (
                    <EventCard
                      key={`upcoming-${event.id}`}
                      event={event}
                      handleSelectEvent={handleSelectEvent}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past" className="mt-0 h-full">
                <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
                  {pastEvents.map((event, i) => (
                    <EventCard
                      key={`past-${event.id}`}
                      event={event}
                      handleSelectEvent={handleSelectEvent}
                    />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <CreateEventDialog
        open={isCreateEventOpen}
        onOpenChange={setIsCreateEventOpen}
        eventSlot={newEventSlot}
      />
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        event={watch("selectedEvent")}
      />
    </FormProvider>
  );
};

export default GeneralEventComponent;
