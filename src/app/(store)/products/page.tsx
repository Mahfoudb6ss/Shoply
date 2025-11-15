import { ProductGrid } from "@/components/store/product-grid";
import { CategoryFilter } from "@/components/store/category-filter";
import { StoreSearch } from "@/components/store/search-input";
import { demoCategories, demoProducts } from "@/lib/demo-data";
import { searchSchema } from "@/lib/validators";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Products",
  description: "Browse the entire Shoply catalog."
});

type ProductsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = searchSchema.safeParse({
    q: searchParams.q,
    category: searchParams.category
  });
  const client = supabaseServer();
  const { data } = await client.from("products").select("*");
  const products = (data ?? demoProducts) as typeof demoProducts;

  const filtered = products.filter(product => {
    if (!params.success) return true;
    const search = params.data.q?.toLowerCase();
    const matchesQuery = search
      ? product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      : true;
    const matchesCategory = params.data.category
      ? product.categoryId === params.data.category
      : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold">Shop products</h1>
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <StoreSearch />
        </Suspense>
      </div>
      <CategoryFilter categories={demoCategories} />
      <ProductGrid products={filtered} />
    </div>
  );
}

