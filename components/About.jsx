import Image from "next/image";

const trustPoints = [
  {
    title: "فوق‌تخصص شبکیه",
    sub: "تمرکز کامل بر بیماری‌های شبکیه و چشم",
    icon: '<path d="M20 6 9 17l-5-5"></path>',
  },
  {
    title: "۴۰٬۰۰۰+ بیمار",
    sub: "اعتماد بیماران در سال‌های متمادی",
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>',
  },
  {
    title: "۷۸٪ رضایت بیماران",
    sub: "بازخوردهای مثبت و پایدار",
    icon: '<path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>',
  },
  {
    title: "تجهیزات پیشرفته",
    sub: "فناوری دقیق تشخیصی و درمانی",
    icon: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>',
  },
];

export default function About() {
  return (
    <section id="about" style={{ background: "var(--cream-200)" }}>
      <div
        className="about-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "78px 28px",
        }}
      >
        {/* image */}
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-14px -14px 14px 14px",
              border: "1.5px solid var(--gold-500)",
              borderRadius: 28,
              zIndex: 0,
            }}
          />
          <Image
            src="/dr-portrait.jpg"
            alt="پرتره دکتر فرزانه آقامحمدی خامنه"
            width={600}
            height={750}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "auto",
              borderRadius: 24,
              boxShadow: "0 18px 48px rgba(14,74,77,.18)",
              display: "block",
            }}
          />
        </div>

        {/* text */}
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--gold-600)",
              marginBottom: 12,
            }}
          >
            WHY CHOOSE US
          </span>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px,3.2vw,38px)",
              color: "var(--teal-900)",
              margin: "0 0 16px",
            }}
          >
            چرا دکتر آقامحمدی؟
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: "var(--ink-700)",
              margin: "0 0 26px",
              maxWidth: "48ch",
            }}
          >
            انتخاب پزشک شبکیه، انتخابی است که آرامش خاطر می‌خواهد. تخصص عمیق، تجربه‌ی گسترده و تجهیزات دقیق تشخیصی در کنار رویکردی انسانی، هر مراجعه را به تجربه‌ای مطمئن تبدیل می‌کند.
          </p>

          <div className="trust-grid">
            {trustPoints.map((tp) => (
              <div
                key={tp.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 13,
                  background: "var(--cream-50)",
                  border: "1px solid var(--cream-300)",
                  borderRadius: 14,
                  padding: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--gold-100)",
                    color: "var(--gold-700)",
                    flexShrink: 0,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${tp.icon}</svg>`,
                  }}
                />
                <span>
                  <strong style={{ display: "block", fontSize: 16, fontWeight: 700, color: "var(--teal-900)", lineHeight: 1.5 }}>
                    {tp.title}
                  </strong>
                  <span style={{ display: "block", fontSize: 13.5, color: "var(--ink-500)", lineHeight: 1.7, marginTop: 3 }}>
                    {tp.sub}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 17,
              color: "var(--teal-600)",
              borderTop: "1px solid var(--cream-300)",
              paddingTop: 18,
              margin: "24px 0 0",
            }}
          >
            M.D., Retina Fellowship · Vitreoretinal Surgery · Tehran
          </p>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: .92fr 1.08fr;
          gap: 54px;
          align-items: center;
        }
        .trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 1000px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .trust-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
