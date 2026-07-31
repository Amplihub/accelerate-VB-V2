import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ThankYouForApplying.css";

/* ─────────────────────────────────────────────
   Thank you for applying — the "not yet" page.

   The only step in the funnel that delivers a no,
   so it deliberately drops the solid blue marker
   the other pages carry: that device celebrates,
   and there's nothing to celebrate here. The
   emphasis moves to "yet" instead, which is the
   word doing the real work.
───────────────────────────────────────────── */

const LOGO = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68de77a7d6c63e1c1d4574fd.png";

// ⚠️ DEV NOTE — the source copy promises "free resources" but linked nowhere,
// which left the page a dead end. Points at the site for now; swap in the real
// resources hub when there is one.
const RESOURCES_URL = "/";
const RESOURCES_LABEL = "Explore the site";

const EASE = "power2.out";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ThankYouForApplying() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        scale: 0.985,
        duration: 0.65,
        ease: EASE,
        clearProps: "opacity,transform",
      });
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div className="tya">
      <main className="tya-card" ref={cardRef}>

        <h1 className="tya-headline">
          You&rsquo;re not quite there <span className="tya-yet">yet</span>
        </h1>

        <p className="tya-body">
          Thanks for your interest. At the moment, this isn&rsquo;t the right fit for
          where you are right now. We want to make sure everyone gets the best
          results, so we&rsquo;re selective about who we work with.
        </p>

        <p className="tya-body">
          Come back when things have progressed &mdash; or start with what we&rsquo;ve
          already published.
        </p>

        <a className="tya-cta" href={RESOURCES_URL}>
          {RESOURCES_LABEL}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <div className="tya-logo">
          <img src={LOGO} alt="Accelerate" />
        </div>

      </main>
    </div>
  );
}
