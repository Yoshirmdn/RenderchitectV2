import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiDownload, FiEye } from "react-icons/fi";
import { formatPrice } from "../../utils/format";

const orders = [
  { id: "AV-20250001", product: "Casa Lumina — Modern Villa",  img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&q=80", amount: 165390, status: "delivered",  date: "30 Mei 2025", formats: ["SKP","GLB","PDF"] },
  { id: "AV-20250042", product: "Bamboo Retreat — Tropical",   img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&q=80", amount: 143000, status: "processing", date: "25 Mei 2025", formats: ["SKP","GLB","GLTF","PDF"] },
  { id: "AV-20240198", product: "Studio Noir — Interior",      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=100&q=80", amount: 61050,  status: "delivered",  date: "10 Apr 2025", formats: ["SKP","GLB","OBJ","PDF"] },
];

const statusStyle = {
  delivered:  { bg: "rgba(52,211,153,0.12)",  color: "#34d399",  label: "✓ Delivered"  },
  processing: { bg: "rgba(251,191,36,0.12)",  color: "#fbbf24",  label: "⏳ Processing" },
};

export default function UserOrders() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>My Orders</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{orders.length} orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, i) => {
          const ss = statusStyle[order.status];
          return (
            <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start gap-4 flex-wrap">
                <img src={order.img} alt={order.product} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                    <div>
                      <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-muted)" }}>{order.id}</div>
                      <div className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>{order.product}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono shrink-0"
                      style={{ background: ss.bg, color: ss.color }}>{ss.label}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {order.formats.map(f => (
                      <span key={f} className="px-2 py-0.5 rounded-lg text-xs font-mono"
                        style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="font-heading font-bold" style={{ color: "var(--accent)" }}>
                        {formatPrice(order.amount)}
                      </span>
                      <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{order.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/track-order"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all"
                        style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                        <FiEye size={12} /> Track
                      </Link>
                      {order.status === "delivered" && (
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                          <FiDownload size={12} /> Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}