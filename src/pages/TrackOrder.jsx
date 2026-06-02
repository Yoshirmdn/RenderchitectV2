import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPackage, FiCheckCircle, FiDownload, FiClock } from "react-icons/fi";
import { formatPrice } from "../utils/format";

const mockOrders = {
  "AV-20250001": {
    id: "AV-20250001", date: "2025-05-20", status: "delivered",
    items: [{ title: "Casa Lumina — Modern Villa", price: 149000, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80" }],
    total: 165390,
    steps: [
      { label: "Order Placed", date: "20 May 2025 · 14:32", done: true },
      { label: "Payment Verified", date: "20 May 2025 · 14:35", done: true },
      { label: "Files Prepared", date: "20 May 2025 · 14:40", done: true },
      { label: "Download Ready", date: "20 May 2025 · 14:41", done: true },
    ],
  },
  "AV-20250042": {
    id: "AV-20250042", date: "2025-05-25", status: "processing",
    items: [
      { title: "Bamboo Retreat — Tropical", price: 75000, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&q=80" },
      { title: "Studio Noir — Interior", price: 55000, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80" },
    ],
    total: 143000,
    steps: [
      { label: "Order Placed", date: "25 May 2025 · 09:14", done: true },
      { label: "Payment Verified", date: "25 May 2025 · 09:17", done: true },
      { label: "Files Prepared", date: "In progress...", done: false },
      { label: "Download Ready", date: "—", done: false },
    ],
  },
};

export default function TrackOrder() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = mockOrders[query.toUpperCase().trim()];
    if (order) { setResult(order); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Order Status</p>
          <h1 className="font-display text-5xl mb-4" style={{ color: "var(--text-primary)" }}>TRACK ORDER</h1>
          <p style={{ color: "var(--text-secondary)" }}>Enter your order ID to check download status</p>
        </motion.div>

        <motion.form onSubmit={handleSearch} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <FiPackage className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: "var(--text-muted)" }} />
            <input type="text" placeholder="e.g. AV-20250001 or AV-20250042" value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm transition-colors"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
          </div>
          <button type="submit" className="px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            <FiSearch size={15} /> Track
          </button>
        </motion.form>
        <p className="text-xs text-center mb-10" style={{ color: "var(--text-muted)" }}>Try: AV-20250001 or AV-20250042</p>

        {notFound && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass rounded-xl p-6 text-center"
            style={{ border: "1px solid rgba(248,113,113,0.3)", color: "#f87171" }}>
            Order not found. Please check the order ID and try again.
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Header card */}
              <div className="glass rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div>
                    <div className="text-xs mb-1 font-mono" style={{ color: "var(--text-muted)" }}>Order ID</div>
                    <div className="font-heading font-bold text-lg" style={{ color: "var(--text-primary)" }}>{result.id}</div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{result.date}</div>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono capitalize"
                    style={result.status === "delivered"
                      ? { background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }
                      : { background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
                    {result.status === "delivered" ? "✓ Delivered" : "⏳ Processing"}
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  {result.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.img} alt={item.title} className="w-12 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{formatPrice(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t pt-4" style={{ borderColor: "var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Total (incl. tax)</span>
                  <span className="font-heading font-bold" style={{ color: "var(--accent)" }}>{formatPrice(result.total)}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="glass rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
                <h3 className="font-heading font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Order Progress</h3>
                <div className="space-y-0">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all"
                          style={step.done
                            ? { borderColor: "#34d399", background: "rgba(52,211,153,0.1)", color: "#34d399" }
                            : { borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {step.done ? <FiCheckCircle size={13} /> : <FiClock size={13} />}
                        </div>
                        {i < result.steps.length - 1 && (
                          <div className="w-px flex-1 my-1" style={{ background: step.done ? "rgba(52,211,153,0.3)" : "var(--border)", minHeight: 24 }} />
                        )}
                      </div>
                      <div className="pb-6">
                        <div className="text-sm font-medium" style={{ color: step.done ? "var(--text-primary)" : "var(--text-muted)" }}>{step.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {result.status === "delivered" && (
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                  <FiDownload size={16} /> Download Files
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
