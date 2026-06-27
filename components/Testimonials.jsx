const testimonials = [
  {
    quote: "بعد از جراحی شبکیه، بینایی‌ام به شکل چشمگیری بهتر شد. آرامش و توضیحات کامل دکتر باعث شد تمام ترسم از عمل از بین برود.",
    name: "مریم",
    treatment: "جراحی شبکیه",
    initial: "م",
  },
  {
    quote: "برای درمان دژنراسیون ماکولا مراجعه کردم. برخورد صبورانه و پیگیری دقیق روند درمان واقعاً برایم ارزشمند بود.",
    name: "حسین",
    treatment: "درمان دژنراسیون ماکولا",
    initial: "ح",
  },
  {
    quote: "تزریق داخل چشمی با کمترین استرس انجام شد. حس کردم سلامت چشمم برای دکتر و تیمشان واقعاً مهم است.",
    name: "زهرا",
    treatment: "تزریق داخل چشمی",
    initial: "ز",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ maxWidth: 1180, margin: "0 auto", padding: "78px 28px" }}
    >
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8px" }}>
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
          PATIENT STORIES
        </span>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(28px,3.2vw,38px)",
            color: "var(--teal-900)",
            margin: "0 0 14px",
          }}
        >
          نظرات بیماران ما
        </h2>
        <div
          aria-hidden="true"
          style={{
            height: 1.5,
            width: 140,
            margin: "0 auto",
            background: "linear-gradient(90deg,transparent,var(--gold-500),transparent)",
          }}
        />
      </div>

      <div className="tst-grid" style={{ marginTop: 44 }}>
        {testimonials.map((t) => (
          <figure
            key={t.name}
            style={{
              background: "#fff",
              border: "1px solid var(--cream-300)",
              borderRadius: 20,
              padding: "30px 28px",
              boxShadow: "0 10px 30px rgba(14,74,77,.06)",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 54,
                lineHeight: 0.6,
                color: "var(--gold-300)",
              }}
            >
              &rdquo;
            </span>
            <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.95, color: "var(--ink-900)" }}>
              {t.quote}
            </blockquote>
            <figcaption
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderTop: "1px solid var(--cream-300)",
                paddingTop: 16,
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "var(--teal-600)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                {t.initial}
              </span>
              <span>
                <strong style={{ display: "block", fontSize: 15, fontWeight: 700, color: "var(--teal-900)" }}>
                  {t.name}
                </strong>
                <span style={{ display: "block", fontSize: 13, color: "var(--gold-600)" }}>
                  {t.treatment}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <style>{`
        .tst-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 1000px) {
          .tst-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
