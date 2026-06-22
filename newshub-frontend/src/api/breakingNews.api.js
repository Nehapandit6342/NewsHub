import api from "./axios";

// GET BREAKING NEWS
export const getBreakingNews = async () => {
  const res = await api.get("/articles/breaking");
  return res.data;
};
