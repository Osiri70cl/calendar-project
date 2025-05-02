import { fetchCreateEvent, fetchUpdateEvent } from "@/src/api/events/route";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const res = await fetchCreateEvent(formData);
    return Response.json({ res });
  } catch (error: any) {
    return new Response(error.message, {
      status: error.status,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const formData = await request.json();
    const eventId = searchParams.get("eventId");
    console.log(eventId);
    if (eventId) {
      const res = await fetchUpdateEvent(parseInt(eventId), formData);
      return Response.json({ res });
    }
  } catch (error: any) {
    return new Response(error.message, {
      status: error.status,
    });
  }
}
