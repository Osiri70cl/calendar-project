"use client";
import { loginUser } from "@actions/user";
import styles from "./Login.module.scss";
import { CalendarDays, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    console.log(data, "tetet");
    const result = await loginUser(data);
    console.log(result);
    if (result.user) {
      console.log(result.user);
      router.push("/tests");
    } else if (result.errors) {
      Object.keys(result.errors).forEach((key) => {
        setError(key as keyof FormValues, {
          type: "manual",
          message: result.errors![key].join(", "),
        });
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <CalendarDays className={styles.icon} />
          </div>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.description}>
            Login to access your professional calendar
          </p>
        </div>
        <div className={styles.cardContent}>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleSubmit(onSubmit)}
            >
              Log in
            </button>
          </form>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.signupText}>
            Don't have an account?{" "}
            <a href="#" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
