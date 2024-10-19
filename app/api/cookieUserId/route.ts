import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || "";

  return NextResponse.json({ userId });
}
