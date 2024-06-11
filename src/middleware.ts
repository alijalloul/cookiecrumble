import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

// Middleware to check authentication for /admin paths
async function adminAuthMiddleware(
  req: NextRequest
): Promise<NextResponse | null> {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
  return null;
}

async function userAuthMiddleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  if (req.nextUrl.pathname.startsWith("/auth") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/auth") && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export async function middleware(req: NextRequest) {
  // Apply authentication middleware if the path starts with /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authResponse = await adminAuthMiddleware(req);
    if (authResponse) return authResponse;
  }

  const userAuthRes = userAuthMiddleware(req);
  return userAuthRes;
}

export const config = {
  matcher: ["/admin/:path*", "/:path*"], // Apply middleware to /admin/* for auth and all paths for CSP
};

// Authentication check function
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  return (
    username === process.env.ADMIN_USERNAME && (await isValidPassword(password))
  );
}

// Password validation function
async function isValidPassword(password: string): Promise<boolean> {
  const hashedPassword = Buffer.from(
    await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
  ).toString("base64");
  return hashedPassword === process.env.ADMIN_HASHED_PASSWORD;
}
