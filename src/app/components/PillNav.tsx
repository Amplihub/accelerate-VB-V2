import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items?: NavItem[];
  activeHref?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  pillTextColor?: string;
  hoveredPillTextColor?: string;
  initialLoadAnimation?: boolean;
}

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref,
  ease = "power3.out",
  baseColor = "#1A56DB",
  pillColor = "#ffffff",
  pillTextColor = "#111111",
  hoveredPillTextColor = "#ffffff",
  initialLoadAnimation = true,
}: PillNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  // CSS custom properties → colour tokens consumed by .css
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    el.style.setProperty("--nav-base-color", baseColor);
    el.style.setProperty("--nav-pill-color", pillColor);
    el.style.setProperty("--nav-pill-text-color", pillTextColor);
    el.style.setProperty("--nav-hovered-text-color", hoveredPillTextColor);
  }, [baseColor, pillColor, pillTextColor, hoveredPillTextColor]);

  // Initial load animation
  useEffect(() => {
    if (!initialLoadAnimation) return;
    const targets = [logoRef.current, barRef.current].filter(Boolean);
    gsap.fromTo(
      targets,
      { opacity: 0, scale: 0.82, y: -8 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease,
        stagger: 0.08,
        clearProps: "transform",
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile drawer open/close animation — slides in from the right, links
  // stagger in just behind the panel itself.
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(el, { x: "100%" }, { x: "0%", duration: 0.4, ease });
      const items = el.querySelectorAll(".pill-nav__drawer-link, .pill-nav__drawer-cta");
      gsap.fromTo(
        items,
        { opacity: 0, x: 14 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, delay: 0.12, ease }
      );
    } else {
      gsap.to(el, { x: "100%", duration: 0.3, ease: "power2.in" });
    }
  }, [menuOpen, ease]);

  // Hover fill is pure CSS now (see PillNav.css) — gated to devices that
  // actually have a hovering mouse, so a tap can never leave a pill "stuck"
  // filled the way a JS mouseenter/mouseleave pair could.

  return (
    <>
      <nav ref={navRef} className="pill-nav">
        {/* Logo circle */}
        <div ref={logoRef} className="pill-logo-wrapper">
          <img src={logo} alt={logoAlt} className="pill-logo" />
        </div>

        {/* Desktop pill bar */}
        <div ref={barRef} className="pill-bar">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`pill-item${item.href === activeHref ? " is-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <div className="pill-item__bg" />
              <span className="pill-item__text">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`pill-nav__hamburger${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Backdrop — blurs the rest of the page while the mobile menu is open,
          and doubles as a tap-outside-to-close target. */}
      {menuOpen && (
        <div
          className="pill-nav__backdrop"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer — slides in from the right */}
      {menuOpen && (
        <div ref={dropdownRef} className="pill-nav__drawer">
          <div className="pill-nav__drawer-header">
            <img src={logo} alt={logoAlt} className="pill-nav__drawer-logo" />
            <button
              type="button"
              className="pill-nav__drawer-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="pill-nav__drawer-links">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`pill-nav__drawer-link${item.href === activeHref ? " is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                <svg className="pill-nav__drawer-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </nav>

          <a href="#contact" className="pill-nav__drawer-cta" onClick={() => setMenuOpen(false)}>
            Book a Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}
