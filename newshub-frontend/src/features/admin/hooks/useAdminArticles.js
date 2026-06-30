import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getAdminArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  bulkDeleteArticles,
  bulkArchiveArticles,
  approveArticle,
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
      queryClient.invalidateQueries({
        queryKey: ["editor-articles"],
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
      queryClient.invalidateQueries({
        queryKey: ["editor-articles"],
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

// Bulk delete

export const useBulkDeleteArticles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkDeleteArticles,

    onSuccess: () => {
      queryClient.invalidateQueries(["admin-articles"]);
    },
  });
};

// BULK ARCHIEVE
export const useBulkArchiveArticles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkArchiveArticles,

    onSuccess: () => {
      toast.success("Articles archived successfully");

      // refresh list
      queryClient.invalidateQueries(["admin-articles"]);
    },

    onError: () => {
      toast.error("Failed to archive articles");
    },
  });
};
// approve articles

export const useApproveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveArticle,

    onSuccess: () => {
      toast.success("Article approved");

      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["editor-articles"],
      });
    },
  });
};
