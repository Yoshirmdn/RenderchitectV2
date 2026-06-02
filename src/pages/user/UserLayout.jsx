import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiShoppingBag, FiDownload, FiHeart,
  FiSettings, FiLogOut, FiChevronRight, FiBell
} from "react-icons/fi";

const sidebarLinks = [
  { path: "/user",            label: "Dashboard",  icon: <FiGrid size={16} />,     end: true },
  { path: "/user/orders",     label: "My Orders",  icon: <FiShoppingBag size={16} /> },
  { path: "/user/downloads",  label: "Downloads",  icon: <FiDownload size={16} /> },
  { path: "/user/wishlist",   label: "Wishlist",   icon: <FiHeart size={16} /> },
  { path: "/user/settings",   label: "Settings",   icon: <FiSettings size={16} /> },
];

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="shrink-0 flex flex-col border-r relative z-30"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", overflow: "hidden" }}
      >
        {/* Logo / Header */}
        <div className="flex items-center gap-3 px-4 h-16 border-b shrink-0"
          style={{ borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            RZ
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                  Reza F.
                </div>
                <div className="text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                  Buyer
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarLinks.map(link => (
            <NavLink key={link.path} to={link.path} end={link.end}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
              style={({ isActive }) => ({
                background: isActive ? "rgba(200,169,110,0.12)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              })}>
              <span className="shrink-0">{link.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap">{link.label}</motion.span>
                )}
              </AnimatePresence>
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
                  {link.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-2 pb-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <button onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all text-red-400 hover:bg-red-500/10">
            <FiLogOut size={16} className="shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap">Logout</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center border z-40"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <motion.span animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronRight size={12} />
          </motion.span>
        </button>
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b shrink-0"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          <div>
            <h1 className="font-heading font-bold text-sm" style={{ color: "var(--text-primary)" }}>My Account</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>reza@example.com</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg" style={{ color: "var(--text-muted)" }}>
              <FiBell size={17} />
            </button>
            <NavLink to="/" className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              ← Back to Store
            </NavLink>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}