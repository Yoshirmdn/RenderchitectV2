import api from "./api";

// export const userService = {
//   updateProfile: (data) => {
//     const form = new FormData();
//     Object.entries(data).forEach(([k, v]) => v !== undefined && form.append(k, v));
//     return api.put("/users/profile", form, { headers: { "Content-Type": "multipart/form-data" } });
//   },

//   // Cart
//   getCart:          ()          => api.get("/users/cart"),
//   addToCart:        (projectId) => api.post("/users/cart", { projectId }),
//   removeFromCart:   (projectId) => api.delete(`/users/cart/${projectId}`),
//   clearCart:        ()          => api.delete("/users/cart"),

//   // Wishlist
//   getWishlist:      ()          => api.get("/users/wishlist"),
//   toggleWishlist:   (projectId) => api.post("/users/wishlist", { projectId }),

//   // Orders
//   getOrders: (params = {}) => api.get("/users/orders", { params }),

//   // Notifications
//   getNotifications:      (params = {}) => api.get("/users/notifications", { params }),
//   markNotificationsRead: ()             => api.patch("/users/notifications/read"),
// };

export const userService = {
  updateProfile: (data) => {
    return api.put("/users/profile", data);
  },

  toggleWishlist: (projectId) =>
    api.post("/users/wishlist", { projectId }),
};


// TEST
console.log("USER SERVICE LOADED");