import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "../../../api/article.api";

export const useSearchArticles = (query) => {
  return useQuery({
    queryKey: ["searchArticles", query],
    queryFn: () => searchArticles(query),
    enabled: !!query, // only run when query exists
    staleTime: 1000 * 60 * 2,
  });
};
