import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiLinkedin } from "react-icons/fi";

const links = {
  Marketplace: [
    { label: "Browse Projects", to: "/projects" },
    { label: "Our Services", to: "/services" },
    { label: "Featured Designs", to: "/projects?filter=featured" },
    { label: "New Arrivals", to: "/projects?filter=new" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Sell on ArchVault", to: "/sell" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
  ],
  Support: [
    { label: "Contact Us", to: "/contact" },
    { label: "Check Order", to: "/track-order" },
    { label: "FAQ", to: "/#faq" },
    { label: "Refund Policy", to: "/refund" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <span className="font-display text-xs" style={{ color: "#0a0a0a" }}>AV</span>
              </div>
              <span className="font-display text-xl tracking-wider" style={{ color: "var(--text-primary)" }}>ARCHVAULT</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "var(--text-secondary)" }}>
              The premier marketplace for professional 3D architecture and interior design assets. Built for architects, designers, and developers.
            </p>
            <div className="flex items-center gap-3">
              {[FiInstagram, FiTwitter, FiYoutube, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm mb-4 tracking-wider uppercase" style={{ color: "var(--text-primary)" }}>{title}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} ArchVault. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <a key={item} href="#" className="text-xs transition-colors hover:text-[var(--text-secondary)]" style={{ color: "var(--text-muted)" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
