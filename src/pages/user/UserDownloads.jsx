import { motion } from "framer-motion";
import { FiDownload, FiFolder, FiClock } from "react-icons/fi";

const downloads = [
  { id: 1, product: "Casa Lumina — Modern Villa",  date: "30 Mei 2025",  size: "248 MB", formats: ["SKP","GLB","GLTF","DWG","PDF"], img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&q=80" },
  { id: 2, product: "Studio Noir — Interior",       date: "10 Apr 2025",  size: "98 MB",  formats: ["SKP","GLB","OBJ","PDF"],        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=100&q=80" },
];

export default function UserDownloads() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Downloads</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>File tersedia untuk diunduh ulang kapan saja</p>
      </div>

      <div className="space-y-4">
        {downloads.map((dl, i) => (
          <motion.div key={dl.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-4 flex-wrap">
              <img src={dl.img} alt={dl.product} className="w-16 h-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-heading font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{dl.product}</div>
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><FiClock size={11} /> {dl.date}</span>
                  <span className="flex items-center gap-1"><FiFolder size={11} /> {dl.size}</span>
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {dl.formats.map(f => (
                      <span key={f} className="px-2 py-0.5 rounded-lg text-xs font-mono"
                        style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                    <FiDownload size={12} /> Download All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}