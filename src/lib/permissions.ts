export const isBypassRoutes = [
  "/api/polar/webhook",
  "/api/inngest(.*)",
  "/api/auth(.*)",
  "/convex(.*)",
];
export const isPublishRoutes = ["/", "/api/auth(.*)", "/convex(.*)"];
export const isProtectedRoutes = ["/dashboard(.*)"];
