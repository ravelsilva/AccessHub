import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt/jwt";

export function middleware(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      try {
        const decoded = verifyJwt(token);
        if (!decoded) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
