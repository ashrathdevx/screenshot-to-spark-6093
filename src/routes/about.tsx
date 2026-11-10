import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About SYNX — Technology With Purpose",
      "SYNX creates practical digital solutions for businesses — from billing and operational tools to modern websites and connected commerce.",
    ),
  component: AboutPage,
});

const PRINCIPLES = [
  { title: "Thoughtful design", desc: "Every screen and page considered, so it is easy to use and feels right for your brand." },
  { title: "Useful functionality", desc: "Features that solve real problems — written into a clear scope before work begins." },
  { title: "Clear communication", desc: "Honest pricing, honest limits, and straightforward updates along the way." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Technology With Purpose. Built Around Business." />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal className="space-y-6 text-lead text-muted-foreground">
            <p className="text-foreground">
              SYNX focuses on creating practical digital solutions for businesses — from billing and operational tools
              to modern websites and connected commerce experiences.
            </p>
            <p>
              Our approach brings together thoughtful design, useful functionality and clear communication, helping
              businesses establish a stronger digital foundation.
            </p>
          </div>
          <div data-reveal className="surface-card p-8">
            <p className="eyebrow">Contact person</p>
            <p className="text-h3 mt-3">{SITE.contactName}</p>
            <p className="mt-2 text-muted-foreground">{SITE.phoneDisplay}</p>
            <p className="text-muted-foreground">{SITE.email}</p>
            <Button asChild variant="navy" className="mt-6">
              <Link to="/contact" search={{ service: undefined, package: undefined }}>
                Get in touch <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
        <div className="container-x mt-20">
          <div data-stagger className="grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="surface-card p-8">
                <h2 className="text-h3">{p.title}</h2>
                <p className="mt-3 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
