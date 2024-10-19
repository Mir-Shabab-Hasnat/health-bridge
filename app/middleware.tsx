import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // this chec if cookies has currentUser and isDoctor
  const currentUser = request.cookies.get("currentUser")?.value;
  const isDoctor = request.cookies.get("isDoctor")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
