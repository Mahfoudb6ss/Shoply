import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { requireRole, getCurrentSession } from "@/lib/auth";

type Params = { params: { id: string } };

export const runtime = "edge";

export async function GET(_: Request, { params }: Params) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = supabaseServer();
  let query = client.from("orders").select("*").eq("id", params.id).single();
  if (session.role !== "admin") {
    query = query.eq("user_id", session.sub);
  }
  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function DELETE(_: Request, { params }: Params) {
  await requireRole(["admin"]);
  const client = supabaseService();
  const { error } = await client.from("orders").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: true });
}

