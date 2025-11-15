import { demoOrders } from "@/lib/demo-data";
import { formatCurrency } from "@/utils/currency";
import { Badge } from "@/components/ui/badge";
import { supabaseServer } from "@/lib/supabase";
import { getCurrentSession } from "@/lib/auth";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Orders",
  description: "Track your purchases and shipping progress."
});

export default async function OrderHistoryPage() {
  const session = await getCurrentSession();
  const client = supabaseServer();
  let query = client.from("orders").select("*");
  if (session?.role !== "admin") {
    query = query.eq("user_id", session?.sub ?? "");
  }
  const { data } = await query;
  const orders = (data ?? demoOrders) as typeof demoOrders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">Track status and download receipts.</p>
      </div>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="rounded-2xl border p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                <p className="text-lg font-semibold">{formatCurrency(order.totalPrice)}</p>
              </div>
              <Badge className="capitalize">{order.status}</Badge>
            </div>
            <ul className="mt-4 text-sm text-muted-foreground">
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

