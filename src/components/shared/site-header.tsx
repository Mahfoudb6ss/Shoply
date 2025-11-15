"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User2, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const nav = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Wishlist", href: "/wishlist" },
  { title: "Orders", href: "/orders" }
];

export const SiteHeader = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5" />
            Shoply
          </Link>
          <nav className="hidden gap-4 text-sm font-medium md:flex">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User2 className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

