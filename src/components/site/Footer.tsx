import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { to: "/solutions", label: "All solutions" },
      { to: "/pos", label: "POS Software" },
      { to: "/ai-saas", label: "AI SaaS" },
      { to: "/websites", label: "Websites" },
      { to: "/unified-commerce", label: "Unified Commerce" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/pricing", label: "Pricing" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="theme-navy relative overflow-hidden bg-navy-deep">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-6 text-lead text-on-navy">{SITE.statement}</p>
            <p className="mt-2 text-sm text-on-navy-muted">{SITE.tagline}</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-[0.9375rem] text-on-navy-muted transition-colors hover:text-on-navy"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <p className="mt-5 text-[0.9375rem] font-medium text-on-navy">{SITE.contactName}</p>
            <ul className="mt-3 space-y-3 text-[0.9375rem]">
              <li>
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2 text-on-navy-muted hover:text-on-navy">
                  <Phone className="size-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="inline-flex items-center gap-2 text-on-navy-muted hover:text-on-navy">
                  <Mail className="size-4" aria-hidden /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-on-navy-muted hover:text-on-navy"
                >
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 text-sm text-on-navy-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SYNX. All rights reserved.</p>
          <p>Prices in INR. Product screens shown are concepts unless stated otherwise.</p>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none select-none text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-navy-surface/60"
      >
        SYNX
      </div>
    </footer>
  );
}
