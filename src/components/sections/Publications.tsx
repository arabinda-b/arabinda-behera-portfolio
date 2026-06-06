"use client";

import { useState } from "react";
import Link from "next/link";
import { PUBLICATIONS, GOOGLE_SCHOLAR, ORCID, INSPIRE_HEP } from "@/lib/data";
import { Button } from "@/components/ui/button";
import PhysicsPipeline from "../animations/PhysicsPipeline";

const SHOW_COUNT = 4;

export default function Publications() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PUBLICATIONS : PUBLICATIONS.slice(0, SHOW_COUNT);

  return (
    <>
      <PhysicsPipeline />
      <section id="publications" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Publications</h2>
            <p className="text-muted-foreground mt-1">
              {PUBLICATIONS.length}+ peer-reviewed papers · Hundreds of
              citations
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href={GOOGLE_SCHOLAR}
              target="_blank"
              className="text-primary hover:underline"
            >
              Google Scholar
            </Link>
            <Link
              href={INSPIRE_HEP}
              target="_blank"
              className="text-primary hover:underline"
            >
              INSPIRE HEP
            </Link>
            <Link
              href={ORCID}
              target="_blank"
              className="text-primary hover:underline"
            >
              ORCID
            </Link>
          </div>
        </div>

        <ol className="space-y-5 list-decimal list-inside marker:text-muted-foreground">
          {visible.map((pub) => (
            <li key={pub.url}>
              <Link
                href={pub.url}
                target="_blank"
                className="font-medium hover:text-primary transition-colors"
              >
                {pub.title}
              </Link>
              <span className="text-muted-foreground text-sm">
                {pub.collaboration ? ` — ${pub.collaboration},` : " —"}{" "}
                <em>{pub.journal}</em> ({pub.year})
              </span>
            </li>
          ))}
        </ol>

        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded
            ? "Show fewer"
            : `Show all ${PUBLICATIONS.length} publications`}
        </Button>
      </section>
    </>
  );
}
