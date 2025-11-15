import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { productSchema } from "@/lib/validators";
import { requireRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const runtime = "edge";

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const client = supabaseServer();
  const { data, error } = await client.from("products").select("*").eq("id", id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  await requireRole(["admin"]);
  const body = await request.json();
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const client = supabaseService();
  const { data, error } = await client
    .from("products")
    .update({
      ...parsed.data,
      category_id: parsed.data.categoryId
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params;
  await requireRole(["admin"]);
  const client = supabaseService();
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: true });
}

