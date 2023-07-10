import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    if (
      !request.nextauth.token.role ||
      request.nextauth.token.role === "inactive"
    )
      return NextResponse.rewrite(new URL("/denied", request.url));

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token.role !== "admin"
    )
      return NextResponse.rewrite(new URL("/denied", request.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
