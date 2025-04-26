import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "./event-custom.css";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Event Conference 2025",
      date: "24 Avril | 14:00",
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
      location: "Toulouse, France",
      attendees: [
        { name: "Leo", image: "/api/placeholder/32/32" },
        { name: "Maria", image: "/api/placeholder/32/32" },
        { name: "Nick", image: "/api/placeholder/32/32" },
      ],
    },
  ];

  const extendedEvents = Array.from({ length: 20 }).map((_, i) =>
    events[i % events.length] ? { ...events[i % events.length], id: i } : null
  );

  return (
    <div>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Vos événements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
          {extendedEvents.map((event, i) => (
            <Card
              key={i}
              className="overflow-hidden aspect-square flex flex-col py-0 cursor-pointer"
            >
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
                    <Avatar
                      key={index}
                      className="border-2 border-background w-7 h-7"
                    >
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
          ))}
        </div>
      </div>
    </div>
  );
}
