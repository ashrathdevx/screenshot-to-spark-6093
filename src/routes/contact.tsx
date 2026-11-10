import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/site/Section";
import { InquiryForm } from "@/components/site/InquiryForm";
import { SERVICE_OPTIONS, ALL_PACKAGES, type ServiceKey } from "@/data/pricing";
import { SITE } from "@/lib/site";

const TITLE = "Contact SYNX — Let's Build What's Next";
const DESC =
  "Tell SYNX about your business. Call, email or WhatsApp Shaik Ashrath, or send an inquiry for POS software, websites or unified commerce.";

type ContactSearch = { service?: ServiceKey | undefined; package?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    const service = SERVICE_OPTIONS.find((s) => s.value === search["service"])?.value;
    const pkg = ALL_PACKAGES.find((p) => p.id === search["package"] && (!service || p.service === service));
    return { service: service ?? pkg?.service, package: pkg?.id };
  },
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
  component: ContactPage,
});

const CHANNELS = [
  { icon: Phone, label: "Call", value: SITE.phoneDisplay, href: SITE.phoneHref, external: false },
  { icon: Mail, label: "Email", value: SITE.email, href: SITE.emailHref, external: false },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: SITE.whatsappHref, external: true },
];

function ContactPage() {
  const { service, package: pkg } = Route.useSearch();
  const selected = ALL_PACKAGES.find((p) => p.id === pkg);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build What's Next."
        copy="Tell us about your business and what you want to improve. SYNX is ready to discuss the right digital solution for your needs."
      />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <aside className="space-y-6">
            <div data-reveal className="surface-card p-7">
              <p className="eyebrow">Your contact</p>
              <p className="text-h3 mt-3">{SITE.contactName}</p>
              <ul className="mt-6 space-y-3">
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-14 items-center gap-4 rounded-2xl border border-border px-4 transition-colors hover:border-navy hover:bg-muted"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-navy text-on-navy">
                        <c.icon className="size-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm text-muted-foreground">{c.label}</span>
                        <span className="block font-medium">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p data-reveal className="px-2 text-sm text-muted-foreground">
              Inquiries are saved securely and reviewed personally. Direct phone, email and WhatsApp contact is always
              available, whether or not you use the form.
            </p>
          </aside>
          <div id="inquiry" data-reveal>
            {selected && (
              <p className="mb-4 text-[0.9375rem] text-muted-foreground">
                You're asking about the <span className="font-medium text-foreground">{selected.name}</span> package.
              </p>
            )}
            <InquiryForm defaultService={service} defaultPackage={pkg} />
          </div>
        </div>
      </section>
    </>
  );
}
