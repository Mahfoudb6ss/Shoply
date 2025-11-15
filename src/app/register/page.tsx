import type { Metadata } from "next";
import { seo } from "@/utils/seo";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = seo({
  title: "Register",
  description: "Join Shoply and start shopping."
});

export default function RegisterPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center">
      <RegisterForm />
    </div>
  );
}

