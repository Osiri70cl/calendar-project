import { fetchPosts } from "@db/queries/posts";
import Link from "next/link";

export default async function Tests() {
  const posts = await fetchPosts();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="general_layout">
      <h1>Tests</h1>
      <Link href="/tests/new">Create a new post</Link>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <div>
                <Link
                  key={post.id}
                  href={`/posts/${post.id}/edit`}
                  className=""
                >
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>
              </div>
              <div>
                {"Updated at " +
                  post.updatedAt.toLocaleDateString("en-US", dateOptions)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
