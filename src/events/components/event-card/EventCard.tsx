"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarClock, Link } from "lucide-react";

type Props = {
  event: any;
  handleSelectEvent: Function;
};

const EventCard = ({ event, handleSelectEvent }: Props) => {
  return (
    <Card
      className="overflow-hidden aspect-square flex flex-col py-0 cursor-pointer"
      style={{ gap: "12px" }}
      onClick={() => handleSelectEvent(event)}
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
};

export default EventCard;
