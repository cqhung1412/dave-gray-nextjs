import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.barrybear.com", "https://barrybear.com"]
    : ["http://localhost:3000", "http://localhost:9090", "https://www.google.com"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin))
    return new NextResponse(null, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
