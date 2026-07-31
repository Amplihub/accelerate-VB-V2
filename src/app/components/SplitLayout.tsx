import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FunnelFooter from "./FunnelFooter";
import "./SplitLayout.css";

const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* One lockup, used twice: as-is on the dark portrait panel, and darkened in
   CSS (.spl-logo) for the light panel below lg. */
const LOGO = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68de77a7d6c63e1c1d4574fd.png";

type SplitLayoutProps = {
  /** Full-bleed portrait for the left panel. */
  portrait: string;
  /** Who the portrait is of — also the quote's attribution. */
  name: string;
  quote: string;
  children: React.ReactNode;
};

/* ─────────────────────────────────────────────
   The shared frame behind the funnel pages.
   Left: portrait + client quote. Right: whatever
   that step of the funnel needs.
───────────────────────────────────────────── */
export default function SplitLayout({ portrait, name, quote, children }: SplitLayoutProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  // One orchestrated entrance over the panel's own children, so each page
  // gets the load sequence without wiring up its own refs.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const inner = innerRef.current;
    if (!inner) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(inner.children), {
        opacity: 0,
        y: 18,
        duration: DURATION,
        ease: EASE,
        stagger: 0.09,
        clearProps: "opacity,transform",
      });
    }, inner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="spl">

      {/* ══ Left — portrait. Fixed on desktop so the panel scrolls against a
             still image; hidden below lg, where .spl-proof carries the same
             quote. Deliberately not aria-hidden: exactly one of the two is in
             the tree at any width, so this is the only copy AT can reach. ══ */}
      <aside className="spl-portrait">
        <img className="spl-portrait__img" src={portrait} alt={name} />
        <div className="spl-portrait__veil" aria-hidden="true" />

        <a className="spl-portrait__logo" href="/" aria-label="Accelerate — back to home">
          <img src={LOGO} alt="Accelerate" />
        </a>

        <figure className="spl-portrait__quote">
          <blockquote>&ldquo;{quote}&rdquo;</blockquote>
          <figcaption>{name}</figcaption>
        </figure>
      </aside>

      {/* ══ Right — the step's own content ══ */}
      <main className="spl-panel">
        <div className="spl-panel__inner" ref={innerRef}>

          {/* The portrait panel owns the logo on desktop; below lg it comes
              back here so the page is still branded. */}
          <a className="spl-logo" href="/" aria-label="Accelerate — back to home">
            <img src={LOGO} alt="Accelerate" />
          </a>

          {children}

          <figure className="spl-proof">
            <blockquote>&ldquo;{quote}&rdquo;</blockquote>
            <figcaption>{name}</figcaption>
          </figure>

          <FunnelFooter />

        </div>
      </main>
    </div>
  );
}
