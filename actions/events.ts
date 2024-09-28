"use server";
import { Event } from "@/calendar/types/events";
import { db } from "@db/index";
import { notFound } from "next/navigation";
import { getUserIdFromToken } from "./lib/auth";
import jwt from "jsonwebtoken";
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
        startDate: dayjs(event.startDate).format(),
        endDate: dayjs(event.endDate).format(),
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

export async function createLinkShare() {
  const userId = await getUserIdFromToken();
  try {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "1000d",
    });

    const user = await db.user.update({
      where: { id: userId },
      data: {
        shareToken: token,
      },
    });

    const shareableLink = `${process.env.NEXT_PUBLIC_BASE_URL}calendrier-partage/${token}`;

    return { shareableLink, token };
  } catch (error) {
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function getSharedEvents(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    const user = await db.user.findUnique({
      where: { shareToken: token },
      include: {
        createdEvents: {
          where: {
            visibility: {
              in: ["public", "busy"],
            },
          },
          include: {
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
        },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired share token");
    }

    return user.createdEvents;
  } catch (error) {
    console.error("Error retrieving shared events:", error);
    throw new Error("Failed to retrieve shared events");
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
