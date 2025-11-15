import { StatsCards } from "@/components/admin/stats-cards";
import { SalesChart } from "@/components/admin/sales-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoOrders } from "@/lib/demo-data";
import { formatCurrency } from "@/utils/currency";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin dashboard",
  description: "Operational insights for Shoply admins."
});

export default async function AdminDashboardPage() {
  const client = supabaseServer();
  const { data } = await client.from("orders").select("*");
  const orders = (data ?? demoOrders) as typeof demoOrders;
  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const stats = [
    { title: "Revenue", value: formatCurrency(totalSales), change: "+18% vs last week" },
    { title: "Orders", value: `${demoOrders.length}`, change: "+5 new" },
    { title: "Customers", value: "1,245", change: "+32 vs last month" },
    { title: "Refund rate", value: "1.2%", change: "-0.4% vs avg" }
  ];

  const salesSeries = orders.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }),
    sales: order.totalPrice
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Admin overview</h1>
        <p className="text-sm text-muted-foreground">
          Track revenue, product performance, and fulfillment status in real-time.
        </p>
      </div>
      <StatsCards stats={stats} />
      <SalesChart data={salesSeries} />
      <Card>
        <CardHeader>
          <CardTitle>Latest orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">Order {order.id}</p>
                <p className="text-muted-foreground">{order.items[0]?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>
                <p className="text-muted-foreground">{order.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

