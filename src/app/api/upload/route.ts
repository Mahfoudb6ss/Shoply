import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: Request) {
  await requireRole(["admin"]);
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  // In production, forward to UploadThing/Supabase Storage.
  // Here we mock a signed URL response.
  const mockUrl = `https://cdn.shoply.dev/${Date.now()}-${file.name}`;
  return NextResponse.json({ data: { url: mockUrl } });
}

