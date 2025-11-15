import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { orderSchema } from "@/lib/validators";
import { getCurrentSession, requireRole } from "@/lib/auth";

export const runtime = "edge";

export async function GET(_: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = supabaseServer();
  let query = client.from("orders").select("*");
  if (session.role !== "admin") {
    query = query.eq("user_id", session.sub);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const client = supabaseService();
  const { data, error } = await client
    .from("orders")
    .insert({
      user_id: parsed.data.userId,
      items: parsed.data.items,
      total_price: parsed.data.totalPrice,
      status: parsed.data.status
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(request: Request) {
  await requireRole(["admin"]);
  const body = await request.json();
  const { id, status } = body ?? {};
  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const client = supabaseService();
  const { data, error } = await client
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

