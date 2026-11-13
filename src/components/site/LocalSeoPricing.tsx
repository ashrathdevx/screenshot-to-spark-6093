import { useState } from "react";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatINR, SITE } from "@/lib/site";

type BillingPeriod = "monthly" | "sprint";

const PLANS = [
  {
    name: "Local Maps Starter",
    monthly: 6500,
    sprint: 17000,
    timeline: "Initial improvements: 4–8 weeks",
    summary: "A clear local-search foundation for one neighbourhood shop.",
    groups: [
      {
        title: "Setup",
        items: ["Google Business Profile audit and optimization", "Primary category, services and service-area review", "Local keyword and competitor baseline"],
      },
      {
        title: "Weekly",
        items: ["One Google Business Profile post", "Photo and profile activity check", "Review-response guidance"],
      },
      {
        title: "Monthly",
        items: ["Local visibility and profile performance report", "Citation consistency spot-check", "Next-month action list"],
      },
      {
        title: "3-Month Bonus",
        items: ["Before-and-after profile review", "Prioritized 90-day local SEO roadmap"],
      },
    ],
  },
  {
    name: "Local Shop + Website Growth",
    monthly: 12000,
    sprint: 31000,
    timeline: "Local growth signals: 6–12 weeks",
    summary: "Google Maps plus on-site improvements that help nearby customers find and contact your shop.",
    popular: true,
    groups: [
      {
        title: "Setup",
        items: ["Everything in Local Maps Starter", "Website SEO and local landing-page audit", "Search Console and analytics review, where access is available"],
      },
      {
        title: "Weekly",
        items: ["One Google Business Profile post", "Website and profile health checks", "Review and competitor activity review"],
      },
      {
        title: "Monthly",
        items: ["On-page improvements for priority pages", "Local keyword and Maps visibility report", "One helpful local content update"],
      },
      {
        title: "3-Month Bonus",
        items: ["One service or location page improvement", "Three-month performance review and next-quarter plan"],
      },
    ],
  },
  {
    name: "Multi-Area & High-Growth",
    monthly: 18000,
    sprint: 46000,
    timeline: "Area expansion: 8–16 weeks",
    summary: "A broader local-search program for shops serving multiple areas or ready to scale.",
    groups: [
      {
        title: "Setup",
        items: ["Everything in Local Shop + Website Growth", "Priority-area and competitor mapping", "Multi-area site structure and profile opportunity review"],
      },
      {
        title: "Weekly",
        items: ["One Google Business Profile post", "Priority-area visibility checks", "Technical and competitor monitoring"],
      },
      {
        title: "Monthly",
        items: ["Up to two priority-area page improvements", "Expanded local keyword and competitor report", "Monthly strategy and conversion review"],
      },
      {
        title: "3-Month Bonus",
        items: ["One additional area-page outline", "Multi-area results review and growth roadmap"],
      },
    ],
  },
] as const;

const ADD_ONS = [
  {
    name: "High-Converting Shop Website Build",
    price: "₹12,000–₹25,000",
    cadence: "one-time",
    deliverables: [
      "Fast, mobile-first website with 5–8 pages",
      "WhatsApp chat buttons and Google Maps embeds",
      "Service or product catalogue pages",
    ],
    value: "Gives customers a clear place to learn about the shop, find its location and make contact; a well-built site supports organic search visibility.",
  },
  {
    name: "Maintenance & Ranking Support",
    price: "₹4,000–₹5,000",
    cadence: "per month",
    deliverables: [
      "Two Google Business Profile posts per month",
      "Review reply assistance and profile updates",
      "Uptime, visibility and monthly website health checks",
    ],
    value: "Continues profile and website care after the initial sprint. Rankings can fluctuate, and no position is guaranteed.",
  },
  {
    name: "Instagram + YouTube Shorts Local Pack",
    price: "₹8,000–₹12,000",
    cadence: "per month",
    deliverables: [
      "8–12 edited Reels or Shorts from shop-owner phone footage",
      "Captions and local hashtag/keyword suggestions",
      "A simple monthly content schedule",
    ],
    value: "Helps local shops publish short-form content more consistently. Views, reach and store visits vary by audience and platform.",
  },
  {
    name: "WhatsApp Catalog & Broadcast Setup",
    price: "₹3,500–₹6,000",
    cadence: "one-time",
    deliverables: [
      "WhatsApp Business catalog setup",
      "Greeting and away-message configuration",
      "Festival offer message templates for opted-in customers",
    ],
    value: "Makes it easier to share product information and follow up with customers who have agreed to receive messages.",
    note: "WhatsApp Business API eligibility, provider charges and Meta fees are separate and may apply.",
  },
] as const;

const ONE_TIME_SERVICES = [
  {
    name: "Google Maps Complete Setup & Fix",
    price: "₹3,500–₹5,000",
    turnaround: "3–5 days",
    deliverables: [
      "Google Business Profile creation or claim assistance",
      "Verification guidance, category selection and business description optimization",
      "Upload of 15+ client-provided photos and service/product catalogue setup",
    ],
    note: "Google controls verification and profile approval; timing and approval are not guaranteed.",
  },
  {
    name: "Local Citation & Directory Setup",
    price: "₹3,000–₹4,500",
    turnaround: "5–7 days",
    deliverables: [
      "Consistent business name, address and phone details prepared for listings",
      "Submission and verification assistance for 25–30 suitable Indian directories",
      "May include Justdial, IndiaMART, Sulekha, TradeIndia, Bing Places and Apple Maps where eligible",
    ],
    note: "Directory availability, acceptance and any listing fees depend on each platform.",
  },
  {
    name: "In-Store Google Review Kit",
    price: "₹2,000–₹3,000",
    turnaround: "2–3 days",
    deliverables: [
      "Direct Google review link setup",
      "Custom printable QR standee design for the billing counter",
      "Five ready-to-send WhatsApp review request templates",
    ],
    note: "Requests are for genuine customer feedback; no incentives or review filtering are included.",
  },
  {
    name: "Website On-Page SEO Overhaul",
    price: "₹6,000–₹10,000",
    turnaround: "7–10 days",
    deliverables: [
      "Technical website audit and keyword research",
      "Google Search Console and Analytics setup, where access is available",
      "On-page updates for up to 6 pages: titles, descriptions, headings, image alt text and internal links",
    ],
    note: "Access, existing site condition and third-party account approvals can affect the schedule.",
  },
  {
    name: "Shop Website Creation (Starter Site)",
    price: "₹12,000–₹22,000",
    turnaround: "10–14 days",
    deliverables: [
      "Fast, mobile-friendly 5-page local business website",
      "Click-to-call and direct WhatsApp inquiry buttons",
      "Google Maps embed and basic on-page SEO",
    ],
    note: "This is the 5-page starter scope; the separate website build add-on covers larger 5–8 page projects.",
  },
  {
    name: "Google Business Profile Suspension Appeal Support",
    price: "₹4,000–₹7,500",
    turnaround: "5–14 days",
    deliverables: [
      "Profile and policy issue review",
      "Business name and address discrepancy checklist",
      "Evidence checklist and preparation of an appeal through Google's official process",
    ],
    note: "Google makes the reinstatement decision; restoration and turnaround cannot be guaranteed.",
  },
  {
    name: "WhatsApp Business & Catalog Setup",
    price: "₹2,500–₹4,000",
    turnaround: "2–3 days",
    deliverables: [
      "Professional WhatsApp Business profile setup",
      "Upload of up to 30 products or services with prices",
      "Greeting, away and quick-reply message configuration",
    ],
    note: "This is the basic app setup; the separate Catalog & Broadcast add-on covers campaign templates and optional API work.",
  },
] as const;

const savings = (monthly: number, sprint: number) => monthly * 3 - sprint;
const monthlyEquivalent = (sprint: number) => Math.round(sprint / 3);

export function LocalSeoPricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section aria-labelledby="local-seo-heading" className="mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Google &amp; Local SEO</p>
        <h2 id="local-seo-heading" className="text-h2 mt-4 text-balance">
          Standard Local Shop SEO Rate Card
        </h2>
        <p className="mt-4 text-muted-foreground">
          Practical Google Business Profile and website SEO support for local shops.
          Timelines are estimates; search rankings are not guaranteed.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5">
          <button
            type="button"
            aria-pressed={period === "monthly"}
            onClick={() => setPeriod("monthly")}
            className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
              period === "monthly" ? "bg-navy text-on-navy" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={period === "sprint"}
            onClick={() => setPeriod("sprint")}
            className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
              period === "sprint" ? "bg-navy text-on-navy" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            3-Month Sprint <span className="ml-1 text-xs">Save up to ₹8,000</span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const amount = period === "monthly" ? plan.monthly : plan.sprint;
          const whatsappMessage = `Hi SYNX, I'm interested in ${plan.name} (${period === "monthly" ? "monthly" : "3-month sprint"}). Please share the next steps.`;
          const whatsappHref = `${SITE.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

          return (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-[var(--shadow-soft)] md:p-8 ${
                plan.popular ? "theme-navy border-silver/50 bg-navy-gradient shadow-float" : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-5 top-5 rounded-full bg-silver px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-navy">
                  Most Popular
                </span>
              )}
              <h3 className={`text-h3 pr-24 ${plan.popular ? "text-on-navy" : ""}`}>{plan.name}</h3>
              <p className={`mt-3 min-h-12 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.summary}
              </p>

              <div className={`mt-6 border-t pt-6 ${plan.popular ? "border-silver/25" : "border-border"}`}>
                <p className={`text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                  {period === "monthly" ? "Monthly" : "3-month total"}
                </p>
                <p className="mt-1 text-4xl font-semibold tracking-tight">
                  {formatINR(amount)}
                  <span className={`ml-2 text-sm font-normal ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                    {period === "monthly" ? "/ month" : "/ 3 months"}
                  </span>
                </p>
                {period === "sprint" ? (
                  <p className={`mt-2 text-sm font-medium ${plan.popular ? "text-silver" : "text-steel"}`}>
                    About {formatINR(monthlyEquivalent(plan.sprint))}/month · Save {formatINR(savings(plan.monthly, plan.sprint))} total
                    <span className={`block text-xs font-normal ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                      {formatINR(Math.round(savings(plan.monthly, plan.sprint) / 3))} average savings per month
                    </span>
                  </p>
                ) : (
                  <p className={`mt-2 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                    {formatINR(savings(plan.monthly, plan.sprint))} total savings on the 3-month sprint
                  </p>
                )}
              </div>

              <div className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${plan.popular ? "bg-white/10 text-silver" : "bg-muted text-foreground"}`}>
                <Clock3 className="size-3.5" aria-hidden />
                {plan.timeline}
              </div>

              <div className="mt-6 space-y-5">
                {plan.groups.map((group) => (
                  <section key={group.title} aria-label={`${group.title} deliverables`}>
                    <h4 className={`text-sm font-semibold ${plan.popular ? "text-on-navy" : ""}`}>{group.title}</h4>
                    <ul className={`mt-2 space-y-2 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check className={`mt-0.5 size-4 shrink-0 ${plan.popular ? "text-silver" : "text-steel"}`} aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <Button
                asChild
                variant={plan.popular ? "hero" : "navy"}
                className="mt-auto w-full"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Start on WhatsApp <ArrowRight aria-hidden />
                </a>
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">One-time services</p>
          <h3 className="text-h2 mt-4 text-balance">Local setup and project services</h3>
          <p className="mt-4 text-muted-foreground">
            Fixed-scope projects with an estimated turnaround after receiving the required access and materials.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ONE_TIME_SERVICES.map((service) => (
            <article key={service.name} className="surface-card flex h-full flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h4 className="text-h3">{service.name}</h4>
                <p className="text-lg font-semibold">{service.price}</p>
              </div>
              <p className="mt-3 inline-flex w-fit rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                Turnaround: {service.turnaround}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-steel" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                {service.note}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Optional services</p>
          <h3 className="text-h2 mt-4 text-balance">Add-ons for your next stage of growth</h3>
          <p className="mt-4 text-muted-foreground">
            Add these separately to a local SEO plan when your shop needs more support.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ADD_ONS.map((addOn) => (
            <article key={addOn.name} className="surface-card flex h-full flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h4 className="text-h3">{addOn.name}</h4>
                <p className="text-lg font-semibold">
                  {addOn.price}<span className="ml-1 text-sm font-normal text-muted-foreground">{addOn.cadence}</span>
                </p>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">What you get</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {addOn.deliverables.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-steel" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Why shops add it</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{addOn.value}</p>
                  {"note" in addOn && (
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{addOn.note}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        3-month commitment recommended for Google ranking stability. Zero hidden software fees. Results vary by market, competition and website condition; Google rankings are not guaranteed.
      </p>
    </section>
  );
}
