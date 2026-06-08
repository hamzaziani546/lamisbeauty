"use client";

function getApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    const isLocalPage = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const configuredIsLocal =
      configured?.includes("localhost") || configured?.includes("127.0.0.1");
    if (!isLocalPage && configuredIsLocal) {
      return "https://api.lamisbeauty.site";
    }
  }
  return configured || "https://api.lamisbeauty.site";
}

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
  const res = await fetch(`${getApiBase()}${path}`, { ...init, headers });
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
  const res = await fetch(`${getApiBase()}/admin/login`, {
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
    revenue_mad: number;
    aov_mad: number;
    revenue_per_visitor_mad: number;
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
  product_breakdown: {
    product_id: string;
    product_name_ar: string;
    line_quantity: number;
    units_sold: number;
    orders: number;
    revenue: number;
  }[];
  invalid_reasons: { reason: string; count: number }[];
  timeseries: {
    date: string;
    clicks: number;
    orders: number;
    revenue: number;
    conversion_rate: number;
  }[];
};

export type OrderSummary = {
  id: string;
  order_number: string;
  customer_name: string;
  phone_digits: string;
  phone_e164: string;
  status: string;
  total_mad: number;
  currency: string;
  items_count: number;
  utm_source: string | null;
  utm_campaign: string | null;
  country_code: string | null;
  geo_is_valid: boolean | null;
  geo_is_vpn: boolean | null;
  geo_is_proxy: boolean | null;
  geo_block_reason: string | null;
  created_at: string;
};

export type OrdersListResponse = {
  total: number;
  page: number;
  page_size: number;
  traffic: "clean" | "all";
  items: OrderSummary[];
};

export type CapiLog = {
  id: string;
  order_id: string | null;
  platform: string;
  event_name: string;
  event_id: string;
  status_code: number | null;
  success: boolean;
  payload: unknown;
  response: unknown;
  created_at: string;
};

export type CapiLogsResponse = {
  total: number;
  success_count: number;
  fail_count: number;
  page: number;
  page_size: number;
  items: CapiLog[];
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
    price_mad: number;
    source: string;
  }[];
  totals: {
    subtotal_mad: number;
    discount_mad: number;
    total_mad: number;
    currency: string;
  };
  payment_method: string;
  attribution: Record<string, string | null>;
  client_ip: string | null;
  user_agent: string | null;
  geo: {
    country_code: string | null;
    is_valid: boolean | null;
    is_vpn: boolean | null;
    is_proxy: boolean | null;
    block_reason: string | null;
  };
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
