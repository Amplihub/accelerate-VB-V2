import React, { useEffect, useRef, useState } from "react";
import { TEXT_TESTIMONIALS } from "./components/Testimonials";
import FunnelFooter from "./components/FunnelFooter";
import "./Apply.css";

/* ─────────────────────────────────────────────
   Apply — the funnel's front door. Proof on one
   side, the qualifying form on the other, both
   lifted off a brand-blue stage.
───────────────────────────────────────────── */

const LOGO = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68de77a7d6c63e1c1d4574fd.png";

const REVENUE_OPTIONS = [
  "Less than $1k/mo",
  "$1k – $5k/mo",
  "$5k – $10k/mo",
  "$10k – $50k/mo",
  "$50k+/mo",
];

// Same proof that runs on the landing page — Maxine leads, as in the source.
const PROOF = (() => {
  const i = TEXT_TESTIMONIALS.findIndex((t) => t.name === "Maxine Horne");
  return i > 0
    ? [...TEXT_TESTIMONIALS.slice(i), ...TEXT_TESTIMONIALS.slice(0, i)]
    : TEXT_TESTIMONIALS;
})();

const ROTATE_MS = 8000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Apply() {
  const [index, setIndex] = useState(0);
  // Rotation pauses while someone is actually filling the form — motion
  // beside a field you're typing in is just noise.
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (prefersReducedMotion() || PROOF.length < 2) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % PROOF.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  // ⚠️ Not wired to a backend yet — point this at the CRM/form endpoint.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const item = PROOF[index];

  return (
    <div className="apl">

      <header className="apl-head">
        <a className="apl-logo" href="/" aria-label="Accelerate — back to home">
          <img src={LOGO} alt="Accelerate" />
        </a>
      </header>

      {/* The stage is this page's one bold move; everything on it stays quiet. */}
      <div className="apl-stage">
        <div className="apl-grid">

          {/* ── Proof ── */}
          <aside
            className="apl-proof"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Client testimonials"
          >
            <div className="apl-proof__body" key={index}>
              <h2 className="apl-proof__title">&ldquo;{item.title}&rdquo;</h2>
              <p className="apl-proof__quote">{item.quote}</p>
            </div>

            <div className="apl-proof__foot">
              <div className="apl-proof__person">
                {item.photo && <img src={item.photo} alt="" />}
                <div>
                  <p className="apl-proof__name">{item.name}</p>
                  <p className="apl-proof__company">{item.company}</p>
                </div>
              </div>

              {PROOF.length > 1 && (
                <div className="apl-dots">
                  {PROOF.map((t, i) => (
                    <button
                      key={t.name + t.company}
                      type="button"
                      className={"apl-dot" + (i === index ? " is-active" : "")}
                      aria-label={`Show testimonial from ${t.name}`}
                      aria-current={i === index}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* ── Form ── */}
          <section className="apl-card">
            {/* Same marker the landing page hero puts on "Guaranteed". */}
            <h1 className="apl-headline">
              <span className="apl-mark">Guaranteed</span> 1M+ views in 90 days, or
              you don&rsquo;t pay.
            </h1>

            <p className="apl-sub">
              Submit this form to book a free 30-minute call with our team.
            </p>

            <form
              className="apl-form"
              onSubmit={handleSubmit}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >

              <div className="apl-field">
                <label htmlFor="ap-name">Full name <span aria-hidden="true">*</span></label>
                <input id="ap-name" name="name" type="text" autoComplete="name" placeholder="Type your full name" required />
              </div>

              <div className="apl-field">
                <label htmlFor="ap-email">Email <span aria-hidden="true">*</span></label>
                <input id="ap-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Enter your email" required />
              </div>

              <div className="apl-field">
                <label htmlFor="ap-phone">Phone <span aria-hidden="true">*</span></label>
                <input id="ap-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" required />
              </div>

              {/* Radio cards rather than bare radios — bigger tap targets and
                  the selection is legible at a glance. */}
              <fieldset className="apl-fieldset">
                <legend>Monthly revenue (approx.) <span aria-hidden="true">*</span></legend>
                <div className="apl-choices">
                  {REVENUE_OPTIONS.map((opt) => (
                    <label className="apl-choice" key={opt}>
                      <input type="radio" name="revenue" value={opt} required />
                      <span className="apl-choice__box">
                        <span className="apl-choice__dot" aria-hidden="true" />
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="apl-hint">Select your approximate monthly revenue.</p>
              </fieldset>

              <div className="apl-field">
                <label htmlFor="ap-social">Primary social media link <span aria-hidden="true">*</span></label>
                <input id="ap-social" name="social" type="url" inputMode="url" placeholder="https://" required />
              </div>

              <div className="apl-field">
                <label htmlFor="ap-business">Tell us about your business <span aria-hidden="true">*</span></label>
                <textarea id="ap-business" name="business" rows={2} placeholder="What does your business do, or what do you sell?" required />
              </div>

              <div className="apl-field">
                <label htmlFor="ap-goal">What is the goal of your personal brand? <span aria-hidden="true">*</span></label>
                <textarea id="ap-goal" name="goal" rows={2} placeholder="E.g. grow an audience, get leads, attract investors, drive eComm sales." required />
              </div>

              {/* ⚠️ LEGAL — this is TCPA-style consent language. The entity name
                  was changed to match the Privacy Policy and Terms; the wording
                  itself should be signed off before this collects real leads. */}
              <div className="apl-consent">
                <input id="ap-consent" name="consent" type="checkbox" required />
                <label htmlFor="ap-consent">
                  By providing my phone number and submitting this form, I agree to
                  receive text messages and phone calls from Accelerate by Editoz. I
                  understand that these calls may be automated, pre-recorded, or may
                  use an AI voice. I consent to receive marketing communications at
                  the number provided. I understand I can opt out at any time by
                  replying STOP to any text message or by contacting{" "}
                  <a href="mailto:hello@editozclub.com">hello@editozclub.com</a>.
                  Message and data rates may apply.
                </label>
              </div>

              <button type="submit" className="apl-submit">
                <span className="apl-submit__spacer" aria-hidden="true" />
                <span className="apl-submit__label">See if you qualify</span>
                <span className="apl-submit__arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

            </form>
          </section>

        </div>
      </div>

      <div className="apl-foot">
        <FunnelFooter />
      </div>

    </div>
  );
}
