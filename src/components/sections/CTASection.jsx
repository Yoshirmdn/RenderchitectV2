import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1408, #2a1f0a, #111111)" }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "linear-gradient(rgba(200,169,110,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(200,169,110,0.15)" }} />
          <div className="relative z-10 text-center py-20 px-8">
            <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Start Today</p>
            <h2 className="font-display text-5xl sm:text-6xl text-white mb-6 leading-tight">
              YOUR DESIGN<br />MARKETPLACE AWAITS
            </h2>
            <p className="text-base max-w-lg mx-auto mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              Join 18,000+ architects, designers, and property developers who trust Renderchitect for premium 3D designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                Browse Designs <FiArrowRight />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all border" style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
                style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
