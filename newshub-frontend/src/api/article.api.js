import api from "./axios";

/* =========================
   HOME PAGE
========================= */

export const getFeaturedArticles = async () => {
  const res = await api.get("/articles/featured");
  return res.data?.data || res.data || [];
};

export const getSecondaryNews = async () => {
  const res = await api.get("/articles/secondary");
  return res.data?.data || res.data || [];
};

export const getLatestNews = async () => {
  const res = await api.get("/articles/latest");
  return res.data?.data || res.data || [];
};

/* =========================
   SIDEBAR
========================= */

export const getTrendingNews = async () => {
  const res = await api.get("/articles/trending");
  return res.data.data;
};

/* =========================
   SEARCH
========================= */

export const searchArticles = async (q) => {
  const res = await api.get(`/articles/search?q=${q}`);
  return res.data?.data || res.data || [];
};

/* =========================
   CATEGORY (IMPORTANT FIX)
========================= */

export const getCategoryArticles = async (name) => {
  const res = await api.get(`/articles/category/${name}`);
  return res.data.data;
};

/* =========================
   ARTICLE PAGE
========================= */

export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}`);
  return res.data.data || res.data || [];
};
// ALL ARTICLES

export const getAllArticles = async (page = 1) => {
  const res = await api.get(`/articles?page=${page}`);
  return res.data?.data || [];
};
// INCREASE VIEW
export const increaseView = async (id) => {
  const res = await api.put(`/articles/${id}/view`);
  return res.data;
};
