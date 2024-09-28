"use client";
import { useMemo, useState } from "react";
import styles from "./CalendarShare.module.scss";
import { Link } from "lucide-react";
import { createLinkShare } from "@actions/events";

const CalendarShare = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState(false);
  const [link, setLink] = useState("");

  const handleOpenAppointment = () => {
    setIsAppointmentOpen(!isAppointmentOpen);
    if (!isAppointmentOpen) {
      console.log("Open appointment");
    }
  };

  const handleCreateShareLink = async () => {
    const result = await createLinkShare();
    if (result) {
      setSharedLink(true);
      setLink(result.shareableLink);
    }
  };

  const renderSharedLink = useMemo(() => {
    if (!sharedLink) return null;

    return (
      <div className="m-input">
        <label htmlFor="link">Lien de partage</label>
        <div className="m-input__core">
          <input
            id="link"
            type="text"
            value={link}
            readOnly
            placeholder="Lien de partage"
          />
        </div>
      </div>
    );
  }, [sharedLink]);

  return (
    <div className={styles.calendarShare}>
      <p className={styles.explanation}>
        En partageant votre calendrier, vous permettez au personnes disposant de
        votre lien de voir tout vos événements à la visibilité public.
        <br />
        Elles pourront également s'inscrire à vos événements si vous leur ouvrez
        l'accès ou vous faire des demandes de prise de rdv.
        <br />
        <br />
        Ils verront également vos périodes d'indisponibilités.
      </p>
      <div className={styles.shareContainer}>
        <div className={styles.appointment}>
          <p className={styles.label}>
            Permettre aux personnes de faire des demandes de prise de rdv
          </p>
          <div className="m-switch m-switch--md">
            <input
              type="checkbox"
              checked={isAppointmentOpen}
              onClick={handleOpenAppointment}
            />
            <span></span>
          </div>
        </div>
        <div className={styles.linkGenerate}>
          <button
            type="button"
            className="m-button m-button--secondary"
            onClick={handleCreateShareLink}
          >
            <Link size={20} /> Générer le lien
          </button>
          {renderSharedLink}
        </div>
      </div>
    </div>
  );
};

export default CalendarShare;
