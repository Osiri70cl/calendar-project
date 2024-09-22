"use client";
import { useForm } from "react-hook-form";
import styles from "./EventForm.module.scss";
import { createEvent } from "@actions/events";
import { describe } from "node:test";
import dayjs from "dayjs";

const EventCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    const dataToSend = {
      title: data.title,
      description: data.description,
      startTime: "2023-09-01T10:00:00.000Z",
      endTime: "2023-09-01T11:00:00.000Z",
      date: dayjs(data.date).format(),
      type: data.type,
      location: data.location ? data.location : "",
      link: data.link ? data.link : "",
    };

    const result = await createEvent(dataToSend);
    console.log(result);
  };

  return (
    <div className={styles.eventForm}>
      <form>
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
        <div className="m-input">
          <label htmlFor="date">Date</label>
          <div className="m-input__core">
            <input id="date" type="date" {...register("date")} />
          </div>
        </div>
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

export default EventCreation;
