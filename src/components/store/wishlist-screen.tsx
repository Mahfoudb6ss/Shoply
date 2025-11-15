"use client";

import { ProductGrid } from "@/components/store/product-grid";
import { demoProducts } from "@/lib/demo-data";
import { useWishlist } from "@/hooks/use-wishlist";

export const WishlistScreen = () => {
  const wishlist = useWishlist();
  const products = demoProducts.filter(product => wishlist.has(product.id));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Wishlist</h1>
      {!products.length ? (
        <p className="text-muted-foreground">Save your favorites to purchase later.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

