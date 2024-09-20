"use client";
import styles from "./PostsNew.module.scss";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface FormValues {
  title: string;
  content: string;
}

interface PostFormProps {
  formAction: (
    data: FormValues
  ) => Promise<{ errors?: { [key: string]: string[] } }>;
  initialValues: FormValues;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostsNew = ({ formAction, initialValues }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [submissionResult, setSubmissionResult] = useState<{
    post?: Post;
    errors?: { [key: string]: string[] };
  } | null>(null);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      startTransition(async () => {
        const result = await formAction(data);
        setSubmissionResult(result);
      });
    },
    [formAction]
  );

  const handleErrors = useCallback(
    (errors: { [key: string]: string[] }) => {
      Object.keys(errors).forEach((key) => {
        setError(key as keyof FormValues, {
          type: "manual",
          message: errors[key].join(", "),
        });
      });
    },
    [setError]
  );

  const handleSuccess = useCallback(
    (post: Post) => {
      console.log("Created post:", post);
      //   router.push(`/posts/${post.id}`);
    },
    [router]
  );

  useEffect(() => {
    if (submissionResult) {
      if (submissionResult.post) {
        handleSuccess(submissionResult.post);
      } else if (submissionResult.errors) {
        handleErrors(submissionResult.errors);
      }
      setSubmissionResult(null);
    }
  }, [submissionResult, handleSuccess, handleErrors]);

  return (
    <div className={styles.postsNew}>
      <h1>PostsNew</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div className="m-input">
          <label htmlFor="title">Title</label>
          <div className="m-input__core">
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
          </div>

          {errors.title && <div>{errors.title.message}</div>}
        </div>
        <div className="m-input">
          <label htmlFor="content">Content</label>
          <div className="m-input__core">
            <input
              id="content"
              {...register("content", { required: "Content is required" })}
            ></input>
          </div>
          {errors.content && <div>{errors.content.message}</div>}
        </div>
        <div>
          <button
            type="submit"
            className="m-button m-button--primary"
            disabled={isPending}
          >
            <span>{isPending ? "Saving..." : "Save"}</span>
          </button>
          {/* <Link href="/">Cancel</Link> */}
        </div>
      </form>
    </div>
  );
};

export default PostsNew;
