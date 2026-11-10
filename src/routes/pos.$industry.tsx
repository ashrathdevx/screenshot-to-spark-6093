import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { PosMockup } from "@/components/site/Mockups";
import { PackageCard } from "@/components/site/PackageCard";
import { CtaBand, FaqList } from "@/components/site/Blocks";
import { getIndustry } from "@/data/pos";
import { POS_PACKAGES } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/pos/$industry")({
  loader: ({ params }) => {
    const industry = getIndustry(params.industry);
    if (!industry) throw notFound();
    return { slug: industry.slug };
  },
  head: ({ loaderData }) => {
    const ind = loaderData ? getIndustry(loaderData.slug) : undefined;
    if (!ind) return { meta: [{ title: "Unavailable — SYNX" }, { name: "robots", content: "noindex" }] };
    return pageMeta(`${ind.name} POS Software — SYNX`, `${ind.valueProp} ${ind.heroCopy}`);
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useLoaderData();
  const ind = getIndustry(slug)!;
  const custom = ind.suggestedPackage === "custom";

  return (
    <>
      <PageHero
        eyebrow={`POS · ${ind.name}`}
        title={ind.heroTitle}
        copy={ind.heroCopy}
        aside={<PosMockup data={ind.mockup} />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "pos", package: custom ? undefined : ind.suggestedPackage }}>
            {custom ? "Request a quotation" : "Request a demo"} <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="The problem" title="What gets in the way today." />
          <div data-stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {ind.problems.map((p) => (
              <div key={p.title} className="surface-card p-7">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading eyebrow="Features" title="What the software can include." copy="Proposed features. Items marked “where included” depend on your package and scope." />
          <ul data-stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {ind.features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-on-navy">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted-foreground">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-navy section bg-navy">
        <div className="container-x">
          <SectionHeading eyebrow="Workflow" title="How it works, day to day." />
          <ol data-stagger className="mt-12 grid gap-5 md:grid-cols-4">
            {ind.workflow.map((w, i) => (
              <li key={w.title} className="glass rounded-3xl p-7">
                <span className="font-mono text-sm text-silver">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-on-navy">{w.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-on-navy-muted">{w.desc}</p>
              </li>
            ))}
          </ol>
          {ind.notes.length > 0 && (
            <div data-reveal className="mt-10 rounded-3xl border border-border p-6">
              <p className="flex items-center gap-2 font-medium text-on-navy">
                <AlertCircle className="size-4 text-silver" aria-hidden /> Honest scope notes
              </p>
              <ul className="mt-3 space-y-2 text-[0.9375rem] text-on-navy-muted">
                {ind.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Packages"
            title={custom ? "Usually a custom quotation." : "Available packages."}
            copy={custom ? `${ind.name} often need scoped modules, so we recommend a custom quotation. The packages below are a reference point.` : undefined}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {POS_PACKAGES.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />
          <FaqList faqs={ind.faqs} />
        </div>
      </section>
      <CtaBand title={`Let's plan your ${ind.name.toLowerCase()} solution.`} />
    </>
  );
}
