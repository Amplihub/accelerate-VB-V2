import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillNav from "./components/PillNav";

gsap.registerPlugin(ScrollTrigger);

// One shared timing system for every entrance animation on the page —
// the motion type varies per section, the underlying feel doesn't.
const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&auto=format",
    alt: "Client portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format",
    alt: "Client portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=64&h=64&fit=crop&auto=format",
    alt: "Client portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=64&h=64&fit=crop&auto=format",
    alt: "Client portrait",
  },
];


// Step marker — solid circular badge with clean typeset digits, plus a
// connector that runs solid right at the badge, dashed for the open
// stretch beyond it. No hand-drawn styling, matches the reference layout.
function StepMarker({
  num,
  showAbove,
  showBelow,
  connectorRef,
}: {
  num: string;
  showAbove: boolean;
  showBelow: boolean;
  connectorRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ alignSelf: "stretch" }}>
      {showAbove && <div style={{ width: 2, height: 16, backgroundColor: "#1A56DB", flexShrink: 0 }} />}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#1A56DB" }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 19, color: "#ffffff", letterSpacing: "-0.02em" }}>
          {num}
        </span>
      </div>
      {showBelow && (
        <div className="flex flex-col items-center" style={{ flex: 1, width: 2 }}>
          <div style={{ width: 2, height: 14, backgroundColor: "#1A56DB", flexShrink: 0 }} />
          <div ref={connectorRef} style={{ flex: 1, width: 0, borderLeft: "2px dashed #1A56DB", opacity: 0.45 }} />
        </div>
      )}
    </div>
  );
}

// Highlight — the single emphasis system used across the whole page.
// One rule, two roles: `solid` marks the one word/number inside large display
// type (hero headline, standalone guarantee lines); `tint` marks the single
// most important word/phrase inline within body copy (process steps, CTA
// sub-lines). Both use the same brand blue — no per-section colors.
function Highlight({
  variant = "tint",
  color = "#1A56DB",
  children,
  style,
}: {
  variant?: "solid" | "tint" | "outline";
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties =
    variant === "solid"
      ? {
          backgroundColor: "#1A56DB",
          color: "#ffffff",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          borderRadius: "0.18em",
          padding: "0.05em 0.28em",
        }
      : variant === "outline"
      ? {
          backgroundColor: "transparent",
          color,
          border: `1.5px solid ${color}`,
          fontWeight: 700,
          letterSpacing: "-0.005em",
          borderRadius: "6px",
          padding: "1.5px 8px",
        }
      : {
          backgroundColor: "#EAF1FF",
          color: "#1A56DB",
          fontWeight: 700,
          letterSpacing: "-0.005em",
          borderRadius: "6px",
          padding: "3px 9px",
        };

  return (
    <span
      style={{
        ...base,
        display: "inline-block",
        lineHeight: 1,
        verticalAlign: "-0.1em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// Every step's doodle circle is brand blue — no per-step colors, no
// highlighted phrases. Step 04 (the payoff) just carries a larger circle.
// Title sits on its own line above the description, timeline-style.
const STEPS = [
  {
    num: "01",
    accent: false,
    title: "Audit Your Content and Offer",
    description: "We review your niche, your offer, and what's already working, to find the fastest path to attention.",
  },
  {
    num: "02",
    accent: false,
    title: "Build Your Content Engine",
    description: "We build your content system, the formats, hooks, and filming process, tailored to your niche.",
  },
  {
    num: "03",
    accent: false,
    title: "Launch, Test and Guide",
    description: "We launch consistently, review performance together, and double down on what's driving results.",
  },
  {
    num: "04",
    accent: true,
    title: "Guaranteed Growth",
    description: "1,000,000 views in 90 days, or your money back. Tracked together every month.",
  },
];

const STATS = [
  { value: "1B+",   label: "Views Generated" },
  { value: "$130M+", label: "Revenue Generated" },
  { value: "1.5B+", label: "Audience Reach" },
];

// Section 5A — case study cards
// ⚠️ DEV NOTE: swap each niche label + photo for the real client name/logo before going live
const CASE_STUDIES = [
  {
    niche: "Real Estate / Buyers Agent",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    img: "https://images.unsplash.com/photo-1543525469-65b61cc2bc06?w=480&h=600&fit=crop&auto=format",
    imgAlt: "Realtor filming a listing on a smartphone",
    before: "No content system, relying entirely on referrals, inconsistent inbound.",
    built: "Niche specific content format, ManyChat lead flow, CRM and nurture sequence.",
    stats: [
      { value: "250K+", label: "Views gained" },
      { value: "45",    label: "Leads captured" },
      { value: "$60K",  label: "4 clients · Revenue" },
    ],
  },
  {
    niche: "B2B Professional Services",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format",
    img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=480&h=600&fit=crop&auto=format",
    imgAlt: "Professional at laptop in a modern office",
    before: "Posting occasionally with no strategy, zero leads from content.",
    built: "Positioning and structured content, LinkedIn first distribution, lead capture and follow up system.",
    stats: [
      { value: "400K+", label: "Views gained" },
      { value: "55",    label: "Leads captured" },
      { value: "$140K", label: "7 clients · Revenue" },
    ],
  },
  {
    niche: "Coaching / Consulting",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=480&h=600&fit=crop&auto=format",
    imgAlt: "Coach presenting in front of a whiteboard",
    before: "Small following, no monetisation path from content.",
    built: "Content system built around a signature framework, call funnel, nurture sequence.",
    stats: [
      { value: "300K+", label: "Views gained" },
      { value: "30",    label: "Leads captured" },
      { value: "$90K",  label: "10 clients · Revenue" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Section 7 — Final CTA
   Deep navy block, rounded top corners, oversized
   cropped wordmark at the bottom.
───────────────────────────────────────────── */
const WORDMARK_SRC = "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69bb79b753d4f1f218be5af1.svg";

function Section7() {
  const year = new Date().getFullYear();

  const ctaTriggerRef = useRef<HTMLDivElement>(null);
  const ctaEyebrowRef = useRef<HTMLDivElement>(null);
  const ctaLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSubheadRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const revealTargets = [ctaEyebrowRef.current, ...ctaLineRefs.current, ctaSubheadRef.current, ctaButtonRef.current].filter(
        (el): el is HTMLElement => Boolean(el)
      );
      // Belt-and-suspenders: guarantee every target is visible even if the
      // timeline never gets a chance to run (e.g. trigger element unmounted
      // mid-flight during a dev hot-reload).
      const failSafe = window.setTimeout(() => {
        gsap.set(revealTargets, { clearProps: "opacity,transform" });
      }, 4000);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ctaTriggerRef.current, start: "top 80%", once: true },
        defaults: { ease: EASE },
        onComplete: () => {
          window.clearTimeout(failSafe);
          gsap.set(revealTargets, { clearProps: "opacity,transform" });
        },
      });
      tl.from(ctaEyebrowRef.current, { opacity: 0, y: 12, duration: 0.5 });
      // Escalating reveal — each line travels a little further than the last, mirroring the size jump.
      const offsets = [16, 24, 34];
      ctaLineRefs.current.forEach((line, i) => {
        if (!line) return;
        tl.from(line, { opacity: 0, y: offsets[i], duration: DURATION }, i === 0 ? "-=0.1" : "-=0.35");
      });
      // Subhead and button land together as the closing "last" beat, not strung out after a long wait.
      tl.from(ctaSubheadRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.3");
      tl.from(ctaButtonRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.45");
      tl.to(ctaArrowRef.current, { x: 4, duration: 0.35, ease: EASE, yoyo: true, repeat: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" style={{ overflow: "hidden", scrollMarginTop: 110 }}>

      {/* ══ Zone A — light blue content area ══ */}
      <div
        ref={ctaTriggerRef}
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "96px",
          paddingBottom: "96px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px" }}>

          {/* Eyebrow — same pill style as every other section */}
          <div className="flex justify-center mb-6" ref={ctaEyebrowRef}>
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] px-4 py-1.5 rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF" }}
            >
              Get Started
            </span>
          </div>

          {/* Escalating headline — each line bigger and deeper, tighter rhythm */}
          <div
            className="font-extrabold"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            <div ref={(el) => { ctaLineRefs.current[0] = el; }} style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: "#4A7FE0" }}>
              More Views.
            </div>
            <div ref={(el) => { ctaLineRefs.current[1] = el; }} style={{ fontSize: "clamp(40px, 5.5vw, 64px)", color: "#1A56DB" }}>
              More Leads.
            </div>
            <div ref={(el) => { ctaLineRefs.current[2] = el; }} style={{ fontSize: "clamp(50px, 6.8vw, 80px)", color: "#12377A" }}>
              More Revenue.
            </div>
          </div>

          {/* Sub-line — plain sans, light grey, "90 Days" highlighted */}
          <p
            ref={ctaSubheadRef}
            className="font-sans font-semibold"
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(16px, 2.2vw, 26px)",
              marginTop: "18px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            That&#39;s the Next{" "}
            <Highlight>90 Days</Highlight>
            .
          </p>

          {/* CTA button with arrow circle — soft blue glow, lifts on hover */}
          <div style={{ marginTop: "44px" }}>
            <button
              ref={ctaButtonRef}
              className="font-sans font-semibold tracking-[0.025em] cursor-pointer transition-all duration-200 inline-flex items-center justify-between"
              style={{
                backgroundColor: "#1A56DB",
                color: "#ffffff",
                fontSize: "15px",
                padding: "10px 10px 10px 10px",
                borderRadius: "999px",
                border: "1px solid #1540B0",
                width: "220px",
                boxShadow: "0 10px 28px rgba(26,86,219,0.28)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#1749C8";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 34px rgba(26,86,219,0.38)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#1A56DB";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(26,86,219,0.28)";
              }}
            >
              {/* left ghost spacer = same width as arrow circle to optically center the text */}
              <span style={{ width: 34, height: 34, flexShrink: 0 }} aria-hidden="true" />
              <span className="flex-1 text-center">Book a Call</span>
              <span
                ref={ctaArrowRef}
                className="inline-flex items-center justify-center rounded-full shrink-0"
                style={{ width: 34, height: 34, backgroundColor: "rgba(255,255,255,0.18)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

          {/* Trust signal — same avatar stack + names as the Hero, reinforcing credibility right before the ask */}
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "40px" }}>
            <div className="flex items-center shrink-0">
              {AVATARS.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={36}
                  height={36}
                  className="rounded-full object-cover bg-[#e0e0e0]"
                  style={{
                    width: 36,
                    height: 36,
                    marginLeft: i > 0 ? "-10px" : "0",
                    position: "relative",
                    zIndex: 10 - i,
                    border: "2px solid #ffffff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                  }}
                />
              ))}
            </div>
            <p className="text-[13px] leading-snug text-left" style={{ color: "#9CA3AF" }}>
              Used by{" "}
              <span className="font-semibold" style={{ color: "#12377A" }}>Robert Herjavec</span>,{" "}
              <span className="font-semibold" style={{ color: "#12377A" }}>Daniel Lubetzky</span>,{" "}
              <span className="font-semibold" style={{ color: "#12377A" }}>Jane Lu</span>, and many others.
            </p>
          </div>

          {/* Optional footer line */}
          <div
            style={{
              marginTop: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              color: "#12377A",
              opacity: 0.55,
              fontSize: "12px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="font-sans">© {year} Accelerate. All rights reserved.</span>
          </div>

        </div>
      </div>

      {/* ══ Zone B — dark navy logo band ══ */}
      {/*
        borderRadius on top corners where it meets Zone A above.
        overflow:hidden on this div clips the wordmark at the bottom.
        Adjust the inner div's height to control how much logo is visible.
      */}
      <div
        style={{
          backgroundColor: "#12377A",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
          paddingTop: "52px",
        }}
      >
        {/* Cropped wordmark — tone-on-tone: slightly lighter navy tint */}
        <div style={{ height: "120px", overflow: "hidden", position: "relative" }}>
          {/* Wrapper has no explicit height — it sizes itself to the img's natural
              rendered box, so the sweep overlay below (inset:0) lands pixel-perfect
              without having to know the SVG's intrinsic aspect ratio. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "84%",
              maxWidth: "1100px",
            }}
          >
            <img
              src={WORDMARK_SRC}
              alt="Accelerate"
              style={{
                width: "100%",
                display: "block",
                /* tone-on-tone: white at low opacity against the navy */
                filter: "brightness(0) invert(1)",
                opacity: 0.15,
              }}
            />
            {/* Looping shine sweep — masked to the wordmark's own letterforms so the
                gleam only ever appears where the logo itself is, layered on top of
                (not replacing) the tone-on-tone base above. */}
            <div
              aria-hidden="true"
              className="wordmark-sweep"
              style={{
                position: "absolute",
                inset: 0,
                WebkitMaskImage: `url(${WORDMARK_SRC})`,
                maskImage: `url(${WORDMARK_SRC})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .wordmark-sweep {
          background-image: linear-gradient(-45deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%);
          background-size: 250% 250%;
          background-repeat: no-repeat;
          animation: wordmarkSweep 5s linear infinite;
        }
        @keyframes wordmarkSweep {
          0% { background-position: -60% -60%; }
          22% { background-position: 160% 160%; }
          100% { background-position: 160% 160%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wordmark-sweep {
            animation: wordmarkSweep 8s linear 1;
          }
        }
      `}</style>

    </section>
  );
}

/* ─────────────────────────────────────────────
   Section 5A — testimonial-carousel layout
   Exact replica of reference: outlined eyebrow,
   split headline, alternating image + quote cards,
   circle-arrow nav.
───────────────────────────────────────────── */
function Section5A() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slide = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 490, behavior: "smooth" });
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: DURATION,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: trackRef.current, start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="case-studies" className="border-t border-border" style={{ backgroundColor: "#FAFAFA", scrollMarginTop: 110 }}>
      <div className="max-w-[1200px] mx-auto pt-[96px] pb-[32px]">

        {/* Eyebrow — outlined pill, matches reference "CUSTOMER REVIEWS" style */}
        <div className="flex justify-center mb-5 px-6">
          <span
            className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
            style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
          >
            The Results
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-extrabold text-foreground text-center mb-10 px-6"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Real Campaigns, Real Growth
        </h2>

        {/* ── Carousel track ── */}
        <div className="relative">
          {/* Left / right fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
            style={{ background: "linear-gradient(to right, #FAFAFA, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: "linear-gradient(to left, #FAFAFA, transparent)" }} />

          {/* Scrollable row */}
          <div
            ref={trackRef}
            className="flex gap-[14px] overflow-x-auto px-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CASE_STUDIES.map((cs, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="flex gap-[14px] shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >

                {/* ── Image card (narrow portrait) ── */}
                <div
                  className="relative shrink-0 overflow-hidden bg-[#D8D8D8]"
                  style={{ width: "172px", height: "310px", borderRadius: "16px" }}
                >
                  <img
                    src={cs.img}
                    alt={cs.imgAlt}
                    className="w-full h-full object-cover block"
                  />
                  {/* Top gradient + niche overlay text */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)" }}
                  />
                  <p
                    className="absolute top-4 left-4 right-4 text-white font-bold leading-snug"
                    style={{ fontSize: "13px" }}
                  >
                    {cs.niche}
                  </p>
                </div>

                {/* ── Quote card (wider, white) ── */}
                <div
                  className="shrink-0 bg-white flex flex-col"
                  style={{
                    width: "300px",
                    height: "310px",
                    borderRadius: "16px",
                    border: "1px solid #EFEFEF",
                    padding: "22px 22px 20px",
                  }}
                >
                  {/* Header row — circular avatar + niche label */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <img
                      src={cs.avatar}
                      alt={cs.niche}
                      className="shrink-0 rounded-full object-cover"
                      style={{ width: 36, height: 36, border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}
                    />
                    <div>
                      <p className="font-bold text-[#111111] leading-tight" style={{ fontSize: "13px" }}>
                        {cs.niche}
                      </p>
                      <p className="text-[#5B5F66]" style={{ fontSize: "11px" }}>
                        {cs.stats[0].value} {cs.stats[0].label}
                      </p>
                    </div>
                  </div>

                  {/* Quote body — "before" situation as context */}
                  <p
                    className="text-[#5B5F66] leading-relaxed flex-1"
                    style={{ fontSize: "13.5px" }}
                  >
                    "{cs.before} We built: {cs.built}"
                  </p>

                  {/* Stats — 2 bold numbers, matching reference */}
                  <div className="flex gap-7 pt-4 mt-2" style={{ borderTop: "1px solid #F2F2F2" }}>
                    <div>
                      <p style={{ fontSize: "21px", lineHeight: 1.1, color: "#1A56DB", fontWeight: 400 }}>
                        {cs.stats[0].value}
                      </p>
                      <p className="text-[#5B5F66] mt-0.5" style={{ fontSize: "11px" }}>
                        {cs.stats[0].label}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "21px", lineHeight: 1.1, color: "#1A56DB", fontWeight: 400 }}>
                        {cs.stats[2].value}
                      </p>
                      <p className="text-[#5B5F66] mt-0.5" style={{ fontSize: "11px" }}>
                        {cs.stats[2].label}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
            {/* Right breathing room */}
            <div className="shrink-0 w-4" aria-hidden="true" />
          </div>
        </div>

        {/* ── Arrow navigation — centered below, matching reference ── */}
        <div className="flex items-center justify-center gap-3 mt-8 px-6">
          <button
            onClick={() => slide(-1)}
            aria-label="Previous"
            className="flex items-center justify-center rounded-full border border-[#DCDCDC] bg-white hover:border-[#1A56DB] transition-colors duration-150"
            style={{ width: 36, height: 36 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => slide(1)}
            aria-label="Next"
            className="flex items-center justify-center rounded-full border border-[#DCDCDC] bg-white hover:border-[#1A56DB] transition-colors duration-150"
            style={{ width: 36, height: 36 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default function App() {
  // Hero — plays once on load
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const heroGuaranteedRef = useRef<HTMLSpanElement>(null);
  const heroMoneyBackRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroSocialProofRef = useRef<HTMLDivElement>(null);

  // Process — one ref per step row + one per connector fill
  const processStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processConnectorRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mechanism — funnel clip reveal, callouts, connector line draws
  const mechFunnelWrapRef = useRef<HTMLDivElement>(null);
  const mechCalloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mechConnectorRefs = useRef<(SVGLineElement | null)[]>([]);

  // Stat strip — numbers count up, caption follows
  const statStripRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statCaptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ── Hero — plays on load, not on scroll ──
      const heroTl = gsap.timeline({ defaults: { ease: EASE } });
      heroTl
        .from(heroLine1Ref.current, { opacity: 0, y: 24, duration: DURATION })
        .from(heroLine2Ref.current, { opacity: 0, y: 24, duration: DURATION }, "-=0.45")
        .fromTo(
          heroGuaranteedRef.current,
          { scale: 0.9 },
          { scale: 1.05, duration: 0.22, ease: EASE }
        )
        .to(heroGuaranteedRef.current, { scale: 1, duration: 0.18, ease: EASE })
        .from([heroMoneyBackRef.current, heroTaglineRef.current], { opacity: 0, y: 16, duration: 0.6 }, "-=0.05")
        .from(heroSocialProofRef.current, { opacity: 0, y: 16, duration: 0.6 });

      // ── Process — each step slides in from its own zigzag side; connector draws after ──
      processStepRefs.current.forEach((row, i) => {
        if (!row) return;
        const mirrored = i % 2 === 1;
        const connector = processConnectorRefs.current[i];
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
          defaults: { ease: EASE },
        });
        tl.from(row, { opacity: 0, x: mirrored ? 40 : -40, duration: DURATION });
        if (connector) {
          tl.fromTo(
            connector,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.6, transformOrigin: "top" },
            "-=0.3"
          );
        }
      });

      // ── Mechanism — funnel fills top-to-bottom, each callout + connector follows its segment ──
      if (mechFunnelWrapRef.current) {
        gsap.set(mechFunnelWrapRef.current, { clipPath: "inset(0 0 100% 0)" });
        const segments = [15.8, 50, 100]; // first two stop at their badge, last fully reveals the funnel
        const mechTl = gsap.timeline({
          scrollTrigger: { trigger: mechFunnelWrapRef.current, start: "top 75%", once: true },
          defaults: { ease: EASE },
        });
        segments.forEach((pct, i) => {
          mechTl.to(mechFunnelWrapRef.current, {
            clipPath: `inset(0 0 ${100 - pct}% 0)`,
            duration: DURATION,
          });
          const callout = mechCalloutRefs.current[i];
          const connector = mechConnectorRefs.current[i];
          if (callout) mechTl.from(callout, { opacity: 0, y: 16, duration: 0.6 }, "-=0.2");
          if (connector) {
            // Draw in as a solid stroke, then settle back into its resting dashed pattern.
            const len = connector.getTotalLength ? connector.getTotalLength() : 223;
            gsap.set(connector, { strokeDasharray: len, strokeDashoffset: len });
            mechTl.to(connector, {
              strokeDashoffset: 0,
              duration: 0.4,
              onComplete: () => gsap.set(connector, { strokeDasharray: "4 4" }),
            });
          }
        });
      }

      // ── Stat strip — numbers count up from 0, caption follows once they finish ──
      if (statStripRef.current) {
        statValueRefs.current.forEach((el, i) => {
          if (!el) return;
          const raw = STATS[i].value;
          const match = raw.match(/^(\$?)([\d.]+)(.*)$/);
          if (!match) return;
          const [, prefix, numStr, suffix] = match;
          const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: parseFloat(numStr),
            duration: 1,
            ease: EASE,
            scrollTrigger: { trigger: statStripRef.current, start: "top 80%", once: true },
            onUpdate: () => { el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`; },
            onComplete: () => { el.textContent = raw; },
          });
        });
        if (statCaptionRef.current) {
          gsap.from(statCaptionRef.current, {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: EASE,
            delay: 1,
            scrollTrigger: { trigger: statStripRef.current, start: "top 80%", once: true },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* ── Nav ── */}
      <PillNav
        logo="https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69b050418d3eae8636dfe89c.png"
        logoAlt="Accelerate"
        items={[
          { label: "Work", href: "#work" },
          { label: "Case Studies", href: "#case-studies" },
          { label: "Contact", href: "#contact" },
        ]}
        activeHref={undefined}
        ease="power3.out"
        baseColor="#9c9c9c"
        pillColor="#FFFFFF"
        pillTextColor="#111111"
        hoveredPillTextColor="#FFFFFF"
        initialLoadAnimation={true}
      />

      {/* ── Hero ── */}
      {/* pt-[140px] clears the fixed PillNav (~84px tall + 20px top offset) */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-[140px] pb-[96px] text-center">
        <h1
          className="font-extrabold text-foreground mb-5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 5.5vw, 66px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          <span className="block" ref={heroLine1Ref}>
            1,000,000 Views{" "}
            <span ref={heroGuaranteedRef} style={{ display: "inline-block" }}>
              <Highlight variant="solid">Guaranteed</Highlight>
            </span>
          </span>
          <span className="block" ref={heroLine2Ref}>in 90 Days.</span>
        </h1>

        {/* Sub-headline — plain grey text, money emoji accents the one word that matters */}
        <div className="flex justify-center mb-5" ref={heroMoneyBackRef}>
          <p
            className="font-sans font-bold"
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(15px, 1.8vw, 22px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            Or Your Money Back.
          </p>
        </div>

        <p
          ref={heroTaglineRef}
          className="text-muted-foreground font-normal mb-10 mx-auto leading-relaxed"
          style={{ fontSize: "clamp(13px, 1.4vw, 17px)", whiteSpace: "nowrap" }}
        >
          The most <Highlight>measurable</Highlight> guarantee in content marketing.
        </p>

        {/* Social proof — no container, avatars + text sit directly on the page */}
        <div className="flex items-center justify-center gap-3" ref={heroSocialProofRef}>
          <div className="flex items-center shrink-0" style={{ position: "relative" }}>
            {AVATARS.map((avatar, i) => (
              <img
                key={i}
                src={avatar.src}
                alt={avatar.alt}
                width={40}
                height={40}
                className="rounded-full object-cover bg-[#e0e0e0]"
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: i > 0 ? "-11px" : "0",
                  position: "relative",
                  zIndex: 10 - i,
                  border: "2px solid #ffffff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                }}
              />
            ))}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-9px",
                right: "-7px",
                fontSize: "18px",
                lineHeight: 1,
                transform: "rotate(12deg)",
                zIndex: 20,
              }}
            >
              ⭐
            </span>
          </div>
          <p className="text-[14px] text-muted-foreground leading-snug text-left">
            Used by{" "}
            <span className="text-foreground font-semibold">Robert Herjavec</span>,{" "}
            <span className="text-foreground font-semibold">Daniel Lubetzky</span>,{" "}
            <span className="text-foreground font-semibold">Jane Lu</span>
            <span className="text-muted-foreground">, and many others.</span>
          </p>
        </div>
      </section>

      {/* ── Section 3: The Process ── */}
      <section id="work" className="bg-background border-t border-border" style={{ scrollMarginTop: 110 }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-[96px]">

          <div className="flex justify-center mb-6">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] px-4 py-1.5 rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF" }}
            >
              The Process
            </span>
          </div>

          <h2
            className="font-extrabold text-foreground text-center mb-20"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(32px, 4.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
          >
            How We Get You There
          </h2>

          {/* Timeline — Z-pattern: even steps mirror the row (text first, circle on the right, right-aligned) */}
          <div className="flex flex-col mx-auto" style={{ maxWidth: 820 }}>
            {STEPS.map((step, i) => {
              const mirrored = i % 2 === 1;
              return (
                <div
                  key={i}
                  ref={(el) => { processStepRefs.current[i] = el; }}
                  className="flex items-center gap-5"
                  style={{
                    maxWidth: 600,
                    alignSelf: mirrored ? "flex-end" : "flex-start",
                    flexDirection: mirrored ? "row-reverse" : "row",
                    textAlign: mirrored ? "right" : "left",
                    marginBottom: i < STEPS.length - 1 ? 64 : 0,
                  }}
                >
                  <StepMarker
                    num={step.num}
                    showAbove={i > 0}
                    showBelow={i < STEPS.length - 1}
                    connectorRef={(el) => { processConnectorRefs.current[i] = el; }}
                  />
                  <div>
                    <h3
                      className="font-extrabold text-foreground"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        fontSize: "clamp(23px, 2.8vw, 31px)",
                        marginBottom: 8,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: "#6B7280",
                        fontWeight: 400,
                        lineHeight: 1.55,
                        fontSize: "clamp(15px, 1.7vw, 19px)",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Section 4: The Mechanism ── */}
      <section className="bg-background border-t border-border">
        <div className="max-w-[1150px] mx-auto px-6 md:px-10 pt-[96px]">

          {/* Eyebrow */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] px-4 py-1.5 rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF" }}
            >
              The Mechanism
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-extrabold text-foreground text-center mb-16"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(32px, 4.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
          >
            How Attention Becomes Revenue
          </h2>

          {/* ── Funnel diagram (desktop md+) — compact SVG graphic + real HTML callouts beside it ── */}
          {/*
            SVG viewBox: 520 × 600 — shorter and proportionally wider at the top than before.
            The SVG only draws the shape/badges/connectors; callout text is HTML overlaid on
            top so it can use real Inter type, wrap naturally, and host the Highlight tag.
            Badge y → container top%: 01 y=95 (15.8%), 02 y=300 (50%), 03 y=520 (86.7%).
          */}
          <div className="hidden md:block relative mx-auto" style={{ maxWidth: 1150, height: 600 }}>
            <svg
              ref={mechFunnelWrapRef}
              viewBox="0 0 520 600"
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", height: "100%", width: "auto", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Vertical color gradient — amber (top) → blue (middle) → green (bottom) */}
                <linearGradient id="mFunnelColor" x1="0" y1="40" x2="0" y2="550" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"    stopColor="#FDF3E2" />
                  <stop offset="30%"   stopColor="#F0D9A8" />
                  <stop offset="33.3%" stopColor="#DCE9FF" />
                  <stop offset="63%"   stopColor="#B9D3FF" />
                  <stop offset="66.7%" stopColor="#D8F0E0" />
                  <stop offset="100%"  stopColor="#B3E5C5" />
                </linearGradient>
              </defs>

              {/* ── Funnel body — shorter and wider at top than the previous version ── */}
              <path
                d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z"
                fill="url(#mFunnelColor)"
              />
              <path
                d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z"
                fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1"
              />
              {/* Single soft highlight running down the left side */}
              <line x1="141" y1="50" x2="231" y2="540" stroke="white" strokeOpacity="0.32" strokeWidth="9" strokeLinecap="round" />

              {/* ── Leader lines — clean straight dashed lines, drawn in via stroke-dashoffset ── */}
              <line ref={(el) => { mechConnectorRefs.current[0] = el; }} x1="243" y1="95" x2="20" y2="95"
                stroke="#C98A2B" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />
              <line ref={(el) => { mechConnectorRefs.current[1] = el; }} x1="277" y1="300" x2="500" y2="300"
                stroke="#4A8AE8" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />
              <line ref={(el) => { mechConnectorRefs.current[2] = el; }} x1="243" y1="520" x2="20" y2="520"
                stroke="#3A9460" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />

              {/* ── Badges — clean typeset numerals, same treatment as the Process step markers ── */}
              <rect x="243" y="86" width="34" height="18" rx="9" fill="#C98A2B" />
              <text x="260" y="99.5" textAnchor="middle" fill="white" fontSize="12" fontFamily="'Inter', sans-serif" fontWeight="700">01</text>

              <rect x="243" y="291" width="34" height="18" rx="9" fill="#1A56DB" />
              <text x="260" y="304.5" textAnchor="middle" fill="white" fontSize="12" fontFamily="'Inter', sans-serif" fontWeight="700">02</text>

              <rect x="243" y="511" width="34" height="18" rx="9" fill="#1F7A4D" />
              <text x="260" y="524.5" textAnchor="middle" fill="white" fontSize="12" fontFamily="'Inter', sans-serif" fontWeight="700">03</text>
            </svg>

            {/* ── Callout 01 — top, left column, real HTML type ── */}
            <div ref={(el) => { mechCalloutRefs.current[0] = el; }} style={{ position: "absolute", left: 0, top: "15.8%", transform: "translateY(-50%)", width: 300, textAlign: "right" }}>
              <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em", lineHeight: 1.2, fontSize: "clamp(20px, 2.2vw, 25px)", marginBottom: 8 }}>
                Content Creates Attention.
              </h3>
              <p style={{ margin: 0, color: "#6B7280", lineHeight: 1.6, fontSize: "clamp(15px, 1.6vw, 17px)" }}>
                Consistent, high-performing content builds an audience that knows and trusts you.
              </p>
            </div>

            {/* ── Callout 02 — middle, right column ── */}
            <div ref={(el) => { mechCalloutRefs.current[1] = el; }} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 300, textAlign: "left" }}>
              <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em", lineHeight: 1.2, fontSize: "clamp(20px, 2.2vw, 25px)", marginBottom: 8 }}>
                Attention Becomes Leads.
              </h3>
              <p style={{ margin: 0, color: "#6B7280", lineHeight: 1.6, fontSize: "clamp(15px, 1.6vw, 17px)" }}>
                ManyChat, funnels, and CRM capture that attention while it's hot.
              </p>
            </div>

            {/* ── Callout 03 — bottom, left column ── */}
            <div ref={(el) => { mechCalloutRefs.current[2] = el; }} style={{ position: "absolute", left: 0, top: "86.7%", transform: "translateY(-50%)", width: 300, textAlign: "right" }}>
              <h3 className="font-extrabold text-foreground" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em", lineHeight: 1.2, fontSize: "clamp(20px, 2.2vw, 25px)", marginBottom: 8 }}>
                Leads Become Revenue.
              </h3>
              <p style={{ margin: 0, color: "#6B7280", lineHeight: 1.6, fontSize: "clamp(15px, 1.6vw, 17px)" }}>
                Structured follow-up turns captured leads into booked calls and closed deals.
              </p>
            </div>
          </div>

          {/* ── Mobile fallback — pastel cards ── */}
          <div className="flex flex-col gap-4 md:hidden">
            {[
              {
                num: "01", pillBg: "#C98A2B",
                bg: "#FDF3E2", border: "1px solid #F0D9A8",
                titleColor: "#5C4415", bodyColor: "#8A6330",
                title: "Content Creates Attention.",
                body: "Consistent, high-performing content builds an audience that knows and trusts you.",
              },
              {
                num: "02", pillBg: "#1A56DB",
                bg: "#DCE9FF", border: "none",
                titleColor: "#1A3A7A", bodyColor: "#3D5FAA",
                title: "Attention Becomes Leads.",
                body: "ManyChat, funnels, and CRM capture that attention while it's hot.",
              },
              {
                num: "03", pillBg: "#1F7A4D",
                bg: "#D8F0E0", border: "none",
                titleColor: "#0D4A2A", bodyColor: "#2A7050",
                title: "Leads Become Revenue.",
                body: "Structured follow-up turns captured leads into booked calls and closed deals.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-[20px]"
                style={{ backgroundColor: card.bg, border: card.border, padding: "22px 20px" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="inline-flex items-center justify-center font-bold text-white rounded-full shrink-0"
                    style={{ backgroundColor: card.pillBg, width: "32px", height: "18px", fontSize: "10px" }}
                  >
                    {card.num}
                  </span>
                  <h3 className="font-bold" style={{ fontSize: "16px", lineHeight: 1.3, color: card.titleColor }}>
                    {card.title}
                  </h3>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: card.bodyColor }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Stat strip — pale blue "proof" band */}
        <div ref={statStripRef} className="border-t border-border mt-[96px]" style={{ backgroundColor: "#F5F8FF" }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">

            <div className="flex flex-col md:flex-row items-center justify-center">
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-stretch">
                  <div className="flex flex-col items-center justify-center px-14 py-8 md:py-2 text-center">
                    <span
                      ref={(el) => { statValueRefs.current[i] = el; }}
                      className="font-extrabold text-[#1A56DB] block"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.1 }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-muted-foreground uppercase tracking-[0.1em] font-semibold mt-2 block"
                      style={{ fontSize: "11px" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <>
                      <div
                        className="hidden md:block self-stretch"
                        style={{ width: "1px", backgroundColor: "#E7E7E7", margin: "8px 0" }}
                      />
                      <div
                        className="block md:hidden mx-auto"
                        style={{ height: "1px", width: "48px", backgroundColor: "#E7E7E7" }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <p
              ref={statCaptionRef}
              className="text-center text-muted-foreground font-serif italic mt-10"
              style={{ fontSize: "14px" }}
            >
              Already true today,{" "}
              <Highlight variant="solid" style={{ borderRadius: "7px", padding: "2px 8px", fontStyle: "normal" }}>not a projection</Highlight>.
            </p>

          </div>
        </div>

      </section>

      {/* ── Section 5A: Best Results ── */}
      <Section5A />

      {/* ── Section 7: Final CTA ── */}
      <Section7 />

    </div>
  );
}
