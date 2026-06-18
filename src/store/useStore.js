import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "../services/userService";

console.log(userService);

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

toggleWishlist: async (item) => {
  try {
    // Jika user login, sync ke backend
    const token = localStorage.getItem("archvault_token");
    if (token) {
      await userService.toggleWishlist(item.id);
    }
    // Update local state juga
    const exists = get().wishlist.find(i => i.id === item.id);
    if (exists) set(s => ({ wishlist: s.wishlist.filter(i => i.id !== item.id) }));
    else set(s => ({ wishlist: [...s.wishlist, item] }));
  } catch (err) {
    console.error("Wishlist sync failed:", err);
  }
},
    isWishlisted: (id) => get().wishlist.some(i => i.id === id),
  }),
  { name: "renderchitect-store" }
  
));
