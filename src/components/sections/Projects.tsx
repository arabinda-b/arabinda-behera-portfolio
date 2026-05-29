import { PROJECTS } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInItem, FadeInStagger } from "../ui/fade-in";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
      </FadeIn>
      <FadeInStagger className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <FadeInItem key={project.title}>
            <Card key={project.title} className="flex flex-col">
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
    </section>
  );
}
