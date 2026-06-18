import api from "./api";

export const sellerService = {
  getPublicProfile: (slug)   => api.get(`/sellers/profile/${slug}`),

  getDashboard:  ()          => api.get("/sellers/dashboard"),
  getProjects:   (params)    => api.get("/sellers/projects", { params }),
  getEarnings:   ()          => api.get("/sellers/earnings"),
  getPayouts:    ()          => api.get("/sellers/payouts"),
  requestPayout: (data)      => api.post("/sellers/payouts", data),

  updateProfile: (data) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => v !== undefined && form.append(k, v));
    return api.put("/sellers/profile", form, { headers: { "Content-Type": "multipart/form-data" } });
  },
};