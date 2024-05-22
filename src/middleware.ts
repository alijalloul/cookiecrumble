import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
};

export const config = {
  matcher: "/admin/:path*",
};

const isAuthenticated = async (req: NextRequest) => {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;
  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME && (await isValidPassword(password))
  );
};

const isValidPassword = async (password: string) => {
  const hashedPassword = Buffer.from(
    await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
  ).toString("base64");

  return hashedPassword === process.env.ADMIN_HASHED_PASSWORD;
};
