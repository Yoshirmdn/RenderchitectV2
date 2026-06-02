import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle = {
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Get In Touch</p>
          <h1 className="font-display text-6xl mb-4" style={{ color: "var(--text-primary)" }}>CONTACT US</h1>
          <p className="max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>Have questions or want to discuss a commission? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: FiMail, label: "Email", value: "mrec.telu@gmail.com" },
              { icon: FiPhone, label: "Phone", value: "+62 811-1434-331" },
              { icon: FiMapPin, label: "Office", value: "GSG, Jl. Telekomunikasi No.1 Lt. 2, Sukapura, Dayeuhkolot, Bandung Regency, West Java 40257" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 flex items-start gap-4" style={{ border: "1px solid var(--border)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(200,169,110,0.1)", color: "var(--accent)" }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
                  <div className="text-sm" style={{ color: "var(--text-primary)" }}>{value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass rounded-2xl p-8" style={{ border: "1px solid var(--border)" }}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              {["name", "email"].map(field => (
                <div key={field}>
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>{field}</label>
                  <input type={field === "email" ? "email" : "text"} value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })} required
                    placeholder={field === "name" ? "Your name" : "your@email.com"}
                    className="px-4 py-3 rounded-xl text-sm transition-colors"
                    style={inputStyle} />
                </div>
              ))}
            </div>
            <div className="mb-5">
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                className="px-4 py-3 rounded-xl text-sm transition-colors"
                style={inputStyle} />
            </div>
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5} required placeholder="Tell us more..."
                className="px-4 py-3 rounded-xl text-sm transition-colors resize-none"
                style={inputStyle} />
            </div>
            <button type="submit"
              className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              style={sent ? { background: "#10b981", color: "white" } : { background: "var(--accent)", color: "#0a0a0a" }}>
              {sent ? <><FiCheck /> Sent!</> : <><FiSend size={15} /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
