import Image from "next/image";
import Link from "next/link";

import { getPublishedPosts, isNotionConfigured } from "@/lib/notion";

export const revalidate = 60;

const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

const Blog = async () => {
  if (!isNotionConfigured()) {
    return (
      <section className="py-20">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h1 className="h1">Blog</h1>
          <p className="text-white/70">
            Blog content is powered by Notion. Add{" "}
            <code className="mx-1 px-1 py-0.5 rounded bg-white/5 text-sm">
              NOTION_TOKEN
            </code>{" "}
            and{" "}
            <code className="mx-1 px-1 py-0.5 rounded bg-white/5 text-sm">
              NOTION_DATABASE_ID
            </code>{" "}
            to your environment to load posts.
          </p>
        </div>
      </section>
    );
  }

  const posts = await getPublishedPosts();

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <header className="max-w-2xl mb-12 space-y-4">
          <h1 className="h1">Blog</h1>
          <p className="text-white/70">
            Long-form thoughts and learnings pulled straight from my Notion
            workspace.
          </p>
        </header>
        <div className="grid gap-10">
          {posts.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
              No posts found yet. Publish an entry in Notion to see it here.
            </div>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-lg shadow-black/20 hover:border-accent/60 transition"
            >
              {post.cover && (
                <div className="relative aspect-video">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1280px) 900px, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              )}
              <div className="p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-3xl font-semibold hover:text-accent transition">
                      {post.title}
                    </h2>
                  </Link>
                  {post.description && (
                    <p className="text-white/70 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </div>
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent hover:underline font-medium"
                  >
                    Read post &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
