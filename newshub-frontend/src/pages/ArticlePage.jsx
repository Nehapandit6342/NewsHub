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
import { FiShare2, FiFacebook, FiTwitter, FiLink } from "react-icons/fi";

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
        <p className="text-gray-500 dark:text-gray-400">Loading article...</p>
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
  //. share icon
  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.short_description,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-12 gap-10">
      {/* MAIN ARTICLE */}
      <article className="col-span-12 lg:col-span-8">
        {/* CATEGORY */}
        <span className="text-red-600 font-semibold uppercase tracking-wide text-sm">
          {article.category}
        </span>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white mt-3">
          {article.title}
        </h1>

        {/* SHORT DESCRIPTION */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 border-l-4 border-red-500 pl-4">
          {article.short_description}
        </p>

        {/* META */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>
              By{" "}
              <span className="font-semibold text-gray-800 dark:text-white">
                {article.editor_name}
              </span>
            </span>

            <span>•</span>

            <span>{timeAgo(article.created_at)}</span>

            <span>•</span>

            <span>{article.views || 0} views</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition"
          >
            <FiShare2 />
            Share
          </button>
        </div>

        {/* IMAGE */}
        {article.image && (
          <div className="mt-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[250px] md:h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="
prose
prose-lg
dark:prose-invert
max-w-none
mt-10
prose-headings:font-bold
prose-img:rounded-xl
prose-a:text-red-600
"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {/* COMMENTS */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <CommentSection articleId={id} />
        </div>
      </article>

      {/* SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4">
        <div className="sticky top-24 space-y-8">
          {/* TRENDING */}
          <div>
            <h2 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">
              Trending Now
            </h2>

            <div className="space-y-3">
              {trending.slice(0, 5).map((item) => (
                <Link
                  key={item.id}
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RELATED */}
          <div>
            <h2 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">
              More from {article.category}
            </h2>

            <div className="space-y-3">
              {filteredRelated.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
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
