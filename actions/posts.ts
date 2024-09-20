"use server";
import { db } from "@db/index";
import type { Post } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormValues {
  title: string;
  content: string;
}

export async function createPost(data: FormValues) {
  const { title, content } = data;

  try {
    const post = await db.post.create({
      data: { title, content },
    });
    revalidatePath("/");
    return { post: { id: post.id, title: post.title, content: post.content } };
  } catch (error: unknown) {
    console.error("Failed to create post:", error);
    return {
      errors: {
        _form: [(error as Error).message || "Failed to create post"],
      },
    };
  }
}
