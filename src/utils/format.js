export const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export const formatNumber = (n) =>
  new Intl.NumberFormat("id-ID").format(n);

export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export const truncate = (str, n) =>
  str.length > n ? str.slice(0, n) + "..." : str;
