import { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { projects } from "../../data/projects";
import { formatPrice } from "../../utils/format";

const statusMap = {
  active:   { label: "Active",   bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  pending:  { label: "Pending",  bg: "rgba(251,191,36,0.12)",  color: "#fbbf24" },
  rejected: { label: "Rejected", bg: "rgba(248,113,113,0.12)", color: "#f87171" },
};

export default function AdminProjects() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.seller.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Projects</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{projects.length} total listings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>
          <FiPlus size={15} /> Add Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" size={14}
            style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Cari project atau seller..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }}
          />
        </div>
        {selected.length > 0 && (
          <button className="px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 text-red-400"
            style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
            <FiTrash2 size={13} /> Delete ({selected.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
                <th className="px-4 py-3 text-left w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll} className="rounded" />
                </th>
                {["Project", "Seller", "Category", "Price", "Rating", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}
                  className="border-b last:border-0 transition-colors"
                  style={{ borderColor: "var(--border)", background: selected.includes(p.id) ? "rgba(200,169,110,0.04)" : "var(--bg-card)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                  onMouseLeave={e => e.currentTarget.style.background = selected.includes(p.id) ? "rgba(200,169,110,0.04)" : "var(--bg-card)"}
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-10 h-8 rounded-lg object-cover shrink-0" />
                      <div>
                        <div className="font-medium line-clamp-1" style={{ color: "var(--text-primary)" }}>{p.title}</div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{p.fileSize}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.seller}</td>
                  <td className="px-4 py-3 capitalize" style={{ color: "var(--text-secondary)" }}>{p.category}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: "var(--accent)" }}>{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs">
                      <span style={{ color: "var(--accent)" }}>★</span>
                      <span style={{ color: "var(--text-secondary)" }}>{p.rating}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono"
                      style={{ background: statusMap.active.bg, color: statusMap.active.color }}>
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg transition-all hover:bg-[var(--bg-elevated)]"
                        style={{ color: "var(--text-muted)" }}><FiEye size={13} /></button>
                      <button className="p-1.5 rounded-lg transition-all hover:bg-[var(--bg-elevated)]"
                        style={{ color: "var(--text-muted)" }}><FiEdit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
                        style={{ color: "var(--text-muted)" }}><FiTrash2 size={13} /></button>
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