import api from "./api.js";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  login:    (data) => api.post("/auth/login",    data),
  getMe:    ()     => api.get("/auth/me"),

  forgotPassword: (email)            => api.post("/auth/forgot-password", { email }),
  resetPassword:  (token, password)  => api.post("/auth/reset-password",  { token, password }),
  changePassword: (data)             => api.post("/auth/change-password",  data),
  verifyEmail:    (token)            => api.get(`/auth/verify-email?token=${token}`),

  logout: () => {
    localStorage.removeItem("archvault_token");
    localStorage.removeItem("archvault_refresh");
    localStorage.removeItem("archvault_user");
  },
};