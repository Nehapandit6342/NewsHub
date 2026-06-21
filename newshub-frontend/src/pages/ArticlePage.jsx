import { useParams, Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import { useEffect } from "react";

import { useArticle } from "../features/articles/hooks/useArticle";
import { useIncreaseView } from "../features/articles/hooks/useIncreaseView";
import { useTrendingArticles } from "../features/articles/hooks/useTrendingArticles";
import { useCategoryArticles } from "../features/articles/hooks/useCategoryArticles";

import CommentSection from "../features/comments/components/CommentSection";
import { useComments } from "../features/articles/hooks/useComments";
import { useAddComment } from "../features/articles/hooks/useAddComment";

export default function ArticlePage() {
  const { id } = useParams();

  // MAIN ARTICLE
  const { data: article, isLoading, isError } = useArticle(id);

  const { mutate: increaseView } = useIncreaseView();

  // SAFE CATEGORY (after article loads)
  const category = article?.category || "";

  // SIDEBAR DATA
  const { data: trending = [] } = useTrendingArticles();
  const { data: relatedData = [] } = useCategoryArticles(category);

  const related = relatedData?.data || relatedData || [];

  const filteredRelated = related.filter((a) => a.id !== article?.id);

  // VIEW TRACKING
  useEffect(() => {
    if (!id) return;

    increaseView(id);
  }, [id]);

  // LOADING
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  // ERROR
  if (isError || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-red-500">
        Failed to load article.
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-12 gap-10">
      {/* MAIN ARTICLE */}
      <article className="col-span-12 lg:col-span-8">
        <div className="mb-4">
          <span className="text-red-600 font-semibold uppercase text-sm">
            {article.category}
          </span>

          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span>{timeAgo(article.created_at)}</span>
            <span>•</span>
            <span>{article.views || 0} views</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          {article.title}
        </h1>

        <p className="text-lg text-gray-600 mt-4">
          {article.short_description}
        </p>

        {article.image && (
          <div className="mt-6">
            <img
              src={article.image}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>
        )}

        <div
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />
        <CommentSection articleId={id} />
      </article>

      {/* SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4">
        <div className="sticky top-24 space-y-8">
          {/* TRENDING */}
          <div>
            <h2 className="font-bold text-lg border-b pb-2 mb-4">
              🔥 Trending Now
            </h2>

            <div className="space-y-3">
              {trending.slice(0, 5).map((item) => (
                <Link
                  key={item.id}
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 hover:bg-gray-50 rounded"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RELATED */}
          <div>
            <h2 className="font-bold text-lg border-b pb-2 mb-4">
              More from {article.category}
            </h2>

            <div className="space-y-3">
              {filteredRelated.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 hover:bg-gray-50 rounded"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {timeAgo(item.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
