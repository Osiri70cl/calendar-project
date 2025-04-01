"use client";

import useApi, { Methods } from "@/global/hooks/useApi";
import Link from "next/link";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./GeneralSignupComponent.module.scss";

const GeneralSignupComponent = () => {
  const { response, error, loading, callApi } = useApi();
  const methods = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = methods;

  const onsubmit = (data: any) => {
    callApi(Methods.POST, "/api/signup", data);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div className={styles.main}>
      <div className={styles.titles}>
        <p className={styles.title}>Créer votre compte Calflow</p>
        <p className={styles.subtitle}>Plus que quelques informations !</p>
      </div>
      <FormProvider {...methods}>
        <div className={styles.form}>
          <div className="m-input">
            <label htmlFor="firstname">
              Prénom <span>*</span>
            </label>
            <input type="text" id="firstname" {...register("firstname")} />
          </div>
          <div className="m-input">
            <label htmlFor="lastname">
              Nom <span>*</span>
            </label>
            <input type="text" id="lastname" {...register("lastname")} />
          </div>
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
          <Link href="/connexion">Déjà un compte ? Connectez-vous</Link>
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

export default GeneralSignupComponent;
