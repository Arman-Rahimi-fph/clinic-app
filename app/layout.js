import { Vazirmatn, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vazir",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "دکتر فرزانه آقامحمدی خامنه | فوق‌تخصص شبکیه",
  description:
    "مطب دکتر فرزانه آقامحمدی خامنه، فوق‌تخصص بیماری‌های شبکیه و جراحی چشم در تهران. رزرو نوبت آنلاین.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${cormorant.variable} ${montserrat.variable}`}
    >
      <body
        style={{
          fontFamily: "var(--font-vazir), Tahoma, sans-serif",
          background: "var(--cream-100)",
          color: "var(--ink-900)",
          margin: 0,
          overflowX: "hidden",
        }}
      >
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
