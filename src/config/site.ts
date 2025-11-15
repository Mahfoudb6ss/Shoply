export const siteConfig = {
  name: "Shoply",
  description:
    "Shoply is a modern e-commerce experience powered by Next.js 15 and Supabase.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/Mahfoudb6ss/Shoply"
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Collections", href: "/categories" },
    { title: "About", href: "/about" }
  ]
} as const;

export type SiteConfig = typeof siteConfig;

