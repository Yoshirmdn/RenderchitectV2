import { FiStar } from "react-icons/fi";

export function StarRating({ rating, max = 5, size = "sm" }) {
  const sizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  return (
    <div className={`flex items-center gap-0.5 ${sizes[size]}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <FiStar
            key={i}
            size={size === "sm" ? 11 : size === "md" ? 13 : 15}
            fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
            style={{ color: filled || half ? "var(--accent)" : "var(--text-muted)" }}
          />
        );
      })}
    </div>
  );
}
