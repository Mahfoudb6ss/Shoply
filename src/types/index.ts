export type UserRole = "admin" | "customer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  productCount?: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number | null;
  stock: number;
  categoryId: string;
  images: string[];
  createdAt: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

