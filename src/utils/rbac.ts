import type { UserRole } from "@/types";

export const isRoleAllowed = (role: UserRole | undefined, allowed: UserRole[]) =>
  !!role && allowed.includes(role);

export const ADMIN_ROUTES = [
  "/(admin)",
  "/api/products",
  "/api/orders",
  "/api/categories"
];

