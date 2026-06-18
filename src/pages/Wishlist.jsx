import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";

// ── Helpers normalize data lokal vs API ──────────────────────────────────────
const getImage = (item) => {
  const imgs = item.images;
  if (!imgs || imgs.length === 0) return null;
  const first = imgs[0];
  return typeof first === "string" ? first : first?.url || null;
};

const getCategoryName = (item) => {
  if (!item.category) return "";
  if (typeof item.category === "object") return item.category.name || "";
  return item.category;
};

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div
        className="min-h-screen pt-32 flex flex-col items-center justify-center px-6"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="text-6xl mb-6">🤍</div>
        <h2 className="font-heading text-2xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}>
          Your wishlist is empty
        </h2>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          Save designs you love to revisit later
        </p>
        <Link
          to="/projects"
          className="px-8 py-3.5 rounded-xl font-semibold transition-colors"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}
        >
          Browse Designs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-2"
            style={{ color: "var(--accent)" }}>
            Saved Items
          </p>
          <h1 className="font-display text-5xl" style={{ color: "var(--text-primary)" }}>
            YOUR WISHLIST
          </h1>
          <p className="mt-1" style={{ color: "var(--text-muted)" }}>
            {wishlist.length} saved design{wishlist.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map((item, i) => {
            const image    = getImage(item);
            const category = getCategoryName(item);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden group transition-all duration-300"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44">
                  {image ? (
                    <img
                      src={image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-xs"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg glass flex items-center justify-center transition-colors text-red-400 hover:bg-red-500/20"
                  >
                    <FiHeart size={14} fill="currentColor" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <Link
                    to={`/projects/${item.slug}`}
                    className="font-heading font-semibold text-sm transition-colors line-clamp-1 block mb-1 hover:text-[var(--accent)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </Link>

                  {category && (
                    <p className="text-xs capitalize mb-3"
                      style={{ color: "var(--text-muted)" }}>
                      {category}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="font-heading font-bold"
                      style={{ color: "var(--accent)" }}>
                      {formatPrice(item.price || 0)}
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 rounded-lg transition-all"
                      style={{ background: "rgba(200,169,110,0.1)", color: "var(--accent)" }}
                    >
                      <FiShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}