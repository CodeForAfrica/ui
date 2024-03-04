import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { GoogleUser } from "@/outline-vpn/app/types";

export async function middleware(request: NextRequest) {
  const allowedEmails =
    process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") ?? [];
  const url = request.nextUrl.clone();
  try {
    const cookie = cookies().get("token") ?? {};
    const { value: token } = cookie as any;
    const { email } = jwtDecode(token) as GoogleUser;
    if (email) {
      if (allowedEmails.includes(email)) {
        return NextResponse.next();
      }
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
