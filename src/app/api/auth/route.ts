import { NextResponse } from "next/server";
import { authSchema } from "@/lib/validators";
import {
  createUser,
  getUserByEmail,
  signIn,
  validatePassword,
  getCurrentSession,
  signOut
} from "@/lib/auth";
import { verifyRefreshToken, setAuthCookies } from "@/lib/jwt";
import { z } from "zod";

export const runtime = "edge";

const formatZodError = (error: z.ZodError) =>
  error.issues.map(issue => issue.message).join(", ") || "Invalid payload";

export async function POST(request: Request) {
  const body = await request.json();
  const action = body.action as "login" | "register";
  const parsed = authSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: formatZodError(parsed.error) },
      { status: 400 }
    );
  }

  const { email, password, name, role } = parsed.data;

  if (action === "login") {
    const user = await getUserByEmail(email);
    if (!user || !user.password_hash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await validatePassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await signIn(user);
    return NextResponse.json({ data: { user: { id: user.id, email: user.email, role: user.role } } });
  }

  if (action === "register") {
    const exists = await getUserByEmail(email);
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await createUser({
      name: name ?? email.split("@")[0],
      email,
      password,
      role
    });
    await signIn(user);
    return NextResponse.json({ data: { user: { id: user.id, email: user.email, role: user.role } } });
  }

  return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { refreshToken } = body;
  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token required" }, { status: 400 });
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);
    await setAuthCookies({
      sub: payload.sub,
      email: payload.email,
      role: payload.role
    });
    return NextResponse.json({ data: { accessToken: "cookie" } });
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }
}

export async function GET() {
  const session = await getCurrentSession();
  return NextResponse.json({ data: session });
}

export async function DELETE() {
  await signOut();
  return NextResponse.json({ data: true });
}

