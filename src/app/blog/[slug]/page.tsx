import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { getAllPosts, getPostContent } from "@/lib/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let source: string;
  try {
    source = getPostContent(slug);
  } catch {
    notFound();
  }

  const { content, data } = matter(source);

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back to Writing
      </Link>
      <p className="text-xs text-muted-foreground mb-2">
        {new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="flex flex-wrap gap-2 mb-12">
        {data.tags?.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
