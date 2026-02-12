import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {
  getPostBySlug,
  listPostSlugs,
  isNotionConfigured,
} from "@/lib/notion";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  if (!isNotionConfigured()) {
    return [];
  }
  return listPostSlugs();
}

export async function generateMetadata({ params }) {
  if (!isNotionConfigured()) {
    return {
      title: "Blog",
    };
  }

  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description || undefined,
  };
}

const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

const PostPage = async ({ params }) => {
  if (!isNotionConfigured()) {
    notFound();
  }

  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-10">
          <Link
            href="/blog"
            className="text-sm uppercase tracking-wide text-white/60 hover:text-accent transition"
          >
            &larr; Back to blog
          </Link>
        </div>
        <header className="space-y-4 mb-10">
          <time
            dateTime={post.date}
            className="text-sm uppercase tracking-wide text-white/60"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="h1">{post.title}</h1>
          {post.description && (
            <p className="text-white/70 leading-relaxed">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        {post.cover && (
          <div className="relative mb-12 aspect-video overflow-hidden rounded-3xl border border-white/10">
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
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-strong:text-white prose-a:text-accent">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
