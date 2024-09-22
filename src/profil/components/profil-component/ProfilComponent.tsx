"use client";
import React, { useState } from "react";
import { User, Mail, Camera } from "lucide-react";
import styles from "./ProfilComponent.module.scss";
import { useForm } from "react-hook-form";
import { updateUser } from "@actions/user";

interface Props {
  userData: any;
}

const ProfilComponent = ({ userData: serverUserData }: Props) => {
  const [userData, setUserData] = useState(serverUserData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: serverUserData.name,
      email: serverUserData.email,
    },
  });

  const onSubmit = async (data: any) => {
    const result = await updateUser(data);
    if (result.user) {
      setUserData(result.user);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          {userData.avatarUrl ? (
            <img
              src={userData.avatarUrl}
              alt={userData.name}
              className={styles.avatar}
            />
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
          <div className="m-input">
            <label htmlFor="name">Name</label>
            <div className="m-input__core">
              <div className="m-input__core__prefix">
                <User />
              </div>
              <input {...register("name", { required: "Name is required" })} />
            </div>
          </div>
          <div className="m-input">
            <label htmlFor="name">Email</label>
            <div className="m-input__core">
              <div className="m-input__core__prefix">
                <Mail />
              </div>
              <input
                {...register("email", { required: "email is required" })}
              />
            </div>
          </div>
          <button
            className={styles.editButton}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilComponent;
