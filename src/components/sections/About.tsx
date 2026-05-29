import { AWARDS, BIO, EDUCATION } from "@/lib/data";

export default function About() {
  const breakthroughPrize = AWARDS.find((a) =>
    a.title.includes("Breakthrough"),
  );

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">About</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: Bio text */}
        <div className="space-y-4">
          {BIO.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Right: Prize + Stats + Education */}
        <div className="space-y-6">
          {breakthroughPrize && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-1">
                🏆 {breakthroughPrize.year}
              </p>
              <p className="font-semibold">{breakthroughPrize.title}</p>
              <p className="text-sm text-muted-foreground">
                {breakthroughPrize.org}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "15+", label: "Publications" },
              { value: "5+", label: "Years Engineering" },
              { value: "3000+", label: "ATLAS Collaborators" },
              { value: "100s", label: "Citations" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Education
            </h3>
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="space-y-0.5">
                <p className="font-medium text-sm">{edu.degree}</p>
                <p className="text-xs text-muted-foreground">
                  {edu.school} · {edu.period}
                </p>
                {edu.note && (
                  <p className="text-xs text-muted-foreground italic">
                    {edu.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
