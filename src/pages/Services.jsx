import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiMonitor, FiSmartphone, FiPackage, FiRefreshCw } from "react-icons/fi";
import { HiOutlineCube, HiOutlineGlobe } from "react-icons/hi";
import { MdOutlineVrpano } from "react-icons/md";
import { CTASection } from "../components/sections/CTASection";

// ─── Pricing logic ───────────────────────────────────────────
function calcEXE(m2) {
  const raw = Math.max(1_000_000, m2 * 10_000);
  return raw;
}
function calcAPK(m2) {
  return Math.max(2_500_000, m2 * 25_000);
}
function fmtRp(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

// ─── Video card component ─────────────────────────────────────
const videoSrc = [
  "https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-11765-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-at-night-11541-large.mp4",
];

function VideoCard({ src, title, badge, children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="relative rounded-3xl overflow-hidden group"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Video BG */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.28)" }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

      {/* Badge top */}
      {badge && (
        <div className="absolute top-5 left-5">
          <span className="px-3 py-1 rounded-full text-xs font-mono"
            style={{ background: "rgba(200,169,110,0.25)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.4)", backdropFilter: "blur(8px)" }}>
            {badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Pricing Calculator ───────────────────────────────────────
function PricingCalculator() {
  const [m2, setM2] = useState(100);
  const [mode, setMode] = useState("exe"); // exe | apk
  const [oculusModel, setOculusModel] = useState("q2"); // q2 | q3
  const [oculusMode, setOculusMode] = useState("sewa"); // sewa | beli
  const [days, setDays] = useState(1);

  const vrPrice = mode === "exe" ? calcEXE(m2) : calcAPK(m2);
  const minArea = mode === "exe" ? 100 : 100;
  const minPrice = mode === "exe" ? 1_000_000 : 2_500_000;
  const perM2 = mode === "exe" ? 10_000 : 25_000;
  const isMin = vrPrice === minPrice;

  const oculusDayRate = { q2: 150_000, q3: 200_000 };
  const oculusBuyAdd = { q2: 7_000_000, q3: 9_000_000 };
  const oculusTotal = oculusMode === "sewa"
    ? oculusDayRate[oculusModel] * days
    : oculusDayRate[oculusModel] * days + oculusBuyAdd[oculusModel];

  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Transparent Pricing</p>
          <h2 className="font-display text-5xl sm:text-6xl mb-4" style={{ color: "var(--text-primary)" }}>PRICE CALCULATOR</h2>
          <p style={{ color: "var(--text-secondary)" }}>Hitung estimasi harga project VR kamu secara real-time</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── VR App Calculator ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,169,110,0.15)" }}>
                <MdOutlineVrpano size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg" style={{ color: "var(--text-primary)" }}>VR Application</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>EXE Desktop atau APK Android</p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex rounded-xl p-1 mb-6" style={{ background: "var(--bg-elevated)" }}>
              {[
                { key: "exe", label: "VR .EXE", icon: <FiMonitor size={13} />, sub: "Rp 10.000/m²" },
                { key: "apk", label: "VR .APK", icon: <FiSmartphone size={13} />, sub: "Rp 25.000/m²" },
              ].map(opt => (
                <button key={opt.key} onClick={() => setMode(opt.key)}
                  className="flex-1 py-2.5 px-3 rounded-lg flex flex-col items-center gap-0.5 transition-all duration-300 text-sm font-medium"
                  style={mode === opt.key
                    ? { background: "var(--accent)", color: "#0a0a0a" }
                    : { color: "var(--text-secondary)" }}>
                  <span className="flex items-center gap-1.5">{opt.icon}{opt.label}</span>
                  <span className="text-xs opacity-70">{opt.sub}</span>
                </button>
              ))}
            </div>

            {/* Area slider */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Luas Bangunan</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={m2} onChange={e => setM2(Math.max(1, +e.target.value))} min={1}
                    className="w-20 text-center text-sm rounded-lg px-2 py-1 font-mono"
                    style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>m²</span>
                </div>
              </div>
              <input type="range" min={1} max={2000} value={m2} onChange={e => setM2(+e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "var(--accent)", background: `linear-gradient(to right, var(--accent) ${m2/20}%, var(--bg-elevated) ${m2/20}%)` }} />
              <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>1 m²</span><span>1.000 m²</span><span>2.000 m²</span>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(200,169,110,0.12), rgba(200,169,110,0.04))", border: "1px solid rgba(200,169,110,0.25)" }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "var(--text-muted)" }}>
                    {m2} m² × Rp {perM2.toLocaleString("id-ID")}
                  </div>
                  <div className="text-xs" style={{ color: isMin ? "#fbbf24" : "var(--text-muted)" }}>
                    {isMin ? `⚡ Harga minimal berlaku (min ${fmtRp(minPrice)})` : "✓ Harga dihitung per m²"}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={vrPrice}
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="font-display text-3xl text-right" style={{ color: "var(--accent)", lineHeight: 1.1 }}>
                    {fmtRp(vrPrice)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="text-xs pt-3 border-t" style={{ borderColor: "rgba(200,169,110,0.2)", color: "var(--text-muted)" }}>
                {mode === "exe"
                  ? "Deliverable: Aplikasi VR standalone .exe untuk PC/Laptop + Oculus Link"
                  : "Deliverable: Aplikasi VR .apk siap install di Oculus Quest / Android VR"}
              </div>
            </div>

            {/* What's included */}
            <div className="mt-5 space-y-2">
              {(mode === "exe"
                ? ["Scene VR full immersive", "Navigasi teleport & joystick", "Lighting & shadow realistis", "File .exe final + installer", "1× revisi minor"]
                : ["Build APK siap install", "Kompatibel Oculus Quest 2/3", "Controller interaction", "Sideloading guide", "1× revisi minor"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <FiCheck size={13} style={{ color: "var(--accent)" }} /> {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Oculus Rental / Purchase ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,169,110,0.15)" }}>
                <HiOutlineGlobe size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg" style={{ color: "var(--text-primary)" }}>Oculus / Meta Quest</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Sewa harian atau beli putus</p>
              </div>
            </div>

            {/* Model selector */}
            <div className="mb-5">
              <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Pilih Headset</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "q2", label: "Meta Quest 2", sewa: "Rp 150.000/hari", beli: "+Rp 7.000.000" },
                  { key: "q3", label: "Meta Quest 3", sewa: "Rp 200.000/hari", beli: "+Rp 9.000.000" },
                ].map(opt => (
                  <button key={opt.key} onClick={() => setOculusModel(opt.key)}
                    className="rounded-xl p-3.5 text-left transition-all duration-300 border"
                    style={oculusModel === opt.key
                      ? { borderColor: "var(--accent)", background: "rgba(200,169,110,0.1)" }
                      : { borderColor: "var(--border)", background: "var(--bg-elevated)" }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: oculusModel === opt.key ? "var(--accent)" : "var(--text-primary)" }}>{opt.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Sewa: {opt.sewa}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Beli: {opt.beli}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sewa vs Beli */}
            <div className="flex rounded-xl p-1 mb-5" style={{ background: "var(--bg-elevated)" }}>
              {[
                { key: "sewa", label: "Sewa Harian", icon: <FiRefreshCw size={13} /> },
                { key: "beli", label: "Beli Putus", icon: <FiPackage size={13} /> },
              ].map(opt => (
                <button key={opt.key} onClick={() => setOculusMode(opt.key)}
                  className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300"
                  style={oculusMode === opt.key
                    ? { background: "var(--accent)", color: "#0a0a0a" }
                    : { color: "var(--text-secondary)" }}>
                  {opt.icon}{opt.label}
                </button>
              ))}
            </div>

            {/* Days input (for sewa) */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {oculusMode === "sewa" ? "Durasi Sewa" : "Durasi Penggunaan"}
                </label>
                <div className="flex items-center gap-2">
                  <input type="number" value={days} onChange={e => setDays(Math.max(1, +e.target.value))} min={1}
                    className="w-16 text-center text-sm rounded-lg px-2 py-1 font-mono"
                    style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)", outline: "none" }} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>hari</span>
                </div>
              </div>
              <input type="range" min={1} max={90} value={days} onChange={e => setDays(+e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "var(--accent)" }} />
              <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>1 hari</span><span>30 hari</span><span>90 hari</span>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(200,169,110,0.12), rgba(200,169,110,0.04))", border: "1px solid rgba(200,169,110,0.25)" }}>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>
                    {oculusModel === "q2" ? "Meta Quest 2" : "Meta Quest 3"} × {days} hari
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>{fmtRp(oculusDayRate[oculusModel] * days)}</span>
                </div>
                {oculusMode === "beli" && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-secondary)" }}>Biaya beli putus</span>
                    <span style={{ color: "var(--text-primary)" }}>{fmtRp(oculusBuyAdd[oculusModel])}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between" style={{ borderColor: "rgba(200,169,110,0.2)" }}>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Total</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={oculusTotal}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="font-display text-2xl" style={{ color: "var(--accent)" }}>
                      {fmtRp(oculusTotal)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <div className="text-xs pt-3 border-t" style={{ borderColor: "rgba(200,169,110,0.2)", color: "var(--text-muted)" }}>
                {oculusMode === "sewa"
                  ? `Deposit headset berlaku. Pengiriman area Jabodetabek gratis ongkir.`
                  : `Unit baru resmi. Garansi distributor 1 tahun. Gratis ongkir seluruh Indonesia.`}
              </div>
            </div>

            <Link to="/contact"
              className="mt-5 w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all"
              style={{ background: "var(--accent)", color: "#0a0a0a" }}>
              Pesan Sekarang <FiArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Combined note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 rounded-2xl p-5 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            💡 <strong style={{ color: "var(--text-primary)" }}>Bundling hemat:</strong> Pesan VR App + Sewa/Beli Oculus sekaligus dan dapatkan{" "}
            <span style={{ color: "var(--accent)" }}>diskon 10%</span> untuk total paket. Hubungi kami untuk penawaran custom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Services Page ───────────────────────────────────────
export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      {/* ── Immersive Hero ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.22)" }}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-mono text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "var(--accent)" }}>
              Immersive Technology
            </p>
            <h1 className="font-display leading-none mb-6" style={{ fontSize: "clamp(3.5rem,9vw,7rem)", color: "#ffffff" }}>
              EXPERIENCE<br /><span style={{ background: "linear-gradient(135deg,#E8C98E,#C8A96E,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                YOUR SPACE
              </span><br />IN VR.
            </h1>
            <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Kami menghadirkan desain rumah dan bangunan ke dalam dunia VR yang imersif — bisa dijalankan di PC maupun headset Oculus Quest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Video Service Cards ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Layanan Kami</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>WHAT WE BUILD</h2>
          </motion.div>

          {/* Big 2-col grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <VideoCard src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4"
              badge="VR .EXE — Desktop" delay={0}>
              <div className="pt-52">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,0.2)", border: "1px solid rgba(200,169,110,0.3)" }}>
                  <FiMonitor size={22} style={{ color: "#C8A96E" }} />
                </div>
                <h3 className="font-display text-3xl text-white mb-2">VR APPLICATION .EXE</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Aplikasi VR standalone untuk PC/Laptop. Jalankan via Oculus Link atau langsung di PC berkemampuan VR.
                  Full immersive walkthrough, lighting realistis, navigasi bebas.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Rp 10.000/m²", "Min. Rp 1.000.000", "PC VR Ready"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: "rgba(200,169,110,0.2)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.3)", backdropFilter: "blur(8px)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {["Scene full immersive", "Teleport navigation", "Realistic lighting", "Custom branding"].map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <FiCheck size={11} style={{ color: "#C8A96E" }} />{f}
                    </div>
                  ))}
                </div>
              </div>
            </VideoCard>

            <VideoCard src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-at-night-11541-large.mp4"
              badge="VR .APK — Mobile" delay={0.1}>
              <div className="pt-52">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,0.2)", border: "1px solid rgba(200,169,110,0.3)" }}>
                  <FiSmartphone size={22} style={{ color: "#C8A96E" }} />
                </div>
                <h3 className="font-display text-3xl text-white mb-2">VR APPLICATION .APK</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Aplikasi VR berbasis Android untuk Oculus Quest 2 & Quest 3. Tanpa kabel, tanpa PC — wireless immersive experience langsung dari headset.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Rp 25.000/m²", "Min. Rp 2.500.000", "Oculus Quest 2/3"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: "rgba(200,169,110,0.2)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.3)", backdropFilter: "blur(8px)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {["Standalone wireless", "Controller interaction", "Sideloading ready", "Oculus App Lab"].map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <FiCheck size={11} style={{ color: "#C8A96E" }} />{f}
                    </div>
                  ))}
                </div>
              </div>
            </VideoCard>
          </div>

          {/* Bottom 2 cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Oculus Rental */}
            <VideoCard src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-11765-large.mp4"
              badge="Hardware Rental" delay={0.2}>
              <div className="pt-44">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,0.2)", border: "1px solid rgba(200,169,110,0.3)" }}>
                  <HiOutlineGlobe size={22} style={{ color: "#C8A96E" }} />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">SEWA OCULUS</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Sewa headset VR untuk keperluan presentasi, pameran, atau demo klien.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Quest 2", price: "Rp 150.000", sub: "per hari" },
                    { label: "Quest 3", price: "Rp 200.000", sub: "per hari" },
                  ].map(item => (
                    <div key={item.label} className="rounded-xl p-3"
                      style={{ background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.25)", backdropFilter: "blur(8px)" }}>
                      <div className="text-xs text-white/60 mb-1">{item.label}</div>
                      <div className="font-heading font-bold text-base" style={{ color: "#C8A96E" }}>{item.price}</div>
                      <div className="text-xs text-white/50">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </VideoCard>

            {/* Oculus Purchase */}
            <VideoCard src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4"
              badge="Beli Putus" delay={0.3}>
              <div className="pt-44">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,0.2)", border: "1px solid rgba(200,169,110,0.3)" }}>
                  <FiPackage size={22} style={{ color: "#C8A96E" }} />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">BELI OCULUS</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Beli putus unit baru resmi. Cocok untuk perusahaan properti, arsitek, atau developer yang butuh demo terus-menerus.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Quest 2", price: "+Rp 7.000.000", sub: "beli putus" },
                    { label: "Quest 3", price: "+Rp 9.000.000", sub: "beli putus" },
                  ].map(item => (
                    <div key={item.label} className="rounded-xl p-3"
                      style={{ background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.25)", backdropFilter: "blur(8px)" }}>
                      <div className="text-xs text-white/60 mb-1">{item.label}</div>
                      <div className="font-heading font-bold text-base" style={{ color: "#C8A96E" }}>{item.price}</div>
                      <div className="text-xs text-white/50">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </VideoCard>
          </div>
        </div>
      </section>

      {/* ── Pricing Calculator ── */}
      <PricingCalculator />

      {/* ── Process Steps ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>PROSES KERJA</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", title: "Konsultasi", desc: "Diskusi kebutuhan, ukuran bangunan, platform target, dan timeline project." },
              { n: "02", title: "Pemodelan 3D", desc: "Tim kami membangun model 3D detail berdasarkan denah atau referensi desain kamu." },
              { n: "03", title: "VR Build", desc: "Model dioptimasi dan dibangun menjadi aplikasi VR interaktif sesuai platform." },
              { n: "04", title: "Delivery", desc: "File .exe atau .apk siap pakai dikirim, termasuk panduan instalasi dan dukungan teknis." },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glass rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
                <div className="font-display text-5xl mb-4 opacity-20" style={{ color: "var(--accent)", lineHeight: 1 }}>{step.n}</div>
                <h3 className="font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
