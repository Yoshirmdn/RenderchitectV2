import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiClock, FiCheck, FiX, FiSend } from "react-icons/fi";
import api from "../services/api";
import { Loader } from "../components/ui/Loader";

const deptColors = {
  Creative:    { bg: "rgba(200,169,110,0.12)", color: "#C8A96E" },
  Engineering: { bg: "rgba(34,211,238,0.1)",   color: "#22d3ee" },
  Marketing:   { bg: "rgba(52,211,153,0.1)",   color: "#34d399" },
  Operations:  { bg: "rgba(167,139,250,0.1)",  color: "#a78bfa" },
};

const typeLabel = {
  FULL_TIME:  "Full-time",
  PART_TIME:  "Part-time",
  CONTRACT:   "Contract",
  FREELANCE:  "Freelance",
};

const perks = [
  { icon: "🏠", title: "Remote Friendly",  desc: "Sebagian besar posisi bisa full remote atau hybrid." },
  { icon: "📈", title: "Equity Program",   desc: "Tim awal mendapat opsi kepemilikan di perusahaan." },
  { icon: "🎓", title: "Learning Budget",  desc: "Rp 5 juta/tahun untuk kursus, tools, atau konferensi." },
  { icon: "🏖️", title: "Flexible PTO",     desc: "Ambil cuti kapan kamu butuh, tanpa birokrasi rumit." },
  { icon: "💻", title: "Tech Allowance",   desc: "Laptop/perangkat kerja disediakan untuk tim inti." },
  { icon: "🥽", title: "Oculus Unit",      desc: "Setiap karyawan dapat akses headset VR untuk kerja & eksplorasi." },
];

// ── Apply Modal ───────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post(`/careers/${job.slug}/apply`, form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Gagal mengirim lamaran. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--bg-elevated)",
    color:      "var(--text-primary)",
    border:     "1px solid var(--border)",
    outline:    "none",
    width:      "100%",
    borderRadius: 10,
    padding:    "10px 14px",
    fontSize:   13,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ border: "1px solid var(--border-strong)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 className="font-heading font-bold text-lg"
              style={{ color: "var(--text-primary)" }}>
              Apply — {job.title}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {job.department} · {typeLabel[job.type] || job.type} · {job.location}
            </p>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{ color: "var(--text-muted)" }}>
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Success state */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(52,211,153,0.15)", border: "2px solid #34d399" }}>
                <FiCheck size={28} style={{ color: "#34d399" }} />
              </div>
              <h4 className="font-heading font-bold text-xl mb-2"
                style={{ color: "var(--text-primary)" }}>
                Lamaran Terkirim! 🎉
              </h4>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                Terima kasih sudah melamar. Tim kami akan menghubungi kamu dalam 3–5 hari kerja.
              </p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                Tutup
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="john@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                  No. HP / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+62 812 xxxx xxxx"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Link Portfolio / LinkedIn
                </label>
                <input
                  type="url"
                  placeholder="https://portfolio.com"
                  value={form.portfolio}
                  onChange={e => setForm({ ...form, portfolio: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Cover letter */}
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Cover Letter
                </label>
                <textarea
                  placeholder="Ceritakan tentang dirimu dan kenapa tertarik bergabung..."
                  value={form.coverLetter}
                  onChange={e => setForm({ ...form, coverLetter: e.target.value })}
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    border:     "1px solid rgba(248,113,113,0.2)",
                    color:      "#f87171",
                  }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}
              >
                {loading ? "Mengirim..." : <><FiSend size={14} /> Kirim Lamaran</>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Careers() {
  const [jobs,        setJobs]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [departments, setDepartments] = useState([]);
  const [activeDept,  setActiveDept]  = useState("Semua");
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const [jobsRes, deptRes] = await Promise.all([
          api.get("/careers", {
            params: activeDept !== "Semua" ? { department: activeDept } : {},
          }),
          api.get("/careers/departments"),
        ]);
        setJobs(jobsRes.data);
        setDepartments(["Semua", ...deptRes.data.map(d => d.department)]);
      } catch (err) {
        // Fallback ke data statis kalau API belum aktif
        setError(null);
        setJobs([
          {
            id: 1, slug: "3d-artist-sketchup-specialist",
            title: "3D Artist / SketchUp Specialist",
            type: "FULL_TIME", location: "Jakarta / Remote", department: "Creative",
            description: "Membuat dan mengoptimasi aset 3D arsitektur, memastikan standar kualitas file sebelum listing ke marketplace.",
            requirements: ["Minimal 2 tahun pengalaman SketchUp", "Menguasai V-Ray atau Lumion", "Familiar dengan format GLB/GLTF", "Portfolio tersedia"],
            benefits: ["Remote friendly", "Learning budget Rp 5jt/tahun", "Oculus unit", "Flexible PTO"],
          },
          {
            id: 2, slug: "frontend-developer-react",
            title: "Frontend Developer (React)",
            type: "FULL_TIME", location: "Remote", department: "Engineering",
            description: "Mengembangkan fitur-fitur baru marketplace ArchVault — dari UI komponen hingga 3D viewer berbasis React Three Fiber.",
            requirements: ["Pengalaman React 18+", "Familiar TypeScript", "Three.js / WebGL nilai plus", "Perhatian terhadap performa"],
            benefits: ["Full remote", "Equity program", "Tech allowance", "Flexible hours"],
          },
          {
            id: 3, slug: "vr-developer-unity-unreal",
            title: "VR Developer (Unity / Unreal)",
            type: "FULL_TIME", location: "Hybrid Jakarta", department: "Engineering",
            description: "Membangun aplikasi VR .exe dan .apk dari model arsitektur 3D menggunakan Unity atau Unreal Engine untuk Oculus Quest.",
            requirements: ["Pengalaman Unity atau Unreal", "Pernah deploy ke Oculus/Meta Quest", "Optimasi scene VR", "XR Interaction Toolkit"],
            benefits: ["Hybrid work", "Oculus Quest 3 disediakan", "Equity program", "Learning budget"],
          },
          {
            id: 4, slug: "content-community-manager",
            title: "Content & Community Manager",
            type: "FULL_TIME", location: "Jakarta", department: "Marketing",
            description: "Mengelola konten blog, sosial media, dan komunitas seller ArchVault.",
            requirements: ["Pengalaman content creation", "Paham dunia arsitektur", "Bahasa Indonesia & Inggris", "Familiar komunitas online"],
            benefits: ["Creative freedom", "Flexible PTO", "Learning budget", "Remote-friendly"],
          },
        ]);
        setDepartments(["Semua", "Creative", "Engineering", "Marketing"]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [activeDept]);

  const filteredJobs = activeDept === "Semua"
    ? jobs
    : jobs.filter(j => j.department === activeDept);

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}>
            We're Hiring
          </p>
          <h1 className="font-display text-6xl sm:text-7xl mb-4"
            style={{ color: "var(--text-primary)" }}>
            BERGABUNG<br />DENGAN KAMI
          </h1>
          <p className="max-w-xl mx-auto text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            Bangun masa depan marketplace arsitektur & teknologi VR bersama tim yang passionate dan ambisius.
          </p>
        </motion.div>

        {/* ── Perks ── */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6"
            style={{ color: "var(--text-primary)" }}>
            Mengapa ArchVault?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className="text-2xl shrink-0">{perk.icon}</span>
                <div>
                  <div className="font-heading font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}>
                    {perk.title}
                  </div>
                  <div className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}>
                    {perk.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Department filter ── */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className="px-4 py-2 rounded-full text-sm font-mono transition-all"
              style={
                activeDept === dept
                  ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }
                  : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
              }
            >
              {dept}
            </button>
          ))}
        </div>

        {/* ── Open positions ── */}
        <section>
          <h2 className="font-heading font-bold text-2xl mb-6"
            style={{ color: "var(--text-primary)" }}>
            Posisi Terbuka ({loading ? "..." : filteredJobs.length})
          </h2>

          {loading && <Loader />}

          {!loading && filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p style={{ color: "var(--text-muted)" }}>
                Tidak ada posisi terbuka di departemen ini
              </p>
            </div>
          )}

          <div className="space-y-4">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 transition-all duration-300 group"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                        style={{
                          background: deptColors[job.department]?.bg || "var(--bg-elevated)",
                          color:      deptColors[job.department]?.color || "var(--text-muted)",
                        }}
                      >
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--text-muted)" }}>
                        <FiClock size={10} /> {typeLabel[job.type] || job.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--text-muted)" }}>
                        <FiMapPin size={10} /> {job.location}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg"
                      style={{ color: "var(--text-primary)" }}>
                      {job.title}
                    </h3>
                  </div>

                  {/* Apply button */}
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "var(--accent)", color: "#0a0a0a" }}
                  >
                    Apply <FiArrowRight size={13} />
                  </button>
                </div>

                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  {job.description}
                </p>

                {/* Requirements */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(job.requirements || []).map((r, ri) => (
                    <span
                      key={ri}
                      className="px-3 py-1 rounded-lg text-xs"
                      style={{
                        background: "var(--bg-elevated)",
                        color:      "var(--text-muted)",
                        border:     "1px solid var(--border)",
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t"
                    style={{ borderColor: "var(--border)" }}>
                    {job.benefits.map((b, bi) => (
                      <span key={bi} className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--accent)" }}>
                        <FiCheck size={10} /> {b}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Spontaneous application ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-8 text-center"
          style={{
            background: "rgba(200,169,110,0.06)",
            border:     "1px solid rgba(200,169,110,0.25)",
          }}
        >
          <div className="text-3xl mb-3">📬</div>
          <h3 className="font-heading font-bold text-lg mb-2"
            style={{ color: "var(--text-primary)" }}>
            Tidak ada posisi yang cocok?
          </h3>
          <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
            Kirim CV dan portofolio kamu. Kami selalu terbuka untuk talenta luar biasa.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}
          >
            Kirim Lamaran Spontan <FiArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* ── Apply Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <ApplyModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}