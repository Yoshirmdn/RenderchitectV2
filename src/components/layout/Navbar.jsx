import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart, FiMenu, FiX, FiSearch, FiChevronDown,
  FiGrid, FiInfo, FiTool, FiMail, FiHeart,
  FiDollarSign, FiBookOpen, FiBriefcase,
  FiPackage, FiRefreshCw, FiShield
} from "react-icons/fi";
import { MdOutlineVrpano } from "react-icons/md";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useStore } from "../../store/useStore";

// ─── Menu config ─────────────────────────────────────────────────────────────
const navConfig = [
  { path: "/", label: "Home", single: true },

  {
    label: "Marketplace",
    children: [
      {
        group: "Jelajahi",
        items: [
          { path: "/projects",  label: "Browse Designs",   icon: <FiGrid size={15} />,        desc: "2.400+ aset arsitektur 3D" },
          { path: "/wishlist",  label: "Wishlist",          icon: <FiHeart size={15} />,       desc: "Desain yang kamu simpan" },
          { path: "/cart",      label: "Cart",              icon: <FiShoppingCart size={15} />, desc: "Keranjang belanja kamu" },
        ],
      },
      {
        group: "Seller",
        items: [
          { path: "/sell",      label: "Sell on Renderchitect", icon: <FiDollarSign size={15} />,  desc: "Jual desain, raih 70% komisi" },
        ],
      },
    ],
  },

  {
    label: "Layanan",
    children: [
      {
        group: "VR & Teknologi",
        items: [
          { path: "/services",  label: "Semua Layanan",     icon: <FiTool size={15} />,        desc: "VR EXE, APK, Oculus rental" },
          { path: "/services",  label: "VR App .EXE",       icon: <MdOutlineVrpano size={15} />, desc: "Rp 10.000/m² · Min. Rp 1jt" },
          { path: "/services",  label: "VR App .APK",       icon: <MdOutlineVrpano size={15} />, desc: "Rp 25.000/m² · Min. Rp 2,5jt" },
        ],
      },
      {
        group: "Hardware",
        items: [
          { path: "/services",  label: "Sewa Oculus",       icon: <FiRefreshCw size={15} />,   desc: "Quest 2: Rp 150rb · Quest 3: Rp 200rb/hari" },
          { path: "/services",  label: "Beli Oculus",       icon: <FiPackage size={15} />,      desc: "Quest 2 +Rp 7jt · Quest 3 +Rp 9jt" },
        ],
      },
    ],
  },

  {
    label: "Perusahaan",
    children: [
      {
        group: "Tentang Kami",
        items: [
          { path: "/about",     label: "About",             icon: <FiInfo size={15} />,        desc: "Cerita, nilai, dan tim kami" },
          { path: "/blog",      label: "Blog",              icon: <FiBookOpen size={15} />,    desc: "Tutorial, insight, VR tips" },
          { path: "/careers",   label: "Careers",           icon: <FiBriefcase size={15} />,   desc: "Bergabung bersama tim kami" },
          { path: "/contact",   label: "Contact",           icon: <FiMail size={15} />,        desc: "Hubungi kami langsung" },
        ],
      },
      {
        group: "Bantuan",
        items: [
          { path: "/track-order", label: "Check Order",    icon: <FiPackage size={15} />,     desc: "Lacak status order & download" },
          { path: "/refund",      label: "Refund Policy",  icon: <FiShield size={15} />,      desc: "Kebijakan pengembalian dana" },
        ],
      },
    ],
  },
];

// ─── Mega Dropdown ────────────────────────────────────────────────────────────
function MegaDropdown({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full mt-2 glass-strong rounded-2xl shadow-2xl overflow-hidden"
      style={{
        border: "1px solid var(--border-strong)",
        minWidth: 480,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
      }}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

      <div className="flex p-4 gap-2">
        {item.children.map((group) => (
          <div key={group.group} className="flex-1 min-w-[160px]">
            {/* Group label */}
            <p className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 mb-1"
              style={{ color: "var(--accent)", opacity: 0.8 }}>
              {group.group}
            </p>

            {/* Items */}
            {group.items.map((child) => (
              <Link
                key={child.label + child.path}
                to={child.path}
                onClick={onClose}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/item"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(200,169,110,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Icon */}
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 shrink-0 transition-all duration-200"
                  style={{ background: "rgba(200,169,110,0.1)", color: "var(--accent)" }}>
                  {child.icon}
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <div className="text-sm font-medium leading-none mb-1" style={{ color: "var(--text-primary)" }}>
                    {child.label}
                  </div>
                  <div className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                    {child.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="px-4 py-3 border-t flex items-center justify-between"
        style={{ borderColor: "var(--border)", background: "rgba(200,169,110,0.04)" }}>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          🏗️ Renderchitect — Premium 3D Architecture Marketplace
        </span>
        <Link to="/projects" onClick={onClose}
          className="text-xs font-mono flex items-center gap-1 transition-colors"
          style={{ color: "var(--accent)" }}>
          Browse All →
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Nav Item (single or dropdown trigger) ───────────────────────────────────
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [location]);

  if (item.single) {
    return (
      <NavLink to={item.path} end
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg text-sm transition-all duration-200 font-body ${
            isActive ? "bg-[rgba(200,169,110,0.1)]" : "hover:bg-[rgba(255,255,255,0.05)]"
          }`
        }
        style={({ isActive }) => ({ color: isActive ? "var(--accent)" : "var(--text-secondary)" })}
      >
        {item.label}
      </NavLink>
    );
  }

  // Check if any child is active
  const isAnyActive = item.children?.some(g => g.items.some(i => location.pathname.startsWith(i.path) && i.path !== "/"));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 font-body hover:bg-[rgba(255,255,255,0.05)]"
        style={{ color: isAnyActive ? "var(--accent)" : "var(--text-secondary)" }}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && <MegaDropdown item={item} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Menu Item ─────────────────────────────────────────────────────────
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (item.single) {
    return (
      <NavLink to={item.path} end onClick={onClose}
        className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl text-sm font-body transition-all ${isActive ? "bg-[rgba(200,169,110,0.1)]" : ""}`}
        style={({ isActive }) => ({ color: isActive ? "var(--accent)" : "var(--text-secondary)" })}>
        {item.label}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body transition-all"
        style={{ color: "var(--text-secondary)" }}>
        <span>{item.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4">
            {item.children.map(group => (
              <div key={group.group} className="mb-2">
                <p className="text-xs font-mono tracking-widest uppercase px-3 py-1"
                  style={{ color: "var(--accent)", opacity: 0.7 }}>{group.group}</p>
                {group.items.map(child => (
                  <Link key={child.label + child.path} to={child.path} onClick={onClose}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}>
                    <span style={{ color: "var(--accent)" }}>{child.icon}</span>
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{
        background: scrolled ? "var(--glass-bg-strong)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        padding: scrolled ? "10px 0" : "20px 0",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <span className="font-display text-xl tracking-wider hidden sm:block"
            style={{ color: "var(--text-primary)" }}>
            RENDERCHITECH
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navConfig.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <Link to="/projects"
            className="p-2.5 rounded-lg transition-all duration-200 hidden sm:flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
            <FiSearch size={17} />
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link to="/cart"
            className="relative p-2.5 rounded-lg transition-all duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
            <FiShoppingCart size={17} />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                  {cart.length > 9 ? "9+" : cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Sign In */}
          <Link to="/login"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ml-1"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--accent-light)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}>
            Sign In
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-lg transition-all ml-1"
            style={{ color: "var(--text-secondary)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={menuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}>
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              borderColor: "var(--border)",
              background: "var(--glass-bg-strong)",
              backdropFilter: "blur(20px)",
            }}>
            <div className="px-4 py-4 space-y-1">
              {navConfig.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMenuOpen(false)} />
              ))}

              {/* Mobile bottom actions */}
              <div className="pt-4 border-t mt-2 grid grid-cols-2 gap-2"
                style={{ borderColor: "var(--border)" }}>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                  Sign In
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl text-sm border transition-all"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border)", background: "var(--glass-bg)" }}>
                  Cart {cart.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}