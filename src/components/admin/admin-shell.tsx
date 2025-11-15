"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const adminNav = [
  { title: "Overview", href: "/admin/dashboard" },
  { title: "Products", href: "/admin/products" },
  { title: "Orders", href: "/admin/orders" },
  { title: "Customers", href: "/admin/customers" },
  { title: "Categories", href: "/admin/categories" },
  { title: "Analytics", href: "/admin/analytics" },
  { title: "Users", href: "/admin/users" }
];

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-64 border-r bg-background/70 p-6 md:block">
        <div className="mb-8 text-xl font-semibold">Shoply Admin</div>
        <nav className="space-y-2 text-sm">
          {adminNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 transition",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

