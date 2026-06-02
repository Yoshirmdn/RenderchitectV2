import { FiTrendingUp, FiShoppingBag, FiUsers, FiPackage, FiArrowUp, FiArrowDown } from "react-icons/fi";

const stats = [
  { label: "Total Revenue",    value: "Rp 48,2jt", change: "+12.4%", up: true,  icon: <FiTrendingUp size={18} /> },
  { label: "Total Orders",     value: "1.284",      change: "+8.1%",  up: true,  icon: <FiShoppingBag size={18} /> },
  { label: "Active Users",     value: "18.430",     change: "+5.3%",  up: true,  icon: <FiUsers size={18} /> },
  { label: "Listed Projects",  value: "2.418",      change: "-2.1%",  up: false, icon: <FiPackage size={18} /> },
];

const recentOrders = [
  { id: "AV-20250101", user: "Reza Firmansyah", product: "Casa Lumina — Modern Villa",   amount: "Rp 165.390", status: "delivered",  date: "30 Mei 2025" },
  { id: "AV-20250102", user: "Maya Chen",        product: "Studio Noir — Interior",       amount: "Rp 61.050",  status: "processing", date: "30 Mei 2025" },
  { id: "AV-20250103", user: "Andri Santoso",    product: "Bamboo Retreat — Tropical",    amount: "Rp 83.250",  status: "delivered",  date: "29 Mei 2025" },
  { id: "AV-20250104", user: "Sophie Laurent",   product: "MonoHaus — Minimalist",        amount: "Rp 98.790",  status: "pending",    date: "29 Mei 2025" },
  { id: "AV-20250105", user: "Kevin Lim",        product: "Sky Penthouse — Modern",       amount: "Rp 205.700", status: "delivered",  date: "28 Mei 2025" },
];

const statusStyle = {
  delivered:  { bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  processing: { bg: "rgba(251,191,36,0.12)",  color: "#fbbf24" },
  pending:    { bg: "rgba(148,163,184,0.12)", color: "#94a3b8" },
};

const topProjects = [
  { title: "Casa Lumina",      sales: 127, revenue: "Rp 18,9jt" },
  { title: "Bamboo Retreat",   sales: 203, revenue: "Rp 15,2jt" },
  { title: "Studio Noir",      sales: 156, revenue: "Rp 8,6jt"  },
  { title: "MonoHaus",         sales: 89,  revenue: "Rp 7,9jt"  },
  { title: "Sky Penthouse",    sales: 48,  revenue: "Rp 8,9jt"  },
];

function StatCard({ stat }) {
  return (
    <div className="rounded-2xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(200,169,110,0.12)", color: "var(--accent)" }}>
          {stat.icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full ${
          stat.up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
        }`}>
          {stat.up ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />}
          {stat.change}
        </span>
      </div>
      <div className="font-heading font-bold text-2xl mb-0.5" style={{ color: "var(--text-primary)" }}>
        {stat.value}
      </div>
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-xl mb-0.5" style={{ color: "var(--text-primary)" }}>Dashboard</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Selamat datang kembali, Admin 👋</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} stat={s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Recent Orders
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 py-2.5 border-b last:border-0"
                style={{ borderColor: "var(--border)" }}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{order.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: statusStyle[order.status].bg, color: statusStyle[order.status].color }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm font-medium mt-0.5 truncate" style={{ color: "var(--text-primary)" }}>
                    {order.product}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {order.user} · {order.date}
                  </div>
                </div>
                <div className="text-sm font-mono font-semibold shrink-0" style={{ color: "var(--accent)" }}>
                  {order.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top projects */}
        <div className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Top Projects
          </h3>
          <div className="space-y-3">
            {topProjects.map((p, i) => (
              <div key={p.title} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: i === 0 ? "rgba(200,169,110,0.2)" : "var(--bg-elevated)", color: i === 0 ? "var(--accent)" : "var(--text-muted)" }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{p.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{p.sales} sales</div>
                </div>
                <div className="text-xs font-mono" style={{ color: "var(--accent)" }}>{p.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}