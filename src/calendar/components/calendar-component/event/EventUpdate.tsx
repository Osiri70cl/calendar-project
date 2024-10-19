"use client";
import { useForm } from "react-hook-form";
import styles from "./EventForm.module.scss";
import { createEvent } from "@actions/events";
import { describe } from "node:test";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useModalStore } from "@/zustand/store";
import { SingleDatePicker } from "@osiris70cl/simple-react-date-picker";
import INTIAL_SINGLE_PICKER from "@/global/constants/intialSinglePicker";
import { useEffect, useMemo, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  handleCreatedEvent: Function;
  event: Event;
  day?: dayjs.Dayjs;
};

const EventUpdate = ({ handleCreatedEvent, event, day }: Props) => {
  const { setHandleStatusModal } = useModalStore();
  const [dropdown, setDropdown] = useState(false);
  const [dropdownEnd, setDropdownEnd] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({ defaultValues: event });

  useEffect(() => {
    if (day) {
      setValue("startDate", day.format("YYYY-MM-DD"));
    }
  }, [day]);

  const formatDateTime = (date: string, time: string): string => {
    const dateTime = dayjs(`${date} ${time}`);
    return dateTime.tz("Europe/Paris").format("YYYY-MM-DDTHH:mm:ssZ");
  };

  const onSubmit = async (data: any) => {
    const dataToSend = {
      title: data.title,
      description: data.description,
      startDate: dayjs(data.startDate).format(),
      endDate: data.endDate
        ? dayjs(data.endDate).format()
        : dayjs(data.startDate).format(),
      startTime: formatDateTime(data.startDate, data.startTime),
      endTime: data.endDate
        ? formatDateTime(data.endDate, data.endTime)
        : formatDateTime(data.startDate, data.endTime),
      location: data.location ? data.location : "",
      link: data.link ? data.link : "",
      visibility: data.visibility,
      type: data.type,
    };

    const result = await createEvent(dataToSend);
    handleCreatedEvent(result.event);
    setHandleStatusModal({ status: false });
  };

  const handleSelectedDate = (date: string) => {
    console.log(date);
    setValue("startDate", dayjs(date).format("YYYY-MM-DD"));
    console.log(watch("startDate"));
    setDropdown(false);
  };
  const handleSelectedEndDate = (date: string) => {
    console.log(date);
    setValue("endDate", dayjs(date).format("YYYY-MM-DD"));
    setDropdownEnd(false);
  };

  const renderDateSelection = useMemo(() => {
    return (
      <div style={{ position: "relative" }}>
        <div
          className="m-input"
          style={{ cursor: "pointer" }}
          onClick={() => setDropdown(!dropdown)}
        >
          <label htmlFor="date">Date de début</label>
          <div className="m-input__core" style={{ cursor: "pointer" }}>
            <input
              id="date"
              type="text"
              placeholder="Renseignez la date de début"
              readOnly
              style={{ cursor: "pointer" }}
              {...register("startDate")}
            />
          </div>
        </div>
        {dropdown && (
          <div className={styles.dropdown}>
            <SingleDatePicker
              handleSelectedDate={handleSelectedDate}
              initialData={INTIAL_SINGLE_PICKER}
            />
          </div>
        )}
      </div>
    );
  }, [dropdown]);

  const renderEndDateSelection = useMemo(() => {
    return (
      <div style={{ position: "relative" }}>
        <div
          className="m-input"
          style={{ cursor: "pointer" }}
          onClick={() => setDropdownEnd(!dropdownEnd)}
        >
          <label htmlFor="date">Date de fin</label>
          <div className="m-input__core" style={{ cursor: "pointer" }}>
            <input
              id="date"
              type="text"
              placeholder="Laissez vide si le même que le début"
              readOnly
              style={{ cursor: "pointer" }}
              {...register("endDate")}
            />
          </div>
        </div>
        {dropdownEnd && (
          <div className={styles.dropdown}>
            <SingleDatePicker
              handleSelectedDate={handleSelectedEndDate}
              initialData={INTIAL_SINGLE_PICKER}
            />
          </div>
        )}
      </div>
    );
  }, [dropdownEnd]);

  const renderCorrectVisibilityExplanation = useMemo(() => {
    if (watch("visibility") === "public") {
      return (
        <p className={styles.explaination}>
          Les événements publics seront visible dans leur totalité lors du
          partage de votre calendrier.
        </p>
      );
    } else if (watch("visibility") === "private") {
      return (
        <p className={styles.explaination}>
          Les événements privés ne seront visible que par vous, les participants
          de ces événements et les personnes ayant accès à votre calendrier.
        </p>
      );
    } else {
      return (
        <p className={styles.explaination}>
          Les événements indisponibles ne seront visible que par vous et les
          participants de ces événements. Pour toutes autres personnes, une
          indisponibilité sera indiquée sur votre calendrier.
        </p>
      );
    }
  }, [watch()]);

  const renderVisibility = useMemo(() => {
    return (
      <div className="m-input">
        <label htmlFor="visibility">Visibilité</label>
        <div className="m-input__core">
          <select {...register("visibility")}>
            <option value="public">Public</option>
            <option value="private">Privé</option>
            <option value="busy">Indisponible</option>
          </select>
        </div>
        {renderCorrectVisibilityExplanation}
      </div>
    );
  }, [renderCorrectVisibilityExplanation]);

  return (
    <div className={styles.eventForm}>
      <form className={styles.form}>
        <div className="m-input">
          <label htmlFor="title">Titre</label>
          <div className="m-input__core">
            <input
              id="title"
              {...register("title", { required: "Titre est requis" })}
              placeholder="Titre de l'événement"
            />
          </div>
        </div>
        <div className="m-input">
          <label htmlFor="description">Description</label>
          <div className="m-input__core">
            <input
              id="description"
              {...register("description")}
              placeholder="Description de l'événement"
            />
          </div>
        </div>
        {renderDateSelection}
        {renderEndDateSelection}
        <div className="m-input">
          <label htmlFor="startTime">Heure de début</label>
          <div className="m-input__core">
            <input id="startTime" type="time" {...register("startTime")} />
          </div>
        </div>
        <div className="m-input">
          <label htmlFor="endTime">Heure de fin</label>
          <div className="m-input__core">
            <input id="endTime" type="time" {...register("endTime")} />
          </div>
        </div>
        <div className="m-input">
          <label htmlFor="type">Type de l'événement</label>
          <div className="m-input__core">
            <input
              id="type"
              {...register("type")}
              placeholder="type de l'événement"
            />
          </div>
        </div>
        <div className="m-input">
          <label htmlFor="location">Lieu de l'événement</label>
          <div className="m-input__core">
            <input
              id="location"
              {...register("location")}
              placeholder="lieu de l'événement"
            />
          </div>
        </div>
        {renderVisibility}
      </form>
      <button
        type="button"
        className="m-button m-button--secondary"
        onClick={handleSubmit(onSubmit)}
      >
        Créer
      </button>
    </div>
  );
};

export default EventUpdate;
