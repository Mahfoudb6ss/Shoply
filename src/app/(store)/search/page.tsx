import { searchSchema } from "@/lib/validators";
import { demoProducts } from "@/lib/demo-data";
import { ProductGrid } from "@/components/store/product-grid";
import { StoreSearch } from "@/components/store/search-input";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Search",
  description: "Find products across the Shoply catalog."
});

type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchSchema.safeParse(searchParams);
  const query = params.success ? params.data.q?.toLowerCase() : undefined;
  const client = supabaseServer();
  const { data } = await client.from("products").select("*");
  const products = (data ?? demoProducts) as typeof demoProducts;

  const results = products.filter(product =>
    query
      ? product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      : true
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Search</h1>
      <StoreSearch />
      <ProductGrid products={results} />
    </div>
  );
}

