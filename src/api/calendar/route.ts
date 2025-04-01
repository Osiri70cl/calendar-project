import makeApiRequest from "@/global/utils/apiRequest";

export async function fetchGetCalendar() {
  return await makeApiRequest("/calendar", "GET");
}

export async function fetchGetCalendarById(id: number) {
  return await makeApiRequest(`/calendar/${id}`, "GET");
}

export async function fetchShareCalendarById(id: number) {
  return await makeApiRequest(`/calendar/${id}/share`, "POST");
}
