"use client";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MonthView.module.scss";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay?: boolean;
  color?: string;
  category?: string;
}

interface MultiDayEventPosition {
  id: string;
  weekIndex: number;
  startDayIndex: number;
  endDayIndex: number;
  color: string;
  title: string;
  startTime: string;
}

interface MonthViewProps {
  currentDate?: Date;
  events?: CalendarEvent[];
}

const MonthView = ({
  currentDate = new Date(),
  events = [],
}: MonthViewProps) => {
  const calendarGridRef = useRef<HTMLDivElement>(null);
  const [multiDayPositions, setMultiDayPositions] = useState<
    MultiDayEventPosition[]
  >([]);

  const sampleEvents = useMemo(
    () => [
      // Event spanning 3 days
      {
        id: "1",
        title: "Conference de développement",
        start: "2025-04-10T09:00:00",
        end: "2025-04-13T18:00:00",
        color: "#3788d8",
      },
      {
        id: "4",
        title: "Conference de développement",
        start: "2025-04-15T09:00:00",
        end: "2025-04-19T18:00:00",
        color: "#3788d8",
      },
      // Two events on the same day
      {
        id: "2",
        title: "Réunion d'équipe",
        start: "2025-04-21T10:30:00",
        color: "#0F9D58",
      },
      {
        id: "3",
        title: "Déjeuner client",
        start: "2025-04-21T12:30:00",
        color: "#DB4437",
      },
      // Single day event
      {
        id: "4",
        title: "Rendez-vous médical",
        start: "2025-04-08T14:00:00",
        color: "#F4B400",
      },
    ],
    []
  );

  const eventsToUse = events.length > 0 ? events : sampleEvents;

  const calendar = useMemo(() => {
    const currentMonth = dayjs(currentDate);
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");
    const weeksCount = endDate.diff(startDate, "week") + 1;
    const calendarArray = [];
    for (let weekIndex = 0; weekIndex < weeksCount; weekIndex++) {
      const week = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = startDate.add(weekIndex * 7 + dayIndex, "day");
        const isCurrentMonth = date.month() === currentMonth.month();
        const isToday = date.isSame(dayjs(), "day");

        week.push({
          date,
          dayOfMonth: date.date(),
          isCurrentMonth,
          isToday,
          weekIndex,
          dayIndex,
          events: [],
          eventsByCategory: {
            holiday: [],
            regular: [],
          },
        });
      }

      calendarArray.push(week);
    }

    return {
      weeks: calendarArray,
      month: currentMonth.format("MMMM YYYY"),
      monthName: currentMonth.format("MMMM"),
      year: currentMonth.year(),
      startDate,
      endDate,
      weeksCount,
    };
  }, [currentDate]);

  const calendarWithEvents = useMemo(() => {
    const weeks = JSON.parse(JSON.stringify(calendar.weeks));

    eventsToUse.forEach((event) => {
      if (event.end && dayjs(event.end).isAfter(dayjs(event.start), "day")) {
        return;
      }

      const eventStart = dayjs(event.start);

      for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const day = weeks[weekIndex][dayIndex];
          const dayDate = dayjs(day.date);

          if (dayDate.isSame(eventStart, "day")) {
            const eventForDay = {
              ...event,
              isStart: true,
              isEnd: true,
              isMultiDay: false,
              startTime: eventStart.format("HH:mm"),
            };

            if (event.category === "holiday" || event.allDay) {
              day.eventsByCategory.holiday.push(eventForDay);
            } else {
              day.eventsByCategory.regular.push(eventForDay);
            }

            day.events.push(eventForDay);
          }
        }
      }
    });

    return {
      ...calendar,
      weeks,
    };
  }, [calendar, eventsToUse]);

  useEffect(() => {
    if (!calendarGridRef.current) return;

    const multiDayEvents = eventsToUse.filter(
      (event) =>
        event.end && dayjs(event.end).isAfter(dayjs(event.start), "day")
    );

    const positions: MultiDayEventPosition[] = [];

    multiDayEvents.forEach((event) => {
      const startDate = dayjs(event.start);
      const endDate = dayjs(event.end);
      const startDiff = startDate.diff(calendar.startDate, "day");
      const endDiff = endDate.diff(calendar.startDate, "day");

      const startWeekIndex = Math.floor(startDiff / 7);
      const startDayIndex = startDiff % 7;

      const endWeekIndex = Math.floor(endDiff / 7);
      const endDayIndex = endDiff % 7;
      for (
        let weekIndex = startWeekIndex;
        weekIndex <= endWeekIndex;
        weekIndex++
      ) {
        const weekStartDay = weekIndex === startWeekIndex ? startDayIndex : 0;
        const weekEndDay = weekIndex === endWeekIndex ? endDayIndex : 6;

        positions.push({
          id: event.id + "-week-" + weekIndex,
          weekIndex,
          startDayIndex: weekStartDay,
          endDayIndex: weekEndDay,
          color: event.color || "#3788d8",
          title: event.title,
          startTime: startDate.format("HH:mm"),
        });
      }
    });

    setMultiDayPositions(positions);
  }, [calendar.startDate, eventsToUse, calendar.weeks]);

  const dayNames = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

  return (
    <div className={styles.monthView}>
      <div className={styles.dayNamesRow}>
        {dayNames.map((name, index) => (
          <div key={index} className={styles.dayNameCell}>
            {name}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid} ref={calendarGridRef}>
        {calendarWithEvents.weeks.map((week, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            className={styles.weekRow}
            data-week-index={weekIndex}
          >
            {" "}
            {multiDayPositions
              .filter((pos) => pos.weekIndex === weekIndex)
              .map((position, eventIndex) => (
                <div
                  key={position.id}
                  className={styles.multiDayEvent}
                  style={{
                    position: "absolute",
                    left: `calc(${(position.startDayIndex / 7) * 100}% + 4px)`,
                    width: `calc(${((position.endDayIndex - position.startDayIndex + 1) / 7) * 100}% - 8px)`,
                    top: `${30 + eventIndex * 24}px`,
                    backgroundColor: position.color,
                    zIndex: 10,
                  }}
                >
                  {position.weekIndex === 0 && position.startDayIndex === 0 ? (
                    <>
                      <span className={styles.eventTime}>
                        {position.startTime}
                      </span>
                      <span className={styles.eventTitle}>
                        {position.title}
                      </span>
                    </>
                  ) : (
                    <span className={styles.eventTitle}>{position.title}</span>
                  )}
                </div>
              ))}
            {week.map((day, dayIndex) => (
              <div
                key={`day-${weekIndex}-${dayIndex}`}
                className={`${styles.dayCell} 
                  ${!day.isCurrentMonth ? styles.notCurrentMonth : ""} 
                  ${day.isToday ? styles.today : ""}`}
                data-week={weekIndex}
                data-day={dayIndex}
              >
                <div className={styles.dayCellHeader}>
                  <span className={styles.dayNumber}>{day.dayOfMonth}</span>
                </div>

                <div className={styles.eventsList}>
                  {day.eventsByCategory.holiday?.map((event, eventIndex) => (
                    <div
                      key={`holiday-${weekIndex}-${dayIndex}-${eventIndex}`}
                      className={`${styles.specialDay} ${
                        event.color?.includes("4CAF50")
                          ? styles.green
                          : event.color?.includes("9C27B0")
                            ? styles.purple
                            : ""
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {day.eventsByCategory.regular?.map((event, eventIndex) => (
                    <div
                      key={`event-${weekIndex}-${dayIndex}-${eventIndex}`}
                      className={styles.event}
                      style={{
                        backgroundColor: event.color || undefined,
                      }}
                    >
                      <span className={styles.eventTime}>
                        {event.startTime}
                      </span>
                      <span className={styles.eventTitle}>{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
