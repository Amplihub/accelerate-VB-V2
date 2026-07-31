import React from "react";
import SplitLayout from "./components/SplitLayout";
import "./Booked.css";

const PORTRAIT = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68db7d5b6cca5b590d7f7faf.webp";

/* ⚠️ DEV NOTE — the source copy named "Editoz Club" and "Chali"; swapped to
   "Accelerate" / "the team" to match the convention used in Testimonials.

   ⚠️ ATTRIBUTION — this quote also appears in Testimonials.tsx credited to
   Kenny Lee (@LightMyBricks). Jane Lu is confirmed correct; the Kenny Lee
   entry is the one that needs fixing. */
const QUOTE = {
  text:
    "Accelerate, led by the fantastic team, has been a game-changer in growing my following with their superb content creation support. Their knack for bringing ideas to life and managing projects is exceptional. The communication and teamwork are top-notch, making the whole process smooth and effective.",
  name: "Jane Lu",
};

/* Two moments, not two arbitrary bullets — the pills mark *when*, which is
   the only thing that separates them. Same connector language as the
   Process section on the landing page. */
const STEPS = [
  {
    when: "Now",
    title: "Check your inbox",
    body: "The confirmation and calendar invite are on their way. If you don't see them, look in Promotions or Spam.",
  },
  {
    when: "On the call",
    title: "Come ready to talk strategy",
    body: "We'll dig into where your content stands today and map out exactly how we can help. Bring anyone else who's part of the decision.",
  },
];

export default function Booked() {
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
        Call confirmed
      </div>

      <h1 className="spl-headline">
        <span className="spl-headline__lead">
          You&rsquo;re <span className="spl-mark">booked</span>.
        </span>
        <span className="spl-headline__next">Here&rsquo;s what happens next.</span>
      </h1>

      <p className="spl-sub">
        That&rsquo;s the first real step towards a personal brand that brings you leads
        instead of just likes.
      </p>

      {/* ── The two moments between now and the call ── */}
      <ol className="bkd-steps">
        {STEPS.map((step) => (
          <li className="bkd-step" key={step.when}>
            <div className="bkd-step__rail" aria-hidden="true">
              <span className="bkd-step__node" />
              <span className="bkd-step__line" />
            </div>

            <div className="bkd-step__body">
              <span className="bkd-step__when">{step.when}</span>
              <p className="bkd-step__title">{step.title}</p>
              <p className="bkd-step__text">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

    </SplitLayout>
  );
}
