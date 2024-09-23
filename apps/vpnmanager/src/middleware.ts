import type { NextRequest } from "next/server";

export const config = {
  // We are adding an authentication [API KEY] to endpoints that involve writing to the database to ensure the APIs are not misused.
  matcher: ["/api/statistics/:path*", "/api/users/:path*"],
};

export function middleware(req: NextRequest) {
  const key: string | null = req.headers.get("x-api-key");
  const API_SECRET_KEY = process.env.API_SECRET_KEY;
  if (req.method !== "GET") {
    if (!(key && key === API_SECRET_KEY)) {
      return Response.json(
        { success: false, message: "INVALID_API_KEY" },
        { status: 403 },
      );
    }
  }
}
