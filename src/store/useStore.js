import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(persist(
  (set, get) => ({
    cart: [],
    wishlist: [],
    addToCart: (item) => {
      const exists = get().cart.find(i => i.id === item.id);
      if (!exists) set(s => ({ cart: [...s.cart, { ...item, qty: 1 }] }));
    },
    removeFromCart: (id) => set(s => ({ cart: s.cart.filter(i => i.id !== id) })),
    clearCart: () => set({ cart: [] }),
    toggleWishlist: (item) => {
      const exists = get().wishlist.find(i => i.id === item.id);
      if (exists) set(s => ({ wishlist: s.wishlist.filter(i => i.id !== item.id) }));
      else set(s => ({ wishlist: [...s.wishlist, item] }));
    },
    isWishlisted: (id) => get().wishlist.some(i => i.id === id),
  }),
  { name: "archvault-store" }
));
