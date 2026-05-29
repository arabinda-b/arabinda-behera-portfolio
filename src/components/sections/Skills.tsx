import { SKILL_GROUPS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInItem, FadeInStagger } from "../ui/fade-in";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Skills</h2>
      </FadeIn>
      <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SKILL_GROUPS.map((group) => (
          <FadeInItem key={group.category}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </FadeInItem>
        ))}
      </FadeInStagger>
    </section>
  );
}
