import { ArrowRight, Check, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const PLANS = [
  {
    name: "Campaign Setup",
    cadence: "one-time",
    price: "₹7,500",
    summary: "Plan and prepare your first ChatGPT ad campaign.",
    items: [
      "Check account readiness and campaign goals",
      "Set up one campaign with audience, location and budget plan",
      "Write up to three ad versions and check the landing page",
      "Guide you through submission and approval steps",
    ],
    time: "About 5 hours of work",
  },
  {
    name: "Weekly Campaign Care",
    cadence: "per week",
    price: "₹3,500",
    summary: "Keep one active campaign reviewed and improving week by week.",
    items: [
      "Check spend, views, clicks and campaign status",
      "Make one round of targeting or ad adjustments",
      "Review which ad message is getting attention",
      "Send a short weekly results summary",
    ],
    time: "About 2 hours of work per week",
  },
  {
    name: "Monthly Campaign Management",
    cadence: "per month",
    price: "₹12,000",
    summary: "Ongoing campaign management with weekly check-ins and a monthly review.",
    popular: true,
    items: [
      "Manage up to two active campaigns",
      "Review results and adjust campaigns each week",
      "Refresh up to four ad versions per month",
      "Share a monthly report with clear next steps",
    ],
    time: "About 8 hours of work per month",
  },
] as const;

const REDDIT_PLANS = [
  {
    name: "Reddit Campaign Setup",
    cadence: "one-time",
    price: "₹6,000",
    summary: "Build a campaign around the communities and conversations your customers care about.",
    items: [
      "Plan one campaign and its audience",
      "Choose suitable communities and interests",
      "Prepare five headlines and two image versions using your assets",
      "Set the budget and review the campaign before launch",
    ],
    time: "About 4 hours of work",
  },
  {
    name: "Reddit Weekly Optimization",
    cadence: "per week",
    price: "₹3,000",
    summary: "Review one active campaign and make focused weekly improvements.",
    items: [
      "Check spend, reach and clicks",
      "Review community and audience delivery",
      "Make one round of campaign adjustments",
      "Send a short weekly performance update",
    ],
    time: "About 2 hours of work per week",
  },
  {
    name: "Reddit Monthly Management",
    cadence: "per month",
    price: "₹10,000",
    summary: "Consistent management for up to two active Reddit campaigns.",
    popular: true,
    items: [
      "Manage up to two active campaigns",
      "Review and optimize campaigns each week",
      "Refresh headlines and client-provided images",
      "Share a monthly results report and next steps",
    ],
    time: "About 7 hours of work per month",
  },
] as const;

export function OpenAiAdsPricing() {
  const whatsappHref = `${SITE.whatsappHref}?text=${encodeURIComponent("Hi SYNX, I'm interested in OpenAI and Reddit Ads campaign services. Please share the next steps.")}`;

  return (
    <section aria-labelledby="openai-ads-heading" className="mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">OpenAI Ads</p>
        <h2 id="openai-ads-heading" className="text-h2 mt-4 text-balance">
          Advertise in ChatGPT
        </h2>
        <p className="mt-4 text-muted-foreground">
          SYNX can help plan, prepare and manage ChatGPT ad campaigns. Ads are labeled placements, separate from ChatGPT answers; results depend on the campaign and audience.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-[var(--shadow-soft)] md:p-8 ${
              plan.popular ? "theme-navy border-silver/50 bg-navy-gradient shadow-float" : "border-border bg-card"
            }`}
          >
            {plan.popular && (
              <span className="absolute right-5 top-5 rounded-full bg-silver px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-navy">
                Best Value
              </span>
            )}
            <h3 className={`text-h3 pr-20 ${plan.popular ? "text-on-navy" : ""}`}>{plan.name}</h3>
            <p className={`mt-3 min-h-12 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
              {plan.summary}
            </p>
            <div className={`mt-6 border-t pt-6 ${plan.popular ? "border-silver/25" : "border-border"}`}>
              <p className={`text-4xl font-semibold tracking-tight ${plan.popular ? "text-on-navy" : ""}`}>
                {plan.price}
              </p>
              <p className={`mt-1 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.cadence} · service fee
              </p>
            </div>
            <ul className={`mt-6 flex-1 space-y-3 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
              {plan.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className={`mt-0.5 size-4 shrink-0 ${plan.popular ? "text-silver" : "text-steel"}`} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-5 text-xs ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
              {plan.time}
            </p>
            <Button asChild variant={plan.popular ? "hero" : "navy"} className="mt-6 w-full">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Ask about this plan <ArrowRight aria-hidden />
              </a>
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Reddit Ads</p>
          <h2 className="text-h2 mt-4 text-balance">Reach people in relevant communities</h2>
          <p className="mt-4 text-muted-foreground">
            Campaign setup and management for Reddit feed and conversation placements. We plan the campaign, prepare copy and improve delivery; Reddit decides ad review and auction results.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {REDDIT_PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-[var(--shadow-soft)] md:p-8 ${
                plan.popular ? "theme-navy border-silver/50 bg-navy-gradient shadow-float" : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-5 top-5 rounded-full bg-silver px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-navy">
                  Best Value
                </span>
              )}
              <h3 className={`text-h3 pr-20 ${plan.popular ? "text-on-navy" : ""}`}>{plan.name}</h3>
              <p className={`mt-3 min-h-12 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.summary}
              </p>
              <div className={`mt-6 border-t pt-6 ${plan.popular ? "border-silver/25" : "border-border"}`}>
                <p className={`text-4xl font-semibold tracking-tight ${plan.popular ? "text-on-navy" : ""}`}>
                  {plan.price}
                </p>
                <p className={`mt-1 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                  {plan.cadence} · service fee
                </p>
              </div>
              <ul className={`mt-6 flex-1 space-y-3 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className={`mt-0.5 size-4 shrink-0 ${plan.popular ? "text-silver" : "text-steel"}`} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-5 text-xs ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.time}
              </p>
              <Button asChild variant={plan.popular ? "hero" : "navy"} className="mt-6 w-full">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Ask about this plan <ArrowRight aria-hidden />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-lg font-semibold">OpenAI ad spend is separate</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The plan prices above are SYNX service fees. The customer pays OpenAI directly for ad delivery. OpenAI currently lists a minimum INR campaign budget of ₹725 per day (about ₹21,750 for 30 days); actual delivery and billing can vary. New campaigns also require OpenAI review and account readiness.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Monthly management is billed separately from the one-time setup. No clicks, leads or sales are guaranteed.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Reddit ad spend is also paid directly to Reddit and is not included in SYNX fees. Reddit uses auction-based budgets and delivery can vary.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href="https://ads.openai.com/" target="_blank" rel="noopener noreferrer">
              Open Ads Manager <ExternalLink aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
