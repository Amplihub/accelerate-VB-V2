import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillNav from "./components/PillNav";
import Testimonials from "./components/Testimonials";
import Threads from "./components/Threads";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";

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
    src: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69747054d4fb90fb5181ed9b.png",
    alt: "Robert Herjavec",
    zoom: "125%",
  },
  {
    src: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a2f6b7a585d2f7daeef8267.png",
    alt: "Daniel Lubetzky",
    zoom: "145%",
  },
  {
    src: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6974705459a77ba5a5a97be2.png",
    alt: "Jane Lu",
    zoom: "145%",
  },
  {
    src: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69747054eb392b1e0cfbbaa9.png",
    alt: "Davie Fogarty",
    zoom: "165%",
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
    description: "1M+ views in 90 days, or your money back. Tracked together every month.",
  },
];

const STATS = [
  { value: "2B+",   label: "Views Generated" },
  { value: "$130M+", label: "Revenue Generated" },
  { value: "1.5B+", label: "Audience Reach" },
];

// Section 5A — case study cards
// ⚠️ DEV NOTE: swap each niche label + photo for the real client name/logo before going live
const CASE_STUDIES = [
  {
    name: "Ali Truwit",
    role: "Foundation",
    avatar: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a6c5a02188345b27e47e2f8.png",
    thumbnail: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a6c683e497cd89d24a06943.png",
    videoUrl: "https://www.instagram.com/reel/DaDU2rKgmyu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    before: "Instagram at 0 followers, no organic reach to support fundraising.",
    built: "Organic content system built to drive views into donations (100% organic, no paid boost).",
    stats: [
      { value: "24M+", label: "Views" },
      { value: "89K+", label: "Followers" },
      { value: "$1M+", label: "Raised" },
    ],
  },
  {
    name: "Robert Herjavec",
    role: "Shark Tank",
    avatar: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69747054d4fb90fb5181ed9b.png",
    thumbnail: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a6c683e188345b27e5896b6.png",
    videoUrl: "https://www.instagram.com/reel/DLDJj27RnKp/",
    // ⚠️ DEV NOTE — placeholder copy, no real before/built brief supplied for Robert yet. Swap before this ships.
    before: "Sporadic personal content with no consistent posting strategy across platforms.",
    built: "A structured personal brand content system built around his existing platform and audience.",
    stats: [
      { value: "1M+", label: "Followers" },
      { value: "20M+", label: "Views" },
      { value: "$10M+", label: "Revenue" },
    ],
  },
  {
    name: "Kaushi Gunasekera",
    role: "Buyers Agent",
    avatar: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a6c5a0232db2dd157264ef0.png",
    thumbnail: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a6c683ecf81b06f0585a902.png",
    videoUrl: "https://www.instagram.com/reel/DYL0yg2R_wf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    before: "Relying on referrals, no structured content or lead system (300 views/reel before the shift).",
    built: "Reactive content tied to real-time market news + a CRM pipeline built from scratch.",
    stats: [
      { value: "500K+", label: "Views" },
      { value: "10+", label: "Bookings" },
      { value: "$65K+", label: "Revenue" },
    ],
  },
];

// Section 5B — the full case study library ("wall of proof")
// Two visual weights only: `spotlight` tiles sit forward (full opacity, solid
// brand border, elevated), everything else recedes at reduced opacity. The
// ratio is deliberately weighted toward dimmed — that contrast *is* the depth
// effect.
// ⚠️ DEV NOTE: every tile carries an empty media slot — drop the real video
// embed/thumbnail in before going live.
type WallTile = {
  name: string;
  niche: string;
  spotlight?: boolean;
  media?: "portrait" | "landscape";
  /**
   * Short stat bullets, e.g. "35K new Instagram followers" — rendered
   * dot-separated, leading figure highlighted in brand blue. Matches the
   * Viral Coach reference card style (replaces the old paragraph copy).
   */
  stats?: string[];
};

// Order matters: spotlights are spaced through the array so the masonry
// columns each pick one up instead of stacking them all in column 1.
// ⚠️ PLACEHOLDER COPY — the real bullet-stat text for each client hasn't been
// supplied yet. These bullets are distilled from the old paragraph copy below
// purely to ship the new card format; swap every entry here for the final
// approved bullets before this goes live.
const WALL_TILES: WallTile[] = [
  {
    name: "Paulette Kamenecka",
    niche: "Pregnancy Health",
    spotlight: true,
    media: "portrait",
    stats: ["5.2M views on one video", "2 years of zero traction before the turn"],
  },
  {
    name: "Kiki Keysers",
    niche: "Kivari · Fashion",
    media: "landscape",
    stats: ["9,000 new followers", "From 2 videos alone"],
  },
  {
    name: "Matt Tinkler",
    niche: "Music Producer",
    media: "landscape",
    stats: ["700K+ views generated", "In 90 days", "Up from 200-300 views/video"],
  },
  {
    name: "Kaushi Gunasekera",
    niche: "Real Estate Buyers Agent",
    media: "landscape",
    stats: ["9 calls booked in 2 weeks", "From zero calls booked", "Off one video"],
  },
  {
    name: "Robert Herjavec",
    niche: "Shark Tank",
    spotlight: true,
    media: "portrait",
    stats: ["1M+ followers", "20M+ views on top videos", "16M+ impressions a month"],
  },
  {
    name: "Vivek Krishnan",
    niche: "Real Estate",
    media: "landscape",
    stats: ["111K+ views on one video", "Up from 300-500 views/video"],
  },
  {
    name: "Daniel Trkulja",
    niche: "Thread Labs · Ecommerce Education",
    media: "landscape",
    stats: ["1M+ views on one reel", "800+ new followers in a week", "10.2K total followers"],
  },
  {
    name: "Ishini",
    niche: "Concolabs · B2B Professional Services",
    media: "landscape",
    stats: ["14 qualified leads", "From one LinkedIn post"],
  },
  {
    name: "Ali Truwit / STYT",
    niche: "Stronger Than You Think · Nonprofit",
    spotlight: true,
    media: "portrait",
    stats: ["24M+ views across platforms", "$1M+ raised", "20+ prosthetics + swim lessons for 2,000+ kids"],
  },
  {
    name: "CloverOne",
    niche: "SaaS",
    media: "landscape",
    stats: ["893K views on one video", "From zero pre-launch audience"],
  },
  {
    name: "Umi Saloons",
    niche: "Luxury Hair Salon · New York",
    media: "landscape",
    stats: ["3.7M views on one video", "TikTok followers 157 → 771", "Up from 300-500 views/post"],
  },
  {
    name: "Shaveen Bandaranayake",
    niche: "The Law Simplified",
    media: "landscape",
    stats: ["Custom-made content strategy", "Praised for insight across strategy and production"],
  },
  /*
  {
    name: "Goose McGrath",
    niche: "DashDotProperty",
    media: "landscape",
    quote:
      "For the last year people have been asking how I create such awesome content. My secret weapon? They know exactly how to create incisive, viral content that cuts through the noise.",
  },
  */
];

// Bold the standout figures in brand blue right where they sit in the sentence.
// No pill, no background — same size and flow as the copy around them.
// Bolds the leading figure of a stat bullet ("5.2M" in "5.2M views on one
// video") in brand blue, matching the Viral Coach reference card style.
const LEADING_FIGURE = /^(\$?[\d][\d,.]*\s?[KkMmBb%]*\+?)/;
function highlightLeadingFigure(text: string) {
  const match = text.match(LEADING_FIGURE);
  if (!match) return text;
  const [figure] = match;
  return (
    <>
      <strong style={{ color: "#1A56DB", fontWeight: 700 }}>{figure}</strong>
      {text.slice(figure.length)}
    </>
  );
}

// Empty media slot — a real video goes here. Neutral on purpose: no stock
// photography standing in for a named client.
function WallMedia({ ratio }: { ratio: "portrait" | "landscape" }) {
  return (
    <div
      className="relative w-full overflow-hidden mb-3.5 shrink-0"
      style={{
        aspectRatio: "4 / 3",
        borderRadius: 11,
        background: "linear-gradient(155deg, #F2F4F8 0%, #E5E9F0 100%)",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center rounded-full bg-white"
          style={{ width: 32, height: 32, boxShadow: "0 1px 4px rgba(17,17,17,0.10)" }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ marginLeft: 2 }}>
            <path d="M0.5 1.2v9.6L9 6 0.5 1.2Z" fill="#1A56DB" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 5B — Full Case Study Library
   Masonry wall, light theme. Depth comes from
   opacity: a few tiles forward, the rest behind,
   edges bleeding past the container crop.
───────────────────────────────────────────── */
const WALL_MOBILE_INITIAL_COUNT = 10;

function Section5B() {
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const mobileHiddenCount = Math.max(0, WALL_TILES.length - WALL_MOBILE_INITIAL_COUNT);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tiles = tileRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      if (!tiles.length) return;
      // Animate the outer wrapper, never the tile itself — the tile's own
      // opacity is the dim/hover state and must stay owned by CSS.
      gsap.from(tiles, {
        opacity: 0,
        y: 20,
        duration: DURATION,
        ease: EASE,
        stagger: 0.045,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-study-library"
      className="overflow-hidden"
      style={{ backgroundColor: "transparent", scrollMarginTop: 110 }}
    >
      {/* Small bottom pad on purpose: Section 7 below is also white and brings
          its own top padding, so a full 88px here reads as dead space. */}
      <div className="max-w-[1200px] mx-auto pt-8 md:pt-10 pb-3 md:pb-4 px-6">

        {/* Eyebrow — same pill as the rest of the page. Deliberately not
            "The Results": Section 5A directly above already owns that tag. */}
        <div className="flex justify-center mb-5 px-6">
          <span
            className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
            style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
          >
            The Proof
          </span>
        </div>

        <h2
          className="font-extrabold text-foreground text-center px-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          Every Result We Can Show You
        </h2>

        {/* ── The wall — every tile sits fully inside the container, no bleed ── */}
        <div
          ref={gridRef}
          className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px]"
        >
          {WALL_TILES.map((tile, i) => (
            <div
              key={tile.name}
              ref={(el) => { tileRefs.current[i] = el; }}
              className={
                i >= WALL_MOBILE_INITIAL_COUNT
                  ? (mobileExpanded ? "flex" : "hidden sm:flex")
                  : "flex"
              }
            >
              <article
                className={
                  "w-full h-full flex flex-col bg-white" +
                  (tile.spotlight ? "" : " opacity-[0.72] hover:opacity-100 transition-opacity duration-300")
                }
                style={{
                  borderRadius: 15,
                  padding: 18,
                  willChange: "opacity",
                  border: "1px solid #1A56DB",
                }}
              >
                {tile.media && <WallMedia ratio={tile.media} />}

                <p
                  className="font-bold text-[#111111] leading-tight"
                  style={{ fontSize: 14, letterSpacing: "-0.01em" }}
                >
                  {tile.name}
                </p>

                {tile.niche && (
                  <p
                    className="text-[#5B5F66] uppercase mt-1"
                    style={{ fontSize: 10.5, letterSpacing: "0.07em", fontWeight: 600 }}
                  >
                    {tile.niche}
                  </p>
                )}

                {tile.stats && tile.stats.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5">
                    {tile.stats.map((stat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#20242A]"
                        style={{ fontSize: 14.5, lineHeight: 1.45, fontWeight: 500 }}
                      >
                        <span className="shrink-0 rounded-full bg-[#1A56DB]" style={{ width: 5, height: 5, marginTop: 8 }} />
                        <span>{highlightLeadingFigure(stat)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </div>
          ))}
        </div>

        {/* Mobile-only "show more" — collapses the tail of the wall below sm so the
            initial scroll is shorter, full content stays one tap away. */}
        {mobileHiddenCount > 0 && (
          <div className="flex justify-center mt-6 sm:hidden">
            <button
              type="button"
              onClick={() => setMobileExpanded((v) => !v)}
              className="font-bold rounded-full border border-[#DCDCDC] bg-white hover:border-[#1A56DB] transition-colors duration-150"
              style={{ fontSize: 13, color: "#1A56DB", padding: "10px 22px" }}
            >
              {mobileExpanded ? "Show less" : `Show ${mobileHiddenCount} more result${mobileHiddenCount === 1 ? "" : "s"}`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section 6 — FAQ
───────────────────────────────────────────── */
const FAQS = [
  {
    question: "What actually happens in the 90 days?",
    answer: "We start with a deep audit of your current content and offer. Then, we build a custom content engine, script your videos, and guide you through the launch. Over the 90 days, we continuously test and optimize to guarantee you hit the 1M+ views milestone while capturing high-quality leads."
  },
  {
    question: "Am I the right fit?",
    answer: "This program is designed for founders, coaches, and creators who already have a proven offer and want to scale their attention and revenue. If you're willing to commit to the content system and follow our guidance, you are a great fit."
  },
  {
    question: "How much is it?",
    answer: "The investment is USD $4,500 for 90 days, covering everything from strategy and offer positioning to content production, editing, coaching, and ongoing support so you have a complete system, not just advice."
  },
  {
    question: "What is the guarantee?",
    answer: "We guarantee you will hit 1M+ views in 90 days, or you get your money back. We're fully invested in your success, which is why we only take on clients we know we can scale."
  },
  {
    question: "How can I sign up?",
    answer: 'Simply click the "Book a Call" button to schedule a brief discovery session. We\'ll audit your current process, see if you\'re a fit, and map out your exact growth plan.'
  }
];

function Section6FAQ() {
  return (
    <section id="faq" style={{ backgroundColor: "#ffffff", scrollMarginTop: 110 }}>
      <div className="max-w-[800px] mx-auto pt-8 md:pt-12 pb-8 md:pb-12 px-6">
        
        {/* Eyebrow */}
        <div className="flex justify-center mb-5">
          <span
            className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
            style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
          >
            FAQ
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-extrabold text-foreground text-center mb-6 md:mb-8"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Common Questions
        </h2>

        <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl bg-white px-5 sm:px-6 !border-b-0 border border-[#E7E7E7] data-[state=open]:border-[#1A56DB] transition-colors duration-200"
              style={{ boxShadow: "0 2px 8px rgba(17,17,17,0.04)" }}
            >
              <AccordionTrigger className="text-left font-bold text-[#111111] hover:text-[#1A56DB] hover:no-underline py-5" style={{ fontSize: "17px" }}>
                <span className="flex items-center gap-3.5">
                  <span
                    className="shrink-0 inline-flex items-center justify-center rounded-full font-bold"
                    style={{ width: 28, height: 28, fontSize: 12, backgroundColor: "#EAF1FF", color: "#1A56DB" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[#5B5F66] text-[15.5px] leading-relaxed pl-[42px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}

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
        className="pt-8 pb-10 md:pt-10 md:pb-14"
        style={{
          backgroundColor: "#ffffff",
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
              Guarantee
            </span>
          </div>

          {/* Headline — the guarantee, stated plainly as the closing promise */}
          <div
            className="font-extrabold"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.1 }}
          >
            <div ref={(el) => { ctaLineRefs.current[0] = el; }} style={{ fontSize: "clamp(32px, 4.6vw, 54px)", color: "#12377A" }}>
              1M+ Views in 90 Days.
              <br />
              Or Your Money Back.
            </div>
          </div>

          {/* Sub-line — the commitment, spelled out in full */}
          <p
            ref={ctaSubheadRef}
            className="font-sans"
            style={{
              color: "#6B7280",
              fontSize: "clamp(15px, 1.6vw, 18px)",
              marginTop: "20px",
              lineHeight: 1.6,
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Not a marketing line, a commitment. If we don&#39;t hit it, you get your money back. Tracked together every month, so you always know exactly where you stand.
          </p>

          {/* CTA button with arrow circle — soft blue glow, lifts on hover */}
          <div style={{ marginTop: "32px" }}>
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
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "28px" }}>
            <div className="flex items-center shrink-0">
              {AVATARS.map((avatar, i) => (
                <div
                  key={i}
                  role="img"
                  aria-label={avatar.alt}
                  className="rounded-full bg-[#e0e0e0]"
                  style={{
                    width: 36,
                    height: 36,
                    marginLeft: i > 0 ? "-10px" : "0",
                    position: "relative",
                    zIndex: 10 - i,
                    border: "2px solid #ffffff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                    backgroundImage: `url(${avatar.src})`,
                    backgroundSize: avatar.zoom,
                    backgroundPosition: "center 15%",
                    backgroundRepeat: "no-repeat",
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
              marginTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              rowGap: "8px",
              columnGap: "14px",
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
            <span aria-hidden="true">·</span>
            <a href="/privacy-policy" className="font-sans hover:opacity-100 transition-opacity duration-150" style={{ color: "inherit" }}>
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms-conditions" className="font-sans hover:opacity-100 transition-opacity duration-150" style={{ color: "inherit" }}>
              Terms &amp; Conditions
            </a>
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
          paddingTop: "28px",
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
    <section id="case-studies" style={{ backgroundColor: "transparent", scrollMarginTop: 110 }}>
      <div className="max-w-[1440px] mx-auto pt-1 md:pt-2 pb-4 md:pb-5">

        {/* Eyebrow — outlined pill, matches reference "CUSTOMER REVIEWS" style */}
        <div className="flex justify-center mb-2 px-6">
          <span
            className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
            style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
          >
            The Results
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-extrabold text-foreground text-center mb-6 md:mb-8 px-6"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Real Campaigns, Real Growth
        </h2>

        {/* ── Cards — all three shown at once, no carousel/scroll. ── */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-5 sm:px-8"
        >
          {CASE_STUDIES.map((cs, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex flex-col sm:flex-row gap-3.5 w-full"
            >

              {/* ── Video thumbnail — portrait, links out to the Instagram reel. ── */}
              <a
                href={cs.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${cs.name}'s reel on Instagram`}
                className="group relative w-full aspect-[9/16] sm:w-[150px] sm:aspect-auto sm:h-[268px] shrink-0 overflow-hidden block bg-[#E5E9F0]"
                style={{ borderRadius: "14px" }}
              >
                <img
                  src={cs.thumbnail}
                  alt={`${cs.name}'s reel thumbnail`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 45%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex items-center justify-center rounded-full bg-white group-hover:scale-105 transition-transform duration-200"
                    style={{ width: 42, height: 42, boxShadow: "0 2px 10px rgba(17,17,17,0.14)" }}
                  >
                    <svg width="14" height="16" viewBox="0 0 10 12" fill="none" style={{ marginLeft: 2 }}>
                      <path d="M0.5 1.2v9.6L9 6 0.5 1.2Z" fill="#1A56DB" />
                    </svg>
                  </span>
                </div>
              </a>

              {/* ── Info card ── */}
              <div
                className="w-full sm:h-[268px] min-w-0 bg-white flex flex-col"
                style={{
                  borderRadius: "14px",
                  border: "1px solid #EFEFEF",
                  padding: "16px 16px 14px",
                }}
              >
                {/* Header row — avatar, name, and role/company. */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={cs.avatar}
                    alt={cs.name}
                    className="shrink-0 rounded-full object-cover"
                    style={{ width: 34, height: 34, border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-[#111111] leading-tight truncate" style={{ fontSize: "13px" }}>
                      {cs.name}
                    </p>
                    <p className="text-[#5B5F66] mt-0.5 truncate" style={{ fontSize: "11px" }}>
                      {cs.role}
                    </p>
                  </div>
                </div>

                {/* Before / What we built */}
                <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                  <div>
                    <p className="font-bold text-[#111111]" style={{ fontSize: "11px" }}>Before</p>
                    <p className="text-[#5B5F66] leading-relaxed mt-0.5" style={{ fontSize: "11.5px" }}>
                      {cs.before}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[#1A56DB]" style={{ fontSize: "11px" }}>What we built</p>
                    <p className="text-[#5B5F66] leading-relaxed mt-0.5" style={{ fontSize: "11.5px" }}>
                      {cs.built}
                    </p>
                  </div>
                </div>

                {/* Stats — all 3 shown */}
                <div className="flex justify-between gap-2 pt-3 mt-2" style={{ borderTop: "1px solid #F2F2F2" }}>
                {cs.stats.map((stat, idx) => (
                  <div key={idx} className="min-w-0">
                    <p className="truncate" style={{ fontSize: "16px", lineHeight: 1.1, color: "#1A56DB", fontWeight: 700 }}>
                      {stat.value}
                    </p>
                    <p className="text-[#5B5F66] mt-0.5 truncate" style={{ fontSize: "10px" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section breaker — a thin transition band between two sections, not a
   content section itself. Same idea as the dark/amber reference (a glowing
   accent line across a gradient band) reskinned to our theme: brand blue
   instead of amber, light-blue gradient instead of near-black.
   Deliberately has no content of its own — it's a visual "breath" you can
   drop between any two sections. Not applied everywhere yet.

   topColor/bottomColor MUST match the actual background of the section
   immediately above/below — a hardcoded white middle-man here is exactly
   what caused the visible seam the first version had against sections
   that aren't pure white (e.g. Process's #F0F4F8). `flip` only moves the
   glow line to the bottom edge (for closing a section out) instead of
   the top (for opening one) — it doesn't affect the color stops. */
function SectionBreak({
  topColor,
  bottomColor,
  flip = false,
}: {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        // Needs enough vertical room for the gradient to actually read as a
        // fade — at ~10px tall the 2px glow line plus its blur radius ate
        // almost the entire band, so it looked like a hard line instead of
        // a soft transition. 28px keeps the fold tight while giving the
        // gradient space to breathe.
        height: 28,
        background: `linear-gradient(180deg, ${topColor} 0%, #F5F8FF 50%, ${bottomColor} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Glowing accent line — top edge normally, bottom edge when flipped */}
      <div
        style={{
          position: "absolute",
          [flip ? "bottom" : "top"]: 0,
          left: "6%",
          right: "6%",
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, #1A56DB 50%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(26,86,219,0.45)",
        }}
      />
    </div>
  );
}

export default function App() {
  // Hero — plays once on load
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine3Ref = useRef<HTMLSpanElement>(null);
  const heroRevenueTagRef = useRef<HTMLSpanElement>(null);
  const heroVslRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroSocialProofRef = useRef<HTMLDivElement>(null);

  // Process — one ref per step row + one per connector fill
  const processStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processConnectorRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mechanism — funnel clip reveal, callouts, connector line draws
  const mechFunnelWrapRef = useRef<HTMLDivElement>(null);
  const mechCalloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mechConnectorRefs = useRef<(SVGLineElement | null)[]>([]);
  const mechBadgeRefs = useRef<(SVGGElement | null)[]>([]);

  // Stat strip — numbers count up, caption follows
  const statStripRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ── Hero — plays on load, not on scroll ──
      const heroTl = gsap.timeline({ defaults: { ease: EASE } });
      heroTl
        .from(heroLine1Ref.current, { opacity: 0, y: 24, duration: DURATION })
        .from(heroLine3Ref.current, { opacity: 0, y: 24, duration: DURATION }, "-=0.45")
        .fromTo(
          heroRevenueTagRef.current,
          { scale: 0.9 },
          { scale: 1.05, duration: 0.22, ease: EASE }
        )
        .to(heroRevenueTagRef.current, { scale: 1, duration: 0.18, ease: EASE })
        .from(heroVslRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.1")
        .from(heroCtaRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(heroSocialProofRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.35");

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
          const badge = mechBadgeRefs.current[i];
          if (badge) mechTl.from(badge, { opacity: 0, scale: 0.5, duration: 0.5, transformOrigin: "center" }, "-=0.2");
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
      {/* pt clears the fixed PillNav — 140px on desktop (~84px tall + 20px top
          offset), less on mobile where the bar is only 56px tall. */}
      <section className="relative overflow-hidden pt-[116px] sm:pt-[140px] pb-[32px] sm:pb-[48px] text-center">
        {/* Animated background layer — full viewport width, bleeding past the
            max-w-5xl content column below rather than being boxed in by it.
            Left able to receive pointer events so enableMouseInteraction
            still works; the CTA/links above it are unaffected since they're
            painted on top and get hit-tested first wherever they overlap. */}
        <div className="absolute inset-0 z-0 opacity-40 sm:opacity-70" aria-hidden="true">
          <Threads
            color={[0.29, 0.51, 0.88]}
            amplitude={1.2}
            distance={0.15}
            enableMouseInteraction={true}
          />
        </div>

        {/* Hero content — constrained column, lifted above the background layer. */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* Below sm the type keeps its current ~28px on a normal phone but is
            free to shrink on narrow ones, so the headline never forces a
            horizontal scroll. sm and up is untouched. */}
        <h1
          className="font-extrabold text-foreground mb-4 sm:mb-5"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          {/* Funnel layout — Views + Leads sit together, small and muted grey,
              the "inputs." Revenue lands alone on its own line directly below,
              full size and solid-blue, the single "payoff" the first line
              funnels into. Whole phrase shares one box so nothing has to
              line up across two different type treatments. */}
          <span
            className="block text-[clamp(20px,6vw,26px)] sm:text-[clamp(24px,3.1vw,36px)] font-bold text-foreground uppercase tracking-[0.03em]"
            ref={heroLine1Ref}
          >
            More Views. More Leads
          </span>
          <span
            className="block mt-2 sm:mt-3 text-[clamp(28px,8.6vw,36px)] sm:text-[clamp(30px,5.2vw,60px)]"
            ref={heroLine3Ref}
          >
            <span ref={heroRevenueTagRef} style={{ display: "inline-block" }}>
              <Highlight variant="solid">More Revenue.</Highlight>
            </span>
          </span>
        </h1>

        {/* VSL Placeholder Block */}
        <div className="flex justify-center w-full mb-6 sm:mb-8" ref={heroVslRef}>
          <div
            className="relative flex flex-col items-center justify-center w-full max-w-[700px] aspect-video"
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Play Button */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#1A56DB",
                boxShadow: "0 8px 20px rgba(26,86,219,0.4)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "4px" }}>
                <path d="M5 3L19 12L5 21V3Z" fill="#ffffff" />
              </svg>
            </div>

            {/* Placeholder Label Text */}
            <span
              className="absolute bottom-4 text-center font-sans font-medium"
              style={{
                color: "#9CA3AF",
                fontSize: "13px",
                letterSpacing: "0.02em",
              }}
            >
              Watch How It Works
            </span>
          </div>
        </div>

        {/* Primary CTA — same button system as the closing CTA in Section 7,
            wired to the booking section rather than being a dead button. */}
        <div className="flex justify-center mb-6 sm:mb-8" ref={heroCtaRef}>
          <a
            href="#contact"
            className="font-sans font-semibold tracking-[0.025em] cursor-pointer transition-all duration-200 inline-flex items-center justify-between no-underline w-[144px] sm:w-[170px] text-[12px] sm:text-[13px] p-[6px] sm:p-[7px]"
            style={{
              backgroundColor: "#1A56DB",
              color: "#ffffff",
              borderRadius: "999px",
              border: "1px solid #1540B0",
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
            <span className="w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] shrink-0" aria-hidden="true" />
            <span className="flex-1 text-center">Book a Call</span>
            <span
              className="inline-flex items-center justify-center rounded-full shrink-0 w-[20px] h-[20px] sm:w-[26px] sm:h-[26px]"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        {/* Social proof — no container, avatars + text sit directly on the page.
            Stacks on mobile: side by side left the text in a ~180px column. */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3"
          ref={heroSocialProofRef}
        >
          <div className="flex items-center shrink-0" style={{ position: "relative" }}>
            {AVATARS.map((avatar, i) => (
              <div
                key={i}
                role="img"
                aria-label={avatar.alt}
                className="rounded-full bg-[#e0e0e0]"
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: i > 0 ? "-11px" : "0",
                  position: "relative",
                  zIndex: 10 - i,
                  border: "2px solid #ffffff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                  backgroundImage: `url(${avatar.src})`,
                  backgroundSize: avatar.zoom,
                  backgroundPosition: "center 15%",
                  backgroundRepeat: "no-repeat",
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
          <p className="text-[14px] text-muted-foreground leading-snug text-center sm:text-left">
            Used by{" "}
            <span className="text-foreground font-semibold">Robert Herjavec</span>,{" "}
            <span className="text-foreground font-semibold">Daniel Lubetzky</span>,{" "}
            <span className="text-foreground font-semibold">Jane Lu</span>
            <span className="text-muted-foreground">, and many others.</span>
          </p>
        </div>
        </div>
      </section>

      {/* Stat strip — pale blue "proof" band */}
      <div ref={statStripRef} className="border-t border-border" style={{ backgroundColor: "#F5F8FF" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">

          <div className="flex flex-row items-center justify-center">
            {STATS.map((stat, i) => (
              // Row layout at every breakpoint — a vertical rule between stats,
              // kept compact on mobile so all three sit on one line.
              <div key={i} className="flex flex-row items-stretch">
                <div className="flex flex-col items-center justify-center px-2.5 sm:px-8 md:px-14 py-3 md:py-2 text-center">
                  <span
                    ref={(el) => { statValueRefs.current[i] = el; }}
                    className="font-extrabold text-[#1A56DB] block"
                    style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", fontSize: "clamp(22px, 6vw, 56px)", lineHeight: 1.1 }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-muted-foreground uppercase tracking-[0.08em] sm:tracking-[0.1em] font-semibold mt-1 md:mt-2 block"
                    style={{ fontSize: "clamp(8.5px, 2.2vw, 11px)" }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="self-stretch"
                    style={{ width: "1px", backgroundColor: "#E7E7E7", margin: "8px 0" }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Example section breaker — see the SectionBreak component definition
          above for context. Only placed here for now, not repeated elsewhere.
          Colors matched to the actual sections on either side: stat strip
          (#F5F8FF) above, Process (#F0F4F8) below. */}
      <SectionBreak topColor="#F5F8FF" bottomColor="#F0F4F8" />

      {/* ── Section 3: The Process ── */}
      <section id="work" style={{ scrollMarginTop: 110, backgroundColor: "#F0F4F8" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-1 md:pt-2 pb-8 md:pb-12">

          <div className="flex justify-center mb-2">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] px-4 py-1.5 rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF" }}
            >
              The Process
            </span>
          </div>

          <h2
            className="font-extrabold text-foreground text-center mb-10 md:mb-14"
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
                    marginBottom: i < STEPS.length - 1 ? 40 : 0,
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

      {/* Second example — flipped variant, closing Process out before
          Mechanism begins. Process is #F0F4F8, Mechanism is plain white. */}
      <SectionBreak topColor="#F0F4F8" bottomColor="#ffffff" flip />

      {/* ── Section 4: The Mechanism ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-[1150px] mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-8 md:pb-12">

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
            className="font-extrabold text-foreground text-center mb-8 md:mb-10"
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
              <line ref={(el) => { mechConnectorRefs.current[0] = el; }} x1="238" y1="95" x2="20" y2="95"
                stroke="#C98A2B" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />
              <line ref={(el) => { mechConnectorRefs.current[1] = el; }} x1="282" y1="300" x2="500" y2="300"
                stroke="#4A8AE8" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />
              <line ref={(el) => { mechConnectorRefs.current[2] = el; }} x1="238" y1="520" x2="20" y2="520"
                stroke="#3A9460" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" opacity="0.55" />

              {/* ── Badges — Custom SVG Icons matching the Process step markers ── */}
              {/* Badge 01: Content Creates Attention (Amber) */}
              <g ref={(el) => { mechBadgeRefs.current[0] = el; }} style={{ transformOrigin: "260px 95px" }}>
                <circle cx="260" cy="96" r="22" fill="rgba(0,0,0,0.14)" />
                <circle cx="260" cy="95" r="22" fill="#C98A2B" stroke="#ffffff" strokeWidth="2" />
                <g transform="translate(248, 83)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="4" />
                  <path d="M10 9l4 3-4 3z" />
                </g>
              </g>

              {/* Badge 02: Attention Becomes Leads (Blue) */}
              <g ref={(el) => { mechBadgeRefs.current[1] = el; }} style={{ transformOrigin: "260px 300px" }}>
                <circle cx="260" cy="301" r="22" fill="rgba(0,0,0,0.14)" />
                <circle cx="260" cy="300" r="22" fill="#1A56DB" stroke="#ffffff" strokeWidth="2" />
                <g transform="translate(248, 288)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="4" width="13" height="16" rx="3" />
                  <circle cx="14.5" cy="10" r="2.5" />
                  <path d="M11 16c0-2 2-3 3.5-3s3.5 1 3.5 3" />
                  <path d="M3 12h5" />
                  <path d="M5 9l3 3-3 3" />
                </g>
              </g>

              {/* Badge 03: Leads Become Revenue (Green) */}
              <g ref={(el) => { mechBadgeRefs.current[2] = el; }} style={{ transformOrigin: "260px 520px" }}>
                <circle cx="260" cy="521" r="22" fill="rgba(0,0,0,0.14)" />
                <circle cx="260" cy="520" r="22" fill="#1F7A4D" stroke="#ffffff" strokeWidth="2" />
                <g transform="translate(248, 508)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </g>
              </g>
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

          {/* ── Mobile version — premium redesign of the same tapering funnel: larger,
              smoothly-blended gradient, soft shadow + glass highlight, glowing badge
              rings, and short dotted connectors from each label to its tier. ── */}
          <div
            className="md:hidden relative mx-auto mt-6"
            style={{
              width: "100%",
              maxWidth: 460,
              borderRadius: 28,
              background: "linear-gradient(180deg, #FBFCFF 0%, #F2F5FB 100%)",
              padding: "40px 10px 32px",
            }}
          >
            <div className="relative mx-auto" style={{ width: "100%", aspectRatio: "520 / 600" }}>
              <svg
                viewBox="0 0 520 600"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Wide, overlapping stops blend each tier into the next instead of a hard band */}
                  <linearGradient id="mFunnelColorMobile" x1="0" y1="40" x2="0" y2="550" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#FDF3E2" />
                    <stop offset="22%"  stopColor="#F0D9A8" />
                    <stop offset="42%"  stopColor="#DCE9FF" />
                    <stop offset="50%"  stopColor="#B9D3FF" />
                    <stop offset="58%"  stopColor="#CFEBDA" />
                    <stop offset="78%"  stopColor="#D8F0E0" />
                    <stop offset="100%" stopColor="#A3E0BC" />
                  </linearGradient>
                  <linearGradient id="mGloss" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="mFunnelClip">
                    <path d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z" />
                  </clipPath>
                </defs>

                {/* Soft drop shadow — blurred duplicate, offset down */}
                <path
                  d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z"
                  fill="rgba(25,35,65,0.22)"
                  transform="translate(0,16)"
                  style={{ filter: "blur(20px)" }}
                />

                {/* Funnel body */}
                <path
                  d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z"
                  fill="url(#mFunnelColorMobile)"
                />
                <path
                  d="M 120,40 A 140,18 0 0 1 400,40 L 294,550 A 34,12 0 0 1 226,550 Z"
                  fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1"
                />

                {/* Glassy highlight — soft diagonal sheen + bright top rim */}
                <g clipPath="url(#mFunnelClip)">
                  <ellipse cx="175" cy="130" rx="95" ry="230" fill="url(#mGloss)" />
                </g>
                <ellipse cx="260" cy="42" rx="138" ry="9" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" />

                {/* Short dotted connectors from each badge toward its label */}
                <line x1="228" y1="95" x2="128" y2="95" stroke="#C98A2B" strokeWidth="1.8" strokeDasharray="1 6" strokeLinecap="round" opacity="0.6" />
                <circle cx="126" cy="95" r="3" fill="#C98A2B" opacity="0.7" />
                <line x1="292" y1="300" x2="392" y2="300" stroke="#1A56DB" strokeWidth="1.8" strokeDasharray="1 6" strokeLinecap="round" opacity="0.6" />
                <circle cx="394" cy="300" r="3" fill="#1A56DB" opacity="0.7" />
                <line x1="228" y1="520" x2="128" y2="520" stroke="#1F7A4D" strokeWidth="1.8" strokeDasharray="1 6" strokeLinecap="round" opacity="0.6" />
                <circle cx="126" cy="520" r="3" fill="#1F7A4D" opacity="0.7" />

                {/* Badge 01 — Content Creates Attention (Amber), enlarged with glow ring */}
                <g>
                  <circle cx="260" cy="95" r="44" fill="#C98A2B" opacity="0.22" style={{ filter: "blur(9px)" }} />
                  <circle cx="260" cy="95" r="34" fill="none" stroke="#C98A2B" strokeOpacity="0.32" strokeWidth="3" />
                  <circle cx="260" cy="97" r="28" fill="rgba(0,0,0,0.14)" />
                  <circle cx="260" cy="95" r="28" fill="#C98A2B" stroke="#ffffff" strokeWidth="2.5" />
                  <g transform="translate(260,95) scale(1.3) translate(-260,-95)">
                    <g transform="translate(248, 83)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="4" />
                      <path d="M10 9l4 3-4 3z" />
                    </g>
                  </g>
                </g>

                {/* Badge 02 — Attention Becomes Leads (Blue), enlarged with glow ring */}
                <g>
                  <circle cx="260" cy="300" r="44" fill="#1A56DB" opacity="0.20" style={{ filter: "blur(9px)" }} />
                  <circle cx="260" cy="300" r="34" fill="none" stroke="#1A56DB" strokeOpacity="0.30" strokeWidth="3" />
                  <circle cx="260" cy="302" r="28" fill="rgba(0,0,0,0.14)" />
                  <circle cx="260" cy="300" r="28" fill="#1A56DB" stroke="#ffffff" strokeWidth="2.5" />
                  <g transform="translate(260,300) scale(1.3) translate(-260,-300)">
                    <g transform="translate(248, 288)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="8" y="4" width="13" height="16" rx="3" />
                      <circle cx="14.5" cy="10" r="2.5" />
                      <path d="M11 16c0-2 2-3 3.5-3s3.5 1 3.5 3" />
                      <path d="M3 12h5" />
                      <path d="M5 9l3 3-3 3" />
                    </g>
                  </g>
                </g>

                {/* Badge 03 — Leads Become Revenue (Green), enlarged with glow ring */}
                <g>
                  <circle cx="260" cy="520" r="44" fill="#1F7A4D" opacity="0.22" style={{ filter: "blur(9px)" }} />
                  <circle cx="260" cy="520" r="34" fill="none" stroke="#1F7A4D" strokeOpacity="0.32" strokeWidth="3" />
                  <circle cx="260" cy="522" r="28" fill="rgba(0,0,0,0.14)" />
                  <circle cx="260" cy="520" r="28" fill="#1F7A4D" stroke="#ffffff" strokeWidth="2.5" />
                  <g transform="translate(260,520) scale(1.3) translate(-260,-520)">
                    <g transform="translate(248, 508)" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="2" x2="12" y2="22" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </g>
                  </g>
                </g>
              </svg>

              {/* Inline labels — enlarged, color-matched, connected to their tier by the
                  dotted lines drawn above; alternating sides to clear the taper. */}
              <div style={{ position: "absolute", left: 0, top: "15.8%", transform: "translateY(-50%)", width: "23%", textAlign: "right" }}>
                <p className="font-extrabold" style={{ fontSize: 15, lineHeight: 1.25, color: "#B9791F" }}>
                  Content Creates Attention
                </p>
              </div>
              <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "23%", textAlign: "left" }}>
                <p className="font-extrabold" style={{ fontSize: 15, lineHeight: 1.25, color: "#1A56DB" }}>
                  Attention Becomes Leads
                </p>
              </div>
              <div style={{ position: "absolute", left: 0, top: "86.7%", transform: "translateY(-50%)", width: "23%", textAlign: "right" }}>
                <p className="font-extrabold" style={{ fontSize: 15, lineHeight: 1.25, color: "#1F7A4D" }}>
                  Leads Become Revenue
                </p>
              </div>
            </div>
          </div>

        </div>



      </section>

      {/* Opening breaker into Results — Mechanism and Results are both
          white, so this reads as a quiet divider rather than a color shift. */}
      <SectionBreak topColor="#ffffff" bottomColor="#ffffff" />

      <div style={{ backgroundColor: "#ffffff" }}>
        {/* ── Section 5A: Best Results ── */}
        <Section5A />
      </div>

      {/* Closing breaker out of Results — flipped, matched into Section 5B's
          light-blue wrapper. */}
      <SectionBreak topColor="#ffffff" bottomColor="#ffffff" flip />

      <div style={{ backgroundColor: "#ffffff" }}>
        {/* ── Section 5B: Full Case Study Library ── */}
        <Section5B />
      </div>

      {/* ── Section 5D: Testimonials — video carousel + written reviews ── */}
      <Testimonials />

      {/* Flipped — closing Testimonials out into FAQ's light-blue background. */}
      <SectionBreak topColor="#ffffff" bottomColor="#ffffff" flip />

      {/* ── Section 6: FAQ ── */}
      <Section6FAQ />

      {/* Opening breaker only — FAQ and Section 7's Zone A are both white. */}
      <SectionBreak topColor="#ffffff" bottomColor="#ffffff" />

      {/* ── Section 7: Final CTA ── */}
      <Section7 />

    </div>
  );
}
