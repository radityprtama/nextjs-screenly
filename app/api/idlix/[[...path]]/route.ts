import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  try {
    const apiPath = params.path ? params.path.join("/") : "";
    const searchParams = request.nextUrl.search;
    const apiBase = process.env.NEXT_PUBLIC_IDLIX_API_BASE_URL || "http://localhost:3001/api";
    const targetUrl = `${apiBase}/${apiPath}${searchParams}`;

    const res = await fetch(targetUrl, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Proxy failed with status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Proxy connection error" },
      { status: 500 }
    );
  }
}
