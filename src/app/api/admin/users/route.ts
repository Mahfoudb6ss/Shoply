import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/auth";

const adminUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "customer"])
});

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = adminUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await createUser(parsed.data);
  return NextResponse.json({
    data: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
}


