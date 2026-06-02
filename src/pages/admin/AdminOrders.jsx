import { useState } from "react";
import { FiSearch, FiDownload, FiEye } from "react-icons/fi";
import { formatPrice } from "../../utils/format";

const orders = [
  { id: "AV-20250001", user: "Reza Firmansyah",  email: "reza@example.com",   product: "Casa Lumina — Modern Villa",     amount: 149000, tax: 16390, status: "delivered",  date: "30 Mei 2025" },
  { id: "AV-20250002", user: "Maya Chen",         email: "maya@example.com",   product: "Studio Noir — Interior",         amount: 55000,  tax: 6050,  status: "processing", date: "30 Mei 2025" },
  { id: "AV-20250003", user: "Andri Santoso",     email: "andri@example.com",  product: "Bamboo Retreat — Tropical",      amount: 75000,  tax: 8250,  status: "delivered",  date: "29 Mei 2025" },
  { id: "AV-20250004", user: "Sophie Laurent",    email: "sophie@example.com", product: "MonoHaus — Minimalist",          amount: 89000,  tax: 9790,  status: "pending",    date: "29 Mei 2025" },
  { id: "AV-20250005", user: "Kevin Lim",         email: "kevin@example.com",  product: "Sky Penthouse — Modern",         amount: 185000, tax: 20350, status: "delivered",  date: "28 Mei 2025" },
  { id: "AV-20250006", user: "Dian Pratiwi",      email: "dian@example.com",   product: "Steel Loft — Industrial",        amount: 115000, tax: 12650, status: "delivered",  date: "27 Mei 2025" },
  { id: "AV-20250007", user: "James Tan",         email: "james@example.com",  product: "Zen Garden House",               amount: 92000,  tax: 10120, status: "refunded",   date: "26 Mei 2025" },
];

const statusStyle = {
  delivered:  { bg: "rgba(52,211,153,0.12)",  color: "#34d399",  label: "Delivered"  },
  processing: { bg: "rgba(251,191,36,0.12)",  color: "#fbbf24",  label: "Processing" },
  pending:    { bg: "rgba(148,163,184,0.12)", color: "#94a3b8",  label: "Pending"    },
  refunded:   { bg: "rgba(248,113,113,0.12)", color: "#f87171",  label: "Refunded"   },
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = orders.filter(o => {
    const matchSearch = o.id.includes(search) || o.user.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.status !== "refunded").reduce((s, o) => s + o.amount + o.tax, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Orders</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {orders.length} total · Revenue: <span style={{ color: "var(--accent)" }}>{formatPrice(totalRevenue)}</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
          <FiDownload size={14} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: "var(--text-muted)" }} />
          <input placeholder="Cari order ID, user, produk..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm w-64"
            style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
        </div>
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {["all", "delivered", "processing", "pending", "refunded"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-lg text-xs capitalize font-mono transition-all"
              style={filterStatus === s
                ? { background: "var(--accent)", color: "#0a0a0a" }
                : { color: "var(--text-muted)" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Customer", "Product", "Amount", "Status", "Date", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const ss = statusStyle[o.status];
                return (
                  <tr key={o.id}
                    className="border-b last:border-0"
                    style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--accent)" }}>{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium" style={{ color: "var(--text-primary)" }}>{o.user}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{o.email}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="truncate" style={{ color: "var(--text-secondary)" }}>{o.product}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{formatPrice(o.amount + o.tax)}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>incl. tax</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono"
                        style={{ background: ss.bg, color: ss.color }}>{ss.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{o.date}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
                        <FiEye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}