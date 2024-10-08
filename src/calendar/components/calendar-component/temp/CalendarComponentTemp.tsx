"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/fr";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import styles from "./CalendarComponentTemp.module.scss";
import { Event } from "@/calendar/types/events";

dayjs.extend(weekOfYear);
dayjs.locale("fr");

type CalendarView = "week" | "month" | "sixMonths";

const WeekView: React.FC<{ currentDate: dayjs.Dayjs; events: Event[] }> = ({
  currentDate,
  events,
}) => {
  const startOfWeek = currentDate.startOf("week").add(1, "day");
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className={styles.weekView}>
      <div className={styles.weekDayLabels}>
        <div className={styles.hourLabel}></div>
        {weekDays.map((day) => (
          <div key={day.format("YYYY-MM-DD")} className={styles.dayLabel}>
            <span className={styles.dayName}>{day.format("ddd")}</span>
            <span className={styles.dayNumber}>{day.format("D")}</span>
          </div>
        ))}
      </div>
      <div className={styles.weekGrid}>
        <div className={styles.hourLabels}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hourLabel}>
              {`${hour.toString().padStart(2, "0")}:00`}
            </div>
          ))}
        </div>
        {weekDays.map((day) => (
          <div key={day.format("YYYY-MM-DD")} className={styles.dayColumn}>
            {hours.map((hour) => (
              <div key={hour} className={styles.hourCell}>
                {events
                  .filter(
                    (event) =>
                      event.date.isSame(day, "day") &&
                      parseInt(event.startTime.split(":")[0]) === hour
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[event.category]}`}
                    >
                      {event.title} ({event.startTime} - {event.endTime})
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthView: React.FC<{ currentDate: dayjs.Dayjs; events: Event[] }> = ({
  currentDate,
  events,
}) => {
  const startOfMonth = currentDate
    .startOf("month")
    .startOf("week")
    .add(1, "day");
  const endOfMonth = currentDate.endOf("month");
  const days = [];

  for (
    let day = startOfMonth;
    day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day");
    day = day.add(1, "day")
  ) {
    days.push(day);
  }

  return (
    <div className={styles.monthView}>
      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
        <div key={day} className={styles.weekday}>
          {day}
        </div>
      ))}
      {days.map((day) => (
        <div
          key={day.format("YYYY-MM-DD")}
          className={`${styles.calendarDay} ${
            day.month() !== currentDate.month() ? styles.otherMonth : ""
          }`}
        >
          <span className={styles.dayNumber}>{day.format("D")}</span>
          {events
            .filter((event) => event.date.isSame(day, "day"))
            .map((event) => (
              <div
                key={event.id}
                className={`${styles.event} ${styles[event.category]}`}
              >
                {event.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

const SixMonthView: React.FC<{ currentDate: dayjs.Dayjs }> = ({
  currentDate,
}) => {
  const months = Array.from({ length: 6 }, (_, i) =>
    currentDate.add(i, "month")
  );

  const getWeeksInMonth = (month: dayjs.Dayjs) => {
    const firstDay = month.startOf("month");
    const lastDay = month.endOf("month");
    const firstWeek = firstDay.week();
    const lastWeek = lastDay.week();
    return lastWeek - firstWeek + 1;
  };

  return (
    <div className={styles.sixMonthView}>
      {months.map((month) => (
        <div key={month.format("YYYY-MM")} className={styles.miniMonth}>
          <h3>{month.format("MMMM YYYY")}</h3>
          <div className={styles.miniMonthGrid}>
            {Array.from({ length: getWeeksInMonth(month) }, (_, i) => {
              const weekNumber = month.startOf("month").add(i, "week").week();
              return (
                <div
                  key={`${month.format("YYYY-MM")}-W${weekNumber}`}
                  className={styles.weekNumber}
                >
                  W{weekNumber}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const CalendarComponentTemp = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<CalendarView>("month");
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Réunion du conseil",
      date: dayjs().add(1, "day"),
      startTime: "10:00",
      endTime: "11:30",
      category: "meeting",
    },
    {
      id: 2,
      title: "Rendez-vous médical",
      date: dayjs().add(2, "day"),
      startTime: "14:00",
      endTime: "15:00",
      category: "appointment",
    },
    {
      id: 3,
      title: "Inspection du chantier",
      date: dayjs().add(3, "day"),
      startTime: "09:00",
      endTime: "12:00",
      category: "task",
    },
  ]);
  const navigateDate = (direction: "prev" | "next") => {
    const amount = view === "week" ? 1 : view === "month" ? 1 : 6;
    const unit = view === "week" ? "week" : "month";
    setCurrentDate((prev) =>
      direction === "prev"
        ? prev.subtract(amount, unit)
        : prev.add(amount, unit)
    );
  };

  return (
    <div className={styles.calendarPage}>
      <header className={styles.header}>
        <h1>EcoCalendar</h1>
        <div className={styles.controls}>
          <select
            value={view}
            onChange={(e) => setView(e.target.value as CalendarView)}
            className={styles.viewSelector}
          >
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="sixMonths">6 Mois</option>
          </select>
          <button className={styles.addEventButton}>
            <Plus size={20} />
            Ajouter un événement
          </button>
        </div>
      </header>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button
            onClick={() => navigateDate("prev")}
            className={styles.navButton}
          >
            <ChevronLeft size={24} />
          </button>
          <h2>
            {view === "week"
              ? `Semaine ${currentDate.week()} - ${currentDate.year()}`
              : currentDate.format("MMMM YYYY")}
          </h2>
          <button
            onClick={() => navigateDate("next")}
            className={styles.navButton}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {view === "week" && (
          <WeekView currentDate={currentDate} events={events} />
        )}
        {view === "month" && (
          <MonthView currentDate={currentDate} events={events} />
        )}
        {view === "sixMonths" && <SixMonthView currentDate={currentDate} />}
      </div>
    </div>
  );
};

export default CalendarComponentTemp;
