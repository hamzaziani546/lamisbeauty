"use client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://api.lamisbeauty.site";

const TOKEN_KEY = "lamis_admin_token";
const USER_KEY = "lamis_admin_user";
const EXP_KEY = "lamis_admin_exp";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const t = localStorage.getItem(TOKEN_KEY);
  const exp = Number(localStorage.getItem(EXP_KEY) || 0);
  if (!t || !exp) return null;
  if (Date.now() / 1000 > exp) {
    clearAdminSession();
    return null;
  }
  return t;
}

export function getAdminUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_KEY);
}

export function setAdminSession(token: string, username: string, exp: number) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
  localStorage.setItem(EXP_KEY, String(exp));
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXP_KEY);
}

export class AdminApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function adminFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = await res.json();
      detail = j.detail || JSON.stringify(j);
    } catch {}
    if (res.status === 401) clearAdminSession();
    throw new AdminApiError(res.status, detail);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    let detail = "Login failed";
    try {
      const j = await res.json();
      detail = j.detail || detail;
    } catch {}
    throw new AdminApiError(res.status, detail);
  }
  const data = (await res.json()) as {
    token: string;
    expires_at: number;
    username: string;
  };
  setAdminSession(data.token, data.username, data.expires_at);
  return data;
}

// ---- Types ----

export type MetricsResponse = {
  range: { start: string; end: string };
  summary: {
    total_clicks: number;
    unique_visitors: number;
    blocked_clicks: number;
    total_orders: number;
    confirmed_orders: number;
    delivered_orders: number;
    cancelled_orders: number;
    revenue_sar: number;
    aov_sar: number;
    conversion_rate: number;
    confirm_rate: number;
    delivery_rate: number;
  };
  status_breakdown: { status: string; count: number }[];
  utm_breakdown: {
    source: string;
    clicks: number;
    orders: number;
    revenue: number;
    cvr: number;
  }[];
  timeseries: { date: string; clicks: number; orders: number; revenue: number }[];
};

export type OrderSummary = {
  id: string;
  order_number: string;
  customer_name: string;
  phone_digits: string;
  phone_e164: string;
  status: string;
  total_sar: number;
  currency: string;
  items_count: number;
  utm_source: string | null;
  utm_campaign: string | null;
  country_code: string | null;
  created_at: string;
};

export type OrdersListResponse = {
  total: number;
  page: number;
  page_size: number;
  items: OrderSummary[];
};

export type OrderDetail = {
  id: string;
  order_number: string;
  status: string;
  customer: { name: string; phone_e164: string; phone_digits: string };
  items: {
    product_id: string;
    product_name_ar: string;
    offer_id: string;
    quantity: number;
    unit_count: number;
    price_sar: number;
    source: string;
  }[];
  totals: {
    subtotal_sar: number;
    discount_sar: number;
    total_sar: number;
    currency: string;
  };
  payment_method: string;
  attribution: Record<string, string | null>;
  client_ip: string | null;
  user_agent: string | null;
  country_code: string | null;
  event_id: string;
  admin_notes: string | null;
  tracking_events: {
    id: string;
    platform: string;
    event_name: string;
    event_id: string;
    status_code: number | null;
    success: boolean;
    created_at: string;
  }[];
  sheet_response: unknown;
  tracking_response: unknown;
  created_at: string;
  updated_at: string;
};
