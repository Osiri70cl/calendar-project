"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function Meetings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const allMeetings = [
    {
      id: 1,
      title: "Design catchup",
      email: "ashkeyporter@example.com",
      time: "10:30 AM",
      date: new Date(2025, 3, 12),
      dateFormatted: "Lundi 12 Avril 2025",
      attendees: [
        { name: "John", initials: "J", image: "/api/placeholder/32/32" },
        { name: "Maria", initials: "M", image: "/api/placeholder/32/32" },
        { name: "Pierre", initials: "P", image: "/api/placeholder/32/32" },
        { name: "Sophie", initials: "S", image: "/api/placeholder/32/32" },
      ],
      attending: 9,
      pending: 2,
    },
    {
      id: 2,
      title: "Product review",
      email: "sarahjohnson@example.com",
      time: "14:00 PM",
      date: new Date(2025, 3, 12),
      dateFormatted: "Lundi 12 Avril 2025",
      attendees: [
        { name: "Alex", initials: "A", image: "/api/placeholder/32/32" },
        { name: "Linda", initials: "L", image: "/api/placeholder/32/32" },
        { name: "Marcus", initials: "M", image: "/api/placeholder/32/32" },
      ],
      attending: 7,
      pending: 3,
    },
    {
      id: 3,
      title: "Weekly team sync",
      email: "teamlead@example.com",
      time: "09:15 AM",
      date: new Date(2025, 3, 14),
      dateFormatted: "Mercredi 14 Avril 2025",
      attendees: [
        { name: "Robert", initials: "R", image: "/api/placeholder/32/32" },
        { name: "Emma", initials: "E", image: "/api/placeholder/32/32" },
        { name: "David", initials: "D", image: "/api/placeholder/32/32" },
        { name: "Claire", initials: "C", image: "/api/placeholder/32/32" },
      ],
      attending: 12,
      pending: 0,
    },
    {
      id: 4,
      title: "Client presentation",
      email: "salesteam@example.com",
      time: "16:45 PM",
      date: new Date(2025, 4, 2),
      dateFormatted: "Vendredi 2 Mai 2025",
      attendees: [
        { name: "Michael", initials: "M", image: "/api/placeholder/32/32" },
        { name: "Anna", initials: "A", image: "/api/placeholder/32/32" },
      ],
      attending: 5,
      pending: 1,
    },
    {
      id: 5,
      title: "Project kickoff",
      email: "projectmanager@example.com",
      time: "11:00 AM",
      date: new Date(2025, 4, 12),
      dateFormatted: "Lundi 12 Mai 2025",
      attendees: [
        { name: "Thomas", initials: "T", image: "/api/placeholder/32/32" },
        { name: "Nina", initials: "N", image: "/api/placeholder/32/32" },
        { name: "James", initials: "J", image: "/api/placeholder/32/32" },
      ],
      attending: 8,
      pending: 4,
    },
    {
      id: 6,
      title: "Marketing Strategy",
      email: "marketing@example.com",
      time: "13:30 PM",
      date: new Date(2025, 2, 28),
      dateFormatted: "Vendredi 28 Mars 2025",
      attendees: [
        { name: "Paul", initials: "P", image: "/api/placeholder/32/32" },
        { name: "Sandra", initials: "S", image: "/api/placeholder/32/32" },
      ],
      attending: 6,
      pending: 0,
    },
    {
      id: 7,
      title: "Budget Review",
      email: "finance@example.com",
      time: "09:00 AM",
      date: new Date(2025, 2, 20),
      dateFormatted: "Jeudi 20 Mars 2025",
      attendees: [
        { name: "Victor", initials: "V", image: "/api/placeholder/32/32" },
        { name: "Rachel", initials: "R", image: "/api/placeholder/32/32" },
        { name: "George", initials: "G", image: "/api/placeholder/32/32" },
      ],
      attending: 4,
      pending: 0,
    },
  ];

  const referenceDate = new Date(2025, 3, 1);

  const upcomingMeetings = allMeetings.filter(
    (meeting) => meeting.date >= referenceDate
  );
  const pastMeetings = allMeetings.filter(
    (meeting) => meeting.date < referenceDate
  );

  const sortedUpcomingMeetings = [...upcomingMeetings].sort(
    (a, b) => a.date - b.date
  );
  const sortedPastMeetings = [...pastMeetings].sort((a, b) => b.date - a.date); // Reverse for past meetings

  const groupMeetingsByDate = (meetings) => {
    const groups = {};

    meetings.forEach((meeting) => {
      const dateKey = meeting.date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = {
          dateFormatted: meeting.dateFormatted,
          meetings: [],
        };
      }
      groups[dateKey].meetings.push(meeting);
    });

    return Object.values(groups);
  };

  const upcomingMeetingGroups = groupMeetingsByDate(sortedUpcomingMeetings);
  const pastMeetingGroups = groupMeetingsByDate(sortedPastMeetings);

  const MeetingCard = ({ meeting }) => (
    <div className="rounded-lg overflow-hidden bg-card border border-border mb-4">
      <div className="p-4 flex">
        <Avatar className="h-12 w-12 mr-4 bg-muted">
          <AvatarFallback>{meeting.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{meeting.title}</h3>
          <p className="text-xs text-muted-foreground">{meeting.email}</p>
          <p className="text-sm mt-1">{meeting.time}</p>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-border">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-primary">
            {meeting.attending} ont accepté
          </span>
          {meeting.pending > 0 && (
            <span className="text-sm text-orange-500">
              {meeting.pending} en attente
            </span>
          )}
        </div>

        <div className="flex gap-1">
          {meeting.attendees.map((attendee, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs"
            >
              {attendee.initials}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full rounded-none py-2 border-t border-border text-sm"
      >
        Détails du rendez-vous
      </Button>
    </div>
  );

  const DateHeader = ({ dateString }) => (
    <h2 className="text-base font-medium mb-4 mt-6">{dateString}</h2>
  );

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-10">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl">Rendez-vous</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="mb-6">
          <div className="inline-flex bg-muted rounded-lg p-1">
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === "upcoming" ? "bg-background shadow" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              À venir
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === "past" ? "bg-background shadow" : ""
              }`}
              onClick={() => setActiveTab("past")}
            >
              Passés
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "upcoming" ? (
            <>
              {upcomingMeetingGroups.map((group, groupIndex) => (
                <div key={`upcoming-group-${groupIndex}`}>
                  <DateHeader dateString={group.dateFormatted} />
                  <div>
                    {group.meetings.map((meeting, meetingIndex) => (
                      <MeetingCard
                        key={`upcoming-meeting-${meeting.id}-${meetingIndex}`}
                        meeting={meeting}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {pastMeetingGroups.map((group, groupIndex) => (
                <div key={`past-group-${groupIndex}`}>
                  <DateHeader dateString={group.dateFormatted} />
                  <div>
                    {group.meetings.map((meeting, meetingIndex) => (
                      <MeetingCard
                        key={`past-meeting-${meeting.id}-${meetingIndex}`}
                        meeting={meeting}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
