import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const PLANS = [
  {
    name: "Launch My Ad",
    cadence: "one-time",
    price: "₹999",
    adSpend: "Example ChatGPT ad budget: ₹5,075 for 7 days",
    total: "First 7 days: about ₹6,074",
    totalDetail: "₹5,075 ad budget + ₹999 SYNX setup fee. Setup only; ongoing management is not included.",
    summary: "Get your brand campaign ready to run.",
    items: [
      "Set up one ChatGPT or Reddit ad campaign",
      "Create an ad with your brand name, offer and website or WhatsApp link",
      "Choose the campaign location and audience where available",
      "Prepare the campaign for platform review",
    ],
  },
  {
    name: "Weekly Ad Care",
    cadence: "per week",
    price: "₹499",
    adSpend: "Example ChatGPT ad budget: ₹5,075 for 7 days",
    total: "7-day total: about ₹5,574",
    totalDetail: "₹5,075 ad budget + ₹499 SYNX weekly fee. First week of a new campaign: about ₹6,573 including setup.",
    summary: "Keep your live campaign checked and on track.",
    items: [
      "Check ad delivery, spend, views and clicks",
      "Make one round of audience or ad improvements",
      "Send you a simple weekly update",
    ],
  },
  {
    name: "Monthly Ad Management",
    cadence: "per month",
    price: "₹1,499",
    adSpend: "Example ChatGPT ad budget: ₹21,750 for 30 days",
    total: "30-day total: about ₹23,249",
    totalDetail: "₹21,750 ad budget + ₹1,499 SYNX monthly fee. First month of a new campaign: about ₹24,248 including setup.",
    summary: "Steady support for one campaign on your chosen platform.",
    popular: true,
    items: [
      "Manage one active ChatGPT or Reddit campaign",
      "Check and improve it each week",
      "Share a monthly report and clear next steps",
    ],
  },
] as const;

export function OpenAiAdsPricing() {
  return (
    <section aria-labelledby="openai-ads-heading" className="mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">ChatGPT Ads by SYNX</p>
        <h2 id="openai-ads-heading" className="text-h2 mt-4 text-balance">
          Help local customers discover your brand in ChatGPT
        </h2>
        <p className="mt-4 text-muted-foreground">
          When someone explores a topic related to your business, your business name, offer and link may appear in a clearly labeled ChatGPT sponsored ad. It is a paid placement beside relevant conversations—not a promise to appear in ChatGPT’s answer or recommendations.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Get noticed at decision time",
            copy: "Introduce your service while people are exploring options related to what you offer.",
          },
          {
            title: "Reach the locations you serve",
            copy: "Choose a target location; city, region or postal-code targeting may be available for the campaign and account.",
          },
          {
            title: "Bring interested people to you",
            copy: "Send ad clicks to your website or WhatsApp, then review views, clicks and spend in campaign reports.",
          },
        ].map((benefit) => (
          <article key={benefit.title} className="surface-card p-6">
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-h3">How it works</h3>
        <ol className="mt-5 grid gap-5 text-sm text-muted-foreground md:grid-cols-4">
          <li><span className="font-semibold text-foreground">1. Pick your goal.</span> Choose the service, audience and location you want to reach.</li>
          <li><span className="font-semibold text-foreground">2. Build your ad.</span> SYNX prepares your brand message, offer and destination link.</li>
          <li><span className="font-semibold text-foreground">3. Get platform review.</span> OpenAI reviews the ad; it can run after account, billing and approval steps are complete.</li>
          <li><span className="font-semibold text-foreground">4. Track and improve.</span> SYNX checks delivery and updates the campaign based on results.</li>
        </ol>
      </div>

      <div className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Simple SYNX fees</p>
          <h2 className="text-h2 mt-4 text-balance">Choose the support you need</h2>
          <p className="mt-4 text-muted-foreground">
            Choose ChatGPT Ads or Reddit Ads for your campaign. The same three simple service options apply to either platform.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const whatsappHref = `${SITE.whatsappHref}?text=${encodeURIComponent(`Hi SYNX, I want to choose ${plan.name} at ${plan.price} ${plan.cadence}. I’m interested in ChatGPT Ads / Reddit Ads.`)}`;

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
                    SYNX fee · {plan.cadence}
                  </p>
                </div>
                <div className={`mt-5 rounded-2xl p-4 ${plan.popular ? "bg-white/10" : "bg-muted"}`}>
                  <p className={`text-sm font-semibold ${plan.popular ? "text-on-navy" : "text-foreground"}`}>{plan.adSpend}</p>
                  <p className={`mt-2 text-base font-semibold ${plan.popular ? "text-silver" : "text-steel"}`}>{plan.total}</p>
                  <p className={`mt-1 text-xs leading-relaxed ${plan.popular ? "text-on-navy-muted" : "text-muted-foreground"}`}>{plan.totalDetail}</p>
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
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h3 className="text-lg font-semibold">Your ad budget and SYNX fee are separate</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The totals above are ChatGPT examples using OpenAI’s current minimum daily budget of ₹725. You pay OpenAI directly for ads and SYNX separately for setup or management. Actual spend can vary, and the 7-day and 30-day totals are estimates before applicable taxes. For Reddit, the ad budget is selected in Reddit Ads, so the total depends on the client’s chosen budget.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          OpenAI chooses which eligible sponsored ad appears based on conversation relevance, campaign settings and its ad auction. Ads are labeled and do not change ChatGPT’s answers. Location options, ad approval and results depend on account and campaign eligibility.
        </p>
      </div>
    </section>
  );
}
