import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition"
    >
      {/* IMAGE */}
      <img
        src={article.image || "/placeholder.jpg"}
        alt={article.title}
        className="w-full h-56 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* CATEGORY + META */}
        <div className="flex justify-between items-center text-xs">
          <span className="bg-red-600 text-white px-2 py-1 rounded uppercase">
            {article.category}
          </span>

          <span className="text-gray-500 dark:text-gray-400">
            {timeAgo(article.created_at)}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-red-600">
          {article.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {article.short_description}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
          <span>👁 {article.views || 0} views</span>

          <span className="italic">Read more →</span>
        </div>
      </div>
    </Link>
  );
}
