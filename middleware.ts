import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Determine web path
  const host = request.headers.get("host");

  if (request.cookies.get("userId") && request.nextUrl.pathname === "/") {
    if (request.cookies.get("isDoctor")?.value == "true") {
      return NextResponse.redirect(`http://${host}/doctor-dashboard`);
    } else {
      return NextResponse.rewrite(`http://${host}/patient-dashboard`);
    }
  }

  if (request.cookies.get("isDoctor")?.value === "true") {
    // Move them off patient pages and keep them logged in
    if (
      request.nextUrl.pathname === "/patient-dashboard" ||
      request.nextUrl.pathname === "/"
    ) {
      return NextResponse.redirect(`http://${host}/doctor-dashboard`);
    } else if (request.nextUrl.pathname === "/form") {
      return NextResponse.redirect(`http://${host}/doctor-form`);
    }
  } else {
    if (
      request.nextUrl.pathname === "/doctor-dashboard" ||
      request.nextUrl.pathname === "/"
    ) {
      return NextResponse.redirect(`http://${host}/patient-dashboard`);
    } else if (request.nextUrl.pathname === "/doctor-form") {
      return NextResponse.redirect(`http://${host}/form`);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
