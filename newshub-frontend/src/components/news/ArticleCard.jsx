import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <Link to={`/article/${article.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition bg-white">
        <img
          src={article.image || "/placeholder.jpg"}
          alt={article.title}
          className="w-full h-56 object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* CATEGORY + META */}
        <div className="flex justify-between items-center text-xs">
          <span className="bg-red-600 text-white px-2 py-1 rounded uppercase">
            {article.category}
          </span>

          <span className="text-gray-500">{timeAgo(article.created_at)}</span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-bold leading-snug group-hover:text-red-600">
          {article.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {article.short_description}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <span>👁 {article.views || 0} views</span>

          <span className="italic">Read more →</span>
        </div>
      </div>
    </Link>
  );
}
