import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  publicRoutes,
  apiAuthRoute,
  authRoutes,
  defaultLoginRedirect,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(defaultLoginRedirect, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/auth", "/settings"],
};
