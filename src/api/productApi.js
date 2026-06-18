import api from "./axios";

const unwrap = (response) => response.data;

export const productApi = {
  getProjects(params = {}) {
    return api.get("/projects", { params }).then(unwrap);
  },

  getProjectBySlug(slug) {
    return api.get(`/projects/${slug}`).then(unwrap);
  },

  getCategories() {
    return api.get("/projects/categories").then(unwrap);
  },

  createProject(payload) {
    return api.post("/projects", payload).then(unwrap);
  },

  updateProject(id, payload) {
    return api.put(`/projects/${id}`, payload).then(unwrap);
  },

  archiveProject(id) {
    return api.delete(`/projects/${id}`).then(unwrap);
  },

  submitReview(slug, payload) {
    return api.post(`/projects/${slug}/reviews`, payload).then(unwrap);
  },
};

export default productApi;
