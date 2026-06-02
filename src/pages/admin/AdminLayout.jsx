import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiPackage, FiShoppingBag, FiUsers,
  FiStar, FiSettings, FiLogOut, FiMenu, FiX,
  FiBell, FiChevronRight
} from "react-icons/fi";
import { MdOutlineVrpano } from "react-icons/md";

const sidebarLinks = [
  { path: "/admin",           label: "Dashboard",  icon: <FiGrid size={16} />,       end: true },
  { path: "/admin/projects",  label: "Projects",   icon: <FiPackage size={16} /> },
  { path: "/admin/orders",    label: "Orders",     icon: <FiShoppingBag size={16} /> },
  { path: "/admin/users",     label: "Users",      icon: <FiUsers size={16} /> },
  { path: "/admin/sellers",   label: "Sellers",    icon: <FiStar size={16} /> },
  { path: "/admin/settings",  label: "Settings",   icon: <FiSettings size={16} /> },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="shrink-0 flex flex-col border-r relative z-30"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b shrink-0"
          style={{ borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
            style={{ background: "var(--accent)" }}>
            <span className="font-display text-xs font-bold" style={{ color: "#0a0a0a" }}>AV</span>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display text-base tracking-wider whitespace-nowrap"
                style={{ color: "var(--text-primary)" }}
              >
                ADMIN
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive ? "text-[var(--accent)]" : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "rgba(200,169,110,0.12)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              })}
            >
              <span className="shrink-0">{link.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Tooltip when collapsed */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
                  {link.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 space-y-1 border-t pt-3"
          style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200 text-red-400 hover:bg-red-500/10"
          >
            <FiLogOut size={16} className="shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap">
                  Exit Admin
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center border transition-all z-40"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <motion.span animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronRight size={12} />
          </motion.span>
        </button>
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b shrink-0"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          <div>
            <h1 className="font-heading font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Admin Panel
            </h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>ArchVault Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg transition-all"
              style={{ color: "var(--text-muted)" }}>
              <FiBell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: "var(--border)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                AD
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Admin</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>admin@archvault.id</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}