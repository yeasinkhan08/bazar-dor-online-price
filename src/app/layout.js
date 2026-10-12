import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar, { NavbarSkeleton } from "@/components/Navbar";
import Ticker, { TickerSkeleton } from "@/components/Ticker";
// import Navbar from "@/components/Navbar";

// Bengali-friendly font from Google Fonts
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className={`${hind.variable} antialiased`}>
        {/* Components that load data go inside Suspense with a skeleton */}
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
