import { Check, Search } from "lucide-react";
import { formatINR } from "@/lib/site";
import { cn } from "@/lib/utils";

/* All mockups are illustrative concepts with sample data, and are labelled as such. */

function WindowChrome({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between border-b border-border px-4 py-3", className)}>
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-silver/40" />
        <span className="size-2.5 rounded-full bg-silver/25" />
        <span className="size-2.5 rounded-full bg-silver/15" />
      </div>
      <span className="font-mono text-[0.6875rem] tracking-wider text-on-navy-muted">{title}</span>
      <span className="concept-tag">Concept</span>
    </div>
  );
}

export interface PosMockupData {
  screen: string;
  items: { name: string; meta: string; amount: number }[];
  stats: { label: string; value: string }[];
}

const DEFAULT_POS: PosMockupData = {
  screen: "Counter · New bill",
  items: [
    { name: "Linen Shirt", meta: "M · Sky", amount: 1499 },
    { name: "Slim Chinos", meta: "32 · Sand", amount: 1899 },
    { name: "Cotton Tee", meta: "L · Navy", amount: 599 },
  ],
  stats: [
    { label: "Payment", value: "UPI" },
    { label: "Receipt", value: "Ready" },
  ],
};

export function PosMockup({ data = DEFAULT_POS, className }: { data?: PosMockupData; className?: string }) {
  const total = data.items.reduce((s, i) => s + i.amount, 0);
  const bars = [38, 52, 44, 70, 58, 82, 64];
  return (
    <div
      role="img"
      aria-label={`Concept screen: ${data.screen}, illustrative sample data`}
      className={cn("theme-navy glass overflow-hidden rounded-3xl shadow-float", className)}
    >
      <WindowChrome title={data.screen} />
      <div className="grid gap-0 sm:grid-cols-[1.35fr_1fr]">
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-navy-deep/40 px-3 py-2 text-sm text-on-navy-muted">
            <Search className="size-3.5" aria-hidden /> Search or scan
          </div>
          {data.items.map((it) => (
            <div
              key={it.name}
              className="flex items-center justify-between rounded-xl border border-border bg-navy-surface/50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-on-navy">{it.name}</p>
                <p className="truncate font-mono text-[0.6875rem] text-on-navy-muted">{it.meta}</p>
              </div>
              <p className="pl-3 font-mono text-sm text-on-navy">{formatINR(it.amount)}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-border p-4 sm:border-l sm:border-t-0">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-on-navy-muted">Total</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-on-navy">{formatINR(total)}</p>
          </div>
          <div className="flex h-16 items-end gap-1.5" aria-hidden>
            {bars.map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-sm", i === bars.length - 2 ? "bg-silver" : "bg-silver/25")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <dl className="space-y-1.5">
            {data.stats.map((s) => (
              <div key={s.label} className="flex justify-between text-xs">
                <dt className="text-on-navy-muted">{s.label}</dt>
                <dd className="text-on-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-full bg-silver py-2 text-center text-sm font-medium text-navy">Complete bill</div>
        </div>
      </div>
    </div>
  );
}

export function WebsiteMockup({ className, variant = "brand" }: { className?: string; variant?: "brand" | "catalogue" }) {
  return (
    <div
      role="img"
      aria-label="Concept screen: premium business website, illustrative"
      className={cn("theme-navy glass overflow-hidden rounded-3xl shadow-float", className)}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-silver/40" />
          <span className="size-2.5 rounded-full bg-silver/25" />
          <span className="size-2.5 rounded-full bg-silver/15" />
        </div>
        <div className="flex-1 truncate rounded-full bg-navy-deep/50 px-3 py-1 font-mono text-[0.6875rem] text-on-navy-muted">
          yourbrand.in
        </div>
        <span className="concept-tag">Concept</span>
      </div>
      <div className="bg-paper p-5 text-ink">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.2em]">MAISON</span>
          <div className="flex gap-3" aria-hidden>
            <span className="h-1.5 w-8 rounded-full bg-hairline" />
            <span className="h-1.5 w-8 rounded-full bg-hairline" />
            <span className="h-1.5 w-8 rounded-full bg-hairline" />
          </div>
        </div>
        {variant === "brand" ? (
          <>
            <p className="mt-6 max-w-[15rem] text-xl font-semibold leading-tight tracking-tight">
              Crafted pieces for considered homes.
            </p>
            <div className="mt-3 h-1.5 w-40 rounded-full bg-hairline" aria-hidden />
            <div className="mt-1.5 h-1.5 w-28 rounded-full bg-hairline" aria-hidden />
            <div className="mt-4 inline-flex rounded-full bg-navy px-3 py-1.5 text-[0.6875rem] font-medium text-on-navy">
              Explore collection
            </div>
          </>
        ) : (
          <div className="mt-4 flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 text-[0.6875rem] text-ink-soft">
            <Search className="size-3" aria-hidden /> Search 240 products
          </div>
        )}
        <div className="mt-5 grid grid-cols-3 gap-2.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1.5">
              <div
                className={cn(
                  "aspect-[4/5] rounded-xl",
                  i === 0 && "bg-gradient-to-br from-ice to-silver",
                  i === 1 && "bg-gradient-to-br from-silver to-steel",
                  i === 2 && "bg-gradient-to-br from-ice via-silver/70 to-ice",
                )}
              />
              <div className="h-1.5 w-3/4 rounded-full bg-hairline" />
              <div className="h-1.5 w-1/2 rounded-full bg-hairline" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OpsMockup({ className }: { className?: string }) {
  const columns = [
    { title: "Today", items: ["Morning sales review", "Reorder low stock"] },
    { title: "Orders", items: ["Online order · packed", "Store pickup · ready"] },
  ];
  return (
    <div
      role="img"
      aria-label="Concept screen: business operations overview, illustrative"
      className={cn("theme-navy glass overflow-hidden rounded-3xl shadow-float", className)}
    >
      <WindowChrome title="Operations" />
      <div className="grid grid-cols-3 gap-2 p-4">
        {[
          { k: "Sales", v: "Today" },
          { k: "Orders", v: "Store + web" },
          { k: "Stock", v: "Low: 4" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-border bg-navy-surface/50 p-3">
            <p className="font-mono text-[0.625rem] uppercase tracking-wider text-on-navy-muted">{s.k}</p>
            <p className="mt-1 text-sm font-medium text-on-navy">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {columns.map((c) => (
          <div key={c.title} className="rounded-xl border border-border p-3">
            <p className="text-xs font-medium text-on-navy">{c.title}</p>
            <ul className="mt-2 space-y-2">
              {c.items.map((it, i) => (
                <li key={it} className="flex items-center gap-2 text-xs text-on-navy-muted">
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full border border-silver/50",
                      i === 0 && "border-silver bg-silver text-navy",
                    )}
                  >
                    {i === 0 && <Check className="size-2.5" aria-hidden />}
                  </span>
                  <span className="truncate">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Overlapping hero composition of three concept screens */
export function HeroComposition() {
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[1100px] sm:aspect-[16/9]">
      <div data-parallax="4" className="absolute left-0 top-[6%] w-[62%] sm:w-[52%]">
        <WebsiteMockup />
      </div>
      <div data-parallax="10" className="absolute right-0 top-0 w-[64%] sm:w-[50%]">
        <PosMockup />
      </div>
      <div data-parallax="16" className="absolute bottom-0 left-[22%] hidden w-[46%] sm:block sm:w-[38%]">
        <OpsMockup />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] bottom-[-8%] h-24 rounded-[100%] bg-steel/25 blur-3xl"
      />
    </div>
  );
}
