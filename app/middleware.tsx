import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const currentUser = request.cookies.get("currentUser")?.value;
  const isDoctor = request.cookies.get("isDoctor")?.value;


  if (!currentUser && !request.nextUrl.pathname.startsWith("/home")) {
    return Response.redirect(new URL("/home", request.url));
  }

  if (currentUser && isDoctor && !request.nextUrl.pathname.startsWith("/doctor-dashboard")) {
    return Response.redirect(new URL("/doctor-dashboard", request.url));
  }

  if (currentUser && !isDoctor && !request.nextUrl.pathname.startsWith("/patient-dashboard")) {
    return Response.redirect(new URL("/patient-dashboard", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.\.png$).)"],
};
