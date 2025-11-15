import { getCurrentSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Profile",
  description: "Manage your account and preferences."
});

export default async function ProfilePage() {
  const session = await getCurrentSession();
  const client = supabaseServer();
  const { data: user } = session
    ? await client.from("users").select("*").eq("id", session.sub).single()
    : { data: null };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Name: {user?.name ?? session?.email ?? "Guest"}</p>
          <p>Role: {session?.role ?? "guest"}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/orders">Orders</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/wishlist">Wishlist</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">Cart</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

