import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../../api/admin.api";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getStats,
  });
};
