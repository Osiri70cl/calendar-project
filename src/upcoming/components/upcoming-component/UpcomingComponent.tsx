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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    events[0] || null
  );
  console.log(events);

  const groupedEvents = useMemo(() => {
    return events.reduce((acc, event) => {
      const dateKey = dayjs(event.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, Event[]>);
  }, [events]);

  const renderSingleEvent = useMemo(() => {
    return selectedEvent ? <SingleEvent event={selectedEvent} /> : null;
  }, [selectedEvent]);

  if (events.length === 0) {
    return (
      <div className={styles.upcomingEvents}>
        <h2 className={styles.title}>Vos prochains événements</h2>
        <div className={styles.content}>
          <div>Vous n'avez pas d'événements à venir</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.upcomingEvents}>
      <h2 className={styles.title}>Vos prochains événements</h2>
      <div className={styles.content}>
        <div className={styles.events}>
          <div className={styles.scrollArea}>
            {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
              <div key={dateKey} className={styles.eventCard}>
                <div>
                  <div className={styles.dateTitle}>
                    <Calendar className={styles.icon} />
                    {dayjs(dateKey).format("dddd, D MMMM, YYYY")}
                  </div>
                </div>
                <div className={styles.eventGap}>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${
                        styles[event.category] || ""
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventTime}>
                        <Clock className={styles.icon} />
                        {dayjs(event.startTime).format("HH:mm")} -{" "}
                        {dayjs(event.endTime).format("HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.eventSingle}>{renderSingleEvent}</div>
      </div>
    </div>
  );
};

export default UpcomingComponent;
