import type { NextRequest } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export function middleware(req: NextRequest) {
  const key: string = req.headers.get("x-api-key") as string;
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
