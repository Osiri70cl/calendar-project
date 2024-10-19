"use client";
import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useModalStore } from "@/zustand/store";
import { Event } from "@/calendar/types/events";
import {
  ChevronLeft,
  ChevronRight,
  Network,
  Plus,
  PlusCircle,
  Share2Icon,
} from "lucide-react";
import styles from "./WeekView.module.scss";
import EventUpdate from "../../event/EventUpdate";
import EventCreation from "../../event/EventCreation";
import CalendarShare from "@/calendar/components/calendar-share/CalendarShare";

dayjs.extend(weekOfYear);
dayjs.locale("fr");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
  events: Event[];
  openCalendarShare: Function;
  publicCalendar?: boolean;
};

const WeekView = ({
  events: initialEvents,
  openCalendarShare,
  publicCalendar,
}: Props) => {
  const HOUR_HEIGHT = 60;
  const { setHandleStatusModal } = useModalStore();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const today = dayjs();

  const handleCreatedEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleDayClick = (day: dayjs.Dayjs) => {
    if (publicCalendar) {
      console.log("public calendar");
    } else {
      setHandleStatusModal({
        status: true,
        children: (
          <EventCreation handleCreatedEvent={handleCreatedEvent} day={day} />
        ),
        title: "Créer un événement",
      });
    }
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

  const handleDisplayEvent = (event: Event, e: React.MouseEvent) => {
    e.preventDefault();
    console.log("single");
    setHandleStatusModal({
      status: true,
      children: (
        <EventUpdate handleCreatedEvent={handleCreatedEvent} event={event} />
      ),
      title: "Modifier un événement",
    });
  };

  const getEventStyle = (
    event: Event,
    day: dayjs.Dayjs,
    dayEvents: Event[]
  ) => {
    const eventStart = dayjs(event.startTime);
    const eventEnd = dayjs(event.endTime);
    const dayStart = day.startOf("day");
    const dayEnd = day.endOf("day");

    let start = eventStart.isBefore(dayStart) ? dayStart : eventStart;
    let end = eventEnd.isAfter(dayEnd) ? dayEnd : eventEnd;

    const startMinutes = start.diff(dayStart, "minute");
    const durationMinutes = end.diff(start, "minute");

    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = (durationMinutes / 60) * HOUR_HEIGHT;

    const overlappingEvents = dayEvents.filter((e) => {
      const eStart = dayjs(e.startTime);
      const eEnd = dayjs(e.endTime);
      return (
        (eStart.isBefore(end) && eEnd.isAfter(start)) ||
        (eStart.isSame(start) && eEnd.isSame(end))
      );
    });

    const index = overlappingEvents.indexOf(event);
    const totalOverlaps = overlappingEvents.length;

    const baseWidth = 100;
    const widthReduction = 10;
    const minWidth = 50;

    let width = Math.max(baseWidth - index * widthReduction, minWidth);
    let left = index * 5;

    if (left + width > 100) {
      width = 100 - left;
    }

    const zIndex = 10 + index;

    return {
      top: `${top}px`,
      height: `${height}px`,
      width: `${width}%`,
      left: `0`,
      backgroundColor: event.type ? `#${event.type}` : "#fff",
      zIndex: zIndex,
    };
  };

  const renderEvents = (day: dayjs.Dayjs) => {
    const dayEvents = events.filter((event) => {
      const eventStart = dayjs(event.startTime);
      const eventEnd = dayjs(event.endTime);
      return (
        (eventStart.isSameOrBefore(day, "day") &&
          eventEnd.isSameOrAfter(day, "day")) ||
        eventStart.isSame(day, "day") ||
        eventEnd.isSame(day, "day")
      );
    });

    return dayEvents.map((event) => {
      const style = getEventStyle(event, day, dayEvents);
      if (!style) return null;

      const isMultiDay = !dayjs(event.startTime).isSame(
        dayjs(event.endTime),
        "day"
      );
      const isFirstDay = dayjs(event.startTime).isSame(day, "day");
      const isLastDay = dayjs(event.endTime).isSame(day, "day");

      let title = event.title;
      if (isMultiDay) {
        if (isFirstDay) title += " (Start)";
        else if (isLastDay) title += " (End)";
        else title += " (Cont.)";
      }

      return (
        <div
          key={`${event.id}-${day.format("YYYY-MM-DD")}`}
          className={styles.event}
          style={style}
          onClick={(e) => {
            e.stopPropagation();
            handleDisplayEvent(event, e);
          }}
          title={`${event.title}\n${dayjs(event.startTime).format(
            "DD/MM HH:mm"
          )} - ${dayjs(event.endTime).format("DD/MM HH:mm")}`}
        >
          {title}
        </div>
      );
    });
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
        {weekDays.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={styles.dayColumn}
            onClick={() => handleDayClick(day)}
          >
            {hours.map((hour) => (
              <div key={hour} className={styles.hourLine}></div>
            ))}
            {renderEvents(day)}
          </div>
        ))}
      </div>
    );
  }, [events, weekDays, hours, getEventStyle, navigateWeek]);

  return (
    <>
      <div className={styles.navigation}>
        <button
          onClick={() => navigateWeek("prev")}
          className={"m-button m-button--round m-button--primary"}
        >
          <ChevronLeft size={20} />
        </button>
        <div className={styles.weekRange}>
          {weekRange}
          {!publicCalendar && (
            <button
              type="button"
              className="m-button m-button--primary"
              onClick={() => openCalendarShare()}
            >
              <Share2Icon size={20} />
              Partager mon calendrier
            </button>
          )}
        </div>
        <button
          onClick={() => navigateWeek("next")}
          className={"m-button m-button--round m-button--primary"}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.hourCell}></div>
          {weekDays.map((day) => (
            <div key={day.format("YYYY-MM-DD")} className={styles.dayCell}>
              <div className={styles.dayName}>{day.format("ddd")}</div>
              <div className={styles.dayNumber}>
                <span
                  className={` ${
                    day.isSame(today, "day") ? styles.todayCell : ""
                  }`}
                >
                  {day.format("D")}
                </span>
              </div>
            </div>
          ))}
        </div>
        {renderBody}
      </div>
    </>
  );
};

export default WeekView;
