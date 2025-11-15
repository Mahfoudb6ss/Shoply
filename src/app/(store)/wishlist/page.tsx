import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { WishlistScreen } from "@/components/store/wishlist-screen";

export const metadata: Metadata = seo({
  title: "Wishlist",
  description: "Your saved products."
});

export default function WishlistPage() {
  return <WishlistScreen />;
}

