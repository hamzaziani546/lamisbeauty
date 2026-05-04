"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

const VISITOR_KEY = "lamis_visitor_id";
const SESSION_SENT_KEY = "lamis_click_sent";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = (crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    // dedupe within session per pathname
    const sentKey = `${SESSION_SENT_KEY}:${pathname}`;
    if (sessionStorage.getItem(sentKey)) return;

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const payload = {
      visitor_id: getVisitorId(),
      landing_page: window.location.href,
      referrer: document.referrer || null,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      fbp: getCookie("_fbp") || null,
      fbc: getCookie("_fbc") || params.get("fbclid") || null,
      ttp: getCookie("_ttp") || null,
      ttclid: params.get("ttclid"),
      sc_click_id: params.get("sccid") || params.get("ScCid") || null,
    };

    sessionStorage.setItem(sentKey, "1");

    fetch(`${API_BASE}/track/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // silent — never disrupt the storefront
    });
  }, [pathname]);

  return null;
}
