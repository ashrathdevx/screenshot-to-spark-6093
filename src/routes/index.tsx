import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Ambient, Divider, SectionHeading } from "@/components/site/Section";
import { HeroComposition, OpsMockup, PosMockup, WebsiteMockup } from "@/components/site/Mockups";
import { ChannelDiagram } from "@/components/site/ChannelDiagram";
import { IndustryShowcase } from "@/components/site/IndustryShowcase";
import { CtaBand } from "@/components/site/Blocks";
import { formatPrice, POS_PACKAGES, PRICING_NOTE, WEBSITE_PACKAGES } from "@/data/pricing";
import { getIndustry } from "@/data/pos";

const TITLE = "SYNX — Built to Move Business Forward";
const DESC =
  "Industry-specific POS software, premium websites and unified commerce solutions — thoughtfully built for businesses in India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const DELIVERS = [
  {
    eyebrow: "01 · Software",
    title: "POS, Business Software & AI SaaS",
    copy: "Purpose-built solutions to simplify billing, manage business operations and provide better visibility into daily performance.",
    cta: "Explore POS Solutions",
    to: "/pos" as const,
    visual: <PosMockup data={getIndustry("supermarkets")!.mockup} />,
  },
  {
    eyebrow: "02 · Digital",
    title: "Websites & Digital Experiences",
    copy: "High-performance websites, elegant product catalogues and modern online storefronts designed around your business.",
    cta: "Explore Website Services",
    to: "/websites" as const,
    visual: <WebsiteMockup />,
  },
  {
    eyebrow: "03 · Connected",
    title: "Unified Commerce",
    copy: "Bring your physical store and online presence together with connected workflows designed for modern retail.",
    cta: "Explore Unified Solutions",
    to: "/unified-commerce" as const,
    visual: <ChannelDiagram />,
  },
];

const STEPS = [
  { title: "Understand your business", desc: "We learn how you sell, bill and serve customers today." },
  { title: "Define the right solution", desc: "A written scope with clear inclusions, exclusions and pricing." },
  { title: "Design your experience", desc: "Screens and pages designed around your workflow and brand." },
  { title: "Build and test", desc: "Built carefully, then tested with real scenarios before launch." },
  { title: "Launch and support", desc: "Deployment, training and ongoing support where agreed." },
];

const CONCEPTS = [
  {
    label: "POS concept",
    title: "Boutique billing counter",
    desc: "Variant-aware billing with branded receipts and a simple owner summary.",
    visual: <PosMockup data={getIndustry("boutiques")!.mockup} />,
  },
  {
    label: "Website concept",
    title: "Showroom product catalogue",
    desc: "A searchable catalogue that turns product interest into quotation requests.",
    visual: <WebsiteMockup variant="catalogue" />,
  },
  {
    label: "Unified concept",
    title: "Store + online operations",
    desc: "One view of store sales and online orders for a growing retailer.",
    visual: <OpsMockup />,
  },
];

const POS_START = POS_PACKAGES[0]!;
const WEB_START = WEBSITE_PACKAGES[0]!;

function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="theme-navy relative overflow-hidden bg-navy-gradient">
        <Ambient />
        <div className="container-x relative pb-16 pt-36 text-center md:pb-24 md:pt-44">
          <p data-hero="1" className="eyebrow tracking-[0.5em]">
            SYNX
          </p>
          <h1 data-hero="2" className="text-display mx-auto mt-6 max-w-5xl text-balance text-silver-gradient">
            Built to Move Business Forward.
          </h1>
          <p data-hero="3" className="text-lead mx-auto mt-7 max-w-2xl text-pretty text-on-navy-muted">
            Intelligent business software, distinctive digital experiences, and connected commerce solutions —
            thoughtfully built for businesses ready to work smarter and grow.
          </p>
          <div data-hero="4" className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/solutions">
                Explore Solutions <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/contact" search={{ service: undefined, package: undefined }}>
                Discuss Your Project
              </Link>
            </Button>
          </div>
          <div data-hero="5" data-hero-visual className="mt-16 md:mt-24">
            <HeroComposition />
            <p className="mt-10 font-mono text-xs uppercase tracking-wider text-on-navy-muted">
              Concept screens · illustrative sample data
            </p>
          </div>
        </div>
      </section>

      {/* 2 — What SYNX delivers */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="What SYNX delivers"
            title="One Digital Partner. Multiple Possibilities."
          />
          <div className="mt-16 space-y-6 md:mt-24 md:space-y-8">
            {DELIVERS.map((d, i) => (
              <article
                key={d.title}
                data-reveal
                className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="eyebrow">{d.eyebrow}</p>
                  <h3 className="text-h2 mt-4 text-balance">{d.title}</h3>
                  <p className="text-lead mt-5 text-muted-foreground">{d.copy}</p>
                  <Button asChild variant="navy" className="mt-8">
                    <Link to={d.to}>
                      {d.cta} <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
                <div
                  className={
                    "theme-navy relative rounded-3xl bg-navy-gradient p-5 sm:p-8 " +
                    (i % 2 === 1 ? "lg:order-1" : "")
                  }
                >
                  <div data-parallax="5">{d.visual}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Industries */}
      <section className="section bg-card">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Industries"
              title="Solutions Designed Around Your Business."
              copy="Each industry has its own workflow. Explore what a SYNX solution could include for yours."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/pos">View POS catalogue</Link>
            </Button>
          </div>
          <div className="mt-12">
            <IndustryShowcase />
          </div>
        </div>
      </section>

      {/* 4 — How we work */}
      <section className="theme-navy section relative overflow-hidden bg-navy">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="How we work"
            title="From Your Idea to a Working Digital Solution."
          />
          <ol className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-5 md:gap-6">
            <div aria-hidden className="absolute left-0 right-0 top-[1.375rem] hidden md:block">
              <Divider className="bg-silver/30" />
            </div>
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal className="relative flex gap-5 md:flex-col md:gap-0">
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-silver/40 bg-navy font-mono text-sm text-silver">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-on-navy">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-on-navy-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Solution concepts */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Solution Concepts"
            title="Ideas we can shape for your business."
            copy="These are clearly labelled concepts that show the kind of work SYNX designs — not completed client projects."
          />
          <div data-stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {CONCEPTS.map((c) => (
              <article key={c.title} className="surface-card overflow-hidden">
                <div className="theme-navy bg-navy-gradient p-5">
                  <div className="pointer-events-none">{c.visual}</div>
                </div>
                <div className="p-7">
                  <p className="font-mono text-[0.75rem] uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>
                  <h3 className="text-h3 mt-2">{c.title}</h3>
                  <p className="mt-3 text-[0.9375rem] text-muted-foreground">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Pricing preview */}
      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent starting points."
            copy={PRICING_NOTE}
          />
          <div data-stagger className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "POS Software",
                tab: "pos" as const,
                start: `${formatPrice(POS_START.setup!)} setup`,
                sub: `+ ${formatPrice(POS_START.monthly!)} per month`,
                plans: POS_PACKAGES.map((p) => p.name).join(" · "),
              },
              {
                title: "Website Services",
                tab: "websites" as const,
                start: `${formatPrice(WEB_START.setup!)} setup`,
                sub: `Website care from ${formatPrice({ amount: WEB_START.monthly!.amount })}/month`,
                plans: WEBSITE_PACKAGES.map((p) => p.name).join(" · "),
              },
              {
                title: "Unified Commerce",
                tab: "unified" as const,
                start: "Custom quote",
                sub: "Scoped to your stores and channels",
                plans: "Connect Starter · Growth · Custom",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to="/pricing"
                search={{ tab: c.tab }}
                className="group flex flex-col rounded-3xl border border-border bg-background p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-steel/60"
              >
                <h3 className="text-h3">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.plans}</p>
                <p className="mt-10 text-sm text-muted-foreground">Starting from</p>
                <p className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em]">{c.start}</p>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">{c.sub}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                  Compare packages
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Final CTA */}
      <CtaBand />
    </>
  );
}
