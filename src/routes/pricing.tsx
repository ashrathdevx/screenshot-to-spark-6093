import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/site/Section";
import { PackageCard } from "@/components/site/PackageCard";
import { LocalSeoPricing } from "@/components/site/LocalSeoPricing";
import { OpenAiAdsPricing } from "@/components/site/OpenAiAdsPricing";
import { CtaBand } from "@/components/site/Blocks";
import { POS_PACKAGES, PRICING_NOTE, UNIFIED_PACKAGES, WEBSITE_PACKAGES } from "@/data/pricing";

const TITLE = "Pricing — SYNX POS, Websites, Local SEO & Unified Commerce";
const DESC =
  "Clear INR pricing for SYNX POS, website, Google Business Profile and local SEO packages, with unified commerce custom quoted.";

const TABS = ["pos", "websites", "seo", "openai-ads", "unified"] as const;
type Tab = (typeof TABS)[number];

export const Route = createFileRoute("/pricing")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab | undefined } => ({
    tab: TABS.includes(s["tab"] as Tab) ? (s["tab"] as Tab) : undefined,
  }),
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
  component: PricingPage,
});

const NOTES: Record<Tab, string[]> = {
  pos: [
    "Hotels, dental clinics and pharmacies usually require a custom quotation.",
    "Hardware such as receipt printers, barcode scanners and cash drawers is purchased separately.",
    "Custom features are never assumed — they are written into the scope before work begins.",
  ],
  websites: [
    "Domain registration, renewal, external hosting and paid tools are separate costs when applicable.",
    "Complex logistics, custom ERP integrations and advanced business workflows are quoted separately.",
    "SEO work improves foundations; rankings and traffic are never guaranteed.",
  ],
  unified: [
    "Different systems only synchronise where that synchronisation is scoped and implemented.",
    "Every unified solution is quoted after understanding your stores, channels and workflow.",
  ],
  seo: [
    "Google ranking positions and lead volumes are not guaranteed; outcomes depend on competition, location and site condition.",
    "Client-provided access, approvals and accurate business information are needed to complete work.",
    "Paid advertising budgets, third-party tools and software subscriptions are not included in these SEO fees.",
  ],
  "openai-ads": [
    "OpenAI Ads Manager self-service is currently available in India; account readiness, billing and ad review are required.",
    "OpenAI and Reddit media spend is paid to each platform separately from SYNX service fees.",
    "Ad approval, delivery, clicks and sales depend on platform review, auctions and campaign performance.",
  ],
};

function PricingPage() {
  const { tab = "pos" } = Route.useSearch();
  const navigate = useNavigate({ from: "/pricing" });

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Clear packages. No hidden commitments."
        copy={PRICING_NOTE}
      />
      <section className="section">
        <div className="container-x">
          <Tabs
            value={tab}
            onValueChange={(v) => navigate({ search: { tab: v as Tab }, replace: true, resetScroll: false })}
          >
            <TabsList className="mx-auto grid h-auto w-full max-w-4xl grid-cols-2 gap-1.5 rounded-3xl border border-border bg-card p-1.5 sm:grid-cols-5 sm:rounded-full">
              {[
                { v: "pos", l: "POS Software" },
                { v: "websites", l: "Website Services" },
                { v: "seo", l: "SEO" },
                { v: "openai-ads", l: "OpenAI + Reddit Ads" },
                { v: "unified", l: "Unified Commerce" },
              ].map((t) => (
                <TabsTrigger
                  key={t.v}
                  value={t.v}
                  className="h-11 min-w-0 rounded-full px-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors data-[state=active]:bg-navy data-[state=active]:text-on-navy data-[state=active]:shadow-none sm:px-3 sm:text-[0.9375rem]"
                >
                  {t.l}
                </TabsTrigger>
              ))}
            </TabsList>

            {(
              [
                ["pos", POS_PACKAGES],
                ["websites", WEBSITE_PACKAGES],
                ["unified", UNIFIED_PACKAGES],
              ] as const
            ).map(([key, pkgs]) => (
              <TabsContent
                key={key}
                value={key}
                className="mt-12 animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <div className="grid gap-5 lg:grid-cols-3">
                  {pkgs.map((p) => (
                    <PackageCard key={p.id} pkg={p} />
                  ))}
                </div>
                <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
                  <div className="flex items-center gap-2 font-medium">
                    <Info className="size-4 text-steel" aria-hidden /> Good to know
                  </div>
                  <ul className="mt-4 grid gap-3 text-[0.9375rem] text-muted-foreground md:grid-cols-3">
                    {NOTES[key].map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
            <TabsContent value="seo" className="mt-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <LocalSeoPricing />
              <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-2 font-medium">
                  <Info className="size-4 text-steel" aria-hidden /> Good to know
                </div>
                <ul className="mt-4 grid gap-3 text-[0.9375rem] text-muted-foreground md:grid-cols-3">
                  {NOTES.seo.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="openai-ads" className="mt-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <OpenAiAdsPricing />
              <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-2 font-medium">
                  <Info className="size-4 text-steel" aria-hidden /> Good to know
                </div>
                <ul className="mt-4 grid gap-3 text-[0.9375rem] text-muted-foreground md:grid-cols-3">
                  {NOTES["openai-ads"].map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <CtaBand title="Not sure which package fits?" copy="Share your requirements and we'll recommend the right starting point — honestly." />
    </>
  );
}
