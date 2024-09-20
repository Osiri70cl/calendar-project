"use client";

import PostsNew from "@/posts/components/posts-new/PostsNew";
import { createPost } from "@actions/posts";

export default async function New() {
  return (
    <div className="general_layout">
      <PostsNew
        formAction={createPost}
        initialValues={{ title: "", content: "" }}
      />
    </div>
  );
}
