import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiSearch } from "react-icons/fi";
import api from "../services/api";
import { Loader } from "../components/ui/Loader";

const categoryColors = {
  Tutorial:     { bg: "rgba(200,169,110,0.15)", color: "#C8A96E"  },
  Insight:      { bg: "rgba(34,211,238,0.12)",  color: "#22d3ee"  },
  "Seller Tips":{ bg: "rgba(52,211,153,0.12)",  color: "#34d399"  },
  VR:           { bg: "rgba(167,139,250,0.12)", color: "#a78bfa"  },
};

// Helper — format tanggal dari ISO string
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
};

// Helper — ambil cover image atau fallback Unsplash
const getImage = (post) => {
  if (post.coverImage) return post.coverImage;
  const fallbacks = {
    Tutorial:      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80",
    Insight:       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    "Seller Tips": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    VR:            "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80",
  };
  return fallbacks[post.category] || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80";
};

export default function Blog() {
  const [posts,          setPosts]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search,         setSearch]         = useState("");
  const [searchInput,    setSearchInput]    = useState("");
  const [page,           setPage]           = useState(1);
  const [meta,           setMeta]           = useState(null);
  const [categories,     setCategories]     = useState(["Semua"]);

  // Fetch kategori dari API
  useEffect(() => {
    api.get("/blog/categories")
      .then(res => {
        const cats = res.data.map(c => c.category);
        setCategories(["Semua", ...cats]);
      })
      .catch(() => {
        // fallback ke kategori statis
        setCategories(["Semua", "Tutorial", "Insight", "Seller Tips", "VR"]);
      });
  }, []);

  // Fetch posts dari API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page,
          limit: 9,
          ...(activeCategory !== "Semua" && { category: activeCategory }),
          ...(search && { search }),
        };
        const res = await api.get("/blog", { params });
        setPosts(res.data);
        setMeta(res.meta);
      } catch (err) {
        setError(err.message || "Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeCategory, search, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  // Featured = post pertama yang featured: true, atau post pertama
  const featured = activeCategory === "Semua"
    ? posts.find(p => p.featured) || posts[0]
    : null;

  const gridPosts = activeCategory === "Semua"
    ? posts.filter(p => p.id !== featured?.id)
    : posts;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}>
            Blog & Insights
          </p>
          <h1 className="font-display text-6xl sm:text-7xl mb-3"
            style={{ color: "var(--text-primary)" }}>
            ARCHVAULT<br />BLOG
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Tutorial, tren arsitektur, tips seller, dan dunia VR.
          </p>
        </motion.div>

        {/* ── Search + Category filter ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2"
              size={14} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
              style={{
                background: "var(--bg-card)",
                color:      "var(--text-primary)",
                border:     "1px solid var(--border)",
                outline:    "none",
              }}
            />
          </form>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-mono transition-all"
                style={
                  activeCategory === cat
                    ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }
                    : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && <Loader />}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="font-heading text-lg mb-1" style={{ color: "var(--text-primary)" }}>
              Gagal memuat artikel
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-heading text-lg" style={{ color: "var(--text-primary)" }}>
              Belum ada artikel
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Coba kata kunci atau kategori lain
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            {/* ── Featured post ── */}
            {featured && activeCategory === "Semua" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl overflow-hidden mb-8 group cursor-pointer"
                style={{ border: "1px solid var(--border)" }}
              >
                <img
                  src={getImage(featured)}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.25)" }}
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

                <div className="relative z-10 p-10 md:p-14 min-h-[380px] flex flex-col justify-end">
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        ...(categoryColors[featured.category] || {}),
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(200,169,110,0.3)",
                      }}
                    >
                      {featured.category}
                    </span>
                    {featured.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono text-white/60"
                        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                        ✦ Featured
                      </span>
                    )}
                  </div>

                  <h2 className="font-heading font-bold text-white mb-3"
                    style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-5 max-w-2xl">{featured.excerpt}</p>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <FiClock size={11} /> {featured.readTime} menit
                    </div>
                    <div className="text-xs text-white/40">
                      {formatDate(featured.publishedAt)}
                    </div>
                    {featured.author?.name && (
                      <div className="text-xs text-white/40">
                        oleh {featured.author.name}
                      </div>
                    )}
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: "var(--accent)", color: "#0a0a0a" }}
                    >
                      Baca Artikel <FiArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Grid posts ── */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  {/* Image */}
                  <div className="overflow-hidden h-44">
                    <img
                      src={getImage(post)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                        style={{
                          background: categoryColors[post.category]?.bg || "var(--bg-elevated)",
                          color:      categoryColors[post.category]?.color || "var(--text-muted)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--text-muted)" }}>
                        <FiClock size={10} /> {post.readTime} menit
                      </span>
                    </div>

                    <h3
                      className="font-heading font-bold mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--text-primary)", fontSize: "1rem" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-sm line-clamp-2 mb-4"
                      style={{ color: "var(--text-secondary)" }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-xs font-medium flex items-center gap-1 transition-all hover:gap-2"
                        style={{ color: "var(--accent)" }}
                      >
                        Baca <FiArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* ── Pagination ── */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!meta.hasPrev}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-40"
                  style={{
                    background: "var(--bg-card)",
                    color:      "var(--text-secondary)",
                    border:     "1px solid var(--border)",
                  }}
                >
                  ← Sebelumnya
                </button>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`dot-${i}`} className="px-2"
                        style={{ color: "var(--text-muted)" }}>…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-9 h-9 rounded-xl text-sm transition-all"
                        style={
                          page === p
                            ? { background: "var(--accent)", color: "#0a0a0a" }
                            : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                        }
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={!meta.hasNext}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-40"
                  style={{
                    background: "var(--bg-card)",
                    color:      "var(--text-secondary)",
                    border:     "1px solid var(--border)",
                  }}
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}