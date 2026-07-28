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
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Mobile dropdown open/close animation
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(
        el,
        { scaleY: 0.6, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.3, ease }
      );
    } else {
      gsap.to(el, { scaleY: 0.6, opacity: 0, duration: 0.2, ease: "power2.in" });
    }
  }, [menuOpen, ease]);

  const handlePillEnter = (i: number) => {
    const bg = bgRefs.current[i];
    const text = pillRefs.current[i]?.querySelector<HTMLSpanElement>(".pill-item__text");
    if (!bg) return;
    gsap.to(bg, { y: "0%", duration: 0.28, ease });
    if (text) gsap.to(text, { color: hoveredPillTextColor, duration: 0.18, ease });
  };

  const handlePillLeave = (i: number) => {
    const isActive = items[i]?.href === activeHref;
    if (isActive) return;
    const bg = bgRefs.current[i];
    const text = pillRefs.current[i]?.querySelector<HTMLSpanElement>(".pill-item__text");
    if (!bg) return;
    gsap.to(bg, { y: "110%", duration: 0.22, ease: "power2.in" });
    if (text) gsap.to(text, { color: pillTextColor, duration: 0.18, ease });
  };

  // Snap active pill on mount / activeHref change
  useEffect(() => {
    items.forEach((item, i) => {
      const bg = bgRefs.current[i];
      const text = pillRefs.current[i]?.querySelector<HTMLSpanElement>(".pill-item__text");
      if (!bg || !text) return;
      if (item.href === activeHref) {
        gsap.set(bg, { y: "0%" });
        gsap.set(text, { color: hoveredPillTextColor });
      } else {
        gsap.set(bg, { y: "110%" });
        gsap.set(text, { color: pillTextColor });
      }
    });
  }, [activeHref, hoveredPillTextColor, pillTextColor, items]);

  return (
    <>
      <nav ref={navRef} className="pill-nav">
        {/* Logo circle */}
        <div ref={logoRef} className="pill-logo-wrapper">
          <img src={logo} alt={logoAlt} className="pill-logo" />
        </div>

        {/* Desktop pill bar */}
        <div ref={barRef} className="pill-bar">
          {items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => { pillRefs.current[i] = el; }}
              className={`pill-item${item.href === activeHref ? " is-active" : ""}`}
              onMouseEnter={() => handlePillEnter(i)}
              onMouseLeave={() => handlePillLeave(i)}
              onClick={() => setMenuOpen(false)}
            >
              <div
                className="pill-item__bg"
                ref={(el) => { bgRefs.current[i] = el; }}
              />
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div ref={dropdownRef} className="pill-nav__mobile-dropdown">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`pill-item${item.href === activeHref ? " is-active" : ""}`}
              style={{ color: pillTextColor }}
              onClick={() => setMenuOpen(false)}
            >
              <div className="pill-item__bg" style={{ backgroundColor: pillColor }} />
              <span className="pill-item__text">{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
