"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMockPaymentIntent } from "@/lib/payments";
import { formatCurrency } from "@/utils/currency";
import { toast } from "sonner";

export const CheckoutScreen = () => {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    const amount = total();

    try {
      await createMockPaymentIntent({
        amount,
        orderId: `mock_${Date.now()}`,
        customerEmail: email
      });
      clear();
      toast.success("Payment intent created");
      router.push("/success");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="text-sm text-muted-foreground">
            Provide shipping and payment details to complete your order.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Shipping address</Label>
          <Input id="address" name="address" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card">Card number</Label>
          <Input id="card" name="card" placeholder="4242 4242 4242 4242" required />
        </div>
        <Button type="submit" disabled={pending || !items.length}>
          {pending ? "Processing..." : "Pay now"}
        </Button>
      </form>
      <div className="rounded-2xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
        <div className="space-y-4 text-sm">
          {items.map(item => (
            <div key={item.productId} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total())}</span>
        </div>
      </div>
    </div>
  );
};

