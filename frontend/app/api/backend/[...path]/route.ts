import http from "node:http";
import https from "node:https";
import { NextRequest, NextResponse } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site").replace(
  /\/$/,
  ""
);

const SKIP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "accept-encoding",
  "cookie",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-for",
]);

function upstreamRequest(
  target: string,
  method: string,
  headers: Record<string, string>,
  body?: Buffer
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const url = new URL(target);
    const lib = url.protocol === "https:" ? https : http;

    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method,
        headers,
        family: 4,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 502,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error("upstream timeout")));
    if (body?.length) req.write(body);
    req.end();
  });
}

async function proxyRequest(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const search = req.nextUrl.search;
  const target = `${API_URL}/${path}${search}`;

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (SKIP_REQUEST_HEADERS.has(key.toLowerCase())) return;
    headers[key] = value;
  });

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const body = hasBody ? Buffer.from(await req.arrayBuffer()) : undefined;

  let lastErr: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const upstream = await upstreamRequest(target, req.method, headers, body);
      const responseHeaders = new Headers();
      for (const [key, value] of Object.entries(upstream.headers)) {
        if (!value || key.toLowerCase() === "transfer-encoding") continue;
        responseHeaders.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: responseHeaders,
      });
    } catch (err) {
      lastErr = err;
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 300));
      }
    }
  }

  const message = lastErr instanceof Error ? lastErr.message : "Proxy error";
  console.error("[api/backend] upstream failed:", target, message);

  return NextResponse.json(
    {
      detail:
        message.includes("timeout") || message.includes("abort")
          ? "انتهت مهلة الاتصال بالـ API — جرّبي مرة أخرى"
          : "تعذّر الاتصال بالـ API — تحققي من الإنترنت وأعيدي المحاولة",
    },
    { status: 502 }
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function OPTIONS(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}
