import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase";
import { formatCurrency } from "@/utils/currency";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin analytics",
  description: "Sales, customers, and revenue analytics."
});

export default async function AdminAnalyticsPage() {
  const client = supabaseServer();
  const [{ data: orders }, { data: customers }] = await Promise.all([
    client.from("orders").select("total_price"),
    client.from("users").select("id")
  ]);

  const totalRevenue =
    orders?.reduce((acc: number, order: any) => acc + Number(order.total_price ?? 0), 0) ?? 0;
  const avgOrderValue =
    orders && orders.length ? formatCurrency(totalRevenue / orders.length) : "$0";
  const metrics = [
    { label: "Revenue", value: formatCurrency(totalRevenue), insight: "Last 30 days" },
    { label: "Orders", value: `${orders?.length ?? 0}`, insight: "All-time orders" },
    { label: "Customers", value: `${customers?.length ?? 0}`, insight: "# of accounts" },
    { label: "Avg. order value", value: avgOrderValue, insight: "Rolling avg" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Visibility into sales velocity, cohorts, and marketing performance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map(metric => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle>{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.insight}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

