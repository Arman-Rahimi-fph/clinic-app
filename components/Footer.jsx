"use client";

import Image from "next/image";

const navLinks = [
  { href: "#services", label: "خدمات" },
  { href: "#about", label: "درباره دکتر" },
  { href: "#testimonials", label: "نظرات بیماران" },
  { href: "#contact", label: "رزرو نوبت" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--teal-900)", borderTop: "1.5px solid rgba(222,192,121,.42)", color: "#cfe2e2" }}>
      <div
        className="ft-grid"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 28px 36px" }}
      >
        {/* brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Image src="/logo-eye-teal.png" alt="" width={48} height={48} style={{ borderRadius: 8, objectFit: "contain" }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
              <strong style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>دکتر فرزانه آقامحمدی خامنه</strong>
              <em style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 12, color: "var(--gold-300)" }}>
                M.D., Retina Subspecialist
              </em>
            </span>
          </div>
          <p style={{ lineHeight: 1.95, color: "#cfe2e2", fontSize: 14, margin: 0, maxWidth: "40ch" }}>
            فوق‌تخصص بیماری‌های شبکیه و جراحی چشم در تهران. مراقبتی دقیق و انسانی برای سلامت بینایی شما.
          </p>
        </div>

        {/* quick links */}
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>دسترسی سریع</h4>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }} aria-label="پیوندهای پاورقی">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{ color: "#cfe2e2", fontSize: 14, padding: "6px 0", textDecoration: "none", transition: "color .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--gold-300)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#cfe2e2")}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* contact */}
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>تماس با مطب</h4>
          <p style={{ lineHeight: 1.95, color: "#cfe2e2", fontSize: 14, margin: "0 0 12px" }}>
            تهران، اقدسیه، ابتدای بلوار ارتش، ورودی اراج، خیابان ۲۲ بهمن، پلاک ۲۱
          </p>
          <p dir="ltr" style={{ fontSize: 15, color: "#fff", margin: 0, textAlign: "right" }}>۰۲۱-۲۹۱۲۰۰۰۰</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", textAlign: "center", padding: 18, fontSize: 13, color: "#a9c4c4" }}>
        © ۱۴۰۵ دکتر فرزانه آقامحمدی خامنه — تمامی حقوق محفوظ است.
      </div>

      <style>{`
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.1fr;
          gap: 44px;
        }
        @media (max-width: 1000px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
