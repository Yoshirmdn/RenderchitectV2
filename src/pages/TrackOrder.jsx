import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPackage, FiCheckCircle, FiDownload, FiClock, FiActivity } from "react-icons/fi";
import { formatPrice } from "../utils/format";

// ── Mock live feed orders ─────────────────────────────────────────────────────
const liveFeedOrders = [
  { date: "15 Jun 2026, 11.03.01", category: "Villa",      product: "Casa Lumina — Modern Villa",   price: 165390,  invoice: "AV-20250001", status: "delivered"  },
  { date: "15 Jun 2026, 10.54.05", category: "Tropical",   product: "Bamboo Retreat — Tropical",    price: 83250,   invoice: "AV-20250042", status: "processing" },
  { date: "15 Jun 2026, 10.52.58", category: "Interior",   product: "Studio Noir — Interior",       price: 61050,   invoice: "AV-20250088", status: "delivered"  },
  { date: "15 Jun 2026, 10.44.29", category: "Minimalist", product: "MonoHaus — Minimalist",        price: 98790,   invoice: "AV-20250091", status: "pending"    },
  { date: "15 Jun 2026, 10.44.11", category: "Modern",     product: "Sky Penthouse — Modern",       price: 205700,  invoice: "AV-20250095", status: "delivered"  },
  { date: "15 Jun 2026, 10.36.03", category: "Industrial", product: "Steel Loft — Industrial",      price: 127650,  invoice: "AV-20250102", status: "delivered"  },
  { date: "15 Jun 2026, 10.27.48", category: "Villa",      product: "Zen Garden House",             price: 102120,  invoice: "AV-20250108", status: "processing" },
  { date: "15 Jun 2026, 10.23.37", category: "Commercial", product: "The Ark — Commercial",         price: 244090,  invoice: "AV-20250114", status: "delivered"  },
  { date: "15 Jun 2026, 10.22.39", category: "Tropical",   product: "Bamboo Retreat — Tropical",    price: 83250,   invoice: "AV-20250119", status: "delivered"  },
  { date: "15 Jun 2026, 10.03.34", category: "Interior",   product: "Studio Noir — Interior",       price: 61050,   invoice: "AV-20250123", status: "pending"    },
];

// ── Sensor invoice ID: "AV-20250001" → "AV-2025****"
const maskInvoice = (id) => {
  if (!id || id.length < 6) return id;
  const visible = id.slice(0, 7);       // "AV-2025"
  const masked  = "*".repeat(id.length - 7); // "****"
  return visible + masked;
};

// ── Sensor harga: 165390 → "Rp 165.xxx"
const maskPrice = (price) => {
  const str = Math.floor(price).toLocaleString("id-ID"); // "165.390"
  const parts = str.split(".");
  if (parts.length <= 1) return `Rp ${str.slice(0, -3)}xxx`;
  parts[parts.length - 1] = "xxx";
  return "Rp " + parts.join(".");
};

const statusStyle = {
  delivered:  { bg: "rgba(52,211,153,0.15)",  color: "#34d399", label: "Sukses"    },
  processing: { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", label: "Menunggu"  },
  pending:    { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", label: "Menunggu"  },
  cancelled:  { bg: "rgba(248,113,113,0.15)", color: "#f87171", label: "Batal"     },
};

// ── Mock detail orders (untuk search) ────────────────────────────────────────
const mockOrders = {
  "AV-20250001": {
    id: "AV-20250001", date: "2025-05-20", status: "delivered",
    items: [{ title: "Casa Lumina — Modern Villa", price: 149000, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80" }],
    total: 165390,
    steps: [
      { label: "Order Placed",    date: "20 May 2025 · 14:32", done: true  },
      { label: "Payment Verified",date: "20 May 2025 · 14:35", done: true  },
      { label: "Files Prepared",  date: "20 May 2025 · 14:40", done: true  },
      { label: "Download Ready",  date: "20 May 2025 · 14:41", done: true  },
    ],
  },
  "AV-20250042": {
    id: "AV-20250042", date: "2025-05-25", status: "processing",
    items: [
      { title: "Bamboo Retreat — Tropical", price: 75000, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&q=80" },
      { title: "Studio Noir — Interior",    price: 55000, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80" },
    ],
    total: 143000,
    steps: [
      { label: "Order Placed",    date: "25 May 2025 · 09:14", done: true  },
      { label: "Payment Verified",date: "25 May 2025 · 09:17", done: true  },
      { label: "Files Prepared",  date: "In progress...",       done: false },
      { label: "Download Ready",  date: "—",                    done: false },
    ],
  },
};

export default function TrackOrder() {
  const [query,    setQuery]    = useState("");
  const [result,   setResult]   = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = mockOrders[query.toUpperCase().trim()];
    if (order) { setResult(order); setNotFound(false); }
    else        { setResult(null); setNotFound(true);  }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}>Order Status</p>
          <h1 className="font-display text-5xl mb-4"
            style={{ color: "var(--text-primary)" }}>TRACK ORDER</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Masukkan Order ID untuk cek status & download
          </p>
        </motion.div>

        {/* ── Search form ── */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-3"
        >
          <div className="relative flex-1">
            <FiPackage className="absolute left-3.5 top-1/2 -translate-y-1/2"
              size={15} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Contoh: AV-20250001"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm transition-colors"
              style={{
                background: "var(--bg-card)",
                color:      "var(--text-primary)",
                border:     "1px solid var(--border)",
                outline:    "none",
              }}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}
          >
            <FiSearch size={15} /> Track
          </button>
        </motion.form>
        <p className="text-xs text-center mb-10" style={{ color: "var(--text-muted)" }}>
          Coba: AV-20250001 atau AV-20250042
        </p>

        {/* ── Not found ── */}
        {notFound && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass rounded-xl p-6 text-center mb-8"
            style={{ border: "1px solid rgba(248,113,113,0.3)", color: "#f87171" }}
          >
            Order tidak ditemukan. Periksa kembali Order ID kamu.
          </motion.div>
        )}

        {/* ── Order detail result ── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5 mb-12"
            >
              {/* Header card */}
              <div className="glass rounded-2xl p-6"
                style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div>
                    <div className="text-xs mb-1 font-mono" style={{ color: "var(--text-muted)" }}>Order ID</div>
                    <div className="font-heading font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                      {result.id}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{result.date}</div>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-mono capitalize"
                    style={result.status === "delivered"
                      ? { background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }
                      : { background: "rgba(251,191,36,0.12)",  color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}
                  >
                    {result.status === "delivered" ? "✓ Delivered" : "⏳ Processing"}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  {result.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.img} alt={item.title}
                        className="w-12 h-10 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4"
                  style={{ borderColor: "var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Total (incl. tax)
                  </span>
                  <span className="font-heading font-bold" style={{ color: "var(--accent)" }}>
                    {formatPrice(result.total)}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="glass rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
                <h3 className="font-heading font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
                  Order Progress
                </h3>
                <div className="space-y-0">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all"
                          style={step.done
                            ? { borderColor: "#34d399", background: "rgba(52,211,153,0.1)", color: "#34d399" }
                            : { borderColor: "var(--border)", color: "var(--text-muted)" }}
                        >
                          {step.done ? <FiCheckCircle size={13} /> : <FiClock size={13} />}
                        </div>
                        {i < result.steps.length - 1 && (
                          <div className="w-px flex-1 my-1"
                            style={{
                              background: step.done ? "rgba(52,211,153,0.3)" : "var(--border)",
                              minHeight: 24,
                            }}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <div className="text-sm font-medium"
                          style={{ color: step.done ? "var(--text-primary)" : "var(--text-muted)" }}>
                          {step.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {step.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download button */}
              {result.status === "delivered" && (
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}
                >
                  <FiDownload size={16} /> Download Files
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Live Feed Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.25)" }}>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-xs font-mono tracking-wider"
                style={{ color: "var(--accent)" }}>
                LIVE FEED
              </span>
            </div>
            <FiActivity size={14} style={{ color: "var(--text-muted)" }} />
          </div>

          <h2 className="font-heading font-bold text-2xl mb-1"
            style={{ color: "var(--text-primary)" }}>
            Transaksi Terakhir
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Daftar transaksi yang baru saja diproses oleh ArchVault.
          </p>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}>

            {/* Table header */}
            <div
              className="grid text-xs font-mono tracking-wider uppercase px-4 py-3"
              style={{
                gridTemplateColumns: "2fr 1.2fr 2fr 1.2fr 1.5fr 1fr",
                background:          "var(--bg-elevated)",
                color:               "var(--text-muted)",
                borderBottom:        "1px solid var(--border)",
              }}
            >
              <span>Dibuat Pada</span>
              <span>Kategori</span>
              <span>Produk</span>
              <span className="text-right">Harga</span>
              <span className="text-center">No. Invoice</span>
              <span className="text-center">Status</span>
            </div>

            {/* Table rows */}
            {liveFeedOrders.map((order, i) => {
              const ss = statusStyle[order.status] || statusStyle.pending;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid items-center px-4 py-3.5 border-b last:border-0 transition-colors"
                  style={{
                    gridTemplateColumns: "2fr 1.2fr 2fr 1.2fr 1.5fr 1fr",
                    borderColor:         "var(--border)",
                    background:          "var(--bg-card)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}
                >
                  {/* Date */}
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {order.date}
                  </span>

                  {/* Category */}
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {order.category}
                  </span>

                  {/* Product */}
                  <span
                    className="text-xs font-medium truncate pr-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.product}
                  </span>

                  {/* Price — masked */}
                  <span
                    className="text-xs font-mono font-bold text-right"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {maskPrice(order.price)}
                  </span>

                  {/* Invoice — masked */}
                  <span
                    className="text-xs font-mono text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {maskInvoice(order.invoice)}
                  </span>

                  {/* Status badge */}
                  <div className="flex justify-center">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: ss.bg, color: ss.color }}
                    >
                      {ss.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Invoice dan harga ditampilkan sebagian untuk menjaga privasi pengguna.
          </p>
        </motion.div>

      </div>
    </div>
  );
}