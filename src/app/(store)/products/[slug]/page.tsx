import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { demoProducts } from "@/lib/demo-data";
import { formatCurrency } from "@/utils/currency";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { supabaseServer } from "@/lib/supabase";
import { seo } from "@/utils/seo";

type ProductPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const client = supabaseServer();
  const { data } = await client
    .from("products")
    .select("name, description")
    .eq("id", params.slug)
    .single();
  const product =
    data ??
    demoProducts.find(item => item.id === params.slug) ?? {
      name: "Product",
      description: "Shoply product"
    };
  return seo({ title: product.name, description: product.description });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const client = supabaseServer();
  const { data } = await client
    .from("products")
    .select("*")
    .eq("id", params.slug)
    .single();
  const product =
    (data as (typeof demoProducts)[number] | null) ??
    demoProducts.find(item => item.id === params.slug);
  if (!product) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full" />
        ) : (
          <div className="grid h-96 place-items-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <p className="text-lg text-muted-foreground">{product.description}</p>
        </div>
        <div className="text-3xl font-semibold">{formatCurrency(product.price)}</div>
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          image={product.images?.[0]}
        />
      </div>
    </div>
  );
}

