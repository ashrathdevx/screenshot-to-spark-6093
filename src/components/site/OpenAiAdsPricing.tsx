import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const PLANS = [
  {
    name: "One-Time Ad Setup",
    cadence: "one-time",
    price: "₹7,500",
    summary: "Get your first branded campaign ready to launch.",
    items: [
      "Set up one campaign on ChatGPT Ads or Reddit Ads",
      "Write ad copy with your business name and offer",
      "Add your website or WhatsApp link and prepare the campaign for review",
    ],
  },
  {
    name: "Weekly Ad Care",
    cadence: "per week",
    price: "₹3,500",
    summary: "Keep one active campaign checked and improving.",
    items: [
      "Check campaign delivery, spend, views and clicks",
      "Make one round of ad or audience improvements",
      "Send you a short weekly update",
    ],
  },
  {
    name: "Monthly Ad Management",
    cadence: "per month",
    price: "₹12,000",
    summary: "Ongoing support for your chosen ad platform.",
    popular: true,
    items: [
      "Manage up to two campaigns on ChatGPT Ads or Reddit Ads",
      "Check and improve campaigns each week",
      "Share a monthly report with spend, views, clicks and next steps",
    ],
  },
] as const;

export function OpenAiAdsPricing() {
  return (
    <section aria-labelledby="openai-ads-heading" className="mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">OpenAI &amp; Reddit Ads</p>
        <h2 id="openai-ads-heading" className="text-h2 mt-4 text-balance">
          Put your brand in front of relevant audiences
        </h2>
        <p className="mt-4 text-muted-foreground">
          Your business name, offer and link can appear in a clearly labeled sponsored ad on ChatGPT or Reddit. Choose one platform for your plan. ChatGPT ads are separate from ChatGPT answers and do not change them.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const whatsappHref = `${SITE.whatsappHref}?text=${encodeURIComponent(`Hi SYNX, I'm interested in the ${plan.name} (${plan.price} ${plan.cadence}). Please share the next steps.`)}`;

          return (
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
              <h3 className={`text-h3 pr-24 ${plan.popular ? "text-on-navy" : ""}`}>{plan.name}</h3>
              <p className={`mt-3 min-h-12 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                {plan.summary}
              </p>
              <div className={`mt-6 border-t pt-6 ${plan.popular ? "border-silver/25" : "border-border"}`}>
                <p className={`text-4xl font-semibold tracking-tight ${plan.popular ? "text-on-navy" : ""}`}>
                  {plan.price}
                </p>
                <p className={`mt-1 text-sm ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>
                  {plan.cadence} · SYNX service fee
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
              <Button asChild variant={plan.popular ? "hero" : "navy"} className="mt-8 w-full">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Choose this plan <ArrowRight aria-hidden />
                </a>
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-lg font-semibold">Ad budget is separate</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          These prices pay for SYNX’s service. You pay ChatGPT Ads or Reddit Ads directly for ad delivery. OpenAI currently lists a minimum INR budget of ₹725 per day for ChatGPT campaigns; Reddit budgets are set separately in Reddit Ads. Ad approval, placement and results depend on each platform.
        </p>
      </div>
    </section>
  );
}
