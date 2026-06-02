import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiUser, FiLock, FiBell } from "react-icons/fi";

export default function UserSettings() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Reza Firmansyah", email: "reza@example.com", phone: "+62 812 3456 7890", bio: "Architect & 3D visualization enthusiast." });
  const [notif, setNotif] = useState({ orderUpdate: true, newsletter: false, newDesign: true });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inputStyle = {
    background: "var(--bg-elevated)", color: "var(--text-primary)",
    border: "1px solid var(--border)", outline: "none",
    borderRadius: 12, padding: "10px 14px", fontSize: 13, width: "100%",
  };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full transition-all duration-300 relative shrink-0"
      style={{ background: checked ? "var(--accent)" : "var(--bg-elevated)", border: "1px solid var(--border)" }}>
      <motion.div animate={{ x: checked ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-5 h-5 rounded-full"
        style={{ background: checked ? "#0a0a0a" : "var(--text-muted)" }} />
    </button>
  );

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Settings</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Kelola akun dan preferensi kamu</p>
      </div>

      {/* Profile */}
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="flex items-center gap-2 font-heading font-semibold" style={{ color: "var(--text-primary)" }}>
          <FiUser size={15} style={{ color: "var(--accent)" }} /> Profile
        </h3>
        {[
          { label: "Full Name",    key: "name",  type: "text"  },
          { label: "Email",        key: "email", type: "email" },
          { label: "Phone",        key: "phone", type: "text"  },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
            <input type={f.type} value={profile[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
              style={inputStyle} />
          </div>
        ))}
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Bio</label>
          <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
            rows={3} style={{ ...inputStyle, resize: "none" }} />
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="flex items-center gap-2 font-heading font-semibold" style={{ color: "var(--text-primary)" }}>
          <FiLock size={15} style={{ color: "var(--accent)" }} /> Change Password
        </h3>
        {["Current Password", "New Password", "Confirm Password"].map(label => (
          <div key={label}>
            <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
            <input type="password" placeholder="••••••••" style={inputStyle} />
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h3 className="flex items-center gap-2 font-heading font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          <FiBell size={15} style={{ color: "var(--accent)" }} /> Notifications
        </h3>
        {[
          { key: "orderUpdate", label: "Order Updates",       desc: "Status pengiriman dan konfirmasi download" },
          { key: "newDesign",   label: "New Designs",         desc: "Notifikasi desain baru dari seller favorit" },
          { key: "newsletter",  label: "Newsletter & Promo",  desc: "Penawaran eksklusif dan artikel blog" },
        ].map(n => (
          <div key={n.key} className="flex items-center justify-between py-3 border-b last:border-0"
            style={{ borderColor: "var(--border)" }}>
            <div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{n.label}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{n.desc}</div>
            </div>
            <Toggle checked={notif[n.key]} onChange={v => setNotif({ ...notif, [n.key]: v })} />
          </div>
        ))}
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