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
import styles from "./CalendarView.module.scss";
import EventCreation from "../event/EventCreation";
import { Event } from "@/calendar/types/events";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Network,
  Plus,
  PlusCircle,
  Share2Icon,
} from "lucide-react";
import CalendarShare from "../../calendar-share/CalendarShare";
import EventUpdate from "../event/EventUpdate";
import WeekView from "./week-view/WeekView";
import MonthView from "./month-view/MonthView";

dayjs.extend(weekOfYear);
dayjs.locale("fr");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
  events: Event[];
  publicCalendar?: boolean;
};

const CalendarView = ({ events: initialEvents, publicCalendar }: Props) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [viewType, setViewType] = useState<"week" | "month">("week");
  const { setHandleStatusModal } = useModalStore();

  const handleCreatedEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewType(event.target.value as "week" | "month");
  };

  const openModal = () => {
    console.log("open modal");
    setHandleStatusModal({
      status: true,
      children: <EventCreation handleCreatedEvent={handleCreatedEvent} />,
      title: "Créer un événement",
    });
  };

  const openCalendarShare = () => {
    setHandleStatusModal({
      status: true,
      children: <CalendarShare />,
      title: "Partager mon calendrier",
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className="m-select-mission m-select-mission--sm">
          <select value={viewType} onChange={handleViewChange}>
            <option value={"week"}>Semaine</option>
            <option value={"month"}>Mois</option>
            {/* <option value={20}>20%</option> */}
          </select>
          <span className="m-select-mission__arrow">
            <ChevronsUpDown />
          </span>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div className={styles.right}>
        {viewType === "week" ? (
          <WeekView
            events={events}
            openCalendarShare={openCalendarShare}
            publicCalendar={publicCalendar}
          />
        ) : (
          <MonthView
            events={events}
            openCalendarShare={openCalendarShare}
            publicCalendar={publicCalendar}
          />
        )}
        {!publicCalendar && (
          <button
            type="button"
            className={styles.createEventButton}
            onClick={openModal}
          >
            <PlusCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
