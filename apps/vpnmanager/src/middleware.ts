import type { NextRequest } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
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
