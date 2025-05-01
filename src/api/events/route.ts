import makeApiRequest from "@/src/global/utils/apiRequest";

export async function fetchGetAllUserEvents() {
  return await makeApiRequest("/events/user", "GET");
}

export async function fetchGetEventUsers(id: number) {
  return await makeApiRequest(`/events/user`, "GET");
}

export async function fetchShareEventById(id: number) {
  return await makeApiRequest(`/events/${id}/share`, "POST");
}

export async function fetchCreateEvent(event: any) {
  return await makeApiRequest("/events", "POST", event);
}
