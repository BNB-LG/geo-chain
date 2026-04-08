import { NextRequest, NextResponse } from "next/server";
import { getTokenInfo } from "@/lib/bscscan";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  const info = await getTokenInfo(address);
  if (!info) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  return NextResponse.json(info);
}
