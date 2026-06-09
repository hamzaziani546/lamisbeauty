"use client";

import { useEffect } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add("lp-page");
    return () => document.body.classList.remove("lp-page");
  }, []);

  return <>{children}</>;
}
