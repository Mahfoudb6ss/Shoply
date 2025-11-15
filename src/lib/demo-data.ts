import type { Product, Category, Order } from "@/types";

export const demoCategories: Category[] = [
  { id: "fashion", name: "Fashion" },
  { id: "tech", name: "Tech" },
  { id: "home", name: "Home" }
];

export const demoProducts: Product[] = [
  {
    id: "p1",
    name: "Aurora Lamp",
    description: "Mood-enhancing smart lamp with adaptive tones.",
    price: 129,
    discount: 0.15,
    stock: 20,
    categoryId: "home",
    images: ["https://images.unsplash.com/photo-1503602642458-232111445657"],
    createdAt: new Date().toISOString()
  },
  {
    id: "p2",
    name: "Nova Headphones",
    description: "Wireless noise-cancelling headphones for deep work.",
    price: 249,
    stock: 50,
    categoryId: "tech",
    images: ["https://images.unsplash.com/photo-1511367466-95bf66eb36b9"],
    createdAt: new Date().toISOString()
  },
  {
    id: "p3",
    name: "Luna Sneakers",
    description: "Everyday sneakers engineered for comfort",
    price: 89,
    discount: 0.1,
    stock: 120,
    categoryId: "fashion",
    images: ["https://images.unsplash.com/photo-1528701800489-20be3cbe252c"],
    createdAt: new Date().toISOString()
  }
];

export const demoOrders: Order[] = [
  {
    id: "o1",
    userId: "u1",
    items: [
      {
        productId: "p1",
        name: "Aurora Lamp",
        price: 129,
        quantity: 1,
        image: demoProducts[0].images[0]
      }
    ],
    totalPrice: 129,
    status: "processing",
    createdAt: new Date().toISOString()
  }
];

