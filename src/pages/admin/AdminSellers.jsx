import { useState } from "react";
import { FiSearch, FiCheck, FiX, FiEye } from "react-icons/fi";

const sellers = [
  { id: 1, name: "ArchStudio Pro",       email: "arch@example.com",    listings: 24, sales: 892,  revenue: "Rp 132jt",  payout: "Rp 92,4jt",  status: "active",  joined: "Jan 2024" },
  { id: 2, name: "Minimal Arch Co",      email: "minimal@example.com", listings: 12, sales: 1204, revenue: "Rp 107jt",  payout: "Rp 74,9jt",  status: "active",  joined: "Mar 2024" },
  { id: 3, name: "Urban Design Lab",     email: "urban@example.com",   listings: 8,  sales: 567,  revenue: "Rp 65,2jt", payout: "Rp 45,6jt",  status: "active",  joined: "Jun 2024" },
  { id: 4, name: "Tropical Design House",email: "tropical@example.com",listings: 31, sales: 1847, revenue: "Rp 138jt",  payout: "Rp 96,6jt",  status: "active",  joined: "Feb 2024" },
  { id: 5, name: "New Seller Studio",    email: "new@example.com",     listings: 3,  sales: 0,    revenue: "Rp 0",      payout: "Rp 0",       status: "pending", joined: "Mei 2025" },
];

export default function AdminSellers() {
  const [search, setSearch] = useState("");
  const filtered = sellers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Sellers</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {sellers.filter(s => s.status === "pending").length} pending review
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: "var(--text-muted)" }} />
        <input placeholder="Cari seller..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
                {["Seller", "Listings", "Total Sales", "Revenue", "Payout (70%)", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}
                  className="border-b last:border-0"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.email} · {s.joined}</div>
                  </td>
                  <td className="px-4 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{s.listings}</td>
                  <td className="px-4 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{s.sales.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-primary)" }}>{s.revenue}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--accent)" }}>{s.payout}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono"
                      style={s.status === "active"
                        ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                        : { background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {s.status === "pending" && <>
                        <button className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-all"><FiCheck size={13} /></button>
                        <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"><FiX size={13} /></button>
                      </>}
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}><FiEye size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}