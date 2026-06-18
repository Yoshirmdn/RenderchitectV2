import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiShield } from "react-icons/fi";
import { useStore } from "../store/useStore";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/order.service";
import { formatPrice } from "../utils/format";

const getImage = (item) => {
  const imgs = item.images;
  if (!imgs || imgs.length === 0) return null;
  const first = imgs[0];
  return typeof first === "string" ? first : first?.url || null;
};

export default function Checkout() {
  const { cart, clearCart }  = useStore();
  const { user }             = useAuth();
  const navigate             = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(null);

  const subtotal = cart.reduce((s, i) => s + (i.price || 0), 0);
  const tax      = subtotal * 0.11;
  const total    = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6"
        style={{ background: "var(--bg-primary)" }}>
        <div className="text-5xl mb-4">🛒</div>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>Cart is empty</p>
        <Link to="/projects" className="px-6 py-3 rounded-xl font-semibold"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>
          Browse Designs
        </Link>
      </div>
    );
  }

  const handleOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await orderService.create({
        items:      cart.map(i => ({ projectId: i.id })),
        couponCode: couponCode || undefined,
      });

      // Kalau ada Midtrans payment token, buka snap
      // if (res.data.paymentToken) {
      //   window.snap.pay(res.data.paymentToken, { ... });
      // }

      setSuccess(res.data.order);
      clearCart();
    } catch (err) {
      setError(err.message || "Gagal membuat order. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--bg-primary)" }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(52,211,153,0.15)", border: "2px solid #34d399" }}>
            <FiCheck size={36} style={{ color: "#34d399" }} />
          </div>
        </motion.div>
        <h2 className="font-display text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          ORDER PLACED!
        </h2>
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          Order ID: <span className="font-mono" style={{ color: "var(--accent)" }}>{success.id}</span>
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          Cek email kamu untuk konfirmasi. File siap didownload setelah pembayaran.
        </p>
        <div className="flex gap-3">
          <Link to="/user/orders" className="px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            Lihat Orders
          </Link>
          <Link to="/projects" className="px-6 py-3 rounded-xl text-sm"
            style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
            Lanjut Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/cart"
            className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}>
            <FiArrowLeft size={14} /> Kembali ke Cart
          </Link>
          <h1 className="font-display text-5xl" style={{ color: "var(--text-primary)" }}>CHECKOUT</h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — Order items */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              Order Items ({cart.length})
            </h2>

            {cart.map((item, i) => {
              const image = getImage(item);
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  {image ? (
                    <img src={image} alt={item.title}
                      className="w-16 h-14 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-16 h-14 rounded-lg shrink-0 flex items-center justify-center text-xs"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                      No img
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-sm line-clamp-1"
                      style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      Digital Download · Lifetime Access
                    </div>
                  </div>
                  <div className="font-heading font-bold shrink-0" style={{ color: "var(--accent)" }}>
                    {formatPrice(item.price || 0)}
                  </div>
                </motion.div>
              );
            })}

            {/* Coupon */}
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <label className="block text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                Kode Kupon (opsional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode kupon"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2.5 rounded-lg text-sm"
                  style={{
                    background: "var(--bg-elevated)",
                    color:      "var(--text-primary)",
                    border:     "1px solid var(--border)",
                    outline:    "none",
                  }}
                />
                <button
                  className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{ background: "rgba(200,169,110,0.12)", color: "var(--accent)", border: "1px solid rgba(200,169,110,0.25)" }}
                >
                  Pakai
                </button>
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 sticky top-28"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-heading font-bold text-lg mb-5"
                style={{ color: "var(--text-primary)" }}>
                Ringkasan Pembayaran
              </h3>

              {/* Buyer info */}
              {user && (
                <div className="flex items-center gap-3 mb-5 pb-5 border-b"
                  style={{ borderColor: "var(--border)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{user.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{user.email}</div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span style={{ color: "var(--text-primary)" }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>PPN (11%)</span>
                  <span style={{ color: "var(--text-primary)" }}>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between"
                  style={{ borderColor: "var(--border)" }}>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Total</span>
                  <span className="font-heading text-xl font-bold"
                    style={{ color: "var(--accent)" }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                  {error}
                </div>
              )}

              {/* Place order button */}
              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}
              >
                {loading ? "Memproses..." : `Bayar ${formatPrice(total)}`}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs"
                style={{ color: "var(--text-muted)" }}>
                <FiShield size={12} />
                <span>Pembayaran aman · Instant download</span>
              </div>

              <p className="text-xs text-center mt-3" style={{ color: "var(--text-muted)" }}>
                Dengan melanjutkan, kamu menyetujui{" "}
                <Link to="/refund" className="underline" style={{ color: "var(--accent)" }}>
                  Refund Policy
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}