"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LoginFormProps = {
  redirectTo?: string;
  title?: string;
};

export const LoginForm = ({ redirectTo = "/", title = "Login" }: LoginFormProps) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ ...payload, action: "login" }),
      headers: { "Content-Type": "application/json" }
    });

    setPending(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error ?? "Login failed");
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

