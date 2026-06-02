import { motion } from "framer-motion";
import { SectionTitle } from "../components/ui/SectionTitle";
import { CTASection } from "../components/sections/CTASection";

const team = [
  { name: "Arif Wicaksono", role: "Founder & CEO", img: "https://api.dicebear.com/7.x/personas/svg?seed=arif" },
  { name: "Diana Putri", role: "Head of Design", img: "https://api.dicebear.com/7.x/personas/svg?seed=diana" },
  { name: "Kevin Lim", role: "Lead Developer", img: "https://api.dicebear.com/7.x/personas/svg?seed=kevin" },
  { name: "Sarah Tan", role: "Community Manager", img: "https://api.dicebear.com/7.x/personas/svg?seed=sarah" },
];

const values = [
  { icon: "🏆", title: "Quality First", desc: "Every design is reviewed by our team before listing. No compromises on geometry quality, UV mapping, or file organization." },
  { icon: "⚡", title: "Instant Delivery", desc: "All purchases are delivered instantly. Download your files immediately — no waiting, no delays." },
  { icon: "🔒", title: "Commercial License", desc: "Every purchase includes full commercial rights. Use designs freely in client work, renders, and property marketing." },
  { icon: "🛠️", title: "Format Flexibility", desc: "We provide SketchUp, GLB, GLTF, OBJ, AutoCAD formats — whatever your workflow demands." },
  { icon: "🌏", title: "Local Expertise", desc: "Specialized in Southeast Asian architectural styles including tropical, Bali, Javanese modern, and Singapore contemporary." },
  { icon: "🤝", title: "Seller Support", desc: "Our seller program helps architects monetize their work. Earn 70% of every sale with monthly payouts." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--bg-primary)" }}>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Our Story</p>
          <h1 className="font-display text-6xl sm:text-7xl mb-6 leading-none" style={{ color: "var(--text-primary)" }}>
            BUILT FOR<br /><span className="text-gradient">ARCHITECTS</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            ArchVault was born from a simple frustration: finding high-quality, ready-to-use 3D architecture models shouldn't take hours. We built a marketplace where quality is guaranteed and every purchase saves you days of work.
          </p>
        </motion.div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Our Values" title="What We Stand For" center className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 transition-all"
                style={{ border: "1px solid var(--border)" }}>
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="The Team" title="Meet The Crew" center className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center" style={{ border: "1px solid var(--border)" }}>
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4"
                  style={{ background: "var(--bg-elevated)" }} />
                <div className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>{member.name}</div>
                <div className="text-sm" style={{ color: "var(--accent)" }}>{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
