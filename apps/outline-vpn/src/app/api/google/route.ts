import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/outline-vpn/app/utils";

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();
    const payload = await verifyToken(credential);
    if (payload) {
      cookies().set({
        name: "token",
        value: credential,
        httpOnly: true,
        path: "/",
      });
      return NextResponse.json(payload, { status: 200 });
    }
    return NextResponse.json(
      { message: "Invalid Token" },
      {
        status: 403,
      },
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 403,
    });
  }
}
