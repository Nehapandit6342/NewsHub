import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../../api/comment.api";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["comments", variables.article_id]);
    },
  });
};
