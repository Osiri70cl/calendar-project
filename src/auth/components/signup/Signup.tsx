"use client";
import { useState } from "react";
import { CalendarDays, User, Mail, Lock } from "lucide-react";
import styles from "./Signup.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupUser } from "@actions/user";
import Link from "next/link";

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

export default function SignupComponent() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>();
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    const result = await signupUser(data);
    if (result.user) {
      router.push("/tests");
    } else if (result.errors) {
      console.log(result.errors);
      Object.keys(result.errors).forEach((key) => {
        setError(key as keyof SignupFormValues, {
          type: "manual",
          message: result.errors![key].join(", "),
        });
      });
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <CalendarDays className={styles.icon} />
          </div>
          <h2 className={styles.title}>Create an Account</h2>
          <p className={styles.description}>
            Sign up to start using your professional calendar
          </p>
        </div>
        <div className={styles.cardContent}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="m-input">
              <label htmlFor="firstName">Name</label>
              <div className="m-input__core">
                <div className="m-input__core__prefix">
                  <User />
                </div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            {/* <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={styles.input}
                    required
                  />
                </div>
              </div> */}
            <div className="m-input">
              <label htmlFor="email">Email</label>
              <div className="m-input__core">
                <div className="m-input__core__prefix">
                  <Mail />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  placeholder="Password"
                />
              </div>
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            {/* <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div> */}
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.loginText}>
            Already have an account?{" "}
            <Link href="/connexion" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
