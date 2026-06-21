import { useQuery } from "@tanstack/react-query";
import { getCategoryArticles } from "../services/articleService";

export const useCategoryArticles = (category) => {
  return useQuery({
    queryKey: ["category", category],
    queryFn: () => getCategoryArticles(category),
    enabled: !!category,
  });
};
