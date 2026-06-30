import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/news/ArticleCard";
import { useCategoryArticles } from "../features/articles/hooks/useCategoryArticles";

export default function CategoryPage() {
  const { name } = useParams();

  const { data, isLoading, isError, error } = useCategoryArticles(name);

  const articles = data?.data || [];
  const related = articles.slice(2, 7);
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
        Loading {name} news...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-500 dark:text-gray-400">
        {error.message}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-500">
        No {name} articles found.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-12 gap-8">
      {/* LEFT: ALL ARTICLES */}
      <section className="col-span-12 lg:col-span-8">
        {/* HEADER */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-white">
            {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Latest {name} news, updates and stories
          </p>
        </div>

        {/* GRID (ALL ARTICLES SAME STYLE - NO FEATURED) */}
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      </section>

      {/* RIGHT: RELATED SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4">
        <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
          Related News
        </h2>

        <div className="space-y-4">
          {related.map((item) => (
            <Link
              key={item.id}
              to={`/article/${item.id}`}
              className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                />
              )}

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {item.category}
                </p>
                <h3 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
