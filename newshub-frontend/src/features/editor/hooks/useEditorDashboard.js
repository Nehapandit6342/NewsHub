import { useQuery } from "@tanstack/react-query";
import { getEditorDashboard } from "../services/editorArticles.api";

export const useEditorDashboard = () => {
  return useQuery({
    queryKey: ["editor-dashboard"],
    queryFn: getEditorDashboard,
  });
};
