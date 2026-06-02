import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-display text-[10rem] sm:text-[14rem] leading-none select-none" style={{ color: "var(--bg-elevated)" }}>404</div>
        <h1 className="font-display text-5xl -mt-8 mb-4" style={{ color: "var(--text-primary)" }}>PAGE NOT FOUND</h1>
        <p className="mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="px-8 py-3.5 rounded-xl font-semibold transition-colors"
          style={{ background: "var(--accent)", color: "#0a0a0a" }}>Back to Home</Link>
      </motion.div>
    </div>
  );
}
