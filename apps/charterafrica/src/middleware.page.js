import { NextResponse } from "next/server";

export function middleware(req) {
  if (
    ["slug=knowledge", "slug=opportunities"].some((param) =>
      req.nextUrl.search.includes(param)
    )
  ) {
    return NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
  }
  return NextResponse.next();
}

export const config = {
  // need to match redirects defined in next.config.js for client-side routing
  // to work
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  matcher: ["/knowledge/explainers/:path*", "/opportunities/helpdesk/:path*"],
};
