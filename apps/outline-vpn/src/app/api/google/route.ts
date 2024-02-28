import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, {
      status: 403,
    });
  }
}
