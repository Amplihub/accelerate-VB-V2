import React from "react";
import "./FunnelFooter.css";

/* The legal strip every funnel page carries. Shared so the pages
   can't drift apart. */
export default function FunnelFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="fnf">
      <span className="fnf__copy">© {year} Accelerate. All rights reserved.</span>
      <span className="fnf__links">
        <a href="/privacy-policy">Privacy Policy</a>
        <span aria-hidden="true">·</span>
        <a href="/terms-conditions">Terms and Conditions</a>
      </span>
    </footer>
  );
}
