import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function Meetings() {
  const meetings = [
    {
      id: 1,
      title: "Design catchup",
      email: "ashkeyporter@example.com",
      time: "10:30 AM",
      attendees: [
        { name: "John D", image: "/api/placeholder/32/32" },
        { name: "Maria L", image: "/api/placeholder/32/32" },
        { name: "Pierre S", image: "/api/placeholder/32/32" },
        { name: "Sophie T", image: "/api/placeholder/32/32" },
      ],
      attending: 9,
      pending: 2,
    },
    {
      id: 2,
      title: "Product review",
      email: "sarahjohnson@example.com",
      time: "14:00 PM",
      attendees: [
        { name: "Alex M", image: "/api/placeholder/32/32" },
        { name: "Linda K", image: "/api/placeholder/32/32" },
        { name: "Marcus P", image: "/api/placeholder/32/32" },
      ],
      attending: 7,
      pending: 3,
    },
    {
      id: 3,
      title: "Weekly team sync",
      email: "teamlead@example.com",
      time: "09:15 AM",
      attendees: [
        { name: "Robert T", image: "/api/placeholder/32/32" },
        { name: "Emma C", image: "/api/placeholder/32/32" },
        { name: "David L", image: "/api/placeholder/32/32" },
        { name: "Claire M", image: "/api/placeholder/32/32" },
      ],
      attending: 12,
      pending: 0,
    },
    {
      id: 4,
      title: "Client presentation",
      email: "salesteam@example.com",
      time: "16:45 PM",
      attendees: [
        { name: "Michael R", image: "/api/placeholder/32/32" },
        { name: "Anna S", image: "/api/placeholder/32/32" },
      ],
      attending: 5,
      pending: 1,
    },
    {
      id: 5,
      title: "Project kickoff",
      email: "projectmanager@example.com",
      time: "11:00 AM",
      attendees: [
        { name: "Thomas P", image: "/api/placeholder/32/32" },
        { name: "Nina K", image: "/api/placeholder/32/32" },
        { name: "James L", image: "/api/placeholder/32/32" },
      ],
      attending: 8,
      pending: 4,
    },
  ];

  const extendedMeetings = Array.from({ length: 20 }).map((_, i) =>
    meetings[i % meetings.length]
      ? { ...meetings[i % meetings.length], id: i }
      : null
  );

  return (
    <div>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-100">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Rendez-vous</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 grid-cols-1 gridQueries">
          {extendedMeetings.map((meeting, i) => (
            <Card key={i} className="overflow-hidden py-0">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src="/api/placeholder/60/60" alt="Organizer" />
                    <AvatarFallback>
                      {meeting?.title?.charAt(0) || "M"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-base mb-0.5">
                      {meeting?.title || "Meeting"}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {meeting?.email || "email@example.com"}
                    </p>
                    <p className="text-sm font-medium">
                      {meeting?.time || "12:00 PM"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <div className="px-4 py-3 border-t">
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-primary">
                    {meeting?.attending || 0} ont accepté
                  </div>
                  {meeting?.pending > 0 && (
                    <div className="text-sm text-orange-500">
                      {meeting?.pending} en attente
                    </div>
                  )}
                </div>
                <div className="flex mb-3">
                  {meeting?.attendees?.slice(0, 4).map((attendee, index) => (
                    <Avatar
                      key={index}
                      className="border-2 border-background w-8 h-8 -ml-2 first:ml-0"
                    >
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}

                  {meeting?.attendees && meeting.attendees.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background -ml-2">
                      +{meeting.attending - 4}
                    </div>
                  )}
                </div>
              </div>
              <CardFooter className="p-0">
                <Button
                  variant="ghost"
                  className="w-full rounded-none py-8 border-t cursor-pointer"
                >
                  Détails du rendez-vous
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
