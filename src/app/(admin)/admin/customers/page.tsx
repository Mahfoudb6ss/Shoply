import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin customers",
  description: "Understand customer health and cohorts."
});

export default async function AdminCustomersPage() {
  const client = supabaseServer();
  const { data } = await client.from("users").select("*");
  const customers =
    (data ?? []).map((user: any) => ({
      id: user.id,
      name: user.name ?? user.email,
      email: user.email,
      orders: user.order_count ?? 0,
      spend: user.lifetime_value ?? 0
    })) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="text-sm text-muted-foreground">Segment, reward, and retain loyal buyers.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {customers.map(customer => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{customer.email}</p>
              <p className="mt-2">Orders: {customer.orders}</p>
              <p>Lifetime spend: ${customer.spend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

