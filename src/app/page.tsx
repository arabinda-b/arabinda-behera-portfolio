import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-5xl font-bold tracking-tight">Arabinda Behera</h1>
      <p className="text-xl text-muted-foreground">
        Software Engineer · Particle Physicist · AI Practitioner
      </p>

      {/* Badge row — tech stack preview */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge>Next.js</Badge>
        <Badge variant="outline">TypeScript</Badge>
        <Badge variant="secondary">Tailwind CSS</Badge>
        <Badge>React</Badge>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3">
        <Button>View Projects</Button>
        <Button variant="outline">Download Resume</Button>
      </div>
    </main>
  );
}
