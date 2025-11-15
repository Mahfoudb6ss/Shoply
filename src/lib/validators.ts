import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(120).optional(),
  role: z.enum(["admin", "customer"]).optional()
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  discount: z.number().min(0).max(0.9).optional().nullish(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  images: z.array(z.string().url()).default([]),
  featured: z.boolean().optional()
});

export const categorySchema = z.object({
  name: z.string().min(2).max(60)
});

export const orderSchema = z.object({
  userId: z.string().uuid(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        image: z.string().url()
      })
    )
    .min(1),
  totalPrice: z.number().positive(),
  status: z.enum(["pending", "processing", "shipped", "completed", "cancelled"])
});

export const cartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive()
});

export const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  page: z.coerce.number().min(1).optional()
});

