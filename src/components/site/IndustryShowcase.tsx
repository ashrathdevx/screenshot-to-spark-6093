import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

import { INDUSTRY_GROUPS, POS_INDUSTRIES } from "@/data/pos";
import { cn } from "@/lib/utils";

export function IndustryShowcase() {
  const [group, setGroup] = useState<(typeof INDUSTRY_GROUPS)[number]>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const items = group === "All" ? POS_INDUSTRIES : POS_INDUSTRIES.filter((i) => i.group === group);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!gridRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" },
    );
    return () => {
      tween.kill();
    };
  }, [group]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter industries"
        data-reveal
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
      >
        {INDUSTRY_GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
            className={cn(
              "h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-300",
              group === g
                ? "border-navy bg-navy text-on-navy"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <div ref={gridRef} data-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((ind) => (
          <Link
            key={ind.slug}
            to="/pos/$industry"
            params={{ industry: ind.slug }}
            className="group surface-card flex flex-col p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-steel/60"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-wider text-muted-foreground">
                  {ind.group}
                </p>
                <h3 className="text-h3 mt-2">{ind.name}</h3>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-on-navy">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem] text-muted-foreground">{ind.valueProp}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ind.capabilities.map((c) => (
                <li key={c} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                  {c}
                </li>
              ))}
            </ul>
            <span className="sr-only">View {ind.name} solution</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
