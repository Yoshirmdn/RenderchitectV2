import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export function Modal({ open, onClose, children, title, size = "md" }) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl", full: "max-w-6xl" };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose} />
          <motion.div
            className={`relative glass-strong rounded-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
            style={{ border: "1px solid var(--border-strong)" }}
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-heading text-xl font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h3>
              <button onClick={onClose} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-elevated)]"
                style={{ color: "var(--text-muted)" }}>
                <IoClose size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
