import { CustomerManager } from "@/components/admin/customer-manager";
import { demoCustomers } from "@/lib/demo-data";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Admin customers",
  description: "View customer details and purchase history."
});

export default async function AdminCustomersPage() {
  const client = supabaseServer();
  const { data } = await client.from("users").select("*");
  const customers = (data ?? demoCustomers) as typeof demoCustomers;

  return <CustomerManager customers={customers} />;
}
