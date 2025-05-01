import format from "date-fns/format";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { dateFnsLocalizer } from "react-big-calendar";

export const getLocalizer = () => {
  const locales = {
    fr: fr,
  };

  return dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date: any) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales,
  });
};

export const frenchMessages = {
  allDay: "Journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement dans cette plage",
};
