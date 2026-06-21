import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/adminArticles.api";

// GET
export const useAdminArticles = () => {
  return useQuery({
    queryKey: ["admin-articles"],
    queryFn: getAdminArticles,
    staleTime: 0,
  });
};

// CREATE
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });
    },
  });
};

// UPDATE
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });
    },
  });
};

// DELETE
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });
    },
  });
};
