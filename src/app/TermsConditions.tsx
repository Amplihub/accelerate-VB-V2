import React from "react";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Overview of Services",
    body: (
      <>
        <p>Accelerate by Editoz provides education, coaching, and strategic guidance designed to help entrepreneurs, creators, and founders build and grow their personal brands.</p>
        <p>Our Services may include:</p>
        <ul>
          <li>Personal brand growth frameworks</li>
          <li>Content strategy development</li>
          <li>Live coaching sessions and workshops</li>
          <li>Content review and feedback</li>
          <li>Access to community discussions</li>
          <li>Strategic frameworks for audience growth</li>
          <li>AI tools, templates, and content systems</li>
        </ul>
        <p>The purpose of Accelerate is to provide guidance, systems, and strategic frameworks designed to help clients grow their personal brand and online presence.</p>
        <p>Accelerate does not execute content creation on behalf of members unless explicitly stated in a separate Done-For-You agreement.</p>
      </>
    ),
  },
  {
    heading: "2. Nature of the Program (Coaching & Strategic Guidance)",
    body: (
      <>
        <p>Accelerate is a strategy and coaching program.</p>
        <p>We provide:</p>
        <ul>
          <li>Custom strategies</li>
          <li>Systems and frameworks</li>
          <li>Coaching and feedback</li>
        </ul>
        <p>However:</p>
        <ul>
          <li>Implementation and execution are the responsibility of the member.</li>
          <li>
            Success depends on factors including:
            <ul>
              <li>Your execution</li>
              <li>Market conditions</li>
              <li>Content consistency</li>
              <li>Audience response</li>
            </ul>
          </li>
          <li>We do not guarantee specific outcomes such as revenue, follower growth, or engagement metrics.</li>
          <li>Failure to execute strategies does not entitle the client to a refund.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Outcome-Driven Strategy",
    body: (
      <>
        <p>Accelerate may help clients design strategies aimed at achieving specific outcomes such as:</p>
        <ul>
          <li>Audience growth</li>
          <li>Lead generation</li>
          <li>Content reach</li>
          <li>Brand authority</li>
        </ul>
        <p>Examples may include:</p>
        <ul>
          <li>&ldquo;X leads in 90 days&rdquo;</li>
          <li>&ldquo;X views in 90 days&rdquo;</li>
          <li>&ldquo;Content growth targets&rdquo;</li>
        </ul>
        <p>These outcomes are strategic targets, not guarantees.</p>
        <p>Achieving results requires consistent execution by the client. Where a performance guarantee is offered, the Client must comply with the following requirements to remain eligible.</p>

        <h3>3.1 Minimum Posting Requirement</h3>
        <p>The Client must publish a minimum of two (2) pieces of content per week throughout the ninety (90) day program period. Failure to maintain this posting cadence may result in the Client becoming ineligible for the performance guarantee.</p>

        <h3>3.2 Content Makeup Requirement</h3>
        <p>If the Client is unable to film or provide content for a scheduled week, they must notify their assigned Product Owner before that week begins. The Client must then provide sufficient content for a minimum of three (3) posts the following week. Notifications made after the week has commenced or passed will not qualify.</p>

        <h3>3.3 Emergency Circumstances</h3>
        <p>In genuine emergency situations, Accelerate may, at its discretion, utilize previously recorded footage, B-roll, repurposed content, or alternative formats to maintain posting consistency. Alternatively, the Client may request a program pause in accordance with Section 6.2.</p>
      </>
    ),
  },
  {
    heading: "4. Membership & Subscription Terms",
    body: (
      <>
        <p>Accelerate operates on a recurring subscription model.</p>
        <p>When you join:</p>
        <ul>
          <li>You commit to a minimum 3-month subscription cycle.</li>
          <li>Payments are charged in advance for each billing cycle.</li>
          <li>Subscriptions automatically renew unless cancelled before the next billing cycle.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. Cancellation Policy",
    body: (
      <>
        <p>You may cancel your subscription at any time.</p>
        <p>However:</p>
        <ul>
          <li>Cancellation does not refund the current billing cycle.</li>
          <li>Your access will remain active until the end of the paid period.</li>
          <li>After cancellation, you will not be charged for future cycles.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "6. Refund Policy",
    body: (
      <>
        <p>Due to the nature of digital education, coaching, and strategic advisory services:</p>
        <ul>
          <li>All payments are non-refundable once the program has been accessed.</li>
          <li>Exceptions may be made at the sole discretion of Accelerate by Editoz.</li>
        </ul>

        <h3>6.1 Execution Responsibility & No Refund for Non-Execution</h3>
        <p>Project outcomes and success are directly dependent on the client&rsquo;s implementation and execution of the strategies, recommendations, and guidance provided.</p>
        <p>Failure or delay in execution by the client does not constitute a failure of service and does not qualify for any refund, partial refund, or chargeback.</p>
        <p>By engaging with the Services, the client acknowledges that results are contingent on their own actions and agrees that lack of execution is solely their responsibility.</p>

        <h3>6.2 Pause Policy</h3>
        <p>Accelerate may, at its discretion, allow members to temporarily pause their program under specific conditions.</p>
        <ul>
          <li>A pause request must be submitted with a valid reason (e.g. personal, health, or business constraints).</li>
          <li>If a member becomes unresponsive, Accelerate may reach out to confirm if they wish to pause or continue.</li>
          <li>If no response is received, Accelerate reserves the right to proceed with offboarding.</li>
        </ul>
        <p>Pause conditions:</p>
        <ul>
          <li>Each member is allowed one (1) pause only during their membership.</li>
          <li>The maximum pause duration is 30 days.</li>
          <li>Access to program materials, coaching, and community may be restricted during the pause period.</li>
          <li>The program will resume automatically after the pause period ends, unless otherwise agreed.</li>
        </ul>
        <p>Additional terms:</p>
        <ul>
          <li>A pause does not extend the original minimum commitment period unless explicitly approved.</li>
          <li>Pauses do not qualify for refunds or credits.</li>
          <li>Requests beyond the allowed limit (more than one pause or over 30 days) will not be approved.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "7. Client Responsibilities",
    body: (
      <>
        <p>To achieve the best results, members agree to:</p>
        <ul>
          <li>Execute strategies discussed during coaching sessions</li>
          <li>Attend or review program sessions</li>
          <li>Implement content strategies</li>
          <li>Engage with feedback provided</li>
          <li>Maintain respectful behavior within the community</li>
        </ul>
        <p>Failure to execute strategies may significantly impact results.</p>
        <p>Accelerate is not responsible for outcomes when strategies are not implemented.</p>
      </>
    ),
  },
  {
    heading: "8. Talent Introductions & Third-Party Services",
    body: (
      <>
        <p>Accelerate may introduce members to third-party service providers such as:</p>
        <ul>
          <li>Video editors</li>
          <li>Scriptwriters</li>
          <li>Content creators</li>
          <li>Designers</li>
          <li>Marketing professionals</li>
        </ul>
        <p>These individuals operate as independent third parties.</p>
        <p>Accelerate:</p>
        <ul>
          <li>Does not employ them</li>
          <li>Does not control their work</li>
          <li>Is not responsible for agreements made between members and third-party providers.</li>
        </ul>
        <p>All hiring decisions and payments to third-party providers are handled directly by the member.</p>
      </>
    ),
  },
  {
    heading: "9. Intellectual Property",
    body: (
      <>
        <p>All program materials are the intellectual property of Accelerate by Editoz, including:</p>
        <ul>
          <li>Frameworks</li>
          <li>Systems</li>
          <li>Templates</li>
          <li>Videos</li>
          <li>Documents</li>
          <li>Community content</li>
        </ul>
        <p>Members are granted a non-transferable license to use these materials for their personal brand or business.</p>
        <p>You may not:</p>
        <ul>
          <li>Resell program materials</li>
          <li>Repackage frameworks as your own product</li>
          <li>Distribute content publicly without permission.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "10. Community Guidelines",
    body: (
      <>
        <p>Members agree to maintain a respectful environment.</p>
        <p>Prohibited behavior includes:</p>
        <ul>
          <li>Harassment</li>
          <li>Discrimination</li>
          <li>Spam or unsolicited promotions</li>
          <li>Sharing confidential program materials externally</li>
        </ul>
        <p>Accelerate reserves the right to remove members who violate these guidelines without refund.</p>
      </>
    ),
  },
  {
    heading: "11. Limitation of Liability",
    body: (
      <>
        <p>To the fullest extent permitted by law:</p>
        <p>Accelerate by Editoz shall not be liable for:</p>
        <ul>
          <li>Business losses</li>
          <li>Revenue loss</li>
          <li>Audience growth outcomes</li>
          <li>Platform algorithm changes</li>
          <li>Third-party service provider actions</li>
        </ul>
        <p>You acknowledge that participation in the program involves entrepreneurial risk.</p>
      </>
    ),
  },
  {
    heading: "12. Confidentiality",
    body: (
      <>
        <p>Both parties agree to maintain confidentiality regarding:</p>
        <ul>
          <li>Business strategies</li>
          <li>Proprietary frameworks</li>
          <li>Private community discussions</li>
        </ul>
        <p>Members may not publicly disclose internal program materials without written permission.</p>
      </>
    ),
  },
  {
    heading: "13. Program Modifications",
    body: (
      <>
        <p>Accelerate reserves the right to:</p>
        <ul>
          <li>Modify program structure</li>
          <li>Update frameworks</li>
          <li>Change coaching schedules</li>
          <li>Improve course materials</li>
        </ul>
        <p>These changes are made to improve the program experience.</p>
      </>
    ),
  },
  {
    heading: "14. Termination",
    body: (
      <>
        <p>Accelerate reserves the right to terminate access if a member:</p>
        <ul>
          <li>Violates these Terms</li>
          <li>Engages in abusive behavior</li>
          <li>Misuses program materials</li>
        </ul>
        <p>No refunds will be issued in such cases.</p>
      </>
    ),
  },
  {
    heading: "15. Governing Law",
    body: (
      <p>These Terms are governed by the laws of Australia, and any disputes will be subject to the jurisdiction of courts located in South Australia.</p>
    ),
  },
  {
    heading: "16. Contact",
    body: (
      <>
        <p>If you have questions regarding these Terms, please contact:</p>
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

export default function TermsConditions() {
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
          Terms and Conditions
        </h1>
        <p className="text-center mt-3" style={{ color: "#9CA3AF", fontSize: 13 }}>
          Last Updated: 24th June 2026
        </p>

        <p className="mt-8 leading-relaxed" style={{ color: "#5B5F66", fontSize: 15.5 }}>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Accelerate by Editoz website, programs, and services (&ldquo;Services&rdquo;). By purchasing, accessing, or using our Services, you agree to be bound by these Terms.
        </p>
        <p className="leading-relaxed" style={{ color: "#5B5F66", fontSize: 15.5 }}>
          If you do not agree with these Terms, please do not use our Services.
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
              <div className="acc-terms-body" style={{ color: "#5B5F66", fontSize: 15, lineHeight: 1.7 }}>
                {section.body}
              </div>
            </section>
          ))}
        </div>

      </div>

      <style>{`
        .acc-terms-body p { margin: 0 0 10px; }
        .acc-terms-body p:last-child { margin-bottom: 0; }
        .acc-terms-body ul { margin: 0 0 10px; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
        .acc-terms-body ul ul { margin-top: 6px; margin-bottom: 0; }
        .acc-terms-body h3 { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15.5px; color: #111111; letter-spacing: -0.005em; margin: 14px 0 6px; }
        .acc-terms-body a { color: #1A56DB; font-weight: 600; text-decoration: none; }
        .acc-terms-body a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
