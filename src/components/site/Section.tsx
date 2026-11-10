import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Ambient({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="hairline-grid absolute inset-0" />
      <div className="ambient-orb ambient-orb--silver animate-drift left-[-10%] top-[-20%] h-[38rem] w-[38rem]" />
      <div className="ambient-orb ambient-orb--steel animate-drift-slow right-[-12%] top-[10%] h-[34rem] w-[34rem]" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="theme-navy relative overflow-hidden bg-navy-gradient">
      <Ambient />
      <div
        className={cn(
          "container-x relative pb-20 pt-36 md:pb-28 md:pt-44",
          aside && "grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]",
        )}
      >
        <div className="max-w-3xl">
          {eyebrow && (
            <p data-hero="1" className="eyebrow">
              {eyebrow}
            </p>
          )}
          <h1 data-hero="2" className="text-h1 mt-5 text-balance text-silver-gradient">
            {title}
          </h1>
          {copy && (
            <p data-hero="3" className="text-lead mt-6 max-w-2xl text-pretty text-on-navy-muted">
              {copy}
            </p>
          )}
          {children && (
            <div data-hero="4" className="mt-9 flex flex-wrap gap-3">
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div data-hero="5" data-hero-visual>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 data-mask className="text-h2 mt-4 text-balance">
        {title}
      </h2>
      {copy && (
        <p data-reveal className="text-lead mt-5 text-pretty text-muted-foreground">
          {copy}
        </p>
      )}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div data-line aria-hidden className={cn("h-px w-full bg-border", className)} />;
}
