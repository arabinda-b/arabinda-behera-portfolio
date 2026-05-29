import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAME, TAGLINE } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
        Hello, I am
      </p>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
        {NAME}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
        {TAGLINE}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="#projects">View Projects</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
