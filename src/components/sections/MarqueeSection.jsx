const items = [
  "Modern Villa", "VR .EXE", "Oculus Quest 3", "Minimalist House",
  "VR .APK", "Tropical Resort", "Industrial Loft", "Sky Penthouse",
  "VR Walkthrough", "Zen Garden", "Commercial Tower", "Interior Design",
];

export function MarqueeSection() {
  const doubled = [...items, ...items];
  return (
    <section className="py-8 border-y overflow-hidden space-y-3"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
      <div className="flex overflow-hidden">
        <div className="flex gap-8 animate-marquee shrink-0">
          {doubled.map((item, i) => (
            <span key={i} className="text-xs font-mono tracking-widest uppercase flex items-center gap-3 shrink-0"
              style={{ color: i % 3 === 0 ? "var(--accent)" : "var(--text-muted)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "currentColor" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden">
        <div className="flex gap-8 animate-marquee-reverse shrink-0">
          {[...doubled].reverse().map((item, i) => (
            <span key={i} className="text-xs font-mono tracking-widest uppercase flex items-center gap-3 shrink-0"
              style={{ color: i % 2 === 0 ? "var(--text-secondary)" : "var(--text-muted)" }}>
              ◆ {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
