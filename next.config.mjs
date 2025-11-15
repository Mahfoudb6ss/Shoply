/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["https://shoply.vercel.app", "http://localhost:3000"]
    }
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.shoply.dev" },
      { protocol: "https", hostname: "uploadthing.com" }
    ]
  }
};

export default nextConfig;

