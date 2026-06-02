import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiDownload, FiHeart, FiArrowRight } from "react-icons/fi";
import { useStore } from "../../store/useStore";

const recentOrders = [
  { id: "AV-20250001", product: "Casa Lumina — Modern Villa",  amount: "Rp 165.390", status: "delivered",  date: "30 Mei 2025" },
  { id: "AV-20250042", product: "Bamboo Retreat — Tropical",   amount: "Rp 143.000", status: "processing", date: "25 Mei 2025" },
];

const statusStyle = {
  delivered:  { bg: "rgba(52,211,153,0.12)",  color: "#34d399"  },
  processing: { bg: "rgba(251,191,36,0.12)",  color: "#fbbf24"  },
  pending:    { bg: "rgba(148,163,184,0.12)", color: "#94a3b8"  },
};

export default function UserDashboard() {
  const { cart, wishlist } = useStore();

  const quickStats = [
    { label: "Total Orders",  value: "7",      icon: <FiShoppingBag size={18} />, to: "/user/orders"    },
    { label: "Downloads",     value: "5",       icon: <FiDownload size={18} />,    to: "/user/downloads"  },
    { label: "Wishlist",      value: wishlist.length.toString(), icon: <FiHeart size={18} />, to: "/user/wishlist" },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>
            Halo, Reza 👋
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Member sejak Januari 2025
          </p>
        </div>
        <Link to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>
          Browse Designs <FiArrowRight size={13} />
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <Link to={s.to} className="block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(200,169,110,0.12)", color: "var(--accent)" }}>
                {s.icon}
              </div>
              <div className="font-heading font-bold text-2xl" style={{ color: "var(--text-primary)" }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>Recent Orders</h3>
          <Link to="/user/orders" className="text-xs transition-colors" style={{ color: "var(--accent)" }}>
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between gap-3 py-3 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}>
              <div className="min-w-0">
                <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-muted)" }}>{order.id}</div>
                <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{order.product}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{order.date}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm mb-1" style={{ color: "var(--accent)" }}>{order.amount}</div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono"
                  style={{ background: statusStyle[order.status].bg, color: statusStyle[order.status].color }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}