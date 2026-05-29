import { EXPERIENCES } from "@/lib/data";
import { FadeIn } from "../ui/fade-in";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
      </FadeIn>
      <div className="relative pl-6 space-y-12 border-l border-border ml-1.5">
        {EXPERIENCES.map((exp, index) => (
          <FadeIn key={`${exp.company}-${exp.period}`} delay={index * 0.1}>
            <div key={`${exp.company}-${exp.period}`} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {exp.company}
                  </p>
                </div>
                <div className="md:text-right shrink-0">
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="text-xs text-muted-foreground">
                    {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex gap-2"
                  >
                    <span className="text-primary mt-0.5 shrink-0">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
