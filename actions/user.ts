"use server";

import { db } from "@db/index";
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface FormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

export async function loginUser(data: FormValues) {
  const { email, password } = data;

  try {
    console.log("Attempting to find user with email:", email);
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return {
        errors: {
          _form: ["Invalid email or password"],
        },
      };
    }

    console.log("Comparing passwords");
    const validPassword = await compare(password, user.password);
    console.log("Password valid:", validPassword ? "Yes" : "No");

    if (!validPassword) {
      return {
        errors: {
          _form: ["Invalid email or password"],
        },
      };
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return { user: { id: user.id, email: user.email } };
  } catch (error: unknown) {
    console.error("Failed to login user:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function signupUser(data: SignupFormValues) {
  const { email, password, name } = data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        errors: {
          email: ["A user with this email already exists"],
        },
      };
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    cookies().set("tokenCalendar", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return { user: newUser };
  } catch (error: unknown) {
    console.error("Failed to signup user:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}
