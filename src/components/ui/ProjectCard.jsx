import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar, FiDownload } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import { Badge } from "./Badge";
import { formatPrice } from "../../utils/format";

// Helper — handle category dari API (object) atau data lokal (string)
const getCategoryName = (category) => {
  if (!category) return "";
  if (typeof category === "object") return category.name || "";
  return category;
};

// Helper — handle images dari API [{url, isPrimary}] atau data lokal ["url"]
const getImageUrl = (images) => {
  if (!images || images.length === 0) return null;
  const first = images[0];
  if (typeof first === "string") return first;
  return first.url || null;
};

// Helper — handle rating dari API (totalRating) atau data lokal (rating)
const getRating = (project) => {
  return project.totalRating ?? project.rating ?? 0;
};

// Helper — handle reviews count dari API (_count.reviews) atau data lokal (reviews)
const getReviewCount = (project) => {
  return project._count?.reviews ?? project.reviews ?? 0;
};

export function ProjectCard({ project, index = 0 }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted   = isWishlisted(project.id);
  const categoryName = getCategoryName(project.category);
  const imageUrl     = getImageUrl(project.images);
  const rating       = getRating(project);
  const reviewCount  = getReviewCount(project);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(project);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden card-hover border"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--bg-elevated)" }}>
            <span style={{ color: "var(--text-muted)" }}>No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.bestseller && <Badge variant="gold">Bestseller</Badge>}
          {(project.new || project.isNew) && <Badge variant="new">New</Badge>}
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-colors"
            style={{ color: wishlisted ? "#f87171" : "white" }}
          >
            <FiHeart size={15} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white hover:text-[var(--accent)] transition-colors"
          >
            <FiShoppingCart size={15} />
          </motion.button>
        </div>

        {/* Category pill */}
        {categoryName && (
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-mono backdrop-blur-sm capitalize"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.8)" }}
            >
              {categoryName}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/projects/${project.slug}`}>
          <h3
            className="font-heading font-semibold text-base mb-1 line-clamp-1 transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
        </Link>

        <p
          className="text-sm mb-3 line-clamp-2 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-3 mb-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <FiStar className="text-[var(--accent)]" />
            <span style={{ color: "var(--text-secondary)" }}>
              {typeof rating === "number" ? rating.toFixed(1) : rating}
            </span>
            <span>({reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <FiDownload size={11} />
            {(project.downloads || 0).toLocaleString()}
          </span>
          <span className="ml-auto">{project.fileSize || ""}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div
              className="font-heading font-bold text-lg"
              style={{ color: "var(--accent)" }}
            >
              {formatPrice(project.price)}
            </div>
            {project.originalPrice && project.originalPrice > project.price && (
              <div className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                {formatPrice(project.originalPrice)}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}