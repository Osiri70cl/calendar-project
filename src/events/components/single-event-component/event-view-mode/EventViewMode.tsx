import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Link2, MapPin } from "lucide-react";
import FilesList from "../files/FilesList";
import ParticipantsList from "../participant-list/ParticipantsList";

type Props = {
  data: any;
};

const EventViewMode = ({ data }: Props) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Event Title
        </h3>
        <h2 className="text-2xl font-semibold mt-1">{data.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Start Date
          </h3>
          <div className="flex items-center mt-1">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {format(data.startDate, "d MMMM yyyy", {
                locale: fr,
              })}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Start Time
          </h3>
          <div className="mt-1">
            <span>{data.startTime}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            End Date
          </h3>
          <div className="flex items-center mt-1">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {format(data.endDate, "d MMMM yyyy", {
                locale: fr,
              })}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            End Time
          </h3>
          <div className="mt-1">
            <span>{data.endTime}</span>
          </div>
        </div>
      </div>
      <ParticipantsList participants={data.participants} />
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Description
        </h3>
        <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {data.description}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
        <div className="flex items-center mt-1">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{data.location}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Meeting Link
        </h3>
        <div className="flex items-center mt-1">
          <Link2 className="mr-2 h-4 w-4 text-muted-foreground" />
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {data.link}
          </a>
        </div>
      </div>
      <FilesList files={data.files} />
    </div>
  );
};

export default EventViewMode;
