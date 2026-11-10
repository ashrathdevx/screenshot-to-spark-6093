import { Globe, LayoutDashboard, Store } from "lucide-react";
import { cn } from "@/lib/utils";

/** Concept diagram: store and online channels feeding one owner view. */
export function ChannelDiagram({ className }: { className?: string }) {
  const nodes = [
    { icon: Store, title: "In-store", desc: "Billing & stock" },
    { icon: Globe, title: "Online", desc: "Catalogue & orders" },
  ];
  return (
    <div
      role="img"
      aria-label="Concept diagram: in-store and online channels connected to one business view"
      className={cn("theme-navy glass relative overflow-hidden rounded-3xl p-6 shadow-float sm:p-8", className)}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-on-navy-muted">One business</p>
        <span className="concept-tag">Concept</span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {nodes.map((n) => (
          <div key={n.title} className="rounded-2xl border border-border bg-navy-surface/60 p-4">
            <n.icon className="size-5 text-silver" aria-hidden />
            <p className="mt-3 text-sm font-medium text-on-navy">{n.title}</p>
            <p className="text-xs text-on-navy-muted">{n.desc}</p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 200 40" className="mx-auto h-10 w-2/3" aria-hidden>
        <path d="M30 0 C30 25, 100 15, 100 40" fill="none" stroke="var(--silver)" strokeOpacity="0.5" strokeDasharray="3 4" />
        <path d="M170 0 C170 25, 100 15, 100 40" fill="none" stroke="var(--silver)" strokeOpacity="0.5" strokeDasharray="3 4" />
      </svg>
      <div className="mx-auto flex max-w-[16rem] items-center gap-3 rounded-2xl border border-silver/40 bg-silver/10 p-4">
        <LayoutDashboard className="size-5 text-silver" aria-hidden />
        <div>
          <p className="text-sm font-medium text-on-navy">Owner view</p>
          <p className="text-xs text-on-navy-muted">Sales, orders and stock</p>
        </div>
      </div>
    </div>
  );
}
