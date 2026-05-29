import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EMAIL, LINKEDIN, GITHUB, GOOGLE_SCHOLAR } from "@/lib/data";

const LINKS = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: GITHUB },
  { label: "Google Scholar", href: GOOGLE_SCHOLAR },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-10">
        Open to interesting conversations, collaborations, and opportunities.
        The best way to reach me is by email.
      </p>
      <Button size="lg" asChild className="mb-12">
        <a href={`mailto:${EMAIL}`}>Say Hello</a>
      </Button>
      <div className="flex flex-wrap gap-6 justify-center">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
