import Link from "next/link";

export const SiteFooter = () => (
  <footer className="border-t py-10">
    <div className="container flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} Shoply. All rights reserved.</p>
      <div className="flex gap-4">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/support">Support</Link>
      </div>
    </div>
  </footer>
);

