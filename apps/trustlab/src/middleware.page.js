import { NextResponse } from "next/server";

export async function middleware(req) {
  // /research?slugs=research&slugs=baseline-reports
  const slugsPathname = new URLSearchParams(req.nextUrl.search)
    .getAll("slugs")
    .join("/");
  if (slugsPathname === "research/baseline-reports") {
    return NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Need to handle client-side redirect for /research/baseline-reports.
    "/research/:path*",
  ],
};
