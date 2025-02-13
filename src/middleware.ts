import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  if (response.redirected) {
    return Response.redirect(response.url);
  }
  return response;
}

export const config = {
  matcher: [
    "/protected",
    "/signin",
    "/admin/:path*",
    "/auth/v1/callback",
    "/dashboard/:path*",
  ],
};
