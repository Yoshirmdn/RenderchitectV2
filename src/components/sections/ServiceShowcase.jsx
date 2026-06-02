import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMonitor, FiSmartphone, FiRefreshCw, FiPackage } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";

const services = [
  {
    icon: <FiMonitor size={22} />,
    title: "VR App .EXE",
    price: "Rp 10.000/m²",
    minPrice: "Min. Rp 1.000.000",
    description: "Aplikasi VR untuk PC/Laptop. Jalankan via Oculus Link — full immersive walkthrough tanpa batas.",
    highlight: true,
  },
  {
    icon: <FiSmartphone size={22} />,
    title: "VR App .APK",
    price: "Rp 25.000/m²",
    minPrice: "Min. Rp 2.500.000",
    description: "Aplikasi VR untuk Oculus Quest 2 & Quest 3. Wireless, standalone, instalasi mudah.",
    highlight: false,
  },
  {
    icon: <FiRefreshCw size={22} />,
    title: "Sewa Oculus",
    price: "Rp 150.000–200.000",
    minPrice: "per hari",
    description: "Sewa Quest 2 atau Quest 3 untuk presentasi klien, pameran properti, atau event.",
    highlight: false,
  },
  {
    icon: <FiPackage size={22} />,
    title: "Beli Oculus",
    price: "+Rp 7jt – 9jt",
    minPrice: "beli putus",
    description: "Unit Quest 2 atau Quest 3 baru resmi. Garansi distributor. Gratis ongkir seluruh Indonesia.",
    highlight: false,
  },
];

export function ServiceShowcase() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <SectionTitle
            eyebrow="Layanan Utama"
            title="VR & Immersive Technology"
            subtitle="Dari desain arsitektur 3D hingga pengalaman VR yang bisa langsung dirasakan klien."
          />
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all hover:gap-3"
            style={{ color: "var(--accent)" }}>
            Kalkulator Harga <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl p-6 transition-all duration-300 group overflow-hidden"
              style={{
                background: svc.highlight ? "rgba(200,169,110,0.08)" : "var(--bg-card)",
                border: svc.highlight ? "1px solid rgba(200,169,110,0.35)" : "1px solid var(--border)",
              }}
            >
              {svc.highlight && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-mono"
                  style={{ background: "rgba(200,169,110,0.2)", color: "var(--accent)" }}>
                  Popular
                </div>
              )}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(200,169,110,0.12)", color: "var(--accent)" }}>
                {svc.icon}
              </div>
              <h3 className="font-heading font-bold mb-1" style={{ color: "var(--text-primary)" }}>{svc.title}</h3>
              <div className="font-mono text-base font-bold mb-0.5" style={{ color: "var(--accent)" }}>{svc.price}</div>
              <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{svc.minPrice}</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{svc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
