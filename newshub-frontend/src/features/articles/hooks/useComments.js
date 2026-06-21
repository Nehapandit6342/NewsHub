import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../api/comment.api";

export const useComments = (articleId) => {
  return useQuery({
    queryKey: ["comments", articleId],
    queryFn: async () => {
      const res = await getComments(articleId);
      return res.data;
    },
    enabled: !!articleId,
  });
};
