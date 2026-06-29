"use client";

import { useState, useCallback } from "react";

const problemTypes = [
  "جراحی شبکیه",
  "جداشدگی شبکیه",
  "دژنراسیون ماکولا",
  "تزریق داخل چشمی",
  "سایر موارد",
];

// ── Validators ────────────────────────────────────────────────
function validateName(v) {
  if (!v.trim()) return "نام و نام خانوادگی الزامی است.";
  if (v.trim().length < 3) return "نام باید حداقل ۳ کاراکتر باشد.";
  return "";
}

function validatePhone(v) {
  if (!v.trim()) return "شماره تماس الزامی است.";
  const digits = v.replace(/\D/g, "");
  if (!/^(09\d{9}|9\d{9})$/.test(digits) && !/^\d{8,15}$/.test(digits))
    return "شماره تماس معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
  return "";
}

function validateEmail(v) {
  if (!v.trim()) return "آدرس ایمیل الزامی است.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
    return "لطفاً یک آدرس ایمیل معتبر وارد کنید.";
  return "";
}

// ── Styles ────────────────────────────────────────────────────
function fieldBorder(hasError, focused) {
  if (hasError) return "1.5px solid #e05252";
  if (focused) return "1.5px solid var(--teal-600)";
  return "1.5px solid var(--cream-300)";
}

function baseInputStyle(hasError, focused) {
  return {
    width: "100%",
    fontFamily: "var(--font-vazir), sans-serif",
    fontSize: 15,
    padding: "13px 15px",
    border: fieldBorder(hasError, focused),
    borderRadius: 14,
    background: hasError ? "#fff8f8" : "#fff",
    color: "var(--ink-900)",
    direction: "rtl",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .15s, background .15s",
  };
}

// ── FieldError helper ─────────────────────────────────────────
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p
      role="alert"
      style={{
        margin: "6px 4px 0",
        fontSize: 13,
        color: "#c0392b",
        display: "flex",
        alignItems: "center",
        gap: 5,
        lineHeight: 1.5,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {msg}
    </p>
  );
}

// ── Component ─────────────────────────────────────────────────
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [problem, setProblem] = useState("جراحی شبکیه");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, email: false });
  const [focused, setFocused] = useState({ name: false, phone: false, email: false, message: false });

  const validators = { name: validateName, phone: validatePhone, email: validateEmail };

  const handleChange = useCallback((field) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field] ? validators[field](val) : "" }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => () => {
    setFocused((prev) => ({ ...prev, [field]: false }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }));
    }
  }, [values]);

  const handleFocus = useCallback((field) => () => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    // Validate all required fields
    const newErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
    };
    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true });

    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, eyeProblem: problem }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setServerError("متأسفیم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setValues({ name: "", phone: "", email: "", message: "" });
    setErrors({ name: "", phone: "", email: "" });
    setTouched({ name: false, phone: false, email: false });
    setFocused({ name: false, phone: false, email: false, message: false });
    setProblem("جراحی شبکیه");
    setServerError("");
  }

  return (
    <section id="contact" style={{ background: "var(--teal-900)", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: -120, insetInlineEnd: -120,
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(196,154,60,.16),transparent 62%)",
        }}
      />
      <div
        className="book-grid"
        style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "80px 28px" }}
      >
        {/* ── Left info ── */}
        <div style={{ color: "#EAF4F4" }}>
          <span style={{
            display: "block", fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 600, fontSize: 12, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--gold-300)", marginBottom: 12,
          }}>
            BOOK APPOINTMENT
          </span>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(28px,3.2vw,38px)", color: "#fff", margin: "0 0 16px" }}>
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
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,.06)", borderRadius: 14, padding: "14px 16px",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 40, height: 40, borderRadius: "50%",
                  background: "var(--teal-600)", color: "var(--gold-300)", flexShrink: 0,
                }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>`,
                  }}
                />
                <span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--gold-300)", marginBottom: 3 }}>{item.label}</span>
                  <span dir={item.ltr ? "ltr" : undefined} style={{
                    display: "block", fontSize: item.ltr ? 16 : 14.5,
                    lineHeight: 1.75, color: "#fff", textAlign: item.ltr ? "right" : undefined,
                  }}>
                    {item.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form card ── */}
        <div style={{
          background: "var(--cream-50)", borderRadius: 28, padding: "34px 32px",
          boxShadow: "0 18px 48px rgba(14,74,77,.24)", border: "1px solid var(--gold-500)",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "26px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 72, height: 72, borderRadius: "50%",
                background: "var(--teal-100)", color: "var(--teal-600)",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
                </svg>
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--teal-900)", margin: 0 }}>درخواست شما ثبت شد</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "var(--ink-700)", margin: 0, maxWidth: "34ch" }}>
                سپاسگزاریم. یک ایمیل تأیید به آدرس شما ارسال شد. همکاران ما به‌زودی برای هماهنگی زمان نوبت با شما تماس می‌گیرند.
              </p>
              <button type="button" onClick={resetForm} style={{
                background: "transparent", border: "1.5px solid var(--teal-300)",
                color: "var(--teal-600)", fontFamily: "var(--font-vazir), sans-serif",
                fontWeight: 600, fontSize: 15, padding: "11px 22px",
                borderRadius: 14, cursor: "pointer", marginTop: 4,
              }}>
                ثبت درخواست جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--teal-900)", margin: "0 0 2px" }}>فرم درخواست نوبت</h3>

              {/* Name */}
              <div>
                <label htmlFor="dreye-name" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>
                  نام و نام خانوادگی <span style={{ color: "#e05252" }}>*</span>
                </label>
                <input
                  id="dreye-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  onFocus={handleFocus("name")}
                  onBlur={handleBlur("name")}
                  placeholder="مثال: مریم رضایی"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  style={baseInputStyle(!!errors.name, focused.name)}
                />
                {errors.name && <FieldError msg={errors.name} />}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="dreye-phone" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>
                  شماره تماس <span style={{ color: "#e05252" }}>*</span>
                </label>
                <input
                  id="dreye-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  onFocus={handleFocus("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  aria-invalid={!!errors.phone}
                  style={baseInputStyle(!!errors.phone, focused.phone)}
                />
                {errors.phone && <FieldError msg={errors.phone} />}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="dreye-email" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>
                  آدرس ایمیل <span style={{ color: "#e05252" }}>*</span>
                </label>
                <input
                  id="dreye-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  onFocus={handleFocus("email")}
                  onBlur={handleBlur("email")}
                  placeholder="example@email.com"
                  aria-invalid={!!errors.email}
                  style={{ ...baseInputStyle(!!errors.email, focused.email), direction: "ltr", textAlign: "right" }}
                />
                {errors.email && <FieldError msg={errors.email} />}
              </div>

              {/* Eye problem (no validation — always has a value) */}
              <div>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 10 }}>نوع مشکل چشمی</span>
                <div role="group" aria-label="نوع مشکل چشمی" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {problemTypes.map((pt) => {
                    const on = pt === problem;
                    return (
                      <button key={pt} type="button" onClick={() => setProblem(pt)} aria-pressed={on} style={{
                        fontFamily: "var(--font-vazir), sans-serif", fontSize: 14,
                        padding: "9px 16px", borderRadius: 999, cursor: "pointer",
                        transition: "all .18s",
                        background: on ? "var(--teal-600)" : "#fff",
                        border: `1.5px solid ${on ? "var(--teal-600)" : "var(--cream-300)"}`,
                        color: on ? "#fff" : "var(--ink-700)",
                      }}>
                        {pt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message (optional) */}
              <div>
                <label htmlFor="dreye-msg" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 9 }}>
                  پیام <span style={{ fontSize: 12, fontWeight: 400, color: "var(--ink-500)" }}>(اختیاری)</span>
                </label>
                <textarea
                  id="dreye-msg"
                  name="message"
                  rows={3}
                  value={values.message}
                  onChange={handleChange("message")}
                  onFocus={handleFocus("message")}
                  onBlur={handleBlur("message")}
                  placeholder="در صورت تمایل، توضیح کوتاهی درباره وضعیت چشم خود بنویسید"
                  style={{ ...baseInputStyle(false, focused.message), resize: "vertical", lineHeight: 1.8 }}
                />
              </div>

              {/* Server-level error */}
              {serverError && (
                <p role="alert" style={{
                  fontSize: 14, color: "#c0392b", background: "#fdf0ef",
                  border: "1px solid #f5c6c4", borderRadius: 10,
                  padding: "12px 16px", margin: 0, lineHeight: 1.7,
                }}>
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
                  background: loading ? "var(--teal-600)" : "var(--coral-500)",
                  color: "#fff", fontFamily: "var(--font-vazir), sans-serif",
                  fontWeight: 700, fontSize: 16, padding: "15px 24px",
                  border: "none", borderRadius: 14,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 8px 22px rgba(212,112,106,.3)",
                  transition: "background .2s, transform .15s",
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseOver={(e) => { if (!loading) { e.currentTarget.style.background = "var(--coral-600)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseOut={(e) => { if (!loading) { e.currentTarget.style.background = "var(--coral-500)"; e.currentTarget.style.transform = "translateY(0)"; } }}
              >
                {loading ? "در حال ارسال..." : "رزرو نوبت"}
                {!loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                )}
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
