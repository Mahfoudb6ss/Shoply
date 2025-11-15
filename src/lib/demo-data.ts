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

export const demoCustomers = [
  {
    id: "u1",
    email: "john.doe@example.com",
    name: "John Doe",
    phone: "+1 234 567 8900",
    address: "123 Main St, New York, NY 10001",
    createdAt: new Date("2024-01-15").toISOString(),
    totalOrders: 5,
    totalSpent: 645,
    lastOrderDate: new Date("2024-12-01").toISOString(),
    orders: [
      {
        id: "o1",
        totalPrice: 129,
        status: "processing",
        createdAt: new Date("2024-12-01").toISOString(),
        items: 1
      },
      {
        id: "o2",
        totalPrice: 258,
        status: "completed",
        createdAt: new Date("2024-11-15").toISOString(),
        items: 2
      }
    ]
  },
  {
    id: "u2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    phone: "+1 234 567 8901",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    createdAt: new Date("2024-02-20").toISOString(),
    totalOrders: 12,
    totalSpent: 1548,
    lastOrderDate: new Date("2024-12-10").toISOString(),
    orders: [
      {
        id: "o3",
        totalPrice: 189,
        status: "shipped",
        createdAt: new Date("2024-12-10").toISOString(),
        items: 3
      }
    ]
  },
  {
    id: "u3",
    email: "mike.wilson@example.com",
    name: "Mike Wilson",
    createdAt: new Date("2024-03-10").toISOString(),
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: undefined,
    orders: []
  }
];

