"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  variant?: "default" | "outline";
  children?: React.ReactNode;
};

export const AddToCartButton = ({
  productId,
  name,
  price,
  image,
  variant,
  children
}: AddToCartButtonProps) => {
  const addItem = useCart(state => state.addItem);
  return (
    <Button
      variant={variant}
      onClick={() =>
        addItem({
          productId,
          name,
          price,
          quantity: 1,
          image: image ?? ""
        })
      }
    >
      {children ?? "Add to cart"}
    </Button>
  );
};

