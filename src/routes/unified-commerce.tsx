import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { ChannelDiagram } from "@/components/site/ChannelDiagram";
import { PackageCard } from "@/components/site/PackageCard";
import { CtaBand } from "@/components/site/Blocks";
import { UNIFIED_PACKAGES } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/unified-commerce")({
  head: () =>
    pageMeta(
      "Unified Commerce — One Business. Every Channel. | SYNX",
      "Connect in-store POS and your online storefront with practical, custom-quoted unified commerce solutions from SYNX.",
    ),
  component: UnifiedPage,
});

const JOURNEY = [
  { stage: "Today", title: "Disconnected", desc: "Paper bills in store, a social page online, and stock counted by hand." },
  { stage: "Step 1", title: "Digital store", desc: "Billing software brings clean records and daily visibility." },
  { stage: "Step 2", title: "Online presence", desc: "A catalogue or storefront using the same product structure." },
  { stage: "Step 3", title: "Connected workflow", desc: "Orders and store operations managed as one business, where implemented." },
];

function UnifiedPage() {
  return (
    <>
      <PageHero
        eyebrow="Unified Commerce"
        title="One Business. Every Channel."
        copy="Connect your in-store operations and online customer experience with a practical digital ecosystem designed around your workflow."
        aside={<ChannelDiagram />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "unified", package: undefined }}>
            Request a Custom Quote <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="The journey" title="From disconnected processes to connected workflows." />
          <ol className="relative mt-14 grid gap-5 md:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <li
                key={j.title}
                data-reveal
                className={i === JOURNEY.length - 1 ? "theme-navy rounded-3xl bg-navy-gradient p-7" : "surface-card p-7"}
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{j.stage}</p>
                <h3 className="text-h3 mt-3">{j.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{j.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading
            eyebrow="Options"
            title="Three ways to connect."
            copy="Every unified solution is custom quoted. Systems only synchronise where synchronisation is scoped and implemented."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {UNIFIED_PACKAGES.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
