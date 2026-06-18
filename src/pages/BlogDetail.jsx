import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiEye, FiCalendar, FiTag } from "react-icons/fi";
import api from "../services/api";
import { Loader } from "../components/ui/Loader";

const categoryColors = {
  Tutorial:      { bg: "rgba(200,169,110,0.15)", color: "#C8A96E" },
  Insight:       { bg: "rgba(34,211,238,0.12)",  color: "#22d3ee" },
  "Seller Tips": { bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  VR:            { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
};

const getImage = (post) => {
  if (post?.coverImage) return post.coverImage;
  const fallbacks = {
    Tutorial:      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80",
    Insight:       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    "Seller Tips": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    VR:            "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80",
  };
  return fallbacks[post?.category] || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80";
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    api.get(`/blog/${slug}`)
      .then(res => setPost(res.data))
      .catch(err => {
        if (err.statusCode === 404 || err.message?.includes("not found")) {
          setError("404");
        } else {
          setError(err.message || "Gagal memuat artikel");
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader fullScreen />;
  if (error === "404") return <Navigate to="/blog" replace />;

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--bg-primary)" }}>
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="font-heading text-2xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}>
          Gagal Memuat Artikel
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{error}</p>
        <Link to="/blog"
          className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  if (!post) return null;

  const catStyle = categoryColors[post.category] || { bg: "var(--bg-elevated)", color: "var(--text-muted)" };
  const tags     = post.tags?.map(t => t.tag || t) ?? [];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            <FiArrowLeft size={14} /> Kembali ke Blog
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          {/* Category badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono"
              style={{ background: catStyle.bg, color: catStyle.color }}
            >
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-mono"
                style={{ background: "rgba(200,169,110,0.15)", color: "var(--accent)", border: "1px solid rgba(200,169,110,0.3)" }}>
                ✦ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-heading font-bold leading-tight mb-5"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 pb-5 border-b"
            style={{ borderColor: "var(--border)" }}>
            {post.author?.name && (
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover"
                    style={{ border: "1px solid var(--border)" }} />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {post.author.name}
                </span>
              </div>
            )}
            <span className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}>
              <FiCalendar size={12} /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}>
              <FiClock size={12} /> {post.readTime} menit baca
            </span>
            <span className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}>
              <FiEye size={12} /> {(post.views || 0).toLocaleString("id-ID")} views
            </span>
          </div>
        </motion.div>

        {/* ── Cover Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-10"
          style={{ border: "1px solid var(--border)" }}
        >
          <img
            src={getImage(post)}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {/* Excerpt / lead */}
          {post.excerpt && (
            <p
              className="text-base leading-relaxed mb-8 font-medium"
              style={{
                color:           "var(--text-secondary)",
                borderLeft:      "3px solid var(--accent)",
                paddingLeft:     "1rem",
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Main content */}
          <div
            className="prose-content leading-relaxed text-sm"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
            }}
          >
            {/* Render content sebagai paragraf */}
            {post.content
              ? post.content.split("\n").filter(Boolean).map((paragraph, i) => (
                  <p key={i} className="mb-5"
                    style={{ color: "var(--text-secondary)" }}>
                    {paragraph}
                  </p>
                ))
              : (
                <div className="py-12 text-center rounded-2xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-4xl mb-3">✍️</div>
                  <p style={{ color: "var(--text-muted)" }}>
                    Konten artikel sedang disiapkan...
                  </p>
                </div>
              )
            }
          </div>

          {/* ── Tags ── */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t"
              style={{ borderColor: "var(--border)" }}>
              <FiTag size={13} style={{ color: "var(--text-muted)" }} />
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    background: "rgba(200,169,110,0.08)",
                    color:      "var(--accent)",
                    border:     "1px solid rgba(200,169,110,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Related Posts ── */}
        {post.related && post.related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="font-heading font-bold text-xl mb-6"
              style={{ color: "var(--text-primary)" }}>
              Artikel Terkait
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {post.related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="block rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div className="overflow-hidden h-32">
                      <img
                        src={getImage(rel)}
                        alt={rel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "brightness(0.8)" }}
                      />
                    </div>
                    <div className="p-3">
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: categoryColors[rel.category]?.color || "var(--text-muted)",
                        }}
                      >
                        {rel.category}
                      </span>
                      <h3
                        className="font-heading font-semibold text-sm mt-1 line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-xs"
                        style={{ color: "var(--text-muted)" }}>
                        <FiClock size={10} /> {rel.readTime} menit
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Back button ── */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          >
            <FiArrowLeft size={14} /> Semua Artikel
          </Link>
        </div>

      </div>
    </div>
  );
}