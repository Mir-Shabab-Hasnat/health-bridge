import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("userId")?.value;
  const isDoctor = request.cookies.get("isDoctor")?.value === "true"; // Assuming this is a string that indicates true/false.

  console.log('Current User:', currentUser);
  console.log('Is Doctor:', isDoctor);
  console.log('Current Path:', request.nextUrl.pathname);

  // Redirect to home if the user is not logged in and not on the home page
  if (!currentUser && !request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to the doctor dashboard if the user is a doctor and not on the correct page
  if (currentUser && isDoctor && !request.nextUrl.pathname.startsWith("/doctor-dashboard")) {
    return NextResponse.redirect(new URL("/doctor-dashboard", request.url));
  }

  // Redirect to the patient dashboard if the user is not a doctor and not on the correct page
  if (currentUser && !isDoctor && !request.nextUrl.pathname.startsWith("/patient-dashboard")) {
    return NextResponse.redirect(new URL("/patient-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*'], // Match all paths to apply middleware globally
};