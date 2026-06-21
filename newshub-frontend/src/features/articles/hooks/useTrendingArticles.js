import { useQuery } from "@tanstack/react-query";
import { getTrendingNews } from "../../../api/article.api";

export const useTrendingArticles = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingNews,
    staleTime: 1000 * 60 * 5,
  });
};
