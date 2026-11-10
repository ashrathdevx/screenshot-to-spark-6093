import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE } from "@/lib/site";
import { Ambient } from "./Section";

export function CtaBand({
  title = "Your Next Stage of Growth Starts Here.",
  copy = "Tell us what your business needs. We'll help you find a digital solution that fits.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="theme-navy relative overflow-hidden bg-navy-gradient">
      <Ambient />
      <div className="container-x section relative text-center">
        <h2 data-mask className="text-h2 mx-auto max-w-3xl text-balance text-silver-gradient">
          {title}
        </h2>
        <p data-reveal className="text-lead mx-auto mt-5 max-w-xl text-on-navy-muted">
          {copy}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact" search={{ service: undefined, package: undefined }}>
              Request a Quote <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden /> Contact SYNX
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
          <AccordionTrigger className="py-6 text-left text-lg font-medium tracking-tight hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-[1rem] leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
