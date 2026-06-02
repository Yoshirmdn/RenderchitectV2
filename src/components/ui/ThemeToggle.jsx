import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-10 h-10 rounded-lg glass flex items-center justify-center transition-colors"
      style={{ color: "var(--text-secondary)" }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Sedang dark → tampil Sun (klik jadi light) */}
          {/* Sedang light → tampil Moon (klik jadi dark) */}
          {isDark
            ? <HiSun size={18} style={{ color: "#C8A96E" }} />
            : <HiMoon size={18} />
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}