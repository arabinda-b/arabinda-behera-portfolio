import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-3">Writing</h1>
        <p className="text-muted-foreground mb-12">
          Thoughts on software engineering, AI, and the intersection of physics
          and code.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Coming soon.</p>
      ) : (
        <FadeInStagger className="space-y-6">
          {posts.map((post) => (
            <FadeInItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>
      )}
    </main>
  );
}
