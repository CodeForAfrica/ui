import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  try {
    const cookie = cookies().get("token") ?? {};
    const { value: token } = cookie as any;
    if (token) {
      return NextResponse.next();
    }
    url.pathname = "/";
    return NextResponse.redirect(url);
  } catch (err) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
