import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, LineChart, MessageSquareText, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { OpsMockup } from "@/components/site/Mockups";
import { CtaBand, FaqList } from "@/components/site/Blocks";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/ai-saas")({
  head: () =>
    pageMeta(
      "AI SaaS — Practical Business Automation by SYNX",
      "SYNX scopes practical AI-assisted tools for businesses: smarter reports, inquiry assistance and content drafting — defined and quoted per project.",
    ),
  component: AiSaasPage,
});

const IDEAS = [
  { icon: LineChart, title: "Plain-language reports", desc: "Summaries of sales and stock data written in clear sentences for owners." },
  { icon: MessageSquareText, title: "Inquiry assistance", desc: "Help sorting and drafting replies to customer inquiries, reviewed by your team." },
  { icon: FileText, title: "Catalogue content drafting", desc: "Draft product descriptions from your specifications for you to approve." },
  { icon: Sparkles, title: "Workflow automation", desc: "Repetitive back-office steps automated where it is reliable to do so." },
];

const FAQS = [
  { q: "Is this an off-the-shelf AI product?", a: "No. AI features are scoped for a specific business need and quoted per project. Nothing here is presented as an existing packaged product." },
  { q: "Will AI make decisions for my business?", a: "AI-assisted features are designed to support your team. Important outputs are reviewed by people before they are used." },
  { q: "What about my business data?", a: "Data handling is agreed in the scope. We only use the data a feature actually needs." },
];

function AiSaasPage() {
  return (
    <>
      <PageHero
        eyebrow="AI SaaS"
        title="Useful AI, applied where it actually helps."
        copy="Focused, AI-assisted tools that save time on everyday business tasks — scoped with you, quoted per project, and built to be reviewed by people."
        aside={<OpsMockup />}
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/contact" search={{ service: "ai-saas", package: undefined }}>
            Discuss an AI idea <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Possibilities" title="Where AI can fit into your business." copy="Examples of what can be scoped. Each is defined in writing before any work begins." />
          <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IDEAS.map((i) => (
              <div key={i.title} className="surface-card p-7">
                <i.icon className="size-6 text-steel" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{i.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-card">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered plainly." />
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
