//export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.includes("edit") &&
      req.nextauth.token?.role !== "admin"
    )
      return NextResponse.rewrite(
        new URL("/?message=You Are Not Authorized!", req.url)
      );

    if (
      req.nextUrl.pathname.includes("add") &&
      req.nextauth.token?.role !== "admin"
    )
      return NextResponse.rewrite(
        new URL("/?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
