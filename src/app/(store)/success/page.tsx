import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Order success",
  description: "Thank you for your purchase."
});

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-semibold">Order confirmed 🥳</h1>
      <p className="max-w-xl text-muted-foreground">
        We emailed your receipt and will notify you once your package ships. Track everything inside
        your profile.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/orders">View orders</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/products">Keep shopping</Link>
        </Button>
      </div>
    </div>
  );
}

