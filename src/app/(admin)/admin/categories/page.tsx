import { CategoryManager } from "@/components/admin/category-manager";
import { demoCategories } from "@/lib/demo-data";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin categories",
  description: "Organize collections and taxonomy."
});

export default async function AdminCategoriesPage() {
  const client = supabaseServer();
  const { data } = await client.from("categories").select("*");
  const categories = (data ?? demoCategories) as typeof demoCategories;

  return <CategoryManager categories={categories} />;
}

