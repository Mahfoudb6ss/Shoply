import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = seo({
  title: "Admin login",
  description: "Restricted access for Shoply operators."
});

export default function AdminLoginPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center">
      <LoginForm redirectTo="/admin/dashboard" title="Admin login" />
    </div>
  );
}

