import { cache } from "react";
import bcrypt from "bcryptjs";
import { supabaseServer, supabaseService } from "@/lib/supabase";
import type { User, UserRole } from "@/types";
import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  verifyAccessToken,
  verifyRefreshToken
} from "@/lib/jwt";

export const getUserByEmail = async (email: string) => {
  const client = supabaseServer();
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error || !data) return null;
  return data;
};

export const validatePassword = async (
  password: string,
  passwordHash: string
) => bcrypt.compare(password, passwordHash);

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 12);

export const signIn = async (user: User & { password_hash?: string }) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role
  } as const;
  await setAuthCookies(payload);
  return payload;
};

export const signOut = async () => {
  await clearAuthCookies();
};

export const getCurrentSession = cache(async () => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    return await verifyAccessToken(token);
  } catch {
    const refresh = await getRefreshToken();
    if (!refresh) return null;
    try {
      const payload = await verifyRefreshToken(refresh);
      await setAuthCookies(payload);
      return payload;
    } catch {
      await clearAuthCookies();
      return null;
    }
  }
});

export const requireRole = async (roles: UserRole[]) => {
  const session = await getCurrentSession();
  if (!session || !roles.includes(session.role)) {
    throw new Error("Unauthorized");
  }
  return session;
};

export const createUser = async ({
  name,
  email,
  password,
  role = "customer"
}: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}) => {
  const password_hash = await hashPassword(password);
  const client = supabaseService();
  const { data, error } = await client
    .from("users")
    .insert({ name, email, password_hash, role })
    .select("*")
    .single();
  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create user");
  }
  return data;
};

