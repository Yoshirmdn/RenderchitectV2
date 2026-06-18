import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart, FiShoppingCart, FiShare2,
  FiArrowLeft, FiCheck, FiDownload,
} from "react-icons/fi";
import { HiCube } from "react-icons/hi";
import { useProject } from "../hooks/useProjects";
import { useCart } from "../hooks/useCart";
import { useStore } from "../store/useStore";
import { useAuth } from "../context/AuthContext";
import { HouseViewerLazy as HouseViewer } from "../components/3d/HouseViewerLazy";
import { Badge } from "../components/ui/Badge";
import { StarRating } from "../components/ui/StarRating";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Loader } from "../components/ui/Loader";
import { formatPrice } from "../utils/format";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();
  const { addToCart }  = useCart();
  const { toggleWishlist, isWishlisted } = useStore();

  const { data: project, loading, error } = useProject(slug);

  const [activeImg,   setActiveImg]   = useState(0);
  const [showViewer,  setShowViewer]  = useState(false);
  const [added,       setAdded]       = useState(false);

  // Loading state
  if (loading) return <Loader fullScreen />;

  // Error / not found
  if (error || !project) return <Navigate to="/projects" replace />;

  // Map API response ke shape yang dipakai komponen
  // API returns: project.images = [{ url, isPrimary }]
  // Component expects: project.images = ["url1", "url2"]
  const images   = project.images?.map(img => img.url || img) ?? [];
  const formats  = project.files?.map(f => f.format) ?? project.fileFormats ?? [];
  const tags     = project.tags?.map(t => t.tag || t) ?? [];
  const rating   = project.totalRating || project.rating || 0;
  const reviews  = project._count?.reviews ?? project.reviews ?? 0;
  const discount = project.originalPrice
    ? Math.round((1 - project.price / project.originalPrice) * 100)
    : 0;

  // Related projects dari API nanti, sementara kosong
  const related = [];

  const handleAddToCart = async () => {
    await addToCart(project.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabStyle = (active) => ({
    background: active ? "var(--accent)" : "var(--bg-card)",
    color:      active ? "#0a0a0a"       : "var(--text-secondary)",
    border:     active ? "none"          : "1px solid var(--border)",
  });

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6"
          style={{ color: "var(--text-muted)" }}>
          <Link to="/projects"
            className="flex items-center gap-1 transition-colors hover:text-[var(--accent)]">
            <FiArrowLeft size={13} /> Projects
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{project.title}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: Images / 3D ── */}
          <div className="lg:col-span-3">
            {/* Tab */}
            <div className="flex gap-2 mb-3">
              {["Gallery", "3D Viewer"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setShowViewer(i === 1)}
                  className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                  style={tabStyle(showViewer === (i === 1))}
                >
                  {i === 1 && <HiCube size={14} />}
                  {tab}
                </button>
              ))}
            </div>

            {showViewer ? (
              <HouseViewer />
            ) : images.length > 0 ? (
              <>
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl overflow-hidden mb-3"
                  style={{ background: "var(--bg-card)" }}
                >
                  <img
                    src={images[activeImg]}
                    alt={project.title}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </motion.div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className="rounded-xl overflow-hidden border-2 transition-colors"
                        style={{
                          borderColor: i === activeImg
                            ? "var(--accent)"
                            : "transparent",
                        }}
                      >
                        <img src={img} alt="" className="w-full h-20 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Fallback jika belum ada gambar
              <div className="rounded-2xl h-96 flex items-center justify-center"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-muted)" }}>No images available</span>
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.bestseller && <Badge variant="gold">Bestseller</Badge>}
                {project.isNew      && <Badge variant="new">New</Badge>}
                {project.category && (
                  <Badge variant="default" className="capitalize">
                    {project.category?.name || project.category}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={rating} size="md" />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {rating.toFixed(1)} ({reviews} reviews)
                </span>
                <span className="text-sm ml-auto" style={{ color: "var(--text-muted)" }}>
                  {(project.downloads || 0).toLocaleString()} downloads
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}>
                {project.longDescription || project.description}
              </p>

              {/* Specs */}
              <div className="rounded-xl p-4 mb-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Area",     project.area      ? `${project.area} m²` : "—"],
                    ["Floors",   project.floorCount ?? "—"],
                    ["Width",    project.width      ? `${project.width}m`  : "—"],
                    ["Depth",    project.depth      ? `${project.depth}m`  : "—"],
                    ["File Size",project.fileSize   ?? "—"],
                    ["Seller",   project.seller?.storeName ?? "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{k}</div>
                      <div className="font-medium" style={{ color: "var(--text-primary)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats */}
              {formats.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    Included formats
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formats.map(f => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono"
                        style={{
                          background: "var(--bg-elevated)",
                          color:      "var(--text-secondary)",
                          border:     "1px solid var(--border)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-mono"
                        style={{
                          background: "rgba(200,169,110,0.08)",
                          color:      "var(--accent)",
                          border:     "1px solid rgba(200,169,110,0.2)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <div className="font-heading text-3xl font-bold"
                  style={{ color: "var(--accent)" }}>
                  {formatPrice(project.price)}
                </div>
                {project.originalPrice && project.originalPrice > project.price && (
                  <>
                    <div className="text-sm mb-1 line-through"
                      style={{ color: "var(--text-muted)" }}>
                      {formatPrice(project.originalPrice)}
                    </div>
                    <div className="mb-1">
                      <Badge variant="green">-{discount}%</Badge>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  style={
                    added
                      ? { background: "#10b981", color: "white" }
                      : { background: "var(--accent)", color: "#0a0a0a" }
                  }
                >
                  {added
                    ? <><FiCheck /> Added to Cart!</>
                    : <><FiShoppingCart size={16} /> Add to Cart</>}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWishlist(project)}
                    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-300"
                    style={
                      isWishlisted(project.id)
                        ? { color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)" }
                        : { color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border)" }
                    }
                  >
                    <FiHeart
                      fill={isWishlisted(project.id) ? "currentColor" : "none"}
                      size={15}
                    />
                    {isWishlisted(project.id) ? "Saved" : "Wishlist"}
                  </button>

                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                    style={{
                      color:      "var(--text-secondary)",
                      background: "var(--bg-card)",
                      border:     "1px solid var(--border)",
                    }}
                  >
                    <FiShare2 size={15} /> Share
                  </button>
                </div>

                {/* Login prompt if not logged in */}
                {!isLoggedIn && (
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    <Link to="/login" style={{ color: "var(--accent)" }}>Sign in</Link>
                    {" "}to save to wishlist or add to cart
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}>
              Related Designs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}