import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numTarget = parseFloat(target.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numTarget, duration]);

  const display = Number.isInteger(numTarget) ? Math.floor(count).toLocaleString() : count.toFixed(1);
  const prefix = target.replace(/[0-9.,]/g, "").trim();

  return (
    <span ref={ref}>
      {display}{prefix.includes("+") ? "+" : ""}{suffix}
    </span>
  );
}
