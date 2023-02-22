import { NextResponse } from "next/server";

import { equalsIgnoringCase } from "@/charterafrica/utils/strings";

export function middleware(req) {
  const slugsPathname = new URLSearchParams(req.nextUrl.search)
    .getAll("slugs")
    .join("/");
  if (
    ["knowledge", "opportunities"].some((param) =>
      equalsIgnoringCase(param, slugsPathname)
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
