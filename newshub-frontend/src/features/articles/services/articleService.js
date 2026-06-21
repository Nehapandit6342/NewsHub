import api from "../../../api/axios";

/* =========================
   HOME PAGE
========================= */

// Featured article
export const getFeaturedNews = async () => {
  const res = await api.get("/articles/section/featured");
  return res.data;
};

// Secondary stories
export const getSecondaryNews = async () => {
  const res = await api.get("/articles/section/secondary");
  return res.data;
};

// Latest news
export const getLatestNews = async () => {
  const res = await api.get("/articles/latest");
  return res.data;
};

/* =========================
   SIDEBAR / NAVBAR
========================= */

// Trending
export const getTrendingNews = async () => {
  const res = await api.get("/articles/trending/top");
  return res.data;
};

// Search
export const searchArticles = async (query) => {
  const res = await api.get(`/articles/search?q=${query}`);
  return res.data;
};

/* =========================
   CATEGORY PAGE
========================= */

export const getCategoryArticles = async (category) => {
  const res = await api.get(`/articles/category/${category}`);
  return res.data;
};

/* =========================
   ARTICLE PAGE
========================= */

export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}`);
  return res.data;
};

/* =========================
   OPTIONAL (FUTURE)
========================= */

// pagination support
export const getPaginatedArticles = async (page = 1, limit = 10) => {
  const res = await api.get(`/articles?page=${page}&limit=${limit}`);
  return res.data;
};
