import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import productApi from "../api/productApi";
import { ProjectCard } from "../components/ui/ProjectCard";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

function normalizeProject(project) {
  const rawImages = project.images || project.projectImages || project.project_images || [];
  const images = rawImages
    .map((img) => typeof img === "string" ? img : img.url || img.imageUrl)
    .filter(Boolean);

  const rawFiles = project.files || project.projectFiles || project.project_files || [];
  const fileFormats = project.fileFormats || rawFiles
    .map((file) => typeof file === "string" ? file : file.format)
    .filter(Boolean);

  const ratingCount = project.ratingCount ?? project._count?.reviews ?? project.reviews ?? 0;
  const rating = project.rating ?? (ratingCount > 0 ? project.totalRating / ratingCount : 0);
  const category = typeof project.category === "string"
    ? project.category
    : project.category?.slug || project.category?.name?.toLowerCase() || "uncategorized";

  return {
    ...project,
    category,
    images: images.length > 0 ? images : [fallbackImage],
    fileFormats,
    rating: Number(rating).toFixed(1),
    reviews: ratingCount,
    downloads: project.downloads ?? 0,
    fileSize: project.fileSize || rawFiles[0]?.size || "-",
    new: project.new ?? project.isNew ?? false,
    bestseller: project.bestseller ?? false,
    featured: project.featured ?? false,
    originalPrice: project.originalPrice ?? project.price,
  };
}

function normalizeCategory(category) {
  if (typeof category === "string") {
    return { id: category, label: category };
  }

  return {
    id: category.slug || category.id,
    label: category.name || category.label || category.slug,
  };
}

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", label: "All Designs" }]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      try {
        const res = await productApi.getCategories();
        const apiCategories = Array.isArray(res?.data) ? res.data : [];

        if (!ignore) {
          setCategories([
            { id: "all", label: "All Designs" },
            ...apiCategories.map(normalizeCategory),
          ]);
        }
      } catch {
        if (!ignore) setCategories([{ id: "all", label: "All Designs" }]);
      }
    }

    loadCategories();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const params = {
          page: 1,
          limit: 12,
          sort,
        };

        if (search.trim()) params.search = search.trim();
        if (category !== "all") params.category = category;

        const res = await productApi.getProjects(params);
        const apiProjects = Array.isArray(res?.data) ? res.data : [];

        if (!ignore) {
          setProjects(apiProjects.map(normalizeProject));
          setMeta(res?.meta || null);
        }
      } catch (err) {
        if (!ignore) {
          setProjects([]);
          setMeta(null);
          setError(err.response?.data?.message || "Gagal mengambil data project dari API.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    const timer = setTimeout(loadProjects, 300);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [search, category, sort]);

  const inputStyle = {
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    outline: "none",
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>Marketplace</p>
          <h1 className="font-display text-5xl sm:text-6xl mb-3" style={{ color: "var(--text-primary)" }}>ALL DESIGNS</h1>
          <p style={{ color: "var(--text-secondary)" }}>{meta?.total ?? projects.length} architecture assets available</p>
        </motion.div>
      </div>

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
              style={inputStyle}
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

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {loading ? "Loading projects..." : `${projects.length} results`}
          </span>
        </div>

        {error ? (
          <div className="text-center py-24">
            <p className="text-lg font-heading mb-2" style={{ color: "#f87171" }}>API Error</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
          </div>
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl animate-pulse"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-heading mb-2" style={{ color: "var(--text-primary)" }}>No designs found</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try a different search or category</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
