import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const SOLUTION_LINKS = [
  { to: "/pos", label: "POS Software", desc: "Industry-specific billing and operations" },
  { to: "/ai-saas", label: "AI SaaS", desc: "Practical, scoped automation" },
  { to: "/websites", label: "Websites", desc: "Premium sites, catalogues and stores" },
  { to: "/unified-commerce", label: "Unified Commerce", desc: "Store and online, connected" },
] as const;

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/pos", label: "POS Software" },
  { to: "/ai-saas", label: "AI SaaS" },
  { to: "/websites", label: "Websites" },
  { to: "/unified-commerce", label: "Unified Commerce" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const linkBase =
  "relative rounded-full px-3 py-2 text-[0.875rem] font-medium text-on-navy-muted transition-colors duration-300 hover:text-on-navy";
const activeLink =
  "text-on-navy after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-silver";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solutionsActive = pathname === "/solutions";

  return (
    <header
      className={cn(
        "theme-navy fixed inset-x-0 top-0 z-50 bg-transparent transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "glass-nav" : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link to="/" aria-label="SYNX home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          <Link
            to="/"
            className={linkBase}
            activeOptions={{ exact: true }}
            activeProps={{ className: activeLink }}
          >
            Home
          </Link>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              className={cn(
                linkBase,
                "inline-flex items-center gap-1 outline-none data-[state=open]:text-on-navy",
                solutionsActive && activeLink,
              )}
            >
              Solutions <ChevronDown className="size-3.5 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={12}
              className="theme-navy glass w-80 rounded-2xl p-2 text-on-navy"
            >
              {SOLUTION_LINKS.map((s) => (
                <DropdownMenuItem key={s.to} asChild className="rounded-xl p-3 focus:bg-navy-surface">
                  <Link to={s.to} className="flex flex-col items-start gap-0.5">
                    <span className="text-[0.9375rem] font-medium text-on-navy">{s.label}</span>
                    <span className="text-sm text-on-navy-muted">{s.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-navy-surface">
                <Link to="/solutions" className="flex items-center justify-between text-sm text-on-navy">
                  All solutions <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {NAV.slice(1).map((item) => (
            <Link key={item.to} to={item.to} className={linkBase} activeProps={{ className: activeLink }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact" search={{ service: undefined, package: undefined }}>
              Get a Quote
            </Link>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-on-navy xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="xl:hidden"
      >
        <nav
          aria-label="Mobile"
          className="container-x flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto pb-10 pt-4 animate-in fade-in slide-in-from-top-2 duration-500"
        >
          <ul className="flex flex-col">
            {[{ to: "/solutions", label: "Solutions" } as const, ...NAV].map((item, i) => (
              <li key={item.to} className="border-b border-border" style={{ animationDelay: `${i * 30}ms` }}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex min-h-14 items-center justify-between text-xl font-medium tracking-tight text-on-navy-muted"
                  activeProps={{ className: "text-on-navy" }}
                >
                  {item.label}
                  <ArrowUpRight className="size-5 opacity-50" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" size="lg" className="mt-8 w-full">
            <Link to="/contact" search={{ service: undefined, package: undefined }}>
              Get a Quote
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
