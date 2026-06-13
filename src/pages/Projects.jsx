import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Loader } from "../components/ui/Loader";
import { useProjects } from "../hooks/useProjects";
import { categories } from "../data/projects";

const sortOptions = [
  { value: "createdAt", label: "Featured"             },
  { value: "price",     label: "Price: Low to High"   },
  { value: "price",     label: "Price: High to Low"   },
  { value: "rating",    label: "Highest Rated"         },
  { value: "createdAt", label: "Newest"                },
];

const sortMap = {
  featured:   { sort: "createdAt", order: "desc"  },
  "price-low":  { sort: "price",     order: "asc"  },
  "price-high": { sort: "price",     order: "desc" },
  rating:     { sort: "rating",    order: "desc"  },
  newest:     { sort: "createdAt", order: "desc"  },
};

export default function Projects() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [sort,     setSort]     = useState("featured");
  const [view,     setView]     = useState("grid");
  const [page,     setPage]     = useState(1);

  const { sort: apiSort, order } = sortMap[sort] || sortMap.featured;

  const { data: projects, meta, loading, error } = useProjects({
    page,
    limit: 12,
    ...(category !== "all" && { category }),
    ...(search.trim() && { search: search.trim() }),
    sort:  apiSort,
    order,
  });

  const inputStyle = {
    background: "var(--bg-card)",
    color:      "var(--text-primary)",
    border:     "1px solid var(--border)",
    outline:    "none",
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-sm tracking-widest uppercase mb-2"
            style={{ color: "var(--accent)" }}>
            Marketplace
          </p>
          <h1 className="font-display text-5xl sm:text-6xl mb-3"
            style={{ color: "var(--text-primary)" }}>
            ALL DESIGNS
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {meta ? `${meta.total} architecture assets available` : "Loading..."}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2"
              size={15} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search designs, categories, software..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-colors"
              style={inputStyle}
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl text-sm cursor-pointer min-w-[180px]"
            style={{ ...inputStyle, background: "var(--bg-card)" }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>

          {/* View toggle */}
          <div className="flex gap-1 rounded-xl p-1"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            {[
              { v: "grid", Icon: FiGrid },
              { v: "list", Icon: FiList },
            ].map(({ v, Icon }) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="p-2.5 rounded-lg transition-colors"
                style={{
                  background: view === v ? "rgba(200,169,110,0.15)" : "transparent",
                  color:      view === v ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setPage(1); }}
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
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {loading ? "Loading..." : `${meta?.total ?? 0} results`}
          </span>
        </div>

        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="font-heading text-lg mb-2" style={{ color: "var(--text-primary)" }}>
              Gagal memuat data
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🏗️</div>
            <p className="text-lg font-heading mb-2" style={{ color: "var(--text-primary)" }}>
              No designs found
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Try a different search or category
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className={`grid gap-6 ${
              view === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!meta.hasPrev}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-40"
                  style={{
                    background: "var(--bg-card)",
                    color:      "var(--text-secondary)",
                    border:     "1px solid var(--border)",
                  }}
                >
                  ← Prev
                </button>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`dot-${i}`} className="px-2"
                        style={{ color: "var(--text-muted)" }}>…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-9 h-9 rounded-xl text-sm transition-all"
                        style={
                          page === p
                            ? { background: "var(--accent)", color: "#0a0a0a" }
                            : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                        }
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={!meta.hasNext}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-40"
                  style={{
                    background: "var(--bg-card)",
                    color:      "var(--text-secondary)",
                    border:     "1px solid var(--border)",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}