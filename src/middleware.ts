import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import {
  isBypassRoutes,
  isProtectedRoutes,
  isPublishRoutes,
} from "@/lib/permissions";

const PublishMatcher = createRouteMatcher(isPublishRoutes);
const BypassMatcher = createRouteMatcher(isBypassRoutes);
const ProtectedMatcher = createRouteMatcher(isProtectedRoutes);

// Đây là middleware Clerk chuẩn
const runClerk = clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  console.log("Clerk auth:", { userId, isSignedIn: !!userId });

  if (!userId && ProtectedMatcher(request)) {
    console.log("No userId, redirecting to /auth/sign-in");
    return nextjsMiddlewareRedirect(request, "/auth/sign-in");
  }

  return NextResponse.next();
});

// Đây là middleware Convex, chain Clerk trước
export default convexAuthNextjsMiddleware(
  async (request: NextRequest, ctx) => {
    // gọi Clerk trước
    const maybeResponse = await runClerk(request, ctx.event as NextFetchEvent);
    if (maybeResponse) return maybeResponse;

    // Convex xử lý sau
    const isAuthenticated = await ctx.convexAuth.isAuthenticated();
    console.log("Is Convex authenticated:", isAuthenticated);
    console.log("Request URL:", request.nextUrl.pathname);

    if (BypassMatcher(request)) {
      return NextResponse.next();
    }
    if (PublishMatcher(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/dashboard");
    }
    if (ProtectedMatcher(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth/sign-in");
    }

    return NextResponse.next();
  },
  { cookieConfig: { maxAge: 60 * 60 * 24 * 30 } }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
