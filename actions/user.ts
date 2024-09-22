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

interface JwtPayload {
  userId: number;
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

    const validPassword = await compare(password, user.password);

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
      maxAge: 2592000,
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

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2592000,
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

export async function getUserByToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const userId = decoded.userId;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return {
        errors: {
          _form: ["User not found"],
        },
      };
    }

    return { user };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return {
        errors: {
          _form: ["Invalid or expired token"],
        },
      };
    }
    console.error("Failed to get user by token:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function updateUser(data: any) {
  const { name, email } = data;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    const newUser = await db.user.update({
      data: {
        name,
        email,
      },
      where: {
        id: existingUser.id,
      },
    });

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  } catch (error: unknown) {
    console.error("Failed to update user:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}
