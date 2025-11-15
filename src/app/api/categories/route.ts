import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { categorySchema } from "@/lib/validators";
import { requireRole } from "@/lib/auth";

export const runtime = "edge";

export async function GET() {
  const client = supabaseServer();
  const { data, error } = await client.from("categories").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  await requireRole(["admin"]);
  const body = await request.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const client = supabaseService();
  const { data, error } = await client
    .from("categories")
    .insert(parsed.data)
    .select("*")
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
}

