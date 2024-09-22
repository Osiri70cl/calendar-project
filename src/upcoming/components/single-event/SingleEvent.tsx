"use client";
import { Calendar, Clock } from "lucide-react";
import styles from "./SingleEvent.module.scss";

type Props = {
  event: Event;
};

const SingleEvent = ({ event }: Props) => {
  return (
    <div className={styles.singleCard}>
      <div className={styles.singleTitle}>{event?.title}</div>
      <div className={styles.singleDate}>
        <Calendar className={styles.icon} />
        {event?.date.format("dddd, D MMMM, YYYY")}
      </div>
      <div className={styles.singleTime}>
        <Clock className={styles.icon} />
        De {event?.startTime} à {event?.endTime}
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
      </div>
    </div>
  );
};

export default SingleEvent;
