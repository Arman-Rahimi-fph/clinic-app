"use client";

import { useState } from "react";

const problemTypes = [
  "جراحی شبکیه",
  "جداشدگی شبکیه",
  "دژنراسیون ماکولا",
  "تزریق داخل چشمی",
  "سایر موارد",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [problem, setProblem] = useState("جراحی شبکیه");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" style={{ background: "var(--teal-900)", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          insetInlineEnd: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(196,154,60,.16),transparent 62%)",
        }}
      />
      <div
        className="book-grid"
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "80px 28px",
        }}
      >
        {/* left info */}
        <div style={{ color: "#EAF4F4" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--gold-300)",
              marginBottom: 12,
            }}
          >
            BOOK APPOINTMENT
          </span>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px,3.2vw,38px)",
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            نوبت خود را رزرو کنید
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.95, color: "#cfe2e2", margin: "0 0 30px", maxWidth: "42ch" }}>
            فرم زیر را تکمیل کنید تا همکاران ما در اولین فرصت برای هماهنگی زمان مراجعه با شما تماس بگیرند.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle>',
                label: "آدرس مطب",
                value: "تهران، اقدسیه، ابتدای بلوار ارتش، ورودی اراج، خیابان ۲۲ بهمن، پلاک ۲۱",
                ltr: false,
              },
              {
                icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z"></path>',
                label: "شماره تماس",
                value: "۰۲۱-۲۹۱۲۰۰۰۰",
                ltr: true,
              },
              {
                icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',
                label: "ساعات کاری",
                value: "شنبه تا چهارشنبه: ۹ صبح تا ۷ عصر · پنجشنبه: ۹ تا ۲",
                ltr: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(255,255,255,.06)",
                  borderRadius: 14,
                  padding: "14px 16px",
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
                    color: "var(--gold-300)",
                    flexShrink: 0,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>`,
                  }}
                />
                <span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--gold-300)", marginBottom: 3 }}>{item.label}</span>
                  <span
                    dir={item.ltr ? "ltr" : undefined}
                    style={{
                      display: "block",
                      fontSize: item.ltr ? 16 : 14.5,
                      lineHeight: 1.75,
                      color: "#fff",
                      textAlign: item.ltr ? "right" : undefined,
                    }}
                  >
                    {item.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* form card */}
        <div
          style={{
            background: "var(--cream-50)",
            borderRadius: 28,
            padding: "34px 32px",
            boxShadow: "0 18px 48px rgba(14,74,77,.24)",
            border: "1px solid var(--gold-500)",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "26px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--teal-100)",
                  color: "var(--teal-600)",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
                </svg>
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--teal-900)", margin: 0 }}>درخواست شما ثبت شد</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "var(--ink-700)", margin: 0, maxWidth: "34ch" }}>
                سپاسگزاریم. همکاران ما به‌زودی برای هماهنگی زمان نوبت با شما تماس می‌گیرند.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--teal-300)",
                  color: "var(--teal-600)",
                  fontFamily: "var(--font-vazir), sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "11px 22px",
                  borderRadius: 14,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                ثبت درخواست جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }} noValidate>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--teal-900)", margin: "0 0 2px" }}>فرم درخواست نوبت</h3>

              <div>
                <label htmlFor="dreye-name" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>نام و نام خانوادگی</label>
                <input
                  id="dreye-name"
                  name="name"
                  type="text"
                  required
                  placeholder="مثال: مریم رضایی"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-vazir), sans-serif",
                    fontSize: 15,
                    padding: "13px 15px",
                    border: "1.5px solid var(--cream-300)",
                    borderRadius: 14,
                    background: "#fff",
                    color: "var(--ink-900)",
                    direction: "rtl",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal-600)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--cream-300)")}
                />
              </div>

              <div>
                <label htmlFor="dreye-phone" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>شماره تماس</label>
                <input
                  id="dreye-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-vazir), sans-serif",
                    fontSize: 15,
                    padding: "13px 15px",
                    border: "1.5px solid var(--cream-300)",
                    borderRadius: 14,
                    background: "#fff",
                    color: "var(--ink-900)",
                    direction: "rtl",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal-600)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--cream-300)")}
                />
              </div>

              <div>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 10 }}>نوع مشکل چشمی</span>
                <div role="group" aria-label="نوع مشکل چشمی" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {problemTypes.map((pt) => {
                    const on = pt === problem;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setProblem(pt)}
                        aria-pressed={on}
                        style={{
                          fontFamily: "var(--font-vazir), sans-serif",
                          fontSize: 14,
                          padding: "9px 16px",
                          borderRadius: 999,
                          cursor: "pointer",
                          transition: "all .18s",
                          background: on ? "var(--teal-600)" : "#fff",
                          border: `1.5px solid ${on ? "var(--teal-600)" : "var(--cream-300)"}`,
                          color: on ? "#fff" : "var(--ink-700)",
                        }}
                      >
                        {pt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="dreye-msg" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>پیام (اختیاری)</label>
                <textarea
                  id="dreye-msg"
                  name="message"
                  rows={3}
                  placeholder="در صورت تمایل، توضیح کوتاهی درباره وضعیت چشم خود بنویسید"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-vazir), sans-serif",
                    fontSize: 15,
                    padding: "13px 15px",
                    border: "1.5px solid var(--cream-300)",
                    borderRadius: 14,
                    background: "#fff",
                    color: "var(--ink-900)",
                    direction: "rtl",
                    resize: "vertical",
                    lineHeight: 1.8,
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal-600)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--cream-300)")}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  background: "var(--coral-500)",
                  color: "#fff",
                  fontFamily: "var(--font-vazir), sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "15px 24px",
                  border: "none",
                  borderRadius: 14,
                  cursor: "pointer",
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
              </button>
              <p style={{ fontSize: 12, color: "var(--ink-500)", textAlign: "center", lineHeight: 1.7, margin: 0 }}>
                با ثبت این فرم، همکاران ما برای هماهنگی نوبت با شما تماس می‌گیرند.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .book-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 54px;
          align-items: start;
        }
        @media (max-width: 1000px) {
          .book-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
