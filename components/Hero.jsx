"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "64px 28px 76px",
      }}
    >
      {/* background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -160,
          insetInlineStart: -150,
          width: 540,
          height: 540,
          borderRadius: "50%",
          background: "radial-gradient(circle at 60% 60%,rgba(168,213,218,.45),transparent 62%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 30,
          insetInlineStart: "28%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(222,192,121,.26),transparent 60%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>
        {/* text side */}
        <div className="animate-rise">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--gold-600)",
              marginBottom: 18,
            }}
          >
            <span style={{ width: 22, height: 1.5, background: "var(--gold-500)", display: "inline-block" }} />
            RETINA SUBSPECIALIST
          </span>

          <h1
            className="hero-h1"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px,4.6vw,56px)",
              lineHeight: 1.35,
              margin: "0 0 20px",
              color: "var(--teal-900)",
            }}
          >
            بینایی شما،<br />اولویت ماست
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "var(--ink-700)",
              maxWidth: "46ch",
              margin: "0 0 30px",
            }}
          >
            دکتر آقامحمدی، فوق‌تخصص بیماری‌های شبکیه، با سال‌ها تجربه در جراحی و درمان دقیق شبکیه، در فضایی آرام و مطمئن کنار شماست تا با خیال راحت سلامت چشمانتان را به دست‌های متخصص بسپارید.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 38 }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--coral-500)",
                color: "#fff",
                fontFamily: "var(--font-vazir), sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 28px",
                borderRadius: 14,
                textDecoration: "none",
                boxShadow: "0 8px 22px rgba(212,112,106,.3)",
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
              رزرو نوبت
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>

            <a
              href="#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "transparent",
                color: "var(--teal-600)",
                fontFamily: "var(--font-vazir), sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 26px",
                borderRadius: 14,
                textDecoration: "none",
                border: "1.5px solid var(--teal-300)",
                transition: "background .2s, border-color .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--teal-100)";
                e.currentTarget.style.borderColor = "var(--teal-600)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--teal-300)";
              }}
            >
              خدمات تخصصی
            </a>
          </div>

          {/* stats */}
          <div className="hero-stats" style={{ display: "flex", gap: 28, maxWidth: 520 }}>
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 34, color: "var(--teal-600)", lineHeight: 1 }}>۴۰٬۰۰۰+</div>
              <div style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 4 }}>بیمار مراجعه‌کننده</div>
            </div>
            <div style={{ width: 1.5, background: "linear-gradient(180deg,transparent,var(--gold-500),transparent)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 34, color: "var(--teal-600)", lineHeight: 1 }}>۷۸٪</div>
              <div style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 4 }}>رضایت بیماران</div>
            </div>
            <div style={{ width: 1.5, background: "linear-gradient(180deg,transparent,var(--gold-500),transparent)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 34, color: "var(--teal-600)", lineHeight: 1 }}>فوق‌تخصص</div>
              <div style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 4 }}>بیماری‌های شبکیه</div>
            </div>
          </div>
        </div>

        {/* image side */}
        <div className="hero-media" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "4% 6% 0 6%",
              background: "linear-gradient(135deg,var(--teal-600),var(--teal-900))",
              borderRadius: "46% 54% 52% 48%/52% 46% 54% 48%",
              transform: "rotate(-4deg)",
              boxShadow: "0 18px 48px rgba(14,74,77,.24)",
            }}
          />
          <Image
            src="/hero-clinic.jpg"
            alt="دکتر فرزانه آقامحمدی خامنه، فوق‌تخصص شبکیه، در مطب"
            width={520}
            height={426}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              height: "auto",
              aspectRatio: "1/.82",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 28,
              boxShadow: "0 0 0 6px var(--cream-100),0 0 0 7.5px var(--gold-500),0 18px 48px rgba(14,74,77,.24)",
            }}
            priority
          />
          <div
            style={{
              position: "absolute",
              bottom: 18,
              insetInlineStart: -6,
              display: "flex",
              alignItems: "center",
              gap: 11,
              background: "#fff",
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(26,107,114,.16)",
              border: "1px solid var(--cream-300)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--teal-600)",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
              </svg>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--teal-900)" }}>مراقبت با آرامش</strong>
              <em style={{ fontStyle: "normal", fontSize: 12, color: "var(--ink-500)" }}>رسمی اما صمیمی</em>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 52px;
          align-items: center;
        }
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .hero-media { order: -1; }
        }
        @media (max-width: 560px) {
          .hero-h1 { font-size: 34px !important; }
          .hero-stats { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
