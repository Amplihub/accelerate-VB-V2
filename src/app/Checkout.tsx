import React from "react";
import SplitLayout from "./components/SplitLayout";
import "./Checkout.css";

/* ─────────────────────────────────────────────
   Checkout — the last step of the funnel.
   Everything here either reduces the risk of
   paying or is the payment itself.
───────────────────────────────────────────── */

// ⚠️ DEV NOTE — the card fields below are a mount slot, not real inputs.
// Card data has to be collected by the payment provider's own hosted element
// (Stripe Elements, which is what the old page used) so it never touches our
// DOM. Wire the provider's mount target into `.chk-card__slot`.
const CARD_ELEMENT_MOUNTED = false;

/* Product + pricing, read off the live checkout's order summary:
   "Accelerate by Editoz Club [3 months] USD 4500 · Subscription · Qty 1".
   ⚠️ `name` should stay identical to the product name in the payment
   provider, so the receipt and this page agree. */
const ORDER = {
  name: "Accelerate by Editoz Club",
  term: "3 months",
  badge: "Subscription",
  qty: 1,
  subtotal: "$4,500",
  total: "$4,500",
  currency: "USD",
};

const PORTRAIT = "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/6887a9f7a6e2ac272d63a82a.jpeg";

// Source copy already said "Accelerate" — no substitution needed here.
const QUOTE = {
  text:
    "I saw an almost immediate impact by working with Accelerate team - not just in engagement but in growth across all platforms. They don't just post content for the sake of it; there's a strategy aligned with the client's brand. Plus, they are incredibly organised, detailed, and fun to work with.",
  name: "Robert Herjavec",
};

export default function Checkout() {
  // ⚠️ Not wired to a backend yet — the provider's checkout submission
  // replaces this.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <SplitLayout portrait={PORTRAIT} name={QUOTE.name} quote={QUOTE.text}>

      <div className="spl-eyebrow">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="10.5" width="16" height="11" rx="2.5" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </svg>
        Secure checkout
      </div>

      <h1 className="spl-headline">
        <span className="spl-headline__lead">Complete your purchase.</span>
      </h1>

      <p className="spl-sub">
        You&rsquo;re one step away from the ultimate leverage for yourself in{" "}
        <span className="spl-mark">90 days</span>.
      </p>

      {/* ── Risk reversal — the one thing worth saying loudest at the moment
             someone is about to hand over a card. ── */}
      <aside className="chk-guarantee">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7.4L5.5 10.4L11.5 3.9" stroke="#1A56DB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>
          <strong>Try it risk-free.</strong> 7-day money-back guarantee, no questions asked.
        </p>
      </aside>

      <form className="chk-form" onSubmit={handleSubmit} noValidate={false}>

        {/* ── Your details ── */}
        <h2 className="chk-legend">Your details</h2>

        <div className="chk-field">
          <div className="chk-field__head">
            <label htmlFor="chk-name">Full name</label>
            <span className="chk-field__req">Required</span>
          </div>
          <input
            id="chk-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Type your full name"
            required
          />
        </div>

        <div className="chk-field">
          <div className="chk-field__head">
            <label htmlFor="chk-email">Email</label>
            <span className="chk-field__req">Required</span>
          </div>
          <input
            id="chk-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="chk-field">
          <div className="chk-field__head">
            <label htmlFor="chk-phone">Phone</label>
            <span className="chk-field__req">Required</span>
          </div>
          <input
            id="chk-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* ── Order summary ── */}
        <h2 className="chk-legend chk-legend--spaced">Order summary</h2>

        <section className="chk-order" aria-label="Order summary">
          <div className="chk-order__row">
            <div className="chk-order__item">
              <p className="chk-order__name">{ORDER.name}</p>
              <p className="chk-order__meta">
                <span className="chk-order__badge">{ORDER.badge}</span>
                {ORDER.term} · Qty {ORDER.qty}
              </p>
            </div>
            <p className="chk-order__price">{ORDER.subtotal}</p>
          </div>

          <div className="chk-order__sub">
            <span>Subtotal</span>
            <span>{ORDER.subtotal}</span>
          </div>

          {/* The total gets the same type the landing page gives its
              headline stats — it's the most important number here. */}
          <div className="chk-order__total">
            <span className="chk-order__total-label">Total</span>
            <span className="chk-order__total-value">
              {ORDER.total}
              <span className="chk-order__total-currency">{ORDER.currency}</span>
            </span>
          </div>
        </section>

        {/* ── Payment ── */}
        <h2 className="chk-legend chk-legend--spaced">Payment</h2>

        <div className="chk-card">
          {CARD_ELEMENT_MOUNTED ? (
            // The provider's hosted card element mounts here.
            <div className="chk-card__mount" />
          ) : (
            <div className="chk-card__slot">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="5" width="19" height="14" rx="3" />
                <path d="M2.5 10h19" />
              </svg>
              <p className="chk-card__slot-title">Card element mounts here</p>
              <p className="chk-card__slot-note">
                Card number, expiry, CVC and country are rendered by the payment
                provider so card data never touches this page.
              </p>
            </div>
          )}
        </div>

        <p className="chk-secure">100% secure &amp; safe payments</p>

        {/* ── Consent ── */}
        <div className="chk-consent">
          <input id="chk-terms" name="terms" type="checkbox" required />
          <label htmlFor="chk-terms">
            By completing your purchase, you confirm that you have read and agree to
            our <a href="/terms-conditions">Terms and Conditions</a>, including our
            refund, cancellation, and pause policies.
          </label>
        </div>

        <button type="submit" className="chk-buy">
          <span className="chk-buy__spacer" aria-hidden="true" />
          <span className="chk-buy__label">Buy now</span>
          <span className="chk-buy__arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

      </form>

    </SplitLayout>
  );
}
