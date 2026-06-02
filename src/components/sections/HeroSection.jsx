import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay, FiPause } from "react-icons/fi";
import { HouseViewerLazy as HouseViewer } from "../3d/HouseViewerLazy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const bgRef = useRef(null);
  const videoRef = useRef(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-blob", {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: bgRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, bgRef);
    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPaused) { videoRef.current.play(); setVideoPaused(false); }
    else { videoRef.current.pause(); setVideoPaused(true); }
  };

  const stagger = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
  };

  return (
    <section ref={bgRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Video Background ── */}
      <div className="absolute inset-0">
        {showVideo && (
          <video ref={videoRef} autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.18)" }}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-video-37498-large.mp4" type="video/mp4" />
          </video>
        )}
        {/* Primary color overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(15,15,15,0.75) 50%, rgba(10,10,10,0.9) 100%)" }} />

        {/* Ambient blobs */}
        <div className="hero-blob absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(200,169,110,0.09)" }} />
        <div className="hero-blob absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(6,182,212,0.06)" }} />

        {/* Animated grid */}
        <div className="absolute inset-0"
          style={{ opacity: 0.04, backgroundImage: "linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Scanline subtle */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }} />
      </div>

      {/* Video control */}
      <motion.button
        onClick={toggleVideo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-24 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all"
        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
      >
        {videoPaused ? <FiPlay size={11} /> : <FiPause size={11} />}
        {videoPaused ? "Play" : "Pause"} background
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full z-10">
        {/* ── Left ── */}
        <div>
          <motion.div custom={0} variants={stagger} initial="hidden" animate="show"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,169,110,0.3)", backdropFilter: "blur(8px)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono tracking-widest text-white/70">MARKETPLACE OPEN · 2,400+ DESIGNS</span>
          </motion.div>

          <motion.h1 custom={1} variants={stagger} initial="hidden" animate="show"
            className="font-display leading-none tracking-wider mb-6"
            style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", color: "#fff" }}>
            BUILD YOUR<br />
            <span style={{ background: "linear-gradient(135deg,#E8C98E,#C8A96E,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DREAM
            </span>
            <br />IN VR.
          </motion.h1>

          <motion.p custom={2} variants={stagger} initial="hidden" animate="show"
            className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
            Marketplace desain arsitektur 3D — dari SketchUp model hingga aplikasi VR immersive .exe dan .apk untuk Oculus Quest.
          </motion.p>

          <motion.div custom={3} variants={stagger} initial="hidden" animate="show" className="flex flex-col sm:flex-row gap-4">
            <Link to="/projects"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
              style={{ background: "var(--accent)", color: "#0a0a0a" }}>
              Browse Designs <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}>
              <FiPlay size={14} style={{ color: "var(--accent)" }} /> Lihat Layanan VR
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div custom={4} variants={stagger} initial="hidden" animate="show"
            className="flex items-center gap-8 mt-12 pt-10 border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {[["2,400+", "Designs"], ["850+", "Architects"], ["18K+", "Buyers"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-heading font-bold text-xl text-white">{val}</div>
                <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — 3D Viewer ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl blur-3xl" style={{ background: "rgba(200,169,110,0.1)" }} />
          <div className="relative">
            <HouseViewer />

            {/* Floating card 1 */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 shadow-xl"
              style={{ background: "rgba(15,15,15,0.85)", border: "1px solid rgba(200,169,110,0.3)", backdropFilter: "blur(16px)" }}>
              <div className="text-xs mb-0.5 font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Featured</div>
              <div className="font-heading font-semibold text-sm text-white">Casa Lumina</div>
              <div className="text-xs font-mono"
                style={{ background: "linear-gradient(135deg,#E8C98E,#C8A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Rp 149.000
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 rounded-xl px-3 py-2.5 shadow-xl"
              style={{ background: "rgba(15,15,15,0.85)", border: "1px solid rgba(200,169,110,0.2)", backdropFilter: "blur(16px)" }}>
              <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>⭐ Rating</div>
              <div className="font-heading font-bold text-base text-white">4.9 / 5</div>
            </motion.div>

            {/* VR badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ background: "rgba(200,169,110,0.2)", border: "1px solid rgba(200,169,110,0.4)", backdropFilter: "blur(8px)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              <span className="text-xs font-mono" style={{ color: "#C8A96E" }}>VR Ready</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }} />

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <div className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.6), transparent)" }} />
        <span className="text-xs font-mono tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.3)" }}>SCROLL</span>
      </motion.div>
    </section>
  );
}
