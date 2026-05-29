import Link from "next/link";
import { EMAIL, LINKEDIN, GITHUB } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Arabinda Behera. Built with Next.js &
          Tailwind.
        </p>
        <div className="flex gap-6">
          <Link
            href={LINKEDIN}
            target="_blank"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${EMAIL}`}
            className="hover:text-foreground transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
