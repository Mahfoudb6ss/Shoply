"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/utils/currency";

export const CartScreen = () => {
  const { items, total, removeItem, updateQuantity } = useCart();
  const cartTotal = total();

  if (!items.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your cart</h1>
          <Button variant="outline" asChild>
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your cart</h1>
        <Button variant="outline" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.productId} className="flex items-center gap-4 rounded-xl border p-4">
              <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(item.price)} · Qty {item.quantity}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeItem(item.productId)}>
                    Remove
                  </Button>
                </div>
              </div>
              <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

