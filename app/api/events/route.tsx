import { fetchCreateEvent } from "@/src/api/events/route";

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
