import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiClock } from "react-icons/fi";

const openings = [
  {
    id: 1, title: "3D Artist / SketchUp Specialist", type: "Full-time", location: "Jakarta / Remote",
    dept: "Creative", desc: "Membuat dan mengoptimasi aset 3D arsitektur, memastikan standar kualitas file sebelum listing ke marketplace.",
    requirements: ["Minimal 2 tahun pengalaman SketchUp", "Menguasai V-Ray atau Lumion", "Familiar dengan format GLB/GLTF", "Portfolio tersedia"],
  },
  {
    id: 2, title: "Frontend Developer (React)", type: "Full-time", location: "Remote",
    dept: "Engineering", desc: "Mengembangkan fitur-fitur baru marketplace Renderchitect — dari UI komponen hingga 3D viewer berbasis React Three Fiber.",
    requirements: ["Pengalaman React 18+", "Familiar TypeScript", "Memahami Three.js / WebGL jadi nilai plus", "Perhatian terhadap performa"],
  },
  {
    id: 3, title: "VR Developer (Unity / Unreal)", type: "Full-time / Contract", location: "Hybrid Jakarta",
    dept: "Engineering", desc: "Membangun aplikasi VR .exe dan .apk dari model arsitektur 3D menggunakan Unity atau Unreal Engine untuk Oculus Quest.",
    requirements: ["Pengalaman Unity atau Unreal Engine", "Pernah deploy ke Oculus/Meta Quest", "Menguasai pengoptimalan scene VR", "Familiar dengan XR Interaction Toolkit"],
  },
  {
    id: 4, title: "Content & Community Manager", type: "Full-time", location: "Jakarta",
    dept: "Marketing", desc: "Mengelola konten blog, sosial media, dan komunitas seller Renderchitect. Menjadi jembatan antara platform dan kreator.",
    requirements: ["Pengalaman content creation", "Memahami dunia arsitektur/desain interior", "Kemampuan menulis Bahasa Indonesia & Inggris", "Familiar platform komunitas online"],
  },
];

const deptColors = {
  Creative: { bg: "rgba(200,169,110,0.12)", color: "#C8A96E" },
  Engineering: { bg: "rgba(34,211,238,0.1)", color: "#22d3ee" },
  Marketing: { bg: "rgba(52,211,153,0.1)", color: "#34d399" },
};

const perks = [
  { icon: "🏠", title: "Remote Friendly", desc: "Sebagian besar posisi bisa full remote atau hybrid." },
  { icon: "📈", title: "Equity Program", desc: "Tim awal mendapat opsi kepemilikan di perusahaan." },
  { icon: "🎓", title: "Learning Budget", desc: "Rp 5 juta/tahun untuk kursus, tools, atau konferensi." },
  { icon: "🏖️", title: "Flexible PTO", desc: "Ambil cuti kapan kamu butuh, tanpa birokrasi rumit." },
  { icon: "💻", title: "Tech Allowance", desc: "Laptop/perangkat kerja disediakan untuk tim inti." },
  { icon: "🥽", title: "Oculus Unit", desc: "Setiap karyawan dapat akses headset VR untuk kerja & eksplorasi." },
];

export default function Careers() {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>We're Hiring</p>
          <h1 className="font-display text-6xl sm:text-7xl mb-4" style={{ color: "var(--text-primary)" }}>BERGABUNG<br />DENGAN KAMI</h1>
          <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Bangun masa depan marketplace arsitektur & teknologi VR bersama tim yang passionate dan ambisius.
          </p>
        </motion.div>

        {/* Perks */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Mengapa Renderchitect?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="text-2xl shrink-0">{perk.icon}</span>
                <div>
                  <div className="font-heading font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{perk.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{perk.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open positions */}
        <section>
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "var(--text-primary)" }}>
            Posisi Terbuka ({openings.length})
          </h2>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 transition-all duration-300 group"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                        style={{ ...(deptColors[job.dept] || {}), background: deptColors[job.dept]?.bg }}>
                        {job.dept}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <FiClock size={10} /> {job.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <FiMapPin size={10} /> {job.location}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg" style={{ color: "var(--text-primary)" }}>{job.title}</h3>
                  </div>
                  <Link to="/contact"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                    Apply <FiArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map(r => (
                    <span key={r} className="px-3 py-1 rounded-lg text-xs"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                      {r}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Spontaneous */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.25)" }}>
          <div className="text-3xl mb-3">📬</div>
          <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            Tidak ada posisi yang cocok?
          </h3>
          <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
            Kirim CV dan portofolio kamu. Kami selalu terbuka untuk talenta luar biasa.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            Kirim Lamaran Spontan <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}