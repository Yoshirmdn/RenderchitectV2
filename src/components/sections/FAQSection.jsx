import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";
import { faqItems } from "../../data/projects";

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left gap-4 transition-colors"
        style={{ color: isOpen ? "var(--accent)" : "var(--text-primary)" }}
      >
        <span className="font-heading font-medium text-sm sm:text-base">{q}</span>
        <span className="shrink-0" style={{ color: "var(--accent)" }}>{isOpen ? <FiMinus /> : <FiPlus />}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm pb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-padding" id="faq" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-3xl mx-auto">
        <SectionTitle eyebrow="FAQ" title="Common Questions" center className="mb-12" />
        <div className="glass rounded-2xl px-6" style={{ border: "1px solid var(--border)" }}>
          {faqItems.map((item, i) => (
            <FAQItem key={i} {...item} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
