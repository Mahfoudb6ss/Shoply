import { OrderManager } from "@/components/admin/order-manager";
import { demoOrders } from "@/lib/demo-data";
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

  return <OrderManager orders={orders} />;
}

