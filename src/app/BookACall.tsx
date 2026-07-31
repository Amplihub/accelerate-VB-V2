import React from "react";
import SplitLayout from "./components/SplitLayout";
import "./BookACall.css";

// ⚠️ DEV NOTE — drop the live GoHighLevel calendar embed URL in here.
// Until it's set, the calendar slot renders a labelled placeholder so
// the rest of the page stays reviewable.
const BOOKING_EMBED_URL = "";

const PORTRAIT = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68db78894c93495518500525.png";

// ⚠️ DEV NOTE — the source quote named "Editoz Club"; swapped to
// "Accelerate" to match the convention already used in Testimonials.
const QUOTE = {
  text:
    "I receive daily inquiries about the creators behind my content. Accelerate were instrumental in increasing my YouTube subscribers to 300k in just a few months. They can pump out heaps of content and understand exactly how to make things viral.",
  name: "Davie Fogarty",
};

// The three things the discovery call actually covers, in the order it
// covers them — drawn from the FAQ's description of the call.
const AGENDA = [
  "We audit your current content and offer.",
  "We check whether you're a fit for the 90-day guarantee.",
  "You leave with your growth plan mapped out.",
];

export default function BookACall() {
  return (
    <SplitLayout portrait={PORTRAIT} name={QUOTE.name} quote={QUOTE.text}>

      <div className="spl-eyebrow">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2.5 7.4L5.5 10.4L11.5 3.9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Application reviewed
      </div>

      <h1 className="spl-headline">
        <span className="spl-headline__lead">
          You&rsquo;re <span className="spl-mark">qualified</span>.
        </span>
        <span className="spl-headline__next">Now pick your time.</span>
      </h1>

      <p className="spl-sub">
        One 45-minute call. Bring anyone else who&rsquo;s part of the decision &mdash;
        we cover a lot, and it&rsquo;s faster with everyone on.
      </p>

      {/* ── Calendar ── */}
      <div className="bac-card">
        {BOOKING_EMBED_URL ? (
          <iframe
            className="bac-card__frame"
            src={BOOKING_EMBED_URL}
            title="Book your Accelerate discovery call"
            loading="lazy"
          />
        ) : (
          <div className="bac-card__slot">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4.5" width="18" height="16" rx="3" />
              <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
            </svg>
            <p className="bac-card__slot-title">Calendar embed slot</p>
            <p className="bac-card__slot-note">
              Set <code>BOOKING_EMBED_URL</code> in <code>BookACall.tsx</code> to the
              live scheduler link.
            </p>
          </div>
        )}
      </div>

      {/* ── What the call covers ── */}
      <div className="bac-agenda-wrap">
        <p className="bac-agenda__label">On the call</p>
        <ul className="bac-agenda">
          {AGENDA.map((item) => (
            <li key={item}>
              <span className="bac-agenda__dot" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

    </SplitLayout>
  );
}
