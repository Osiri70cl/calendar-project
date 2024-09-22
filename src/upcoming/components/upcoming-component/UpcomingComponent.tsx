"use client";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import styles from "./UpcomingComponent.module.scss";
import { Calendar, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import SingleEvent from "../single-event/SingleEvent";

dayjs.locale("fr");

type Props = {
  events: Event[];
};

const UpcomingComponent = ({ events }: Props) => {
  const startDate = dayjs().startOf("day");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(events[0]);

  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = dayjs(event.date).format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const renderSingleEvent = useMemo(() => {
    return selectedEvent ? <SingleEvent event={selectedEvent} /> : null;
  }, [selectedEvent]);

  const renderEmptyState = useMemo(() => {
    if (events.length === 0) {
      return (
        <div>
          <div>Vous n'avez pas d'événements à venir</div>
        </div>
      );
    } else {
      <>
        <div className={styles.events}>
          <div className={styles.scrollArea}>
            {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
              <div key={dateKey} className={styles.eventCard}>
                <div>
                  <div className={styles.dateTitle}>
                    <Calendar className={styles.icon} />
                    {dayjs(dateKey).format("dddd, MMMM D, YYYY")}
                  </div>
                </div>
                <div className={styles.eventGap}>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[event.category]}`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventTime}>
                        <Clock className={styles.icon} />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.eventSingle}>{renderSingleEvent}</div>
      </>;
    }
  }, [events]);

  return (
    <div className={styles.upcomingEvents}>
      <h2 className={styles.title}>Vos prochains événements</h2>
      <div className={styles.content}>{renderEmptyState}</div>
    </div>
  );
};

export default UpcomingComponent;
