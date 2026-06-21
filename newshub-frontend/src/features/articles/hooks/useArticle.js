import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

const fetchArticle = async (id) => {
  const res = await api.get(`/articles/${id}`);
  return res.data.data;
};

export const useArticle = (id) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });
};
