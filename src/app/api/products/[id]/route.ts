import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { productSchema } from "@/lib/validators";
import { requireRole } from "@/lib/auth";

type RouteParams = {
  params: { id: string };
};

export const runtime = "edge";

export async function GET(_: Request, { params }: RouteParams) {
  const client = supabaseServer();
  const { data, error } = await client.from("products").select("*").eq("id", params.id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: Request, { params }: RouteParams) {
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
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_: Request, { params }: RouteParams) {
  await requireRole(["admin"]);
  const client = supabaseService();
  const { error } = await client.from("products").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: true });
}

