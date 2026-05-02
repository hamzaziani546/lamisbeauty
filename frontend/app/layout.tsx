import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/components/layout/StoreProvider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "لاميس للجمال | Lamis Beauty",
    template: "%s | لاميس للجمال",
  },
  description: siteConfig.metaDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteConfig.url,
    siteName: "لاميس للجمال",
    title: "لاميس للجمال | Lamis Beauty",
    description: siteConfig.metaDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "لاميس للجمال | Lamis Beauty",
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
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
