import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, type Package } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PackageCard({ pkg, compact = false }: { pkg: Package; compact?: boolean }) {
  const customQuote = !pkg.setup;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 md:p-8",
        pkg.recommended
          ? "theme-navy border-silver/40 bg-navy-gradient shadow-float"
          : "border-border bg-card shadow-[var(--shadow-soft)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-h3">{pkg.name}</h3>
        {pkg.recommended && (
          <span className="rounded-full bg-silver px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-navy">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-3 text-[0.9375rem] text-muted-foreground">{pkg.summary}</p>

      <div className="mt-7 border-t border-border pt-6">
        {customQuote ? (
          <>
            <p className="text-2xl font-semibold tracking-tight">Custom quote</p>
            <p className="mt-1 text-sm text-muted-foreground">Scoped to your stores, channels and workflow.</p>
          </>
        ) : (
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-muted-foreground">Setup</dt>
              <dd className="text-[2rem] font-semibold leading-tight tracking-[-0.03em]">
                {formatPrice(pkg.setup!)}
              </dd>
            </div>
            {pkg.monthly && (
              <div>
                <dt className="sr-only">Recurring</dt>
                <dd className="text-[0.9375rem]">
                  <span className="font-medium">{formatPrice(pkg.monthly)}</span>{" "}
                  <span className="text-muted-foreground">{pkg.monthlyLabel}</span>
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>

      {!compact && (
        <>
          <ul className="mt-7 space-y-3">
            {pkg.includes.map((f) => (
              <li key={f} className="flex gap-3 text-[0.9375rem]">
                <Check className="mt-1 size-4 shrink-0 text-steel" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-sm font-medium text-muted-foreground">Not included</p>
            <ul className="mt-2 space-y-2">
              {pkg.excludes.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                  <Minus className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-8">
        <Button asChild variant={pkg.recommended ? "hero" : "navy"} className="w-full">
          <Link to="/contact" search={{ service: pkg.service, package: pkg.id }}>
            {customQuote ? "Request a Custom Quote" : "Request This Package"}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        {!compact && !customQuote && (
          <Button asChild variant="ghost" className="w-full">
            <Link to="/contact" search={{ service: pkg.service, package: undefined }}>
              Discuss Custom Requirements
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}
