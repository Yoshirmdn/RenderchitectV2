import { motion } from "framer-motion";

export function GlowCard({ children, className = "", glowColor = "gold", ...props }) {
  const glows = {
    gold: "hover:shadow-[0_0_40px_rgba(200,169,110,0.2)]",
    cyan: "hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]",
    none: "",
  };
  return (
    <motion.div
      className={`glass rounded-xl transition-all duration-500 ${glows[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
