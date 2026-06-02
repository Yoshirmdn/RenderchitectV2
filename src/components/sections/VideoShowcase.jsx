import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiPlay, FiPause } from "react-icons/fi";

const showcaseItems = [
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4",
    title: "Modern Villa", category: "VR .EXE", tag: "Rp 1.200.000",
  },
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-11765-large.mp4",
    title: "Sky Tower", category: "VR .APK", tag: "Rp 3.750.000",
  },
  {
    src: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-at-night-11541-large.mp4",
    title: "Urban Loft", category: "VR .EXE", tag: "Rp 2.000.000",
  },
];

function VideoItem({ item, index }) {
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleMouseEnter = () => { setHover(true); videoRef.current?.play(); };
  const handleMouseLeave = () => { setHover(false); videoRef.current?.pause(); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: "1px solid var(--border)", aspectRatio: "9/12" }}
    >
      <video ref={videoRef} muted loop playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: hover ? "brightness(0.45)" : "brightness(0.25)" }}>
        <source src={item.src} type="video/mp4" />
      </video>

      {/* Gradient */}
      <div className="absolute inset-0 transition-all duration-500"
        style={{ background: hover
          ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }} />

      {/* Play indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{ opacity: hover ? 0 : 0.5 }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(200,169,110,0.3)", border: "2px solid rgba(200,169,110,0.5)", backdropFilter: "blur(4px)" }}>
          <FiPlay size={22} style={{ color: "#C8A96E", marginLeft: 2 }} />
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-mono"
          style={{ background: "rgba(200,169,110,0.25)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.4)", backdropFilter: "blur(8px)" }}>
          {item.category}
        </span>
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500"
        style={{ transform: hover ? "translateY(0)" : "translateY(8px)" }}>
        <h3 className="font-heading font-bold text-white text-lg mb-1">{item.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Contoh project</span>
          <span className="font-mono text-sm font-bold" style={{ color: "#C8A96E" }}>{item.tag}</span>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: hover ? "auto" : 0, opacity: hover ? 1 : 0 }}
          className="overflow-hidden mt-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            Full VR walkthrough, interactive navigation, realistic lighting. Deliverable dalam 7–14 hari kerja.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function VideoShowcase() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>VR Showcase</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: "var(--text-primary)" }}>EXPERIENCE<br />IN VR</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Hover kartu untuk preview video. Setiap project dibangun sebagai aplikasi VR immersive yang bisa dijalankan langsung di headset Oculus Quest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {showcaseItems.map((item, i) => (
            <VideoItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 text-center">
          <a href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--accent)" }}>
            Lihat semua layanan VR & kalkulator harga →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
