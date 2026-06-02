// Re-export dari store + tambah konteks user
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useStore } from "../../store/useStore";
import { formatPrice } from "../../utils/format";

export default function UserWishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🤍</div>
        <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Wishlist kosong</h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Simpan desain yang kamu suka untuk dibeli nanti</p>
        <Link to="/projects" className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>Browse Designs</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold text-xl" style={{ color: "var(--text-primary)" }}>Wishlist</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{wishlist.length} saved design{wishlist.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="relative h-36 overflow-hidden">
              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-4">
              <Link to={`/projects/${item.slug}`}
                className="font-heading font-semibold text-sm block mb-1 hover:text-[var(--accent)] transition-colors line-clamp-1"
                style={{ color: "var(--text-primary)" }}>{item.title}</Link>
              <div className="text-xs capitalize mb-3" style={{ color: "var(--text-muted)" }}>{item.category}</div>
              <div className="flex items-center justify-between">
                <div className="font-heading font-bold" style={{ color: "var(--accent)" }}>{formatPrice(item.price)}</div>
                <div className="flex gap-1">
                  <button onClick={() => addToCart(item)}
                    className="p-2 rounded-lg transition-all"
                    style={{ background: "rgba(200,169,110,0.1)", color: "var(--accent)" }}>
                    <FiShoppingCart size={13} />
                  </button>
                  <button onClick={() => toggleWishlist(item)}
                    className="p-2 rounded-lg transition-all text-red-400 hover:bg-red-400/10">
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}