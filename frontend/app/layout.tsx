import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/components/layout/StoreProvider";
import { ClickTracker } from "@/components/tracking/ClickTracker";
import { TrackingProvider } from "@/components/tracking/TrackingProvider";
import { siteConfig } from "@/config/site";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "لاميس | مكملات جمال مصرحة من ONSSA",
    template: "%s | لاميس",
  },
  description: siteConfig.metaDescription,
  metadataBase: new URL(siteConfig.url),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp" },
    ],
    apple: [{ url: "/favicon.webp", type: "image/webp" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: siteConfig.url,
    siteName: "لاميس",
    title: "لاميس | مكملات جمال مصرحة من ONSSA",
    description: siteConfig.metaDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "لاميس | مكملات جمال مصرحة من ONSSA",
    description: siteConfig.metaDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${tajawal.variable} ${inter.variable}`}
      >
        <StoreProvider>
          <TrackingProvider />
          <ClickTracker />
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
