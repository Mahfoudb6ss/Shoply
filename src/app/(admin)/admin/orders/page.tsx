import { demoOrders } from "@/lib/demo-data";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin orders",
  description: "Oversee fulfillment and order statuses."
});

export default async function AdminOrdersPage() {
  const client = supabaseServer();
  const { data } = await client.from("orders").select("*");
  const orders = (data ?? demoOrders) as typeof demoOrders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground">Update statuses and monitor fulfillment.</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order ID</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                <td className="px-4 py-3">{order.userId}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="px-4 py-3 capitalize">{order.status}</td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="outline">
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

