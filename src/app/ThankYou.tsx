import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import FunnelFooter from "./components/FunnelFooter";
import "./ThankYou.css";

/* ─────────────────────────────────────────────
   Thank you — the handoff from sales to
   delivery. One job: get the onboarding video
   watched, so the video is the page rather than
   an attachment to it.
───────────────────────────────────────────── */

const VSL = "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a2941fe2719d8cb189c58bb.mp4";
// Same full lockup the split pages use — the source art is white, so it's
// darkened in CSS for this light page.
const LOGO = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68de77a7d6c63e1c1d4574fd.png";

const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ThankYou() {
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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
        stagger: 0.1,
        clearProps: "opacity,transform",
      });
    }, inner);

    return () => ctx.revert();
  }, []);

  // Same pattern as the Testimonials carousel: the custom poster button
  // hands off to native controls once playback starts.
  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    const played = video.play();
    if (played && typeof played.catch === "function") {
      played.catch(() => {
        video.controls = false;
        setPlaying(false);
      });
    }
    setPlaying(true);
  };

  return (
    <div className="ty">
      {/* Soft brand wash behind the top of the page — the light-theme
          answer to the old page's blue glow. */}
      <div className="ty-wash" aria-hidden="true" />

      <main className="ty-inner" ref={innerRef}>

        <a className="ty-logo" href="/" aria-label="Accelerate — back to home">
          <img src={LOGO} alt="Accelerate" />
        </a>

        {/* The marker has tracked the whole funnel — qualified, booked, in.
            Here it finally lands on the brand itself. */}
        <h1 className="ty-headline">
          Welcome to <span className="ty-mark">Accelerate</span>.
        </h1>

        <p className="ty-sub">
          Watch the video below to understand how the next 90 days will work and what
          to expect from our team.
        </p>

        <div className={"ty-video" + (playing ? " is-playing" : "")}>
          <video
            ref={videoRef}
            src={VSL}
            preload="metadata"
            playsInline
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button type="button" className="ty-video__play" onClick={handlePlay}>
              <span className="ty-video__play-ring">
                <svg width="17" height="20" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <path d="M0.5 1.2v9.6L9 6 0.5 1.2Z" fill="#1A56DB" />
                </svg>
              </span>
              <span className="ty-video__play-label">Watch your welcome video</span>
            </button>
          )}
        </div>

        <aside className="ty-inbox">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
            <path d="M3 6.5l9 6 9-6" />
          </svg>
          <p>
            <strong>Keep an eye on your inbox.</strong> We&rsquo;ll send your onboarding
            details and next steps shortly &mdash; if you can&rsquo;t find it, check
            Promotions or Spam.
          </p>
        </aside>

        <FunnelFooter />

      </main>
    </div>
  );
}
