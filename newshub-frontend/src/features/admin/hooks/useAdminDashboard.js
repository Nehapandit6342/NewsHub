import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

const fetchDashboard = async () => {
  const res = await api.get("/admin/articles");
  return res.data; // IMPORTANT
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchDashboard,
  });
};
