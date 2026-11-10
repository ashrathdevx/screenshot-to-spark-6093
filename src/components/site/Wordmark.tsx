import { cn } from "@/lib/utils";

/** SYNX wordmark: a small silver mark plus tracked letters. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-on-navy", className)}>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <defs>
          <linearGradient id="synx-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--on-navy)" />
            <stop offset="1" stopColor="var(--steel)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="8" fill="none" stroke="url(#synx-mark)" strokeOpacity="0.55" />
        <path d="M8 10.5 L14 7 L20 10.5 L14 14 Z" fill="url(#synx-mark)" />
        <path d="M8 17.5 L14 14 L20 17.5 L14 21 Z" fill="url(#synx-mark)" fillOpacity="0.55" />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[0.28em]">SYNX</span>
    </span>
  );
}
