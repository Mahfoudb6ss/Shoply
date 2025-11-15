import { ProductManager } from "@/components/admin/product-manager";
import { supabaseServer } from "@/lib/supabase";
import { demoProducts } from "@/lib/demo-data";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin products",
  description: "Manage catalog inventory and assets."
});

export default async function AdminProductsPage() {
  const client = supabaseServer();
  const [{ data: productData }, { data: categoryData }] = await Promise.all([
    client.from("products").select("*"),
    client.from("categories").select("id,name")
  ]);
  const products = (productData ?? demoProducts) as typeof demoProducts;
  const categories = categoryData ?? [];
  return <ProductManager products={products} categories={categories} />;
}

