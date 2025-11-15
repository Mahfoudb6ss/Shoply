import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "@/types";

const getSecret = (envKey: string) => {
  const secret = process.env[envKey];
  if (!secret) {
    throw new Error(`${envKey} is not configured`);
  }

  return new TextEncoder().encode(secret);
};

export type TokenPayload = JWTPayload & {
  sub: string;
  email: string;
  role: UserRole;
};

export const signAccessToken = async (payload: TokenPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret("JWT_ACCESS_SECRET"));

export const signRefreshToken = async (payload: TokenPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret("JWT_REFRESH_SECRET"));

export const verifyAccessToken = async (token: string) => {
  const result = await jwtVerify<TokenPayload>(
    token,
    getSecret("JWT_ACCESS_SECRET")
  );
  return result.payload;
};

export const verifyRefreshToken = async (token: string) => {
  const result = await jwtVerify<TokenPayload>(
    token,
    getSecret("JWT_REFRESH_SECRET")
  );
  return result.payload;
};

const ACCESS_COOKIE = "shoply_access";
const REFRESH_COOKIE = "shoply_refresh";

export const setAuthCookies = async (payload: TokenPayload) => {
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload)
  ]);

  const cookieStore = await cookies();

  cookieStore.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 15
  });

  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_COOKIE)?.value;
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value;
};

