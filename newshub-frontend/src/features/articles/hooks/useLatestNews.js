import { useQuery } from "@tanstack/react-query";
import { getLatestNews } from "../../../api/article.api";

export const useLatestNews = () => {
  return useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
      const res = await getLatestNews();
      return res;
    },
    staleTime: 1000 * 60 * 5,
  });
};
