"use client";

import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import styles from "./WeekView.module.scss";

interface WeekViewProps {
  startHour?: number;
  endHour?: number;
  currentDate?: Date;
  onEventCreate?: (event: { start: Date; end: Date; dayIndex: number }) => void;
}

const WeekView = ({
  startHour = 1,
  endHour = 23,
  currentDate = new Date(),
  onEventCreate,
}: WeekViewProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const calendarBodyRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{
    dayIndex: number;
    top: number;
  } | null>(null);
  const [dragEnd, setDragEnd] = useState<{
    dayIndex: number;
    top: number;
  } | null>(null);
  const [tempEvent, setTempEvent] = useState<{
    dayIndex: number;
    top: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (calendarBodyRef.current) {
      const now = dayjs();
      const currentHour = now.hour();

      if (currentHour >= startHour && currentHour <= endHour) {
        const hourPosition = (currentHour - startHour) * 60;
        calendarBodyRef.current.scrollTop = hourPosition - 100;
      }
    }
  }, [startHour, endHour]);

  const pixelToTime = (pixels: number): { hour: number; minute: number } => {
    const hourHeight = 60;
    const totalMinutes = (pixels / hourHeight) * 60;
    const hour = Math.floor(totalMinutes / 60) + startHour;
    const minute = Math.round(totalMinutes % 60);
    return { hour, minute };
  };

  const handleMouseDown = (e: React.MouseEvent, dayIndex: number) => {
    if (e.button !== 0) return;

    const dayColumn = (e.target as HTMLElement).closest(`.${styles.dayColumn}`);
    if (!dayColumn) return;

    const rect = dayColumn.getBoundingClientRect();
    const top = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ dayIndex, top });
    setDragEnd({ dayIndex, top });
    setTempEvent({ dayIndex, top, height: 10 });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragStart) return;

    const dayColumns = document.querySelectorAll(
      `.${styles.dayGrid} .${styles.dayColumn}`
    );
    if (!dayColumns || !dayColumns[dragStart.dayIndex]) return;

    const dayColumn = dayColumns[dragStart.dayIndex];
    const rect = dayColumn.getBoundingClientRect();
    const currentTop = e.clientY - rect.top;

    setDragEnd({ dayIndex: dragStart.dayIndex, top: currentTop });

    const top = Math.min(dragStart.top, currentTop);
    const height = Math.abs(currentTop - dragStart.top);

    setTempEvent({
      dayIndex: dragStart.dayIndex,
      top,
      height: Math.max(height, 20),
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (isDragging && dragStart && dragEnd && tempEvent) {
      const startTime = pixelToTime(tempEvent.top);
      const endTime = pixelToTime(tempEvent.top + tempEvent.height);

      const startOfWeek = dayjs(currentDate).startOf("week");
      const day = startOfWeek.add(dragStart.dayIndex, "day");

      const startDate = day
        .hour(startTime.hour)
        .minute(startTime.minute)
        .toDate();
      const endDate = day.hour(endTime.hour).minute(endTime.minute).toDate();

      if (onEventCreate) {
        console.log(startDate, endDate);
        onEventCreate({
          start: startDate,
          end: endDate,
          dayIndex: dragStart.dayIndex,
        });
      }

      setIsDragging(false);
      setDragStart(null);
      setDragEnd(null);
      setTempEvent(null);
    }
  };

  const generateWeekDays = () => {
    const startOfWeek = dayjs(currentDate).startOf("week");
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      days.push({
        dayName: day.format("dd"),
        date: day.format("D"),
        isCurrent: day.isSame(dayjs(), "day"),
        dayObj: day,
      });
    }

    return days;
  };

  const generateHours = () => {
    const hours = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.push(hour);
    }
    return hours;
  };

  const calculateTimePosition = () => {
    const now = dayjs(currentTime);
    const hours = now.hour();
    const minutes = now.minute();

    const hourHeight = 60;
    return (hours - startHour) * hourHeight + (minutes / 60) * hourHeight;
  };

  const weekDays = generateWeekDays();
  const hours = generateHours();

  return (
    <div className={styles.weekView}>
      <div className={styles.daysHeader}>
        <div className={styles.timeColumn}></div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`${styles.dayColumn} ${day.isCurrent ? styles.currentDay : ""}`}
          >
            <div className={styles.dayName}>
              {day.dayName} {day.date}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.calendarBody} ref={calendarBodyRef}>
        <div className={styles.calendarGrid}>
          <div className={styles.timeColumn}>
            {hours.map((hour) => (
              <div key={hour} className={styles.hourCell}>
                <span className={styles.hourLabel}>
                  {hour < 10 ? `0${hour}` : hour}:00
                </span>
              </div>
            ))}
          </div>
          <div className={styles.dayGrid}>
            <div
              className={styles.currentTimeIndicator}
              style={{ top: `${calculateTimePosition()}px` }}
            >
              <div className={styles.timeLabel}>
                {dayjs(currentTime).format("HH:mm")}
              </div>
              <div className={styles.timeLine}></div>
            </div>

            {tempEvent && (
              <div
                className={styles.tempEvent}
                style={{
                  position: "absolute",
                  top: `${tempEvent.top}px`,
                  height: `${tempEvent.height}px`,
                  left: `calc(${(tempEvent.dayIndex / 7) * 100}%)`,
                  width: `calc(${100 / 7}%)`,
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                  border: "1px dashed #3b82f6",
                  borderRadius: "3px",
                  zIndex: 5,
                }}
              />
            )}

            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={styles.dayColumn}
                onMouseDown={(e) => handleMouseDown(e, dayIndex)}
              >
                {hours.map((hour) => (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className={styles.timeCell}
                    data-hour={hour}
                    data-date={day.dayObj.format("YYYY-MM-DD")}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
