"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";
import { useWishlist } from "@/hooks/use-wishlist";
import type { Product } from "@/types";
import { AddToCartButton } from "@/components/store/add-to-cart-button";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export const ProductCard = ({ product, featured }: ProductCardProps) => {
  const wishlist = useWishlist();

  const toggleWishlist = () => wishlist.toggle(product.id);

  return (
    <div
      className={cn(
        "group rounded-2xl border p-4 transition hover:shadow-lg",
        featured && "md:col-span-2"
      )}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl bg-muted">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid aspect-square w-full place-items-center text-muted-foreground">
            No image
          </div>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3"
          onClick={toggleWishlist}
        >
          <Heart className={cn("h-4 w-4", wishlist.has(product.id) && "fill-current")} />
        </Button>
        {product.discount && (
          <Badge className="absolute left-3 top-3 bg-emerald-500 text-white">
            -{product.discount * 100}%
          </Badge>
        )}
      </div>
      <div className="space-y-2">
        <Link href={`/products/${product.id}`} className="line-clamp-2 text-lg font-semibold">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
            {product.discount && (
              <p className="text-sm text-muted-foreground">
                Save {formatCurrency(product.price * product.discount)}
              </p>
            )}
          </div>
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={product.images?.[0]}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
};

