import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiDollarSign, FiUpload } from "react-icons/fi";
import { CTASection } from "../components/sections/CTASection";

const steps = [
  { n: "01", icon: <FiUpload size={22} />, title: "Daftar Seller", desc: "Buat akun seller gratis. Isi profil studio/arsitek dan upload portofolio awal kamu." },
  { n: "02", icon: <FiCheck size={22} />, title: "Review Tim", desc: "Tim ArchVault mereview kualitas desain dalam 2–3 hari kerja. Kami pastikan standar premium terpenuhi." },
  { n: "03", icon: <FiUpload size={22} />, title: "Upload Desain", desc: "Upload file SKP, GLB/GLTF, gambar render, dan deskripsi produk. Harga kamu tentukan sendiri." },
  { n: "04", icon: <FiDollarSign size={22} />, title: "Mulai Jual & Terima Bayaran", desc: "Desain kamu langsung live di marketplace. Komisi 70% masuk rekening kamu setiap bulan." },
];

const benefits = [
  { icon: "💰", title: "Komisi 70%", desc: "Dari setiap penjualan, 70% langsung milik kamu. Tanpa biaya listing, tanpa minimum penjualan." },
  { icon: "🌏", title: "Jangkauan Global", desc: "18.000+ pembeli aktif dari seluruh dunia — arsitek, developer properti, dan visualizer profesional." },
  { icon: "📊", title: "Dashboard Analytics", desc: "Pantau performa desain, jumlah views, download, dan pendapatan real-time di dashboard seller." },
  { icon: "🛡️", title: "Proteksi IP", desc: "Desain kamu dilindungi lisensi digital. Kami aktif mendeteksi dan menindak distribusi ilegal." },
  { icon: "⚡", title: "Instant Publish", desc: "Setelah disetujui, desain langsung tayang. Update, edit harga, atau tarik kapan saja." },
  { icon: "🤝", title: "Seller Support", desc: "Tim support dedikasi untuk seller. Ada pertanyaan? Kami respons dalam 24 jam kerja." },
];

const plans = [
  {
    label: "Starter",
    commission: "65%",
    features: ["Hingga 10 listing aktif", "Dashboard basic", "Email support", "Payout bulanan"],
    cta: "Mulai Gratis",
    highlight: false,
  },
  {
    label: "Pro Seller",
    commission: "70%",
    features: ["Unlimited listing", "Dashboard analytics lengkap", "Priority review (1 hari)", "Priority support", "Featured placement (2×/bulan)", "Payout 2× sebulan"],
    cta: "Daftar Pro",
    highlight: true,
  },
  {
    label: "Studio Partner",
    commission: "75%",
    features: ["Semua fitur Pro", "Dedicated account manager", "Custom seller page", "Banner promosi homepage", "Early access fitur baru", "Payout mingguan"],
    cta: "Hubungi Kami",
    highlight: false,
  },
];

const faqs = [
  { q: "Format file apa yang diterima?", a: "SKP (SketchUp), GLB/GLTF, OBJ, FBX, DWG, PDF. Wajib menyertakan minimal satu format 3D dan satu gambar render berkualitas tinggi." },
  { q: "Berapa lama proses review?", a: "Starter: 2–3 hari kerja. Pro Seller: 1 hari kerja. Kami cek kualitas geometri, UV mapping, kelengkapan file, dan akurasi deskripsi." },
  { q: "Bagaimana sistem payout?", a: "Transfer bank lokal (BCA, Mandiri, BRI, BNI) atau PayPal. Minimum payout Rp 200.000. Jadwal sesuai plan yang dipilih." },
  { q: "Bisakah saya jual desain yang sama di platform lain?", a: "Bisa. ArchVault tidak mengunci eksklusivitas. Namun desain eksklusif ArchVault mendapat placement lebih baik di search." },
  { q: "Apa yang terjadi jika ada pembeli komplain?", a: "Kami mediasi antara pembeli dan seller. Refund hanya diberikan jika file terbukti berbeda dengan deskripsi. Seller tidak perlu khawatir komplain tidak berdasar." },
];

export default function SellOnArchvault() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.2)" }}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-40 w-full z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-mono text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "var(--accent)" }}>
              Jadi Seller
            </p>
            <h1 className="font-display leading-none mb-6" style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#fff" }}>
              JUAL DESAINMU<br />
              <span style={{ background: "linear-gradient(135deg,#E8C98E,#C8A96E,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                HASILKAN INCOME.
              </span>
            </h1>
            <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Monetisasi karya arsitektur 3D kamu. Bergabung dengan 850+ seller dan raih komisi 70% dari setiap penjualan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                Daftar Seller Gratis <FiArrowRight />
              </Link>
              <a href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                Cara Kerjanya
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["850+", "Seller Aktif"],
              ["Rp 2,4M+", "Total Payout"],
              ["2,400+", "Desain Terjual"],
              ["70%", "Komisi Seller"],
            ].map(([val, label], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <div className="font-display text-4xl mb-1"
                  style={{ background: "linear-gradient(135deg,#E8C98E,#C8A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {val}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Prosesnya Mudah</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>CARA KERJANYA</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl p-6 group transition-all duration-300"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2 z-10 text-lg"
                    style={{ color: "var(--text-muted)" }}>→</div>
                )}
                <div className="font-display text-6xl mb-4 opacity-15" style={{ color: "var(--accent)", lineHeight: 1 }}>{step.n}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,0.12)", color: "var(--accent)" }}>
                  {step.icon}
                </div>
                <h3 className="font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Keuntungan Seller</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>KENAPA ARCHVAULT?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Pilih Plan</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>SELLER PLANS</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col transition-all duration-300"
                style={{
                  background: plan.highlight ? "rgba(200,169,110,0.08)" : "var(--bg-card)",
                  border: plan.highlight ? "1px solid rgba(200,169,110,0.4)" : "1px solid var(--border)",
                }}>
                {plan.highlight && (
                  <div className="text-xs font-mono px-3 py-1 rounded-full self-start mb-4"
                    style={{ background: "rgba(200,169,110,0.2)", color: "var(--accent)", border: "1px solid rgba(200,169,110,0.3)" }}>
                    ✦ Recommended
                  </div>
                )}
                <div className="mb-1 text-sm font-mono" style={{ color: "var(--text-muted)" }}>{plan.label}</div>
                <div className="font-display text-5xl mb-1" style={{ color: "var(--accent)" }}>{plan.commission}</div>
                <div className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>komisi per penjualan</div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <FiCheck size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to={plan.label === "Studio Partner" ? "/contact" : "/login"}
                  className="w-full py-3 rounded-xl text-center text-sm font-semibold transition-all"
                  style={plan.highlight
                    ? { background: "var(--accent)", color: "#0a0a0a" }
                    : { background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-4xl" style={{ color: "var(--text-primary)" }}>FAQ SELLER</h2>
          </motion.div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="px-6 py-5 border-b last:border-0" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xs font-mono" style={{ color: "var(--accent)" }}>Q.</span>
                  <div>
                    <p className="font-heading font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}