"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "#about", label: "درباره دکتر" },
  { href: "#testimonials", label: "نظرات بیماران" },
  { href: "#contact", label: "تماس" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(247,244,239,.86)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--cream-300)",
      }}
    >
      <nav
        aria-label="ناوبری اصلی"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Link
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Image
            src="/logo-eye-teal.png"
            alt="لوگوی مطب"
            width={42}
            height={42}
            style={{ borderRadius: 8, objectFit: "contain" }}
          />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
            <strong style={{ fontWeight: 700, fontSize: 16, color: "var(--teal-900)" }}>
              دکتر فرزانه آقامحمدی خامنه
            </strong>
            <em
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: 12,
                color: "var(--ink-500)",
              }}
            >
              M.D., Retina Subspecialist
            </em>
          </span>
        </Link>

        {/* desktop links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: 26,
            marginInlineStart: "auto",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: "var(--ink-700)", textDecoration: "none", padding: "4px 2px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--teal-600)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--ink-700)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          style={{
            marginInlineStart: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--coral-500)",
            color: "#fff",
            fontFamily: "var(--font-vazir), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            padding: "11px 22px",
            borderRadius: 14,
            textDecoration: "none",
            boxShadow: "0 6px 18px rgba(212,112,106,.28)",
            transition: "background .2s, transform .15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "var(--coral-600)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "var(--coral-500)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          رزرو نوبت
        </a>

        {/* hamburger for mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="منو"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "var(--teal-900)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M18 6 6 18M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* mobile drawer */}
      {menuOpen && (
        <div
          style={{
            background: "var(--cream-50)",
            borderTop: "1px solid var(--cream-300)",
            padding: "16px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--ink-700)",
                textDecoration: "none",
                padding: "10px 4px",
                fontSize: 16,
                fontWeight: 500,
                borderBottom: "1px solid var(--cream-300)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1000px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
