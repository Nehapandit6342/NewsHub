import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";

const increaseView = async (id) => {
  const res = await api.put(`/articles/${id}/view`);
  return res.data;
};

export const useIncreaseView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: increaseView,

    onSuccess: (_, id) => {
      // 🔥 IMPORTANT: refresh article + lists
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};
