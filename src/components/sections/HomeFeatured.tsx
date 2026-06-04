import Link from "next/link";
import { AWARDS, BIO, PROJECTS } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";

const FEATURED = PROJECTS.slice(0, 2);

export default function HomeFeatured() {
  const prize = AWARDS.find((a) => a.title.includes("Breakthrough"));

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-24">
      {/* Mini bio + prize */}
      <FadeIn>
        <div className="max-w-2xl space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {BIO.split("\n\n")[0]}
          </p>
          {prize && (
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-1.5 text-sm text-yellow-500">
              🏆 {prize.year} {prize.title} · {prize.org}
            </div>
          )}
          <div className="flex gap-8 pt-2">
            {[
              { value: "15+", label: "Publications" },
              { value: "5+", label: "Years Engineering" },
              { value: "100s", label: "Citations" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Featured projects */}
      <div>
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
        <FadeInStagger className="grid md:grid-cols-2 gap-6">
          {FEATURED.map((project) => (
            <FadeInItem key={project.title}>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
