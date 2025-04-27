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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import "./event-custom.css";

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const currentDate = new Date();
  const allEvents = [
    {
      id: 1,
      title: "Event Conference 2025",
      date: "24 Avril | 14:00",
      dateObj: new Date(2025, 3, 24, 14, 0),
      location: "Paris, France",
      attendees: [
        { name: "Alice", image: "/api/placeholder/32/32" },
        { name: "Bob", image: "/api/placeholder/32/32" },
        { name: "Charlie", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 2,
      title: "Tech Summit 2025",
      date: "12 Mai | 09:30",
      dateObj: new Date(2025, 4, 12, 9, 30),
      location: "Lyon, France",
      attendees: [
        { name: "David", image: "/api/placeholder/32/32" },
        { name: "Emma", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 3,
      title: "Design Workshop",
      date: "3 Juin | 10:00",
      dateObj: new Date(2025, 5, 3, 10, 0),
      location: "Marseille, France",
      attendees: [
        { name: "Frank", image: "/api/placeholder/32/32" },
        { name: "Grace", image: "/api/placeholder/32/32" },
        { name: "Helen", image: "/api/placeholder/32/32" },
        { name: "Ivan", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 4,
      title: "Product Launch",
      date: "17 Juin | 15:00",
      dateObj: new Date(2025, 5, 17, 15, 0),
      location: "Bordeaux, France",
      attendees: [
        { name: "Jack", image: "/api/placeholder/32/32" },
        { name: "Kate", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 5,
      title: "Annual Conference",
      date: "8 Juillet | 08:30",
      dateObj: new Date(2025, 6, 8, 8, 30),
      location: "Toulouse, France",
      attendees: [
        { name: "Leo", image: "/api/placeholder/32/32" },
        { name: "Maria", image: "/api/placeholder/32/32" },
        { name: "Nick", image: "/api/placeholder/32/32" },
      ],
    },
    // Past events
    {
      id: 6,
      title: "Marketing Seminar",
      date: "15 Mars | 13:00",
      dateObj: new Date(2025, 2, 15, 13, 0),
      location: "Nice, France",
      attendees: [
        { name: "Oliver", image: "/api/placeholder/32/32" },
        { name: "Penny", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 7,
      title: "Sales Training",
      date: "2 Février | 09:00",
      dateObj: new Date(2025, 1, 2, 9, 0),
      location: "Lille, France",
      attendees: [
        { name: "Quinn", image: "/api/placeholder/32/32" },
        { name: "Rachel", image: "/api/placeholder/32/32" },
        { name: "Sam", image: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 8,
      title: "Team Building Workshop",
      date: "20 Janvier | 10:30",
      dateObj: new Date(2025, 0, 20, 10, 30),
      location: "Strasbourg, France",
      attendees: [
        { name: "Tom", image: "/api/placeholder/32/32" },
        { name: "Uma", image: "/api/placeholder/32/32" },
      ],
    },
  ];
  const referenceDate = new Date(2025, 3, 1);

  const upcomingEvents = allEvents.filter(
    (event) => event.dateObj >= referenceDate
  );
  const pastEvents = allEvents.filter((event) => event.dateObj < referenceDate);

  const generateExtendedEvents = (events, count = 20) => {
    return Array.from({ length: count }).map((_, i) =>
      events[i % events.length]
        ? { ...events[i % events.length], id: i + 100 }
        : null
    );
  };

  const extendedUpcomingEvents = generateExtendedEvents(upcomingEvents);
  const extendedPastEvents = generateExtendedEvents(pastEvents);

  const EventCard = ({ event }) => (
    <Card className="overflow-hidden aspect-square flex flex-col py-0 cursor-pointer">
      <div className="bg-primary/20 flex items-center justify-center h-1/2">
        <div className="bg-white p-3 rounded-md shadow-sm">
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

      <CardContent className="p-3 flex-grow">
        <div className="text-xs text-muted-foreground mb-1">
          {event?.date || "Date à définir"}
        </div>
        <h3 className="font-medium text-sm truncate">
          {event?.title || "Événement"}
        </h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {event?.location || "Lieu à définir"}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 mt-auto">
        <div className="flex -space-x-2">
          {event?.attendees?.slice(0, 3).map((attendee, index) => (
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
                {extendedUpcomingEvents.map((event, i) => (
                  <EventCard key={`upcoming-${i}`} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-0 h-full">
              <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
                {extendedPastEvents.map((event, i) => (
                  <EventCard key={`past-${i}`} event={event} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
