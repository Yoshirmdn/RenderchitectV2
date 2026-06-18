import api from "./api";

export const projectService = {
  getAll: (params = {}) => api.get("/projects", { params }),
  // params: page, limit, category, search, minPrice, maxPrice, sort, order, featured

  getBySlug:     (slug)         => api.get(`/projects/${slug}`),
  getCategories: ()             => api.get("/projects/categories"),

  create: (data)        => api.post("/projects",      data),
  update: (id, data)    => api.put(`/projects/${id}`, data),
  delete: (id)          => api.delete(`/projects/${id}`),
  addReview: (slug, data) => api.post(`/projects/${slug}/reviews`, data),
};