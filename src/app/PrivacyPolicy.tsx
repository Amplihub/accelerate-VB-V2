import React from "react";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "A. Information We Collect",
    body: (
      <>
        <p>We collect and process personal data necessary to provide and improve our services effectively. This may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Social media handles</li>
          <li>Business name and location</li>
          <li>Payment and billing information (processed through secure third-party providers like Stripe or PayPal)</li>
          <li>Website activity data (such as IP address, browser type, and access times)</li>
          <li>Engagement data (such as community participation and course progress)</li>
        </ul>
        <p>We do not collect personal data unless voluntarily provided by the user. However, certain information is required to access our services.</p>
      </>
    ),
  },
  {
    heading: "B. How We Use Your Personal Data",
    body: (
      <>
        <p>Your personal data is collected and used for the following purposes:</p>
        <ul>
          <li>To provide and improve our services, including content, community engagement, and learning resources.</li>
          <li>To communicate with you regarding account updates, promotions, and customer support.</li>
          <li>To process payments and verify transactions securely.</li>
          <li>To track user engagement and improve platform functionality.</li>
          <li>To ensure compliance with legal and regulatory requirements.</li>
          <li>To personalize your experience based on usage patterns and preferences.</li>
        </ul>
        <p>Your data will only be used for the stated purposes. If we intend to use it for any other purpose, we will seek your consent unless otherwise permitted by law.</p>
      </>
    ),
  },
  {
    heading: "C. Sharing Your Data with Third Parties",
    body: (
      <>
        <p>We do not sell or rent personal data to third parties. However, we may share your data in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We use third-party vendors (e.g., payment processors, hosting providers, and analytics tools) to assist in platform operations. These vendors are contractually obligated to protect your data.</li>
          <li><strong>Legal Compliance:</strong> We may disclose your data if required by law, regulatory authorities, or to protect our rights, safety, and property.</li>
          <li><strong>Advertising &amp; Marketing Partners:</strong> We may share anonymized or aggregated data with advertising partners to enhance marketing campaigns while ensuring no personally identifiable information is disclosed.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "D. Tracking User Behavior & Advertising Disclosures",
    body: (
      <>
        <p>We track user interactions within our platform to optimize services and improve marketing effectiveness. This includes:</p>
        <ul>
          <li>Monitoring website and platform usage patterns.</li>
          <li>Using cookies, pixels, and tracking technologies for advertising purposes.</li>
          <li>Analyzing course engagement and community activity.</li>
          <li>Retargeting ads based on prior interactions with our content.</li>
        </ul>
        <p><strong>Advertising Protection:</strong> While we may use advertising to promote our services, we do not guarantee specific results from ad performance. Users should be aware that paid promotions are for informational purposes only and do not constitute a contractual guarantee of performance or earnings.</p>
        <p>You can manage cookie preferences through your browser settings. Opting out of advertising does not prevent general communication from us.</p>
      </>
    ),
  },
  {
    heading: "E. Communication and Marketing Preferences",
    body: (
      <>
        <p>We may send emails and notifications regarding service updates, promotions, and industry insights. If you wish to opt out, you can:</p>
        <ul>
          <li>Click the &ldquo;unsubscribe&rdquo; link in our emails.</li>
          <li>Adjust communication preferences in your account settings.</li>
          <li>Contact us at <a href="mailto:hello@editozclub.com">hello@editozclub.com</a> to request removal from marketing lists.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "F. Data Security",
    body: (
      <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
    ),
  },
  {
    heading: "G. Data Retention",
    body: (
      <p>We retain your personal data as long as necessary for business, legal, or compliance purposes. When no longer needed, we securely delete or anonymize your data.</p>
    ),
  },
  {
    heading: "H. Your Rights",
    body: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal data.</li>
          <li>Withdraw consent for processing where applicable.</li>
          <li>Object to data processing for specific purposes.</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:hello@editozclub.com">hello@editozclub.com</a>. We will respond within a reasonable timeframe.</p>
      </>
    ),
  },
  {
    heading: "I. Changes to This Policy",
    body: (
      <p>We reserve the right to update this Privacy Policy periodically. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Continued use of our services constitutes acceptance of these changes.</p>
    ),
  },
  {
    heading: "J. Contact Information",
    body: (
      <>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <ul>
          <li>Address: 24 Oregon Avenue, Andrews Farm, SA, 5114</li>
          <li>Phone: +1 877-801-1115</li>
          <li>Email: <a href="mailto:hello@editozclub.com">hello@editozclub.com</a></li>
          <li>Website: <a href="https://accelerate-editoz.com/">https://accelerate-editoz.com/</a></li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="max-w-[800px] mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-20">

        <a
          href="/"
          className="inline-flex items-center gap-1.5 font-semibold hover:opacity-75 transition-opacity duration-150"
          style={{ fontSize: 13, color: "#1A56DB" }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7L9 3" stroke="#1A56DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </a>

        <div className="flex justify-center mt-8 mb-5">
          <span
            className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
            style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
          >
            Legal
          </span>
        </div>

        <h1
          className="font-extrabold text-foreground text-center"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Privacy Policy
        </h1>
        <p className="text-center mt-3" style={{ color: "#9CA3AF", fontSize: 13 }}>
          Last Updated: 2025.03.01
        </p>

        <p className="mt-8 leading-relaxed" style={{ color: "#5B5F66", fontSize: 15.5 }}>
          This Privacy Policy (&ldquo;Policy&rdquo;) describes how Accelerate by Editoz (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects the personal data of our users. By accessing our website or using our services, you consent to the practices described in this Policy. This Policy is intended to comply with applicable privacy laws and regulations, and it is specifically governed by the laws of Australia.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2
                className="font-bold text-[#111111]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 19, letterSpacing: "-0.01em", marginBottom: 10 }}
              >
                {section.heading}
              </h2>
              <div className="acc-privacy-body" style={{ color: "#5B5F66", fontSize: 15, lineHeight: 1.7 }}>
                {section.body}
              </div>
            </section>
          ))}
        </div>

      </div>

      <style>{`
        .acc-privacy-body p { margin: 0 0 10px; }
        .acc-privacy-body p:last-child { margin-bottom: 0; }
        .acc-privacy-body ul { margin: 0 0 10px; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
        .acc-privacy-body a { color: #1A56DB; font-weight: 600; text-decoration: none; }
        .acc-privacy-body a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
