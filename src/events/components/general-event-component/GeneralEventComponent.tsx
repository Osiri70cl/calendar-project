"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { CalendarClock, Link, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  allEvents: any[];
};

const GeneralEventComponent = ({ allEvents }: Props) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const currentDate = new Date();
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const referenceDate = new Date();
    const processedEvents = allEvents.map((event) => ({
      ...event,
      dateObj: new Date(event.startDate),
      attendees: event.participants
        ? event.participants.map((p) => ({
            name: p.user ? `${p.user.firstname} ${p.user.lastname}` : "Unknown",
          }))
        : [],
    }));
    return {
      upcomingEvents: processedEvents.filter(
        (event) => new Date(event.endDate) >= referenceDate
      ),
      pastEvents: processedEvents.filter(
        (event) => new Date(event.endDate) < referenceDate
      ),
    };
  }, [allEvents]);

  const EventCard = ({ event }: any) => (
    <Card
      className="overflow-hidden aspect-square flex flex-col py-0 cursor-pointer"
      style={{ gap: "12px" }}
    >
      <div
        className="bg-primary/20 flex items-center justify-center h-1/3"
        style={{ minHeight: "33%" }}
      >
        <div className="bg-white p-3 rounded-md shadow-sm ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
            <path d="m16 15-3-3-3 3" />
          </svg>
        </div>
      </div>
      <CardContent className="p-3 flex flex-col" style={{ gap: "4px" }}>
        <div className="text-xs flex items-center text-muted-foreground mb-1">
          <CalendarClock className="mr-1 w-4 h-4" />
          Du{" "}
          {event?.startDate
            ? format(new Date(event.startDate), "dd/MM/yyyy")
            : "Date à définir"}{" "}
          au{" "}
          {event?.endDate
            ? format(new Date(event.endDate), "dd/MM/yyyy")
            : "Date à définir"}
        </div>
        <h3 className="font-medium text-sm truncate">
          {event?.name || "Événement"}
        </h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Link className="mr-1 w-4 h-4" />
          {event?.link || "lien à définir"}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 mt-auto">
        <div className="flex -space-x-2">
          {event?.attendees?.slice(0, 3).map((attendee: any, index: any) => (
            <Avatar key={index} className="border-2 border-background w-7 h-7">
              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}

          {event?.attendees && event.attendees.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
              +{event.attendees.length - 3}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  return (
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
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouvel événement
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <TabsContent value="upcoming" className="mt-0 h-full">
              <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
                {upcomingEvents.map((event, i) => (
                  <EventCard key={`upcoming-${event.id}`} event={event} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past" className="mt-0 h-full">
              <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
                {pastEvents.map((event, i) => (
                  <EventCard key={`past-${event.id}`} event={event} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneralEventComponent;
