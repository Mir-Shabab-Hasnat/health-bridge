import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Determine web path
  const host = request.headers.get("host");

  if (request.cookies.get("userId") && request.nextUrl.pathname === "/") {
    if (request.cookies.get("isDoctor")?.value === "true") {
      return NextResponse.redirect(`http://${host}/doctor-dashboard`);
    } else {
      return NextResponse.rewrite(`http://${host}/patient-dashboard`);
    }
  }

  const pathname = request.nextUrl.pathname;

  // Doctor-related redirects
  if (request.cookies.get("isDoctor")?.value === "true") {
    if (pathname === "/patient-dashboard" || pathname === "/") {
      return NextResponse.redirect(`http://${host}/doctor-dashboard`);
    }

    // Handle dynamic route for /appointment/:id
    const appointmentMatch = pathname.match(/^\/appointment\/(\d+)$/);
    if (appointmentMatch) {
      const appointmentId = appointmentMatch[1]; // Capture the actual ID
      return NextResponse.redirect(`http://${host}/appointment/${appointmentId}`);
    }
  } else {
    // Non-doctor (patient) related redirects
    if (pathname === "/doctor-dashboard" || pathname === "/") {
      return NextResponse.redirect(`http://${host}/patient-dashboard`);
    }

    // Handle dynamic route for /appointment/:id -> redirect to form
    const appointmentMatch = pathname.match(/^\/appointment\/(\d+)$/);
    if (appointmentMatch) {
      return NextResponse.redirect(`http://${host}/form`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
