export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const getRole = () =>
  localStorage.getItem("role") || sessionStorage.getItem("role");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
};
