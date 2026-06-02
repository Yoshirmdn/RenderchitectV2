import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar, FiShare2, FiArrowLeft, FiCheck, FiDownload } from "react-icons/fi";
import { HiCube } from "react-icons/hi";
import { projects } from "../data/projects";
import { useStore } from "../store/useStore";
import { HouseViewerLazy as HouseViewer } from "../components/3d/HouseViewerLazy";
import { Badge } from "../components/ui/Badge";
import { StarRating } from "../components/ui/StarRating";
import { ProjectCard } from "../components/ui/ProjectCard";
import { formatPrice } from "../utils/format";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [added, setAdded] = useState(false);

  if (!project) return <Navigate to="/projects" replace />;

  const related = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3);
  const discount = Math.round((1 - project.price / project.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(project);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabStyle = (active) => ({
    background: active ? "var(--accent)" : "var(--bg-card)",
    color: active ? "#0a0a0a" : "var(--text-secondary)",
    border: active ? "none" : "1px solid var(--border)",
  });

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          <Link to="/projects" className="flex items-center gap-1 transition-colors hover:text-[var(--accent)]">
            <FiArrowLeft size={13} /> Projects
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{project.title}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Images/3D */}
          <div className="lg:col-span-3">
            <div className="flex gap-2 mb-3">
              {["Gallery", "3D Viewer"].map((tab, i) => (
                <button key={tab} onClick={() => setShowViewer(i === 1)}
                  className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                  style={tabStyle(showViewer === (i === 1))}>
                  {i === 1 && <HiCube size={14} />}{tab}
                </button>
              ))}
            </div>

            {showViewer ? (
              <HouseViewer />
            ) : (
              <>
                <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="rounded-2xl overflow-hidden mb-3" style={{ background: "var(--bg-card)" }}>
                  <img src={project.images[activeImg]} alt={project.title} className="w-full h-80 sm:h-96 object-cover" />
                </motion.div>
                <div className="grid grid-cols-4 gap-2">
                  {project.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="rounded-xl overflow-hidden border-2 transition-colors"
                      style={{ borderColor: i === activeImg ? "var(--accent)" : "transparent" }}>
                      <img src={img} alt="" className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right — Details */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.bestseller && <Badge variant="gold">Bestseller</Badge>}
                {project.new && <Badge variant="new">New</Badge>}
                <Badge variant="default" className="capitalize">{project.category}</Badge>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={project.rating} size="md" />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{project.rating} ({project.reviews})</span>
                <span className="text-sm ml-auto" style={{ color: "var(--text-muted)" }}>{project.downloads.toLocaleString()} downloads</span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{project.longDescription}</p>

              {/* Specs */}
              <div className="rounded-xl p-4 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[["Area", `${project.area} m²`], ["Floors", project.dimensions.floors], ["Width", `${project.dimensions.width}m`], ["Depth", `${project.dimensions.depth}m`], ["File Size", project.fileSize], ["Seller", project.seller]].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{k}</div>
                      <div className="font-medium" style={{ color: "var(--text-primary)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div className="mb-6">
                <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Included formats</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.fileFormats.map(f => (
                    <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-mono"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <div className="font-heading text-3xl font-bold" style={{ color: "var(--accent)" }}>{formatPrice(project.price)}</div>
                <div className="text-sm mb-1 line-through" style={{ color: "var(--text-muted)" }}>{formatPrice(project.originalPrice)}</div>
                <div className="mb-1"><Badge variant="green">-{discount}%</Badge></div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  style={added ? { background: "#10b981", color: "white" } : { background: "var(--accent)", color: "#0a0a0a" }}
                >
                  {added ? <><FiCheck /> Added!</> : <><FiShoppingCart size={16} /> Add to Cart</>}
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWishlist(project)}
                    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-300"
                    style={isWishlisted(project.id)
                      ? { color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)" }
                      : { color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <FiHeart fill={isWishlisted(project.id) ? "currentColor" : "none"} size={15} />
                    {isWishlisted(project.id) ? "Saved" : "Wishlist"}
                  </button>
                  <button className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                    style={{ color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <FiShare2 size={15} /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Related Designs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
