import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { PosMockup } from "@/components/site/Mockups";
import { IndustryShowcase } from "@/components/site/IndustryShowcase";
import { PackageCard } from "@/components/site/PackageCard";
import { CtaBand } from "@/components/site/Blocks";
import { POS_PACKAGES, PRICING_NOTE } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/pos/")({
  head: () =>
    pageMeta(
      "POS Software by Industry — SYNX",
      "Industry-specific POS and billing software for clothing stores, supermarkets, restaurants, salons, clinics and more. Packages from ₹4,999 setup.",
    ),
  component: PosIndex,
});

function PosIndex() {
  return (
    <>
      <PageHero
        eyebrow="POS Software"
        title="Billing software shaped around your industry."
        copy="Fast billing, stock visibility and owner reporting — configured for how your type of business actually works."
        aside={<PosMockup />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "pos", package: undefined }}>
            Request a demo <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link to="/pricing" search={{ tab: "pos" }}>View pricing</Link>
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Catalogue" title="Choose your industry." copy="Each page explains the problems addressed, proposed features and how the workflow operates." />
          <div className="mt-12">
            <IndustryShowcase />
          </div>
        </div>
      </section>
      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading eyebrow="Packages" title="Three clear starting points." copy={PRICING_NOTE} />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {POS_PACKAGES.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
