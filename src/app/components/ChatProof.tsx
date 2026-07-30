import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ChatProof.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const SCREENSHOT_SRC = "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a05b39360b8c350d308d10a.webp";

/* ─────────────────────────────────────────────
   Chat Proof — "The Receipts"
   One staged screenshot beneath the case study
   wall — edge-faded so it reads as a glimpse of
   something bigger, not a bounded rectangle.

   ⚠️ COPY NOTE — eyebrow/headline below are newly
   drafted, not yet approved. Flagging per request
   before this ships.
───────────────────────────────────────────── */
export default function ChatProof() {
  const headerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: DURATION,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
        });
      }
      if (frameRef.current) {
        gsap.from(frameRef.current, {
          opacity: 0,
          y: 24,
          duration: DURATION,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: frameRef.current, start: "top 85%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chat-proof"
      className="border-t border-border"
      style={{ backgroundColor: "#ffffff", scrollMarginTop: 110 }}
    >
      <div className="max-w-[1200px] mx-auto pt-[80px] pb-[80px] px-6">

        {/* Header — same eyebrow pill + Inter display headline as every
            other section on the page. */}
        <div ref={headerRef}>
          <div className="flex justify-center mb-5">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
            >
              The Receipts
            </span>
          </div>

          <h2
            className="font-extrabold text-foreground text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            The Messages We Actually Get
          </h2>
        </div>

        {/* ── Single staged screenshot — glow behind it, mask dissolving
            its own edges into the page. ── */}
        <div className="cpf-stage">
          <div ref={frameRef} className="cpf-frame">
            <div className="cpf-glow" aria-hidden="true" />
            <img className="cpf-image" src={SCREENSHOT_SRC} alt="Client feedback message" loading="lazy" />
          </div>
        </div>

      </div>
    </section>
  );
}
