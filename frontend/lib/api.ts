const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site";

export type OrderItemPayload = {
  product_id: string;
  product_name_ar: string;
  offer_id: string;
  quantity: number;
  unit_count: number;
  price_mad: number;
  source: string;
};

export type AttributionPayload = {
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;
  sc_click_id?: string;
  /** Value of the _scid cookie — used as sc_cookie1 in Snap CAPI for match quality */
  sc_cookie1?: string;
};

export type CreateOrderPayload = {
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
  };
  items: OrderItemPayload[];
  attribution?: AttributionPayload;
};

export type CreateOrderResponse = {
  order_id: string;
  order_number: string;
  event_id: string;
  total_mad: number;
  currency: string;
};

export type OrderDetails = {
  order_id: string;
  order_number: string;
  status: string;
  customer_name: string;
  total_mad: number;
  currency: string;
  payment_method: string;
  items: OrderItemPayload[];
  created_at: string;
};

function formatApiError(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const detail = (body as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (!item || typeof item !== "object" || !("msg" in item)) return null;
        return String((item as { msg: string }).msg).replace(/^Value error,\s*/i, "");
      })
      .filter(Boolean);
    if (messages.length) return messages.join(" ");
  }
  return fallback;
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(formatApiError(err, "حدث خطأ أثناء إنشاء الطلب"));
  }

  return res.json();
}

export async function getOrder(orderId: string): Promise<OrderDetails> {
  const res = await fetch(`${API_URL}/orders/${orderId}`);
  if (!res.ok) throw new Error("الطلب غير موجود");
  return res.json();
}

export function getAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("lamis_attr") || "{}");
    } catch {
      return {};
    }
  })();

  const attr: AttributionPayload = {
    landing_page: window.location.href,
    utm_source: params.get("utm_source") || stored.utm_source,
    utm_medium: params.get("utm_medium") || stored.utm_medium,
    utm_campaign: params.get("utm_campaign") || stored.utm_campaign,
    utm_content: params.get("utm_content") || stored.utm_content,
    utm_term: params.get("utm_term") || stored.utm_term,
    fbp: getCookie("_fbp"),
    fbc: params.get("fbclid")
      ? `fb.1.${Date.now()}.${params.get("fbclid")}`
      : getCookie("_fbc"),
    ttp: getCookie("_ttp"),
    ttclid: params.get("ttclid") || stored.ttclid,
    sc_click_id: params.get("ScCid") || stored.sc_click_id,
    sc_cookie1: getCookie("_scid"),
  };

  // Persist for later checkout
  if (params.get("utm_source")) {
    localStorage.setItem("lamis_attr", JSON.stringify(attr));
  }

  return attr;
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}
