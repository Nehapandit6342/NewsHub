import { useQuery } from "@tanstack/react-query";
import { getSecondaryNews } from "../../../api/article.api";

export const useSecondaryNews = () => {
  return useQuery({
    queryKey: ["secondary"],
    queryFn: getSecondaryNews,
  });
};
