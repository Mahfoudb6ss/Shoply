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
  const { data } = await client.from("products").select("*");
  const products = (data ?? demoProducts) as typeof demoProducts;
  return <ProductManager products={products} />;
}

