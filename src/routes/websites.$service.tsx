import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { WebsiteMockup } from "@/components/site/Mockups";
import { CtaBand, FaqList } from "@/components/site/Blocks";
import { getWebsiteService } from "@/data/websites";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/websites/$service")({
  loader: ({ params }) => {
    const s = getWebsiteService(params.service);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getWebsiteService(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Unavailable — SYNX" }, { name: "robots", content: "noindex" }] };
    return pageMeta(`${s.name} — SYNX`, s.heroCopy);
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = getWebsiteService(slug)!;
  return (
    <>
      <PageHero
        eyebrow={`Websites · ${s.name}`}
        title={s.heroTitle}
        copy={s.heroCopy}
        aside={<WebsiteMockup variant={s.slug === "catalogue" || s.slug === "ecommerce" ? "catalogue" : "brand"} />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "websites", package: undefined }}>
            Discuss your website <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Ideal for" title="Who this is for." />
          <ul data-stagger className="mt-10 flex flex-wrap gap-3">
            {s.idealFor.map((i) => (
              <li key={i} className="rounded-full border border-border bg-card px-5 py-2.5">{i}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-card">
        <div className="container-x">
          <SectionHeading eyebrow="What's included" title="Scope you can rely on." />
          <ul data-stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {s.includes.map((f) => (
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
          <div data-reveal className="mt-12 rounded-3xl border border-border bg-background p-6">
            <p className="flex items-center gap-2 font-medium">
              <AlertCircle className="size-4 text-steel" aria-hidden /> Separate costs and limits
            </p>
            <ul className="mt-3 space-y-2 text-[0.9375rem] text-muted-foreground">
              {s.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="theme-navy section bg-navy">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="How the project runs." />
          <ol data-stagger className="mt-12 grid gap-5 md:grid-cols-5">
            {s.process.map((p, i) => (
              <li key={p} className="glass rounded-3xl p-6">
                <span className="font-mono text-sm text-silver">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-semibold text-on-navy">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />
          <FaqList faqs={s.faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
