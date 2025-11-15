import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { CartScreen } from "@/components/store/cart-screen";

export const metadata: Metadata = seo({
  title: "Cart",
  description: "Review items before placing your order."
});

export default function CartPage() {
  return <CartScreen />;
}

