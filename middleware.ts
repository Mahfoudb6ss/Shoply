import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

const ADMIN_PREFIX = "/admin";
const API_ADMIN_PREFIXES = [
  "/api/products",
  "/api/orders",
  "/api/categories",
  "/api/upload"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiresAdmin =
    pathname.startsWith(ADMIN_PREFIX) ||
    API_ADMIN_PREFIXES.some(prefix => pathname.startsWith(prefix));

  if (!requiresAdmin) {
    return NextResponse.next();
  }

  const token = request.cookies.get("shoply_access")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = await verifyAccessToken(token);
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/categories/:path*",
    "/api/upload/:path*"
  ]
};

