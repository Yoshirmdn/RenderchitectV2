import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projects, categories } from "../data/projects";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    let list = [...projects];
    if (category !== "all") list = list.filter(p => p.category === category);
    if (search) list = list.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    switch (sort) {
      case "price-low":  return list.sort((a, b) => a.price - b.price);
      case "price-high": return list.sort((a, b) => b.price - a.price);
      case "rating":     return list.sort((a, b) => b.rating - a.rating);
      case "newest":     return list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      default:           return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [search, category, sort]);

  const inputStyle = {
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    outline: "none",
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>Marketplace</p>
          <h1 className="font-display text-5xl sm:text-6xl mb-3" style={{ color: "var(--text-primary)" }}>ALL DESIGNS</h1>
          <p style={{ color: "var(--text-secondary)" }}>{projects.length} architecture assets available</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search designs, categories, software..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-colors"
              style={{ ...inputStyle, placeholderColor: "var(--text-muted)" }}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm cursor-pointer min-w-[180px]"
            style={{ ...inputStyle, background: "var(--bg-card)" }}
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="flex gap-1 rounded-xl p-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <button onClick={() => setView("grid")} className="p-2.5 rounded-lg transition-colors"
              style={{ background: view === "grid" ? "rgba(200,169,110,0.15)" : "transparent", color: view === "grid" ? "var(--accent)" : "var(--text-muted)" }}>
              <FiGrid size={16} />
            </button>
            <button onClick={() => setView("list")} className="p-2.5 rounded-lg transition-colors"
              style={{ background: view === "list" ? "rgba(200,169,110,0.15)" : "transparent", color: view === "list" ? "var(--accent)" : "var(--text-muted)" }}>
              <FiList size={16} />
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all font-mono"
              style={
                category === cat.id
                  ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }
                  : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{filtered.length} results</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🏗️</div>
            <p className="text-lg font-heading mb-2" style={{ color: "var(--text-primary)" }}>No designs found</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try a different search or category</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
