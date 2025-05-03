import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("tokenCalflow");

  // Get the current path
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/connexion", "/inscription"];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If there's no token and the user is not on a public route, redirect to /connexion
  if (!token && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";

    // Optionally, you can set a redirect parameter to return the user to the original page after login
    url.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - API routes (/api/*)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
