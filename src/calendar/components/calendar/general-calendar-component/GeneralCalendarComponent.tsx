"use client";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useMemo, useState } from "react";
import MonthView from "../month-view/MonthView";
import WeekView from "../week-view/WeekView";
import styles from "./GeneralCalendarComponent.module.scss";

const GeneralCalendarComponent = () => {
  dayjs.locale("fr");
  const [calendarView, setCalendarView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPrevious = () => {
    if (calendarView === "week") {
      setCurrentDate(dayjs(currentDate).subtract(1, "week").toDate());
    } else {
      setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
    }
  };

  const goToNext = () => {
    if (calendarView === "week") {
      setCurrentDate(dayjs(currentDate).add(1, "week").toDate());
    } else {
      setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const currentMonthYear = useMemo(() => {
    return dayjs(currentDate).format("MMMM YYYY");
  }, [currentDate]);

  const toggleView = () => {
    setCalendarView(calendarView === "week" ? "month" : "week");
  };

  const renderHeader = useMemo(() => {
    return (
      <div className={styles.header}>
        <div className={styles.month}>{currentMonthYear}</div>
        <div className={styles.viewToggle}>
          <div className={styles.toggleContainer}>
            <button
              onClick={() => calendarView !== "week" && toggleView()}
              className={`${styles.toggleButton} ${calendarView === "week" ? styles.active : ""}`}
            >
              Semaine
            </button>
            <button
              onClick={() => calendarView !== "month" && toggleView()}
              className={`${styles.toggleButton} ${calendarView === "month" ? styles.active : ""}`}
            >
              Mois
            </button>
          </div>
        </div>
        <div className={styles.controlls}>
          <button className="m-button" onClick={goToPrevious}>
            <ChevronLeftCircle />
          </button>
          <button className="m-button" onClick={goToToday}>
            Aujourd'hui
          </button>
          <button className="m-button" onClick={goToNext}>
            <ChevronRightCircle />
          </button>
        </div>
      </div>
    );
  }, [
    calendarView,
    currentMonthYear,
    toggleView,
    goToPrevious,
    goToToday,
    goToNext,
  ]);
  const renderCalendarBasedOnView = useMemo(() => {
    return (
      <div className={styles.calendar}>
        {calendarView === "week" ? (
          <WeekView currentDate={currentDate} />
        ) : (
          <MonthView currentDate={currentDate} />
        )}
      </div>
    );
  }, [calendarView, currentDate]);

  return (
    <div className={styles.main}>
      <div className={styles.view}></div>
      {renderHeader}
      {renderCalendarBasedOnView}
    </div>
  );
};

export default GeneralCalendarComponent;
