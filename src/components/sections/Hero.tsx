import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAME, TAGLINE } from "@/lib/data";
import { FadeIn } from "../ui/fade-in";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <FadeIn delay={0.1}>
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
          Hello, I am
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          {NAME}
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
          {TAGLINE}
        </p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
