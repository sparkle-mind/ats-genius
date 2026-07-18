import { NextResponse } from "next/server";
// middleware file is now deprecated in version 16
export function proxy(request) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/resume-analysis") ||
    pathname.startsWith("/job-tracker") ||
    pathname.startsWith("/interviews") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/notification") ||
    pathname.startsWith("/settings");

  const isAuthPage = pathname === "/login" || pathname === "/register";

  // 🚫 Not logged in → block protected routes
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 Logged in → block login/register pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume-analysis/:path*",
    "/job-tracker/:path*",
    "/interviews/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/notification/:path*",
  ],
};
