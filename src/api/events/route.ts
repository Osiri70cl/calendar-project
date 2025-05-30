import makeApiRequest from "@/src/global/utils/apiRequest";

export async function fetchGetAllUserEvents() {
  return await makeApiRequest("/events/user", "GET");
}

export async function fetchGetEventUsers(id: number) {
  return await makeApiRequest(`/events/user`, "GET");
}

export async function fetchGetEventById(id: number) {
  return await makeApiRequest(`/events/${id}`, "GET");
}

export async function fetchShareEventById(id: number) {
  return await makeApiRequest(`/events/${id}/share`, "POST");
}

export async function fetchCreateEvent(event: any) {
  return await makeApiRequest("/events", "POST", event);
}

export async function fetchUpdateEvent(id: number, event: any) {
  return await makeApiRequest(`/events/${id}`, "PUT", event);
}
