"use client";
import React from "react";
import { User, Mail, Camera } from "lucide-react";
import styles from "./ProfilComponent.module.scss";

interface Props {
  name: string;
  email: string;
  avatarUrl?: string;
}

const ProfilComponent = ({ name, email, avatarUrl }: Props) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User size={48} />
            </div>
          )}
          <button className={styles.changeAvatarButton}>
            <Camera size={20} />
          </button>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoGroup}>
            <User className={styles.icon} />
            <div>
              <h2 className={styles.label}>Name</h2>
              <p className={styles.value}>{name}</p>
            </div>
          </div>
          <div className={styles.infoGroup}>
            <Mail className={styles.icon} />
            <div>
              <h2 className={styles.label}>Email</h2>
              <p className={styles.value}>{email}</p>
            </div>
          </div>
        </div>
        <button className={styles.editButton}>Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilComponent;
