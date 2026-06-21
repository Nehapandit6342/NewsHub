import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../../../api/article.api";

export const useAllArticles = () => {
  return useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const res = await getAllArticles();

      const data = res?.data?.data || res?.data || res;

      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
