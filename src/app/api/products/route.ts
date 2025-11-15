import { NextResponse } from "next/server";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import { productSchema, searchSchema } from "@/lib/validators";
import { requireRole } from "@/lib/auth";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = searchSchema.safeParse(Object.fromEntries(url.searchParams));
  const client = supabaseServer();
  let query = client.from("products").select("*");

  if (parsed.success) {
    const { q, category, minPrice, maxPrice, page = 1 } = parsed.data;
    const limit = 12;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    if (q) {
      query = query.ilike("name", `%${q}%`);
    }
    if (category) {
      query = query.eq("category_id", category);
    }
    if (minPrice) {
      query = query.gte("price", minPrice);
    }
    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  await requireRole(["admin"]);
  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten());
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Check if category exists
  const client = supabaseService();
  if (parsed.data.categoryId) {
    const { data: category, error: categoryError } = await client
      .from("categories")
      .select("id")
      .eq("id", parsed.data.categoryId)
      .single();
    
    if (categoryError || !category) {
      console.error("Category not found:", parsed.data.categoryId);
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }
  }

  const { data, error } = await client
    .from("products")
    .insert({
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      discount: parsed.data.discount,
      stock: parsed.data.stock,
      category_id: parsed.data.categoryId,
      images: parsed.data.images
    })
    .select("*")
    .single();

  if (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

