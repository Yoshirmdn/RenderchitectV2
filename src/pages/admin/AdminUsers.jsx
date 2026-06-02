import { useState } from "react";
import { FiSearch, FiUserX, FiShield } from "react-icons/fi";

const users = [
  { id: 1, name: "Reza Firmansyah",  email: "reza@example.com",   role: "buyer",  joined: "Jan 2025",  orders: 12, spent: "Rp 1,8jt",  status: "active"  },
  { id: 2, name: "Maya Chen",         email: "maya@example.com",   role: "buyer",  joined: "Feb 2025",  orders: 8,  spent: "Rp 980rb",  status: "active"  },
  { id: 3, name: "Andri Santoso",     email: "andri@example.com",  role: "seller", joined: "Mar 2024",  orders: 45, spent: "Rp 6,7jt",  status: "active"  },
  { id: 4, name: "Sophie Laurent",    email: "sophie@example.com", role: "buyer",  joined: "Apr 2025",  orders: 3,  spent: "Rp 320rb",  status: "active"  },
  { id: 5, name: "Kevin Lim",         email: "kevin@example.com",  role: "seller", joined: "Dec 2023",  orders: 89, spent: "Rp 14,2jt", status: "active"  },
  { id: 6, name: "Dian Pratiwi",      email: "dian@example.com",   role: "buyer",  joined: "May 2025",  orders: 2,  spent: "Rp 128rb",  status: "banned"  },
];

const roleStyle = {
  buyer:  { bg: "rgba(34,211,238,0.1)",  color: "#22d3ee" },
  seller: { bg: "rgba(200,169,110,0.12)", color: "#C8A96E" },
  admin:  { bg: "rgba(167,139,250,0.1)",  color: "#a78bfa" },
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Users</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{users.length} registered users</p>
      </div>

      <div className="relative w-full max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: "var(--text-muted)" }} />
        <input placeholder="Cari nama atau email..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
          style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
                {["User", "Role", "Joined", "Orders", "Total Spent", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}
                  className="border-b last:border-0"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: "var(--text-primary)" }}>{u.name}</div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono capitalize"
                      style={{ background: roleStyle[u.role]?.bg, color: roleStyle[u.role]?.color }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{u.joined}</td>
                  <td className="px-4 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{u.orders}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--accent)" }}>{u.spent}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono"
                      style={u.status === "active"
                        ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                        : { background: "rgba(248,113,113,0.12)", color: "#f87171" }}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                        title="Ban user"
                        onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(248,113,113,0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}>
                        <FiUserX size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                        title="Make admin"
                        onMouseEnter={e => { e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.background = "rgba(167,139,250,0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}>
                        <FiShield size={13} />
                      </button>
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