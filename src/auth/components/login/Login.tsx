"use client";
import { loginUser } from "@actions/user";
import styles from "./Login.module.scss";
import { CalendarDays, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const result = await loginUser(data);
    if (result.user) {
      router.push("/mon-espace");
      setLoading(false);
    } else if (result.errors) {
      setLoading(false);
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
          <form className={styles.form}>
            <div className="m-input">
              <label htmlFor="email">Email</label>
              <div className="m-input__core">
                <div className="m-input__core__prefix">
                  <Mail />
                </div>
                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                />
              </div>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="m-input">
              <label htmlFor="password">Password</label>
              <div className="m-input__core">
                <div className="m-input__core__prefix">
                  <Lock />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                />
              </div>
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </form>
          <button
            type="button"
            className={styles.button}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Connexion"}
          </button>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.signupText}>
            Don't have an account?{" "}
            <Link href="/inscription" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
