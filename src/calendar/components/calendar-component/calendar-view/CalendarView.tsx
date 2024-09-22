"use client";
import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useModalStore } from "@/zustand/store";
import styles from "./CalendarView.module.scss";
import EventCreation from "../event/EventCreation";
import { Event } from "@/calendar/types/events";

dayjs.extend(weekOfYear);
dayjs.locale("fr");

type Props = {
  events: Event[];
};

const HOUR_HEIGHT = 60;

const CalendarView = ({ events: initialEvents }: Props) => {
  // const events: Event[] = [
  //   {
  //     id: "1",
  //     title: "Event 1",
  //     start: new Date("2024-09-21T03:00:00"),
  //     end: new Date("2024-09-21T13:09:00"),
  //     color: "#1a73e8",
  //   },
  //   {
  //     id: "2",
  //     title: "Event 2",
  //     start: new Date("2024-09-21T03:00:00"),
  //     end: new Date("2024-09-21T05:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "3",
  //     title: "Event 3",
  //     start: new Date("2024-09-21T00:00:00"),
  //     end: new Date("2024-09-21T02:00:00"),
  //     color: "#80ed95",
  //   },
  //   {
  //     id: "4",
  //     title: "Event 4",
  //     start: new Date("2024-09-21T03:00:00"),
  //     end: new Date("2024-09-21T04:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "5",
  //     title: "Event 5",
  //     start: new Date("2024-09-21T08:00:00"),
  //     end: new Date("2024-09-21T10:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "6",
  //     title: "Event 6",
  //     start: new Date("2024-09-21T13:00:00"),
  //     end: new Date("2024-09-21T15:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "7",
  //     title: "Event 7",
  //     start: new Date("2024-09-21T13:00:00"),
  //     end: new Date("2024-09-21T18:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "8",
  //     title: "Event 8",
  //     start: new Date("2024-09-21T19:00:00"),
  //     end: new Date("2024-09-21T20:00:00"),
  //     color: "#80ed99",
  //   },
  //   {
  //     id: "9",
  //     title: "Event 9",
  //     start: new Date("2024-09-21T19:00:00"),
  //     end: new Date("2024-09-21T22:00:00"),
  //     color: "#80ed99",
  //   },
  // ];
  const { setHandleStatusModal } = useModalStore();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentWeek, setCurrentWeek] = React.useState(dayjs());

  const handleCreatedEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  console.log(events);

  const openModal = () => {
    console.log("open modal");
    setHandleStatusModal({
      status: true,
      children: <EventCreation handleCreatedEvent={handleCreatedEvent} />,
      title: "Créer un événement",
    });
  };

  const weekDays = React.useMemo(() => {
    const startOfWeek = currentWeek.startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  }, [currentWeek]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) =>
      direction === "prev" ? prev.subtract(1, "week") : prev.add(1, "week")
    );
  };

  const weekRange = `${weekDays[0].format("D MMMM")} - ${weekDays[6].format(
    "D MMMM YYYY"
  )}`;

  const getEventStyle = (event: Event, dayEvents: Event[]) => {
    const parseDateTime = (date: string, time: string) => {
      const combinedDateTime = `${date.split("T")[0]}T${
        time.split("T")[1] || time
      }`;
      return dayjs(combinedDateTime).isValid() ? dayjs(combinedDateTime) : null;
    };

    const startTime = parseDateTime(event.date, event.startTime);
    const endTime = parseDateTime(event.date, event.endTime);

    if (!startTime || !endTime) {
      console.error("Invalid date or time for event:", event);
      return null;
    }

    const dayStart = startTime.startOf("day");

    const startMinutes = startTime.diff(dayStart, "minute");
    const durationMinutes = endTime.diff(startTime, "minute");

    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = (durationMinutes / 60) * HOUR_HEIGHT;

    const overlappingEvents = dayEvents.filter((e) => {
      const eStart = parseDateTime(e.date, e.startTime);
      const eEnd = parseDateTime(e.date, e.endTime);
      return (
        eStart &&
        eEnd &&
        ((eStart.isBefore(endTime) && eEnd.isAfter(startTime)) ||
          (eStart.isSame(startTime) && eEnd.isSame(endTime)))
      );
    });

    const index = overlappingEvents.indexOf(event);
    const totalOverlaps = overlappingEvents.length;
    const baseWidth = 90;
    const widthReduction = 10;
    const minWidth = 50;

    let width = Math.max(baseWidth - index * widthReduction, minWidth);
    let left = index * 5;

    if (left + width > 100) {
      width = 100 - left;
    }

    const zIndex = 100 + index;

    return {
      top: `${top}px`,
      height: `${height}px`,
      width: `${width}%`,
      left: `0`,
      backgroundColor: event.type ? `#${event.type}` : "#1a73e8",
      zIndex: zIndex,
    };
  };

  const renderBody = useMemo(() => {
    return (
      <div className={styles.body}>
        <div className={styles.hourColumn}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hourCell}>
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>
        {weekDays.map((day) => {
          const dayEvents = events.filter((event) =>
            dayjs(event.date).isSame(day, "day")
          );
          return (
            <div key={day.format("YYYY-MM-DD")} className={styles.dayColumn}>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={styles.event}
                  style={getEventStyle(event, dayEvents)}
                  title={`${event.title}\n${dayjs(event.startTime).format(
                    "HH:mm"
                  )} - ${dayjs(event.endTime).format("HH:mm")}`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }, [events, weekDays, hours, getEventStyle, navigateWeek]);

  return (
    <div className={styles.main}>
      <div className={styles.navigation}>
        <button
          onClick={() => navigateWeek("prev")}
          className={styles.navButton}
        >
          Semaine précédente
        </button>
        <span className={styles.weekRange}>{weekRange}</span>
        <button
          onClick={() => navigateWeek("next")}
          className={styles.navButton}
        >
          Semaine suivante
        </button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.hourCell}></div>
          {weekDays.map((day) => (
            <div key={day.format("YYYY-MM-DD")} className={styles.dayCell}>
              <div className={styles.dayName}>{day.format("ddd")}</div>
              <div className={styles.dayNumber}>{day.format("D")}</div>
            </div>
          ))}
        </div>
        {renderBody}
      </div>
      <button
        type="button"
        className={styles.createEventButton}
        onClick={openModal}
      >
        Créer un événement
      </button>
    </div>
  );
};

export default CalendarView;
