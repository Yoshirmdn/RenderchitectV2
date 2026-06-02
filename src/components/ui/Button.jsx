import { motion } from "framer-motion";

export function Button({ children, variant = "primary", size = "md", className = "", onClick, disabled, type = "button", style = {}, ...props }) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base", xl: "px-10 py-5 text-lg" };
  const baseStyle = { transition: "all 0.2s" };
  const variantStyles = {
    primary:   { background: "var(--accent)", color: "#0a0a0a" },
    secondary: { background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border)" },
    ghost:     { background: "transparent", color: "var(--text-secondary)" },
    danger:    { background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" },
  };
  return (
    <motion.button
      type={type} onClick={onClick} disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-body cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${sizes[size]} ${className}`}
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
