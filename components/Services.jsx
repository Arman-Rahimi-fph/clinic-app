"use client";

const services = [
  {
    title: "جراحی شبکیه",
    desc: "جراحی دقیق و تخصصی شبکیه با تجهیزات پیشرفته و کمترین آسیب.",
    icon: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle><path d="m17 17 3 3"></path>',
  },
  {
    title: "معاینه چشم‌پزشکی",
    desc: "معاینه جامع چشم برای تشخیص زودهنگام و پیشگیری از بیماری‌ها.",
    icon: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>',
  },
  {
    title: "درمان دژنراسیون ماکولا",
    desc: "مدیریت و درمان تخریب ماکولا برای حفظ بینایی مرکزی شما.",
    icon: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="4"></circle><circle cx="12" cy="12" r="1"></circle>',
  },
  {
    title: "درمان جداشدگی شبکیه",
    desc: "تشخیص و درمان فوری جداشدگی شبکیه برای جلوگیری از کاهش بینایی.",
    icon: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><path d="M9 9l6 6M15 9l-6 6"></path>',
  },
  {
    title: "تزریق داخل چشمی",
    desc: "تزریق داروهای تخصصی داخل چشم برای کنترل بیماری‌های شبکیه.",
    icon: '<path d="m18 2 4 4M17 7 7 17M14 4l6 6M9 11l4 4M5 19l-3 3 1-4 9-9 3 3-9 9Z"></path>',
  },
  {
    title: "مشاوره تخصصی",
    desc: "مشاوره دقیق و صبورانه برای انتخاب بهترین مسیر درمان شما.",
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"></path>',
  },
];

function ServiceCard({ title, desc, icon }) {
  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid var(--cream-300)",
        borderRadius: 20,
        padding: "30px 26px",
        boxShadow: "0 10px 30px rgba(14,74,77,.06)",
        transition: "transform .22s, box-shadow .22s, border-color .22s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(14,74,77,.12)";
        e.currentTarget.style.borderColor = "var(--gold-500)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(14,74,77,.06)";
        e.currentTarget.style.borderColor = "var(--cream-300)";
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 54,
          height: 54,
          borderRadius: 14,
          background: "var(--teal-100)",
          color: "var(--teal-600)",
          marginBottom: 18,
        }}
        dangerouslySetInnerHTML={{
          __html: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`,
        }}
      />
      <h3 style={{ fontWeight: 700, fontSize: 20, margin: "0 0 9px", color: "var(--teal-900)" }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--ink-700)", margin: 0 }}>{desc}</p>
    </article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 28px" }}
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
          OUR SERVICES
        </span>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(28px,3.2vw,38px)",
            color: "var(--teal-900)",
            margin: "0 0 14px",
          }}
        >
          خدمات تخصصی چشم و شبکیه
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

      <div className="svc-grid" style={{ marginTop: 44 }}>
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 1000px) {
          .svc-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .svc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
