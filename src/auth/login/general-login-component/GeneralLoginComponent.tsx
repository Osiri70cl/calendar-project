"use client";

import useApi, { Methods } from "@global/hooks/useApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./GeneralLoginComponent.module.scss";

const GeneralLoginComponent = () => {
  const { response, error, loading, callApi } = useApi();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = methods;

  const onsubmit = (data: any) => {
    callApi(Methods.POST, "/api/login", data);
  };

  useEffect(() => {
    if (response) {
      router.push("/calendrier");
    }
  }, [response]);

  return (
    <div className={styles.main}>
      <div className={styles.titles}>
        <p className={styles.title}>Connexion</p>
        <p className={styles.subtitle}>Bon retour parmi nous !</p>
      </div>
      <FormProvider {...methods}>
        <div className={styles.form}>
          <div className="m-input">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input type="email" id="email" {...register("email")} />
          </div>
          <div className="m-input">
            <label htmlFor="email">
              Mot de passe <span>*</span>
            </label>
            <input type="password" id="password" {...register("password")} />
          </div>
          <Link href="/inscription">Pas de compte ? Inscrivez-vous</Link>
          <div className={styles.actions}>
            <button
              type="button"
              className="m-button m-button--primary"
              onClick={handleSubmit(onsubmit)}
            >
              <span>Je me connecte</span>
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default GeneralLoginComponent;
