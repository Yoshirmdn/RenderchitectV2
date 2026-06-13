import api from "./api";

export const orderService = {
  create:      (data) => api.post("/orders",        data),
  getById:     (id)   => api.get(`/orders/${id}`),
  track:       (id)   => api.get(`/orders/${id}/track`),

  createVr:     (data) => api.post("/orders/vr",     data),
  createOculus: (data) => api.post("/orders/oculus",  data),
};