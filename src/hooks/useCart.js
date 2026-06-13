import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { useAuth } from "../context/AuthContext";

export function useCart() {
  const { isLoggedIn } = useAuth();
  const [cart,    setCart]    = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const res = await userService.getCart();
      setCart(res.data);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCart(); }, [isLoggedIn]);

  const addToCart = async (projectId) => {
    if (!isLoggedIn) { window.location.href = "/login"; return; }
    try {
      await userService.addToCart(projectId);
      await fetchCart();
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = async (projectId) => {
    try {
      await userService.removeFromCart(projectId);
      setCart(prev => prev.filter(i => i.projectId !== projectId));
    } catch {}
  };

  const clearCart = async () => {
    try {
      await userService.clearCart();
      setCart([]);
    } catch {}
  };

  return { cart, loading, addToCart, removeFromCart, clearCart, refetch: fetchCart };
}