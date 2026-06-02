import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { StarRating } from "../ui/StarRating";
import { testimonials } from "../../data/projects";

export function TestimonialSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Social Proof" title="What Designers Say" center className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 transition-all duration-300"
              style={{ border: "1px solid var(--border)" }}
            >
              <StarRating rating={t.rating} className="mb-3" />
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full" style={{ background: "var(--bg-elevated)" }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
