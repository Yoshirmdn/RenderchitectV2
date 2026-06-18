import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ── Helpers — normalize data lokal vs API ────────────────────────────────────

// images: ["url"] atau [{url, isPrimary}]

const getImage = (item) => {
  const imgs = item.images;
  if (!imgs || imgs.length === 0) return null;
  const first = imgs[0];
  return typeof first === "string" ? first : first?.url || null;
};

// category: "villa" (string) atau {name, slug} (object)
const getCategoryName = (item) => {
  if (!item.category) return "";
  if (typeof item.category === "object") return item.category.name || "";
  return item.category;
};

// fileFormats: ["SKP","GLB"] atau files: [{format:"SKP"}]
const getFormats = (item) => {
  if (Array.isArray(item.fileFormats) && item.fileFormats.length > 0)
    return item.fileFormats;
  if (Array.isArray(item.files) && item.files.length > 0)
    return item.files.map(f => f.format).filter(Boolean);
  return [];
};

// ── Component ────────────────────────────────────────────────────────────────

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useStore();
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const navigate  = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen pt-32 flex flex-col items-center justify-center px-6"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="font-heading text-2xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}>
          Your cart is empty
        </h2>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          Browse our marketplace to find your perfect design
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
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl mb-1"
            style={{ color: "var(--text-primary)" }}>YOUR CART</h1>
          <p style={{ color: "var(--text-muted)" }}>
            {cart.length} item{cart.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Items ── */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => {
              const image    = getImage(item);
              const category = getCategoryName(item);
              const formats  = getFormats(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                  style={{ border: "1px solid var(--border)" }}
                >
                  {/* Image */}
                  {image ? (
                    <img
                      src={image}
                      alt={item.title}
                      className="w-20 h-16 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-20 h-16 rounded-lg shrink-0 flex items-center justify-center text-xs"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
                    >
                      No img
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/projects/${item.slug}`}
                      className="font-heading font-semibold text-sm line-clamp-1 transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </Link>
                    {category && (
                      <div className="text-xs mt-0.5 capitalize"
                        style={{ color: "var(--text-muted)" }}>
                        {category}
                      </div>
                    )}
                    {/* Format tags */}
                    {formats.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {formats.slice(0, 3).map(f => (
                          <span
                            key={f}
                            className="px-1.5 py-0.5 rounded text-xs font-mono"
                            style={{
                              background: "var(--bg-elevated)",
                              color:      "var(--text-muted)",
                            }}
                          >
                            {f}
                          </span>
                        ))}
                        {formats.length > 3 && (
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            +{formats.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price + remove */}
                  <div className="text-right shrink-0">
                    <div className="font-heading font-bold"
                      style={{ color: "var(--accent)" }}>
                      {formatPrice(item.price || 0)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 p-1.5 rounded-lg transition-all hover:text-red-400"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Order Summary ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 sticky top-28"
              style={{ border: "1px solid var(--border)" }}
            >
              <h3 className="font-heading font-bold text-lg mb-5"
                style={{ color: "var(--text-primary)" }}>
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                {[
                  ["Subtotal",    total],
                  ["Tax (11%)",   total * 0.11],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                    <span style={{ color: "var(--text-primary)" }}>{formatPrice(val)}</span>
                  </div>
                ))}
                <div
                  className="border-t pt-3 flex justify-between font-semibold"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span style={{ color: "var(--text-primary)" }}>Total</span>
                  <span className="font-heading text-lg"
                    style={{ color: "var(--accent)" }}>
                    {formatPrice(total * 1.11)}
                  </span>
                </div>
              </div>

              {/* Item count info */}
              <p className="text-xs mb-4 text-center" style={{ color: "var(--text-muted)" }}>
                {cart.length} design{cart.length !== 1 ? "s" : ""} · Instant download after payment
              </p>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors hover:opacity-90"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}
              >
                {isLoggedIn ? "Checkout" : "Sign In to Checkout"} <FiArrowRight size={14} />
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-3 py-2.5 text-sm transition-colors hover:text-red-400"
                style={{ color: "var(--text-muted)" }}
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}