import { useQuery } from "@tanstack/react-query";
import { getFeaturedArticles } from "../../../api/article.api";

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ["featured"],
    queryFn: getFeaturedArticles, // 👈 IMPORTANT FIX
    staleTime: 1000 * 60 * 5,
  });
};
