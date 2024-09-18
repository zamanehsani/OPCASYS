import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const user = await getToken({ req: request });
    const isAuth = user !== null;

    const pathname = request.nextUrl.pathname;

    // Redirect if there is no locale
    const isAuthPage =
      pathname.includes("/signin") || pathname?.includes("/signup");
    // Redirect unauthenticated users to /auth/login
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      return null;
    } else {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
      if (pathname === "/")
        return NextResponse.redirect(new URL("/home", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
  ],
};
