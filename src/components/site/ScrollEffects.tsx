import { useEffect, useLayoutEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Page-level motion, driven by data attributes so pages stay declarative:
 *  data-hero="n"     entrance sequence on load (ordered by n)
 *  data-reveal       fade/slide in when scrolled into view
 *  data-stagger      children enter one after another
 *  data-mask         text mask reveal
 *  data-line         divider draws in
 *  data-parallax="n" gentle vertical parallax (desktop only)
 * Re-runs once per settled route; every instance is reverted on change.
 */
export function ScrollEffects() {
  const path = useRouterState({
    select: (s) => (s.status === "idle" ? s.location.pathname : null),
  });

  useIsoLayoutEffect(() => {
    if (!path) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
      },
      (ctx) => {
        const { reduce, desktop } = ctx.conditions as { reduce: boolean; desktop: boolean };
        const heroEls = gsap.utils
          .toArray<HTMLElement>("[data-hero]")
          .sort((a, b) => Number(a.dataset["hero"] || 0) - Number(b.dataset["hero"] || 0));

        if (reduce) {
          gsap.set(heroEls, { opacity: 1 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        heroEls.forEach((el, i) => {
          const isVisual = el.dataset["heroVisual"] !== undefined;
          tl.fromTo(
            el,
            isVisual
              ? { opacity: 0, y: 70, scale: 0.96 }
              : { opacity: 0, y: 26, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: isVisual ? 1.6 : 1.1,
              clearProps: "filter",
            },
            i === 0 ? 0.05 : `<${isVisual ? 0.15 : 0.12}`,
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 36,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(0 0 100% 0)",
            y: 24,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        if (desktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset["parallax"] || 8);
            gsap.to(el, {
              yPercent: -amount,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });
        }
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [path]);

  return null;
}
