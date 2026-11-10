import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { WebsiteMockup } from "@/components/site/Mockups";
import { PackageCard } from "@/components/site/PackageCard";
import { CtaBand } from "@/components/site/Blocks";
import { WEBSITE_SERVICES } from "@/data/websites";
import { PRICING_NOTE, WEBSITE_PACKAGES } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/websites/")({
  head: () =>
    pageMeta(
      "Premium Websites, Catalogues & E-Commerce — SYNX",
      "Business websites, product catalogues, e-commerce stores and domain, SEO & website care from SYNX. Packages from ₹12,999.",
    ),
  component: WebsitesIndex,
});

function WebsitesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Websites"
        title="Websites with the polish your business deserves."
        copy="The site you're on is the standard: considered design, fast pages and clear structure — built around your business."
        aside={<WebsiteMockup />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "websites", package: undefined }}>
            Start a website project <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="Four ways we build your presence." />
          <div data-stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {WEBSITE_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/websites/$service"
                params={{ service: s.slug }}
                className="group surface-card flex flex-col p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-steel/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-h3">{s.name}</h3>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-navy group-hover:text-on-navy">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.packageHint}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading eyebrow="Packages" title="Website packages." copy={PRICING_NOTE} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {WEBSITE_PACKAGES.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
