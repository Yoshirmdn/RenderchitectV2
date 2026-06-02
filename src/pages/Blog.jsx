import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock} from "react-icons/fi";

const posts = [
  {
    id: 1, slug: "cara-membuat-vr-walkthrough-dari-sketchup",
    category: "Tutorial", readTime: "8 menit",
    title: "Cara Membuat VR Walkthrough dari SketchUp ke Oculus Quest",
    excerpt: "Panduan lengkap mengonversi model SketchUp menjadi aplikasi VR yang bisa dijalankan langsung di Oculus Quest 2 dan Quest 3 tanpa PC.",
    img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80",
    date: "20 Mei 2025", featured: true,
  },
  {
    id: 2, slug: "tren-arsitektur-rumah-minimalis-2025",
    category: "Insight", readTime: "5 menit",
    title: "Tren Arsitektur Rumah Minimalis 2025 yang Wajib Kamu Tahu",
    excerpt: "Dari material beton ekspos hingga integrasi ruang hijau indoor — inilah tren desain rumah yang mendominasi tahun ini.",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    date: "15 Mei 2025", featured: false,
  },
  {
    id: 3, slug: "menghasilkan-uang-dari-desain-sketchup",
    category: "Seller Tips", readTime: "6 menit",
    title: "Cara Menghasilkan Rp 10 Juta/Bulan dari Jual Desain SketchUp",
    excerpt: "Interview eksklusif dengan seller Renderchitect terbaik — strategi listing, penetapan harga, dan membangun reputasi di marketplace.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    date: "10 Mei 2025", featured: false,
  },
  {
    id: 4, slug: "glb-gltf-format-untuk-web-vr",
    category: "Tutorial", readTime: "7 menit",
    title: "GLB vs GLTF: Format 3D Terbaik untuk Web dan VR",
    excerpt: "Penjelasan mendalam perbedaan GLB dan GLTF, kapan menggunakannya, dan cara mengoptimasi file untuk performa web real-time.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    date: "5 Mei 2025", featured: false,
  },
  {
    id: 5, slug: "oculus-quest-untuk-presentasi-properti",
    category: "VR", readTime: "4 menit",
    title: "Kenapa Developer Properti Wajib Pakai Oculus Quest untuk Presentasi",
    excerpt: "Studi kasus: bagaimana VR walkthrough meningkatkan closing rate penjualan properti hingga 40% dibanding brosur konvensional.",
    img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80",
    date: "1 Mei 2025", featured: false,
  },
  {
    id: 6, slug: "tips-render-arsitektur-profesional",
    category: "Tutorial", readTime: "9 menit",
    title: "10 Tips Render Arsitektur yang Terlihat Profesional dan Menjual",
    excerpt: "Dari pengaturan lighting HDRI, komposisi kamera, hingga post-processing di Photoshop — teknik render yang dipakai seller terlaris Renderchitect.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    date: "25 April 2025", featured: false,
  },
];

const categories = ["Semua", "Tutorial", "Insight", "Seller Tips", "VR"];
const categoryColors = {
  Tutorial: { bg: "rgba(200,169,110,0.15)", color: "#C8A96E" },
  Insight: { bg: "rgba(34,211,238,0.12)", color: "#22d3ee" },
  "Seller Tips": { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
  VR: { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const filtered = activeCategory === "Semua" ? posts : posts.filter(p => p.category === activeCategory);
  const featured = posts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== "Semua");

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Blog & Insights</p>
          <h1 className="font-display text-6xl sm:text-7xl mb-3" style={{ color: "var(--text-primary)" }}>RENDERCHITECH<br />BLOG</h1>
          <p style={{ color: "var(--text-secondary)" }}>Tutorial, tren arsitektur, tips seller, dan dunia VR.</p>
        </motion.div>

        {/* Category filter */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-mono transition-all"
              style={activeCategory === cat
                ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }
                : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeCategory === "Semua" && featured && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-8 group cursor-pointer"
            style={{ border: "1px solid var(--border)" }}>
            <img src={featured.img} alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.25)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="relative z-10 p-10 md:p-14 min-h-[380px] flex flex-col justify-end">
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{ ...(categoryColors[featured.category] || {}), backdropFilter: "blur(8px)", border: "1px solid rgba(200,169,110,0.3)" }}>
                  {featured.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-white/60"
                  style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                  ✦ Featured
                </span>
              </div>
              <h2 className="font-heading font-bold text-white mb-3" style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>
                {featured.title}
              </h2>
              <p className="text-white/60 text-sm mb-5 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <FiClock size={11} /> {featured.readTime}
                </div>
                <div className="text-xs text-white/40">{featured.date}</div>
                <Link to={`/blog/${featured.slug}`}
                  className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                  Baca Artikel <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "Semua" ? posts.filter(p => !p.featured) : filtered).map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="overflow-hidden h-44">
                <img src={post.img} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.85)" }} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                    style={{ ...(categoryColors[post.category] || { bg: "var(--bg-elevated)", color: "var(--text-muted)" }), background: categoryColors[post.category]?.bg }}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <FiClock size={10} /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-heading font-bold mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                  <Link to={`/blog/${post.slug}`}
                    className="text-xs font-medium flex items-center gap-1 transition-all hover:gap-2"
                    style={{ color: "var(--accent)" }}>
                    Baca <FiArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}