import api from "@/api/axios";

export const getMyArticles = async () => {
  const res = await api.get("/articles/editor/articles");
  return res.data.data;
};
