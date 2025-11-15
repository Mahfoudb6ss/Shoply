import { Hero } from "@/components/store/hero";
import { ProductGrid } from "@/components/store/product-grid";
import { demoProducts } from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase";

const highlights = [
  { title: "Fast Delivery", description: "2-day nationwide delivery" },
  { title: "Secure Checkout", description: "Stripe-ready payments" },
  { title: "24/7 Support", description: "Concierge-level help" }
];

export default async function HomePage() {
  const client = supabaseServer();
  const { data } = await client.from("products").select("*").limit(8);
  const products = (data ?? demoProducts) as typeof demoProducts;

  return (
    <div className="space-y-12 px-4 py-10 md:px-8">
      <Hero />
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured drops</h2>
        </div>
        <ProductGrid products={products} />
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map(item => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

