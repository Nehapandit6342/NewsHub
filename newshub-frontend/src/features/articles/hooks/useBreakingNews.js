import { useQuery } from "@tanstack/react-query";
import { getBreakingNews } from "../../../api/breakingNews.api";

export const useBreakingNews = () => {
  return useQuery({
    queryKey: ["breaking-news"],
    queryFn: getBreakingNews,
    staleTime: 1000 * 60, // 1 min cache
  });
};
