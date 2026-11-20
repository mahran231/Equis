import { NextResponse, type NextRequest } from "next/server";
import { getDeliveryProvider } from "@/lib/enquiry/adapter";
import { handleEnquiry } from "@/lib/enquiry/handler";

function clientKey(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

/** Reject cross-site form posts: the Origin, when sent, must match this host. */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ status: "rejected" }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ status: "rejected" }, { status: 415 });
  }
  const rawBody = await req.text();
  const result = await handleEnquiry({
    rawBody,
    clientKey: clientKey(req),
    provider: getDeliveryProvider(),
  });
  return NextResponse.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store", ...result.headers },
  });
}
