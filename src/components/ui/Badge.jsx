export function Badge({ children, variant = "default", className = "" }) {
  const vars = {
    default: { background: "var(--glass-bg)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    gold:    { background: "rgba(200,169,110,0.15)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.3)" },
    green:   { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" },
    red:     { background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" },
    new:     { background: "rgba(34,211,238,0.15)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.3)" },
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono ${className}`}
      style={vars[variant]}
    >
      {children}
    </span>
  );
}
