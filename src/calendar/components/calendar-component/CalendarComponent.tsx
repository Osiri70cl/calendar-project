"use client";
import { useMemo, useState } from "react";
import styles from "./CalendarComponent.module.scss";
import CalendarView from "./calendar-view/CalendarView";
import UpcomingComponent from "@/upcoming/components/upcoming-component/UpcomingComponent";

type Props = {
  eventData: Event[];
};

const CalendarComponent = ({ eventData }: Props) => {
  const [events, setEvents] = useState<Event[]>(eventData);
  const [currentView, setCurrentView] = useState<"calendar" | "agenda">(
    localStorage.getItem("currentView") === "agenda" ? "agenda" : "calendar"
  );

  const handleSelectedVue = (view: "calendar" | "agenda") => {
    setCurrentView(view);
    localStorage.setItem("currentView", view);
  };

  const renderView = useMemo(() => {
    switch (currentView) {
      case "calendar":
        return <CalendarView events={events} />;
      case "agenda":
        return <UpcomingComponent events={events} />;
    }
  }, [currentView]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => handleSelectedVue("calendar")}
          className={`${styles.selection} ${
            currentView === "calendar" ? styles.active : ""
          }`}
        >
          Calendrier
        </button>
        <button
          type="button"
          onClick={() => handleSelectedVue("agenda")}
          className={`${styles.selection} ${
            currentView === "agenda" ? styles.active : ""
          }`}
        >
          Prochains événements
        </button>
      </div>
      {renderView}
    </div>
  );
};

export default CalendarComponent;
