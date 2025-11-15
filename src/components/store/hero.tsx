import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Hero = () => (
  <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white">
    <div className="max-w-xl space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-white/70">
        Fast shipping • Carbon neutral • Premium quality
      </p>
      <h1 className="text-4xl font-bold leading-tight md:text-5xl">
        Elevate your everyday essentials with Shoply
      </h1>
      <p className="text-lg text-white/80">
        Browse curated collections, track orders in real-time, and enjoy a seamless checkout
        powered by React Server Components.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button size="lg" asChild>
          <Link href="/products">Shop Now</Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/wishlist">View Wishlist</Link>
        </Button>
      </div>
    </div>
    <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:block" />
  </section>
);

