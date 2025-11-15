import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { requireRole, getCurrentSession } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const runtime = "edge";

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = supabaseServer();
  let query = client.from("orders").select("*").eq("id", id);
  if (session.role !== "admin") {
    query = query.eq("user_id", session.sub);
  }
  const { data, error } = await query.single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params;
  await requireRole(["admin"]);
  const client = supabaseService();
  const { error } = await client.from("orders").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: true });
}

