import { useQuery } from "@tanstack/react-query";
import { getMyArticles } from "../services/editorArticles.api";

export const useEditorArticles = () => {
  return useQuery({
    queryKey: ["editor-articles"],
    queryFn: getMyArticles,
  });
};
