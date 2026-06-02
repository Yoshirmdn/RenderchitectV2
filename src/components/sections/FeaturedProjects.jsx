import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/projects";

export function FeaturedProjects() {
  const featured = projects.filter(p => p.featured).slice(0, 3);
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <SectionTitle eyebrow="Curated Selection" title="Featured Designs" subtitle="Handpicked premium architecture projects from our top-rated sellers." />
          <Link to="/projects"
            className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all font-medium"
            style={{ color: "var(--accent)" }}>
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
