import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = seo({
  title: "Login",
  description: "Access your Shoply account."
});

export default function LoginPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center">
      <LoginForm />
    </div>
  );
}

