import { NextResponse } from "next/server";

import { equalsIgnoringCase } from "@/charterafrica/utils/strings";

export function middleware(req) {
  const slugsPathname = new URLSearchParams(req.nextUrl.search)
    .getAll("slugs")
    .join("/");
  if (
    ["knowledge", "resources"].some((slug) =>
      equalsIgnoringCase(slug, slugsPathname),
    )
  ) {
    return NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
  }
  let hash;
  if (equalsIgnoringCase("opportunities/events", slugsPathname)) {
    hash = "events";
  } else if (
    equalsIgnoringCase("opportunities/grants-fellowships", slugsPathname)
  ) {
    hash = "grants-fellowships";
  }
  if (hash) {
    const url = new URL("/opportunities", req.url);
    url.hash = hash;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // need to match redirects defined in next.config.js for client-side routing
  // to work
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  matcher: [
    "/knowledge/explainers/:path*",
    "/opportunities/:path*",
    "/resources/datasets/:path*",
  ],
};
