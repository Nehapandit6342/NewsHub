import { timeAgo } from "../../utils/timeAgo";

export default function ArticleMeta({ article }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
      <span className="uppercase font-semibold text-red-600">
        {article.category}
      </span>

      <span>•</span>

      <span>{timeAgo(article.created_at)}</span>

      <span>•</span>

      <span>👁 {article.views || 0}</span>
    </div>
  );
}
