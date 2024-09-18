import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const user = await getToken({ req: request });
    console.log("User in middleware: ", user);

    const isAuth = user !== null;

    const userEmailVerified = user?.emailVerified;

    const pathname = request.nextUrl.pathname;

    // Redirect if there is no locale
    const isAuthPage =
      pathname.includes("/signin") || pathname?.includes("/signup");
    if (isAuthPage) {
      if (isAuth && userEmailVerified) {
        return NextResponse.redirect(new URL("/home", request.url));
      } else if (isAuth && !userEmailVerified) {
        return NextResponse.redirect(new URL("/verify-email", request.url));
      }
    } else {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
      if (pathname === "/" && userEmailVerified) {
        return NextResponse.redirect(new URL("/home", request.url));
      } else if (pathname === "/" && !userEmailVerified) {
        return NextResponse.redirect(new URL("/verify-email", request.url));
      }
      if (pathname === "/verify-email" && userEmailVerified) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      if (pathname !== "/verify-email" && !userEmailVerified) {
        return NextResponse.redirect(new URL("/verify-email", request.url));
      }
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
