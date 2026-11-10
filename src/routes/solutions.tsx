import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { PosMockup, WebsiteMockup, OpsMockup } from "@/components/site/Mockups";
import { ChannelDiagram } from "@/components/site/ChannelDiagram";
import { CtaBand } from "@/components/site/Blocks";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () =>
    pageMeta(
      "Solutions — SYNX Software, Websites & Unified Commerce",
      "Explore SYNX solutions: industry POS software, AI SaaS automation, premium websites and unified offline + online commerce.",
    ),
  component: SolutionsPage,
});

const ITEMS = [
  {
    to: "/pos" as const,
    eyebrow: "POS Software",
    title: "Billing and operations, per industry.",
    copy: "Purpose-built billing, stock and owner reporting for retail, food, services and clinic front desks.",
    visual: <PosMockup />,
  },
  {
    to: "/ai-saas" as const,
    eyebrow: "AI SaaS",
    title: "Practical automation, scoped honestly.",
    copy: "Focused AI-assisted tools that save time on everyday business tasks — defined per project.",
    visual: <OpsMockup />,
  },
  {
    to: "/websites" as const,
    eyebrow: "Websites",
    title: "Premium sites, catalogues and stores.",
    copy: "Business websites, product catalogues, e-commerce and the domain and SEO foundations behind them.",
    visual: <WebsiteMockup />,
  },
  {
    to: "/unified-commerce" as const,
    eyebrow: "Unified Commerce",
    title: "Your store and online, together.",
    copy: "In-store software and digital storefronts planned as one connected business workflow.",
    visual: <ChannelDiagram />,
  },
];

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Everything your business needs to move forward."
        copy="Four focused offerings. One partner who understands how they fit together."
      />
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Offerings" title="Choose where to start." />
          <div data-stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {ITEMS.map((i) => (
              <article key={i.to} className="surface-card flex flex-col overflow-hidden">
                <div className="theme-navy bg-navy-gradient p-6">
                  <div className="pointer-events-none">{i.visual}</div>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="eyebrow">{i.eyebrow}</p>
                  <h3 className="text-h3 mt-3">{i.title}</h3>
                  <p className="mt-3 text-muted-foreground">{i.copy}</p>
                  <Button asChild variant="navy" className="mt-8 self-start">
                    <Link to={i.to}>
                      Explore {i.eyebrow} <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
