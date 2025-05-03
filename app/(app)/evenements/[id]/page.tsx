import { fetchGetEventById } from "@/src/api/events/route";
import { SingleEventComponent } from "@/src/events/components/single-event-component/SingleEventComponent";

async function fetchData(id: number) {
  try {
    const data = await fetchGetEventById(id);
    return { data };
  } catch (error: any) {
    if (error.message === "NO_EVENTS_FOUND") return { data: null };
    return { data: null, error: error.message || "An error occurred" };
  }
}

export default async function EventSinglePage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const data = await fetchData(id);

  return <SingleEventComponent event={data || []} />;
}
