import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  console.log("middlewareeeeee");
  const currentUser = request.cookies.get("currentUser")?.value;
  const isDoctor = request.cookies.get("isDoctor")?.value;


  if (!currentUser && !request.nextUrl.pathname.startsWith("/home")) {
    console.log("redirecting to home");
    return Response.redirect(new URL("/home", request.url));
  }

  if (currentUser && isDoctor && !request.nextUrl.pathname.startsWith("/doctor-dashboard")) {
    console.log("redirecting to doctor dashboard");
    return Response.redirect(new URL("/doctor-dashboard", request.url));
  }

  if (currentUser && !isDoctor && !request.nextUrl.pathname.startsWith("/patient-dashboard")) {
    console.log("redirecting to patient dashboard");
    return Response.redirect(new URL("/patient-dashboard", request.url));
  }

  return NextResponse.next();

}

export const config = {
  matcher: ['/home/:path*'],
};
