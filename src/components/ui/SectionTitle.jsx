import { motion } from "framer-motion";

export function SectionTitle({ eyebrow, title, subtitle, center = false, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`${center ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className="font-mono text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
