"use client";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useModalStore } from "@/zustand/store";
import styles from "./CalendarView.module.scss";
import EventCreation from "../event/EventCreation";

dayjs.extend(weekOfYear);
dayjs.locale("fr");

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
};

type Props = {
  events: Event[];
};

const HOUR_HEIGHT = 60; // pixels per hour

const CalendarView: React.FC<Props> = () => {
  const events: Event[] = [
    {
      id: "1",
      title: "Event 1",
      start: new Date("2024-09-21T03:00:00"),
      end: new Date("2024-09-21T13:09:00"),
      color: "#1a73e8",
    },
    {
      id: "2",
      title: "Event 2",
      start: new Date("2024-09-21T03:00:00"),
      end: new Date("2024-09-21T05:00:00"),
      color: "#80ed99",
    },
  ];
  const { setHandleStatusModal } = useModalStore();
  const [currentWeek, setCurrentWeek] = React.useState(dayjs());

  const openModal = () => {
    console.log("open modal");
    setHandleStatusModal({
      status: true,
      children: <EventCreation />,
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

  const getOverlappingEvents = (event: Event, dayEvents: Event[]) => {
    return dayEvents.filter(
      (e) =>
        (dayjs(e.start).isBefore(dayjs(event.end)) &&
          dayjs(e.end).isAfter(dayjs(event.start))) ||
        (dayjs(e.start).isSame(dayjs(event.start)) &&
          dayjs(e.end).isSame(dayjs(event.end)))
    );
  };

  const getEventStyle = (event: Event, dayEvents: Event[]) => {
    const startTime = dayjs(event.start);
    const endTime = dayjs(event.end);
    const dayStart = startTime.startOf("day");

    const startMinutes = startTime.diff(dayStart, "minute");
    const durationMinutes = endTime.diff(startTime, "minute");

    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = (durationMinutes / 60) * HOUR_HEIGHT;

    const overlappingEvents = getOverlappingEvents(event, dayEvents);
    const index = overlappingEvents.indexOf(event);
    const totalOverlaps = overlappingEvents.length;

    const baseWidth = 95; // Base width percentage
    const widthReduction = 10; // Width reduction per overlap
    const leftOffset = 5; // Left offset percentage per overlap

    const width = Math.max(baseWidth - index * widthReduction, 50); // Minimum width of 50%
    const left = index * leftOffset;

    return {
      top: `${top}px`,
      height: `${height}px`,
      width: `${width}%`,
      left: `${left}%`,
      backgroundColor: event.color || "#1a73e8",
      zIndex: totalOverlaps - index,
    };
  };

  console.log(events);

  const renderWeeksAndEvents = useMemo(() => {
    return weekDays.map((day) => {
      const dayEvents = events.filter((event) =>
        dayjs(event.start).isSame(day, "day")
      );
      console.log(dayEvents);
      return (
        <div key={day.format("YYYY-MM-DD")} className={styles.dayColumn}>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className={styles.event}
              style={getEventStyle(event, dayEvents)}
              title={`${event.title}\n${dayjs(event.start).format(
                "HH:mm"
              )} - ${dayjs(event.end).format("HH:mm")}`}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    });
  }, [events, weekDays]);

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
        <div className={styles.body}>
          <div className={styles.hourColumn}>
            {hours.map((hour) => (
              <div key={hour} className={styles.hourCell}>
                {hour.toString().padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {renderWeeksAndEvents}
        </div>
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
