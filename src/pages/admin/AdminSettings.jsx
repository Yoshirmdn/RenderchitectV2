import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiAlertCircle } from "react-icons/fi";

const inputStyle = {
  background: "var(--bg-elevated)",
  color: "var(--text-primary)",
  border: "1px solid var(--border)",
  outline: "none",
  borderRadius: 10,
  padding: "6px 12px",
  fontSize: 13,
  width: 180,
};

const Field = ({ label, desc, children }) => (
  <div className="flex items-start justify-between gap-6 py-5 border-b last:border-0"
    style={{ borderColor: "var(--border)" }}>
    <div className="min-w-0">
      <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</div>
      {desc && <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</div>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    className="w-11 h-6 rounded-full transition-all duration-300 relative"
    style={{ background: checked ? "var(--accent)" : "var(--bg-elevated)", border: "1px solid var(--border)" }}>
    <motion.div animate={{ x: checked ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-0.5 w-5 h-5 rounded-full"
      style={{ background: checked ? "#0a0a0a" : "var(--text-muted)" }} />
  </button>
);

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "ArchVault",
    tagline: "Premium 3D Architecture Marketplace",
    commissionSeller: 70,
    commissionPlatform: 30,
    taxRate: 11,
    minPayoutRp: 200000,
    maintenanceMode: false,
    newSellerApproval: true,
    maxFileSize: 600,
  });

  const update = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Settings</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Konfigurasi platform ArchVault</p>
      </div>

      {/* General */}
      <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>General</h3>
        <Field label="Site Name" desc="Nama brand yang tampil di seluruh platform">
          <input value={settings.siteName} onChange={e => update("siteName", e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Tagline" desc="Deskripsi singkat platform">
          <input value={settings.tagline} onChange={e => update("tagline", e.target.value)} style={{ ...inputStyle, width: 240 }} />
        </Field>
        <Field label="Maintenance Mode" desc="Nonaktifkan akses publik sementara">
          <Toggle checked={settings.maintenanceMode} onChange={v => update("maintenanceMode", v)} />
        </Field>
      </div>

      {/* Finance */}
      <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Keuangan</h3>
        <Field label="Komisi Seller (%)" desc="Persentase yang diterima seller dari setiap penjualan">
          <input type="number" min={0} max={100} value={settings.commissionSeller}
            onChange={e => update("commissionSeller", +e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Tax Rate (%)" desc="Pajak yang dibebankan ke pembeli (PPN)">
          <input type="number" min={0} max={50} value={settings.taxRate}
            onChange={e => update("taxRate", +e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Minimum Payout (Rp)" desc="Minimum saldo sebelum seller bisa request payout">
          <input type="number" value={settings.minPayoutRp}
            onChange={e => update("minPayoutRp", +e.target.value)} style={inputStyle} />
        </Field>
      </div>

      {/* Seller */}
      <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Seller</h3>
        <Field label="Manual Approval" desc="Setiap seller baru perlu disetujui admin sebelum bisa listing">
          <Toggle checked={settings.newSellerApproval} onChange={v => update("newSellerApproval", v)} />
        </Field>
        <Field label="Max File Size (MB)" desc="Batas ukuran file upload per produk">
          <input type="number" value={settings.maxFileSize}
            onChange={e => update("maxFileSize", +e.target.value)} style={inputStyle} />
        </Field>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
        style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }}>
        <FiAlertCircle size={15} className="mt-0.5 shrink-0" style={{ color: "#fbbf24" }} />
        <p className="text-xs" style={{ color: "#fbbf24" }}>
          Perubahan pada komisi dan tax rate hanya berlaku untuk transaksi baru. Transaksi yang sudah ada tidak terpengaruh.
        </p>
      </div>

      <button onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: saved ? "#10b981" : "var(--accent)", color: saved ? "white" : "#0a0a0a" }}>
        <FiSave size={15} />
        {saved ? "Tersimpan!" : "Simpan Perubahan"}
      </button>
    </div>
  );
}