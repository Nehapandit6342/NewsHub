import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminComments,
  updateCommentStatus,
  deleteComment,
} from "../../../api/admin.api";

// GET COMMENTS (ADMIN PANEL)
export const useAdminComments = () => {
  return useQuery({
    queryKey: ["admin-comments"],
    queryFn: getAdminComments, // MUST return array directly
  });
};

// UPDATE STATUS
export const useUpdateCommentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });
};

// DELETE
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });
};
