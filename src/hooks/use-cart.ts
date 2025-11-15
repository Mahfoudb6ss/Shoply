"use client";

import { create } from "zustand";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  addItem: item =>
    set(state => {
      const exists = state.items.find(it => it.productId === item.productId);
      if (exists) {
        return {
          items: state.items.map(it =>
            it.productId === item.productId
              ? { ...it, quantity: it.quantity + item.quantity }
              : it
          )
        };
      }
      return { items: [...state.items, item] };
    }),
  updateQuantity: (productId, quantity) =>
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    })),
  removeItem: productId =>
    set(state => ({ items: state.items.filter(i => i.productId !== productId) })),
  clear: () => set({ items: [] }),
  total: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}));

