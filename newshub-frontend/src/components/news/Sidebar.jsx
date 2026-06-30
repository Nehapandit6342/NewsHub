import { Link } from "react-router-dom";
import { useMemo } from "react";

import { useTrendingArticles } from "../../features/articles/hooks/useTrendingArticles";
import { useAllArticles } from "../../features/articles/hooks/useAllArticles";

export default function Sidebar() {
  // 🔥 React Query data
  const { data: trending = [], isLoading: trendingLoading } =
    useTrendingArticles();

  const { data: allArticles = [], isLoading: allLoading } = useAllArticles();

  // 🧠 Derive categories + preview map
  const { categories, categoryPreviewMap } = useMemo(() => {
    const catSet = new Set();
    const map = {};
    const safeArticles = Array.isArray(allArticles) ? allArticles : [];

    safeArticles.forEach((item) => {
      if (!item?.category) return;

      catSet.add(item.category);

      if (!map[item.category]) {
        map[item.category] = item; // first article per category
      }
    });

    return {
      categories: [...catSet],
      categoryPreviewMap: map,
    };
  }, [allArticles]);

  return (
    <aside className="space-y-10">
      {/* ================= TRENDING ================= */}
      <div>
        <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
          Trending
        </h2>

        {trendingLoading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Loading...
          </p>
        ) : (
          <ul className="space-y-3 mt-3">
            {trending.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Link
                  to={`/article/${item.id}`}
                  className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded"
                  />

                  {/* TEXT */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    {/* ONLY CATEGORY (clean like news sites) */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase">
                      {item.category}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* ================= CATEGORIES ================= */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b border-gray-200 dark:border-gray-700 pb-1 mb-3 text-gray-900 dark:text-white">
          Categories
        </h2>

        {allLoading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        ) : (
          <ul className="space-y-3">
            {categories.slice(0, 2).map((cat, index) => {
              const sample = categoryPreviewMap[cat];

              return (
                <li key={index}>
                  <Link
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <img
                      src={sample?.image || "/placeholder.jpg"}
                      alt={cat}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cat}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {sample?.short_description ||
                          "Latest news in this category"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ================= OPINION ================= */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b border-gray-200 dark:border-gray-700 pb-1 mb-3 text-gray-900 dark:text-white">
          Opinion
        </h2>

        <ul className="space-y-3">
          {trending.slice(0, 2).map((item) => (
            <li key={item.id}>
              <Link
                to={`/article/${item.id}`}
                className="flex gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <h3 className="text-sm font-semibold line-clamp-1 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.short_description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
