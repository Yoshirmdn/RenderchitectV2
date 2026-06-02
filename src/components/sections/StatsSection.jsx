import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "../../data/projects";

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 border-y" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="font-display text-5xl sm:text-6xl mb-2 text-gradient">{value}</div>
              <div className="text-sm font-mono tracking-wider" style={{ color: "var(--text-secondary)" }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
