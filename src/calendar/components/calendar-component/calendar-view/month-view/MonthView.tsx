"use client";

import { ChevronLeft, ChevronRight, Share2Icon } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import styles from "./MonthView.module.scss";
import { useMemo, useState } from "react";
import { useModalStore } from "@/zustand/store";
import EventUpdate from "../../event/EventUpdate";
import EventCreation from "../../event/EventCreation";

dayjs.extend(weekOfYear);
dayjs.locale("fr");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

type Props = {
  events: any;
  openCalendarShare: Function;
  publicCalendar?: boolean;
};

const MonthView = ({
  events: initialEvents,
  openCalendarShare,
  publicCalendar,
}: Props) => {
  const { setHandleStatusModal } = useModalStore();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "prev" ? prev.subtract(1, "month") : prev.add(1, "month")
    );
  };

  const calendarDays = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month").startOf("week");
    const endOfMonth = currentMonth.endOf("month").endOf("week");
    const days = [];
    let day = startOfMonth;

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  }, [currentMonth]);

  const getEventStyle = (event: Event) => {
    return {
      backgroundColor: event.type ? `#${event.type}` : "#3498db",
      color: "#ffffff",
    };
  };

  const handleCreatedEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

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

  const renderEvents = (day: dayjs.Dayjs) => {
    const dayEvents = initialEvents.filter((event) => {
      const eventStart = dayjs(event.startTime);
      const eventEnd = dayjs(event.endTime);
      return day.isBetween(eventStart, eventEnd, "day", "[]");
    });

    return dayEvents.slice(0, 3).map((event, index) => (
      <div
        key={event.id}
        className={styles.event}
        style={getEventStyle(event)}
        onClick={(e) => {
          e.stopPropagation();
          handleDisplayEvent(event, e);
        }}
        title={`${event.title}\n${dayjs(event.startTime).format(
          "HH:mm"
        )} - ${dayjs(event.endTime).format("HH:mm")}`}
      >
        {event.title}
      </div>
    ));
  };

  return (
    <div className={styles.monthView}>
      <div className={styles.navigation}>
        <button
          onClick={() => navigateMonth("prev")}
          className={"m-button m-button--round m-button--primary"}
        >
          <ChevronLeft size={20} />
        </button>
        <div className={styles.monthYear}>
          {currentMonth.format("MMMM YYYY")}
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
          onClick={() => navigateMonth("next")}
          className={"m-button m-button--round m-button--primary"}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {calendarDays.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
              onClick={() => handleDayClick(day)}
              className={`${styles.day} ${
                day.month() !== currentMonth.month() ? styles.otherMonth : ""
              } `}
            >
              <div
                className={`${styles.dayNumber} ${
                  day.isSame(dayjs(), "day") ? styles.today : ""
                }`}
              >
                {day.format("D")}
              </div>
              <div className={styles.events}>{renderEvents(day)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
