"use client";
import { Calendar, Clock } from "lucide-react";
import styles from "./SingleEvent.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import AvatarGroup from "@/global/components/avatar/avatar-group/AvatarGroup";

dayjs.locale("fr");

type Props = {
  event: Event;
};

const avatars = [
  { src: "/images/placeholderUser.jpg", alt: "Avatar 1" },
  { src: "/images/placeholderUser.jpg", alt: "Avatar 2" },
  { src: "/images/placeholderUser.jpg", alt: "Avatar 3" },
  { src: "/images/placeholderUser.jpg", alt: "Avatar 4" },
  { src: "/images/placeholderUser.jpg", alt: "Avatar 5" },
  { src: "/images/placeholderUser.jpg", alt: "Avatar 6" },
];

const SingleEvent = ({ event }: Props) => {
  return (
    <div className={styles.singleCard}>
      <div className={styles.singleTitle}>{event?.title}</div>
      <div className={styles.singleDate}>
        <Calendar className={styles.icon} />
        {dayjs(event?.date).format("dddd, D MMMM, YYYY")}
      </div>
      <div className={styles.singleTime}>
        <Clock className={styles.icon} />
        De {dayjs(event?.startTime).format("HH:mm")} à{" "}
        {dayjs(event?.endTime).format("HH:mm")}
      </div>
      <div className={styles.singleDescription}>
        <span>Description</span>
        {event?.description}
      </div>
      <div className={styles.eventType}>
        <span>Type de l'événement</span>
      </div>
      <div className={styles.eventParticipants}>
        <span>Participants de l'événement</span>
        <AvatarGroup avatars={avatars} />
      </div>
    </div>
  );
};

export default SingleEvent;
