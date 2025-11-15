/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      allowedOrigins: ["https://shoply.vercel.app", "http://localhost:3000"]
    },
    typedRoutes: true
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

