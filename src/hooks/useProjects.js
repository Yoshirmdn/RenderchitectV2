import { useState, useEffect, useCallback } from "react";
import { projectService } from "../services/project.service";

export function useProjects(params = {}) {
  const [data,    setData]    = useState([]);
  const [meta,    setMeta]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectService.getAll(params);
      setData(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { data, meta, loading, error, refetch: fetchProjects };
}

export function useProject(slug) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    projectService.getBySlug(slug)
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading, error };
}