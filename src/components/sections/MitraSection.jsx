import { motion } from "framer-motion";

// ─── Logo: Koloni Tri Arsitama ────────────────────────────────────────────────
function LogoKoloniTriArsitama({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,90 70,40 100,90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
      <polygon points="55,90 85,35 115,90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" opacity="0.6"/>
      <polygon points="70,90 100,30 130,90" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.35"/>
      <line x1="30" y1="92" x2="140" y2="92" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <text x="148" y="62" fontFamily="'Syne', sans-serif" fontSize="13" fontWeight="700" fill="currentColor" letterSpacing="0.5">KOLONI</text>
      <text x="148" y="79" fontFamily="'Syne', sans-serif" fontSize="13" fontWeight="700" fill="currentColor" letterSpacing="0.5">TRI</text>
      <text x="148" y="96" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="400" fill="currentColor" opacity="0.7" letterSpacing="2">ARSITAMA</text>
    </svg>
  );
}

// ─── Logo: MREC Telkom University ─────────────────────────────────────────────
function LogoMREC({ size = 120 }) {
  const h = size * 0.55;
  return (
    <svg width={size} height={h} viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagonal grid — metaverse/VR motif */}
      <polygon
        points="38,20 58,8 78,20 78,44 58,56 38,44"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"
      />
      <polygon
        points="58,56 78,44 98,56 98,80 78,92 58,80"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.55"
      />
      <polygon
        points="18,56 38,44 58,56 58,80 38,92 18,80"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.35"
      />
      {/* Center dot pulse */}
      <circle cx="58" cy="30" r="3.5" fill="currentColor" opacity="0.9"/>
      <circle cx="78" cy="68" r="2.5" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="68" r="2" fill="currentColor" opacity="0.3"/>
      {/* Connecting lines */}
      <line x1="58" y1="56" x2="58" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="3 3"/>

      {/* Text: MREC */}
      <text
        x="112" y="46"
        fontFamily="'Syne', sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="3"
      >MREC</text>

      {/* Divider */}
      <line x1="112" y1="54" x2="228" y2="54" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>

      {/* Subtitle lines */}
      <text
        x="112" y="68"
        fontFamily="'DM Sans', sans-serif"
        fontSize="8"
        fontWeight="500"
        fill="currentColor"
        opacity="0.65"
        letterSpacing="1.5"
      >METAVERSE RESEARCH &amp;</text>
      <text
        x="112" y="80"
        fontFamily="'DM Sans', sans-serif"
        fontSize="8"
        fontWeight="500"
        fill="currentColor"
        opacity="0.65"
        letterSpacing="1.5"
      >EXPERIENCE CENTER</text>
      <text
        x="112" y="96"
        fontFamily="'DM Sans', sans-serif"
        fontSize="7.5"
        fontWeight="400"
        fill="currentColor"
        opacity="0.45"
        letterSpacing="1"
      >TELKOM UNIVERSITY · BANDUNG</text>
    </svg>
  );
}

// ─── Data mitra ───────────────────────────────────────────────────────────────
const featuredMitra = [
  {
    id: "koloni-tri-arsitama",
    name: "Koloni Tri Arsitama",
    shortName: "KOLONI TRI ARSITAMA",
    badge: "✦ Official Partner",
    subtitle: "Konsultan & Studio Arsitektur",
    description:
      "Koloni Tri Arsitama adalah studio arsitektur yang berfokus pada desain hunian modern, komersial, dan kawasan. Bermitra dengan Renderchitect untuk menghadirkan pengalaman visualisasi 3D dan VR berkualitas tinggi bagi klien mereka.",
    tags: ["Desain Arsitektur", "Konsultasi", "VR Visualization", "3D Rendering"],
    website: "#",
    accentFrom: "rgba(200,169,110,0.09)",
    accentBorder: "rgba(200,169,110,0.32)",
    badgeStyle: {
      background: "rgba(200,169,110,0.15)",
      color: "var(--accent)",
      border: "1px solid rgba(200,169,110,0.35)",
    },
    Logo: LogoKoloniTriArsitama,
  },
  {
    id: "mrec-telkom",
    name: "MREC Telkom University",
    shortName: "MREC TELKOM UNIVERSITY",
    badge: "🌐 Research Partner",
    subtitle: "Metaverse Research & Experience Center · Bandung",
    description:
      "MREC adalah laboratorium metaverse kolaboratif pertama di dunia, diluncurkan di Mobile World Congress (MWC) 2023 Barcelona. Berlokasi di Telkom University Bandung, MREC menjadi pusat riset, pengembangan industri, dan capacity building teknologi metaverse & VR — mendukung ekosistem digital antara akademisi, industri, dan pemerintah.",
    tags: ["Metaverse Research", "VR Lab", "Capacity Building", "Telkom University", "MWC 2023"],
    website: "https://mrec.center.telkomuniversity.ac.id/",
    accentFrom: "rgba(34,211,238,0.07)",
    accentBorder: "rgba(34,211,238,0.25)",
    badgeStyle: {
      background: "rgba(34,211,238,0.12)",
      color: "#22d3ee",
      border: "1px solid rgba(34,211,238,0.3)",
    },
    Logo: LogoMREC,
  },
];

const slotMitra = [
  { id: "mitra-3", label: "Slot Partner Tersedia", desc: "Ingin logo brand kamu tampil di sini?" },
];

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ mitra, index }) {
  const { Logo } = mitra;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative rounded-3xl overflow-hidden group"
      style={{ border: `1px solid ${mitra.accentBorder}` }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${mitra.accentFrom} 0%, transparent 60%)`,
        }}
      />

      {/* Corner glows */}
      <div
        className="absolute top-0 left-0 w-28 h-28 opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${mitra.accentBorder}, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 right-0 w-36 h-36 opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle at 100% 100%, ${mitra.accentBorder}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 md:p-14">
        {/* Logo box */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="shrink-0 flex items-center justify-center rounded-2xl px-8 py-7"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            minWidth: 210,
          }}
        >
          <Logo size={155} />
        </motion.div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
            style={mitra.badgeStyle}
          >
            {mitra.badge}
          </div>

          <h3
            className="font-display text-3xl sm:text-4xl mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {mitra.shortName}
          </h3>

          <p className="text-sm font-mono mb-4" style={{ color: mitra.badgeStyle.color }}>
            {mitra.subtitle}
          </p>

          <p
            className="text-base leading-relaxed mb-6 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {mitra.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
            {mitra.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={mitra.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}
          >
            Kunjungi Website →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function MitraSection() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Kemitraan Strategis
          </p>
          <h2
            className="font-display text-5xl sm:text-6xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            MITRA KAMI
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Berkolaborasi dengan studio arsitektur dan pusat riset teknologi metaverse terkemuka
            untuk menghadirkan pengalaman VR terbaik bagi klien.
          </p>
        </motion.div>

        {/* Featured partners — stacked */}
        <div className="space-y-6 mb-8">
          {featuredMitra.map((mitra, i) => (
            <FeaturedCard key={mitra.id} mitra={mitra} index={i} />
          ))}
        </div>

        {/* Slot kosong */}
        <div className="grid sm:grid-cols-1 gap-5">
          {slotMitra.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 flex items-center gap-5"
              style={{
                border: "2px dashed var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <div
                className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 6L26 26H6L16 6Z"
                    stroke="var(--text-muted)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div
                  className="text-sm font-heading font-semibold mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {slot.label}
                </div>
                <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                  {slot.desc}
                </div>
                <a
                  href="/contact"
                  className="text-xs font-mono transition-colors hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Hubungi kami →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar — pencapaian MREC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-2xl p-6 grid sm:grid-cols-3 gap-6 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          {[
            { val: "MWC 2023", label: "Diluncurkan di Barcelona", icon: "🌐" },
            { val: "#1 World", label: "Lab Metaverse Kolaboratif Pertama", icon: "🏆" },
            { val: "Telkom", label: "University · Bandung", icon: "🎓" },
          ].map(({ val, label, icon }) => (
            <div key={val}>
              <div className="text-2xl mb-1">{icon}</div>
              <div
                className="font-heading font-bold text-lg mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {val}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs mt-8 font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          Tertarik bermitra dengan Renderchitect?{" "}
          <a
            href="/contact"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Hubungi tim kami
          </a>
        </motion.p>
      </div>
    </section>
  );
}