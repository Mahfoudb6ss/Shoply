import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { CheckoutScreen } from "@/components/store/checkout-screen";

export const metadata: Metadata = seo({
  title: "Checkout",
  description: "Complete your secure purchase."
});

export default function CheckoutPage() {
  return <CheckoutScreen />;
}

