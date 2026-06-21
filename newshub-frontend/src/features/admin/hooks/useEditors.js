import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEditors,
  createEditor,
  deleteEditor,
} from "../../../api/editor.api";

// GET EDITORS
export const useEditors = () => {
  return useQuery({
    queryKey: ["editors"],
    queryFn: getEditors,
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};

// CREATE EDITOR
export const useCreateEditor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editors"] });
    },

    onError: (error) => {
      console.error("Create editor failed:", error);
    },
  });
};

// DELETE EDITOR
export const useDeleteEditor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editors"] });
    },
    onError: (error) => {
      console.error("Delete editor failed:", error);
    },
  });
};
