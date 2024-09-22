"use server";
import { Event } from "@/calendar/types/events";
import { db } from "@db/index";
import { notFound } from "next/navigation";
import { getUserIdFromToken } from "./lib/auth";
import dayjs from "dayjs";

type CreateEventData = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  type: string;
  location?: string;
  link?: string;
};

export async function fetchEvents(): Promise<Event[]> {
  return await db.event.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

export async function fetchEventsByUserId(userId: number): Promise<Event[]> {
  return await db.event.findMany({
    where: {
      creatorId: userId,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

export async function fetchEventById(id: number): Promise<Event | null> {
  const event = await db.event.findUnique({
    where: {
      id,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  return event;
}

export async function createEvent(data: CreateEventData) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return {
      errors: {
        _form: ["You must be logged in to create an event."],
      },
    };
  }

  try {
    const event = await db.event.create({
      data: {
        ...data,
        creatorId: userId,
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return {
      event: {
        ...event,
        startTime: dayjs(event.startTime).format(),
        endTime: dayjs(event.endTime).format(),
        date: dayjs(event.date).format(),
      },
    };
  } catch (error: unknown) {
    console.error("Failed to create event:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function addParticipantToEvent(eventId: number, userId: number) {
  try {
    const eventParticipant = await db.eventParticipant.create({
      data: {
        eventId,
        userId,
      },
    });
    return { eventParticipant };
  } catch (error: unknown) {
    console.error("Failed to add participant to event:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function getParticipantsByEventId(eventId: number) {
  try {
    const participants = await db.eventParticipant.findMany({
      where: {
        eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return { participants };
  } catch (error: unknown) {
    console.error("Failed to get participants by event id:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function removeParticipantFromEvent(
  eventId: number,
  userId: number
) {
  try {
    await db.eventParticipant.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to remove participant from event:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}
