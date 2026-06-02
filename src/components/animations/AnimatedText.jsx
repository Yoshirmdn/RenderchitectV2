import { motion } from "framer-motion";

export function AnimatedText({ text, className = "", delay = 0, tag = "span" }) {
  const words = text.split(" ");
  const Tag = tag;
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.06 }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
