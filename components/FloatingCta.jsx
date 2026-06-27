"use client";

import { useEffect, useState } from "react";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#contact"
      aria-label="رزرو نوبت"
      style={{
        position: "fixed",
        bottom: 22,
        insetInlineStart: 22,
        zIndex: 70,
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "var(--coral-500)",
        color: "#fff",
        fontFamily: "var(--font-vazir), sans-serif",
        fontWeight: 700,
        fontSize: 15,
        padding: "13px 22px",
        borderRadius: 999,
        textDecoration: "none",
        boxShadow: "0 10px 28px rgba(212,112,106,.4)",
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
  );
}
